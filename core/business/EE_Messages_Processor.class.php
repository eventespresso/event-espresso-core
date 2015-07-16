<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }

/**
 * This class contains all business logic related to generating, queuing, and scheduling of
 * messages in the EE_messages system.
 *
 * @package    Event Espresso
 * @subpackage messages
 * @author     Darren Ethier
 * @since      4.8.0
 */
class EE_Messages_Processor {

	/**
	 * Sets the limit of how many messages are generated per process.
	 * @type int
	 */
	protected $_batch_count;


	/**
	 * Sets the limit of how many messages can be sent per hour.
	 * @type int
	 */
	protected $_rate_limit;



	/**
	 * This is set on instantiation.  Is an instance of the EE_messages object.
	 * @type EE_messages
	 */
	protected $_EEMSG;




	/**
	 * constructor
	 * @param EE_messages $ee_messages
	 */
	public function __construct( EE_messages $ee_messages ) {
		$this->_batch_count = apply_filters( 'FHEE__EE_Messages_Processor___batch_count', 50 );
		$this->_rate_limit = apply_filters( 'FHEE__EE_Messages_Processor___rate_limit', 200 );
		$this->_EEMSG = $ee_messages;
	}


	/**
	 * Queues messages for sending.
	 * By default messages are queued as EEM_Message::status_incomplete which means they will not be generated on this
	 * request.
	 *
	 * @param  string $type                What type of message are we sending (corresponds to message types)
	 * @param  mixed $vars                 Data being sent for parsing in the message
	 * @param  string $sending_messenger   if included then we ONLY use the specified messenger for delivery.
	 *                                     Otherwise we cycle through all active messengers.
	 * @param string $generating_messenger if included then this messenger is used for generating the message templates
	 *                                     (but not for sending).
	 * @param string $context              If included then only a message type for a specific context will be
	 *                                     generated.
	 * @param bool $queue_only             Default true.  If false, then this will just return the generated
	 *                                     EE_Messages objects which might be used by the trigger to setup a batch
	 *                                     message (typically html messenger uses it). This also means that the message objects
	 *                                     will be generated right away.
	 *
	 * @return bool
	 */
	public function queue_message( $type, $vars, $sending_messenger = '', $generating_messenger='', $context='', $queue_only = true ) {

		$error = FALSE;
		$installed_message_types = $this->_EEMSG->get_installed_message_types();
		$active_messengers = $this->_EEMSG->get_active_messengers();

		// is that a real class ?
		if ( isset(  $installed_message_types[$type] ) ) {
			//is the messenger specified? If so then let's see if can be queued.  This is the check where its possible secondary messengers might be in use.
			if ( $sending_messenger ) {
				$generating_messenger =  ! empty( $generating_messenger ) && ! empty( $active_messengers[$generating_messenger] ) ? $active_messengers[$generating_messenger]: null;
				$generating_messenger = empty( $generating_messenger ) && ! empty( $active_messengers[$sending_messenger] ) ? $active_messengers[$sending_messenger] : $generating_messenger;

				if ( ! $this->_EEMSG->is_generating_messenger_and_active( $generating_messenger, $installed_message_types[$type] ) ) {
					return false;
				}
				$sending_messenger = ! empty( $active_messengers[$sending_messenger] ) ? $active_messengers[$sending_messenger] : NULL;

				$context = !empty( $context ) ? $context : FALSE;

				//queue
				$success = $this->_queue_messages( $generating_messenger, $installed_message_types[$type], $vars, $sending_messenger, $context, $queue_only );
				if ( ! $queue_only ) {
					return $success; //returning generated EE_Messages objects
				}
			} else {
				//no messenger sent so let's just loop through active messengers (this method is only acceptable for generating messengers)
				$send_messages = array();
				foreach ( $active_messengers as $active_messenger ) {

					//we ONLY continue if the given messenger is a primary messenger and is an active messenger for the given message type.  Otherwise we skip.
					if ( ! $this->_is_generating_messenger_and_active( $active_messenger, $installed_message_types[$type] ) ) {
						continue;
					}

					$success = $this->_queue_messages( $active_messenger, $installed_message_types[$type], $vars, $active_messenger );
					if ( $success === FALSE  ) {
						$error = TRUE;
					} else {
						$send_messages[] = $success;
					}
				}

				//EEH_Debug_Tools::log(
				//	__CLASS__, __FUNCTION__, __LINE__,
				//	array(
				//		'message_type' => $type,
				//		'active_messenger' => $active_messengers,
				//		'send_messages' => $send_messages,
				//		'error' => $error
				//		),
				//	false,
				//	$debug_index
				//	);

				//return generated EE_Messages objects?
				if ( ! $queue_only ) {
					return $send_messages;
				}
			}
		} else {
			EE_Error::add_error( sprintf( __('Message type: %s does not exist', 'event_espresso'), $type ), __FILE__, __FUNCTION__, __LINE__ );
			return false;
		}
		// add a success message
		if ( ! $error ) {
			EE_Error::add_success( sprintf( __( 'The %s message has been successfully sent.', 'event_espresso'), $installed_message_types[$type]->label['singular'] ), __FILE__, __FUNCTION__, __LINE__ );
		}

		return $error ? FALSE : TRUE; //yeah backwards eh?  Really what we're returning is if there is a total success for all the messages or not.  We'll modify this once we get message recording in place.
	}



} //end class EE_Messages_Processor