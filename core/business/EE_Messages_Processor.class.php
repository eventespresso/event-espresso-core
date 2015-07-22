<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }

/**
 * This class contains all business logic related to generating, queuing, and scheduling of
 * messages in the EE_messages system.
 *
 * @package    Event Espresso
 * @subpackage messages
 * @author     Darren Ethier
 * @since      4.9.0
 */
class EE_Messages_Processor {


	/**
	 * This is set on instantiation.  Is an instance of the EE_messages object.
	 * @type EE_messages
	 */
	protected $_EEMSG;


	/**
	 * @type EE_Message_Queue
	 */
	protected $_queue;





	/**
	 * @type  EE_Messages_Generator
	 */
	protected $_generator;




	/**
	 * constructor
	 * @param EE_messages $ee_messages
	 */
	public function __construct( EE_messages $ee_messages ) {
		$this->_EEMSG = $ee_messages;
		$this->_queue = new EE_Messages_Queue();
		$this->_generator = new EE_Messages_Generator( $this->_queue, $ee_messages );
	}





	/**
	 *  Calls the EE_Messages_Queue::get_batch_to_generate() method and sends to EE_Messages_Generator.
	 * @return EE_Messages_Queue | bool  return false if nothing generated.  This returns a new EE_Message_Queue with
	 *                                   generated messages.
	 */
	public function batch_generate_from_queue() {
		if ( $this->_queue->get_batch_to_generate() ) {
			$new_queue = $this->_generator->generate();
			if ( $new_queue instanceof EE_Messages_Queue ) {
				//unlock queue
				$this->_queue->unlock();
				return $new_queue;
			}
		} else {
			$this->_queue->unlock();
			return false;
		}
	}




	/**
	 * Calls the EE_Message_Queue::get_batch_to_send() method and then immediately just calls EE_Message_Queue::execute()
	 * to iterate and send unsent messages.
	 * @return EE_Messages_Queue
	 */
	public function batch_send_from_queue() {
		//get messages to send and execute.
		$this->_queue->get_batch_to_send();
		//note: callers can use the EE_Messages_Queue::count_STS_in_queue() method to find out if there were any failed
		//messages in the queue and decide how to handle at that point.
		return $this->_queue;
	}






	/**
	 * This immediately generates messages using the given data and returns the
	 * EE_Message_Queue with the generated messages for the caller to work with.  Note, this does NOT save the generated
	 * messages in the queue, leaving it up to the caller to do so.
	 *
	 * @param string $generating_messenger  The messenger taking care of generating the messages that will be returned.
	 * @param string $context               The context being generated. Optional.
	 * @param mixed  $data                  Data being sent in for parsing the message.
	 */
	public function generate_and_return(  $generating_messenger, $data, $context = '' ) {

	}






	public function queue_ungenerated( $sending_messenger, $generating_messenger, $context, $data ) {}




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
	public function send_message( $type, $vars, $sending_messenger = '', $generating_messenger='', $context='', $queue_only = true ) {

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