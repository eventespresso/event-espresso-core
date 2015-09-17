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
	 * @type EE_messenger
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
	 * @param   string $sending_messenger This is used to set what messenger is used to "send" the EE_Message retrieved
	 *                                    from the DB via the given token.
	 * @param   string  $token  This is a token for a Message that should already exist int the db.  This is then
	 *                          used to populate the properties in here.
	 * @param   EE_messages
	 */
	public function __construct( $token, $sending_messenger = 'html', EE_messages $ee_msg ) {
		$this->token = $token;
		$this->_sending_messenger = $sending_messenger;
		$this->_EEMSG = $ee_msg;
		$message = $this->get_EE_Message();
		//set params for parent from the message object
		parent::__construct( $message->messenger(), $message->message_type(), array(), $ee_msg, $message->context(), false );
	}




	/**
	 * @return EE_messenger
	 */
	public function sending_messenger() {
		return $this->_sending_messenger;
	}




	/**
	 * Returns an instantiated EE_Message object from the internal data.
	 * @throws EE_Error.
	 * @return EE_Message
	 */
	public function get_EE_Message() {
		//check to see if already got our EE_Message.
		if ( $this->_EE_Message instanceof EE_Message ) {
			return $this->_EE_Message;
		}
		$this->_EE_Message = EEM_Message::instance()->get_one_by_token( $this->token );
		if ( ! $this->_EE_Message instanceof EE_Message ) {
			throw new EE_Error( sprintf( __('Unable to retrieve generated message from DB using given token: %s', 'event_espresso'), $this->token ) );
		}
		$this->_EE_Message->set_STS_ID( EEM_Message::status_idle );

		//set sending messenger to EE_messenger object
		$sending_messenger_slug = $this->_sending_messenger;
		$this->_sending_messenger = $this->_EEMSG->get_messenger_if_active( $sending_messenger_slug );

		if ( ! $this->_sending_messenger instanceof EE_messenger ) {
			$this->_EE_Message->set_STS_ID( EEM_Message::status_failed );
			$this->_EE_Message->set_error_message( sprintf(
				__( 'Unable to send message because the %s messenger is not active or not installed', 'event_espresso' ),
				$sending_messenger_slug )
			);
		}
		return $this->_EE_Message;
	}





	/**
	 * Returns what the message type has set as a priority.
	 * @return  int   EEM_Message priority.
	 */
	protected function _get_priority_for_message_type() {
		return $this->_EE_Message->priority();
	}



} //end class EE_Message_Generated_From_Token