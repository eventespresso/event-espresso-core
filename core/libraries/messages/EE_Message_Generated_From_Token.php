<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }

/**
 * This class is the signature for an object representing prepped message for queueing.
 *
 *
 * @package    Event Espresso
 * @subpackage messages
 * @author     Darren Ethier
 * @since      4.9.0
 */
class EE_Message_Generated_From_Token extends EE_Message_To_Generate implements EEI_Has_Sending_Messenger {


	/**
	 * Sending messenger
	 *
	 * @type EE_messenger | string
	 */
	protected $_sending_messenger = '';


	/**
	 * Holds the incoming token;
	 * @type string
	 */
	public $token = '';


	/**
	 * Constructor
	 *
	 * @param   string    $sending_messenger_slug 	  This is used to set what messenger is used to "send"
	 *                                            	  the EE_Message retrieved from the DB via the given token.
	 * @param   string $token                         This is a token for a Message that should already exist int the db.
	 *                                                This is then used to populate the properties in here.
	 * @param   EE_Message_Resource_Manager $message_resource_manager
	 */
	public function __construct( $token, $sending_messenger_slug = 'html', EE_Message_Resource_Manager $message_resource_manager ) {
		$this->token = $token;
		$this->_sending_messenger = $this->_set_sending_messenger( $sending_messenger_slug, $message_resource_manager );
		$this->_message = $this->_generate_message();
		//set params for parent from the message object
		parent::__construct(
			$this->_message->messenger(),
			$this->_message->message_type(),
			array(),
			$this->_message->context(),
			false
		);
	}



	/**
	 * @param string                       $sending_messenger_slug
	 * @param \EE_Message_Resource_Manager $message_resource_manager
	 * @return \EE_messenger | string
	 */
	protected function _set_sending_messenger(
		$sending_messenger_slug,
		EE_Message_Resource_Manager $message_resource_manager
	) {
		$sending_messenger = $message_resource_manager->get_active_messenger( $sending_messenger_slug );
		return $sending_messenger instanceof EE_messenger ? $sending_messenger : $sending_messenger_slug;
	}



	/**
	 * @return EE_messenger
	 */
	public function sending_messenger() {
		return $this->_sending_messenger;
	}



	/**
	 * generates an EE_Message using the supplied arguments and some defaults
	 *
	 * @param array $properties
	 * @return EE_Message
	 * @throws \EE_Error
	 */
	protected function _generate_message( $properties = array() ) {
		// a message was generated immediately but the parent class will call this again
		if ( $this->_message instanceof EE_Message ) {
			return $this->_message;
		}
		$message = EEM_Message::instance()->get_one_by_token( $this->token );
		if ( ! $message instanceof EE_Message ) {
			throw new EE_Error(
				sprintf(
					__( 'Unable to retrieve generated message from DB using given token: "%1$s"', 'event_espresso' ),
					$this->token
				)
			);
		}
		$message->set_STS_ID( EEM_Message::status_idle );

		if ( ! $this->_sending_messenger instanceof EE_messenger ) {
			$message->set_STS_ID( EEM_Message::status_failed );
			$message->set_error_message(
				sprintf(
					__( 'Unable to send message because the "%1$s" messenger is not active or not installed', 'event_espresso' ),
					$this->_sending_messenger
				)
			);
		}

		//set properties
		$this->_valid = true;
		$this->_messenger = $message->messenger_object();
		$this->_message_type = $message->message_type_object();
		$this->_send_now = $message->send_now();
		return $message;
	}



} //end class EE_Message_Generated_From_Token