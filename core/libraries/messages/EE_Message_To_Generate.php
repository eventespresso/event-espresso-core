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
class EE_Message_To_Generate {


	/**
	 * Slug representing a EE_messenger
	 * @type string
	 */
	public $messenger = '';


	/**
	 * Slug representing a EE_message_type
	 * @type string
	 */
	public $message_type = '';



	/**
	 * Identifier for the context the message is to be generated for.
	 * @type string
	 */
	public $context = '';



	/**
	 * Data that will be used to generate message.
	 * @type array
	 */
	public $data = array();



	/**
	 * Whether this message is for a preview or not.
	 * @type bool
	 */
	public $preview = false;





	/**
	 * @type EE_messages
	 */
	protected $_EEMSG;





	/**
	 * @type EE_Message
	 */
	protected $_EE_Message;


	/**
	 * This is set by the constructor to indicate whether the incoming messenger
	 * and message type are valid.  This can then be checked by callers to determine whether
	 * to generate this message or not.
	 * @type bool
	 */
	protected $_valid = false;


	/**
	 * If there are any errors (non exception errors) they get added to this array for callers to decide
	 * how to handle.
	 * @type array
	 */
	protected $_error_msg = array();


	/**
	 * Constructor
	 * @param string    $messenger  Slug representing messenger
	 * @param string    $message_type   Slug representing message type.
	 * @param mixed     $data           Data used for generating message.
	 * @param EE_messages $ee_msg       The message_type and messenger repository.
	 * @param string    $context        Optional context to restrict message generated for.
	 * @param bool|false $preview       Whether this is being used to generate a preview or not.
	 */
	public function __construct( $messenger, $message_type, $data,  EE_messages $ee_msg, $context = '', $preview = false ) {
		$this->messenger = $messenger;
		$this->message_type = $message_type;
		$this->data = (array) $data;
		$this->context = $context;
		$this->preview = $preview;
		$this->_EEMSG = $ee_msg;

		//this immediately validates whether the given messenger/messagetype are active or not
		//and sets the valid flag.
		$this->_set_valid();
	}




	protected function _set_valid() {
		$validated_for_use = $this->_EEMSG->validate_for_use( EE_Message::new_instance( array(
			'MSG_messenger' => $this->messenger,
			'MST_message_type' => $this->message_type
		) ) );

		if ( ! isset( $validated_for_use['messenger'] ) || ! $validated_for_use['messenger'] instanceof EE_messenger ) {
			$this->_error_msg[] = sprintf( __( 'The %s Messenger is not active.', 'event_espresso' ), $this->messenger );
			$this->_valid = false;
		}

		if ( ! isset( $validated_for_use['message_type'] ) || ! $validated_for_use['message_type'] instanceof EE_message_type ) {
			$this->_valid = false;
			$this->_error_msg[] = sprintf( __( 'The %s Message Type is not active.', 'event_espresso' ), $this->message_type );
		}
	}


	/**
	 * Simply returns the state of the $_valid property.
	 * @return bool
	 */
	public function valid() {
		return $this->_valid;
	}



	/**
	 *  Returns an instantiated EE_Message object from the internal data.
	 */
	public function get_EE_Message() {
		if ( ! $this->valid() ) {
			return null;
		}
		$this->_EE_Message = $this->_EE_Message instanceof EE_Message ? $this->_EE_Message : EE_Message::new_instance( array(
			'MSG_messenger' => $this->messenger,
			'MSG_message_type' => $this->message_type,
			'MSG_context' => $this->context,
			'STS_ID' => EEM_Message::status_incomplete,
			'MSG_priority' => $this->_get_priority_for_message_type()
		) );
		return $this->_EE_Message;
	}





	/**
	 * Returns what the message type has set as a priority.
	 * @return  int   EEM_Message priority.
	 */
	protected function _get_priority_for_message_type() {
		$message_type = $this->_EEMSG->get_active_message_type( $this->messenger, $this->message_type );
		$messenger = $this->_EEMSG->get_messenger_if_active( $this->messenger );
		$priority = EEM_Message::priority_low;
		if ( $messenger instanceof EE_messenger && $message_type instanceof EE_message_type ) {
			$priority = $messenger->send_now() ? EEM_Message::priority_high : $message_type->get_priority();
		}
		return $priority;
	}



} //end class EE_Message_To_Generate