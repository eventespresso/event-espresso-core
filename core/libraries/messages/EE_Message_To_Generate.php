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
	 * @type EE_Messenger
	 */
	public $messenger = null;


	/**
	 * @type EE_Message_Type
	 */
	public $message_type = null;



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
	 * Can be accessed via the send_now() method, this is set in the validation
	 * routine via the EE_messenger::send_now() method.
	 * @type bool
	 */
	protected $_send_now = false;


	/**
	 * Holds the classname for the datahandler used by the current message type.
	 * This is set on the first call to the public `get_data_handler_class_name()` method.
	 * @type string
	 */
	protected $_data_handler_class_name = '';





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
		$messenger;
		$message_type;
		$this->data = (array) $data;
		$this->context = $context;
		$this->preview = $preview;
		$this->_EEMSG = $ee_msg;

		//this immediately validates whether the given messenger/messagetype are active or not
		//and sets the valid flag.
		$this->_set_valid( $messenger, $message_type );
	}


	/**
	 * Validates messenger and message type and sets the related properties.
	 * @param string $messenger_slug
	 * @param string $message_type_slug
	 */
	protected function _set_valid( $messenger_slug , $message_type_slug ) {
		$validated_for_use = $this->_EEMSG->validate_for_use( EE_Message::new_instance( array(
			'MSG_messenger' => $messenger_slug,
			'MSG_message_type' => $message_type_slug
		) ) );

		if ( ! isset( $validated_for_use['messenger'] ) || ! $validated_for_use['messenger'] instanceof EE_messenger ) {
			$this->_error_msg[] = sprintf( __( 'The %s Messenger is not active.', 'event_espresso' ), $messenger_slug );
			$this->_valid = false;
		} else {
			$this->messenger = $validated_for_use['messenger'];
			$this->_send_now = $validated_for_use['messenger']->send_now();
		}

		if ( ! isset( $validated_for_use['message_type'] ) || ! $validated_for_use['message_type'] instanceof EE_message_type ) {
			$this->_valid = false;
			$this->_error_msg[] = sprintf( __( 'The %s Message Type is not active.', 'event_espresso' ), $message_type_slug );
		} else {
			$this->message_type = $validated_for_use['message_type'];
		}
		$this->_valid = true;
	}


	/**
	 * Simply returns the state of the $_valid property.
	 * @return bool
	 */
	public function valid() {
		return $this->_valid;
	}



	public function send_now() {
		return $this->_send_now;
	}



	/**
	 *  Returns an instantiated EE_Message object from the internal data.
	 */
	public function get_EE_Message() {
		if ( ! $this->valid() ) {
			return null;
		}
		if ( $this->_EE_Message instanceof EE_Message ) {
			return $this->_EE_Message;
		}
		$this->_EE_Message = $this->_EE_Message instanceof EE_Message ? $this->_EE_Message : EE_Message::new_instance( array(
			'MSG_messenger' => $this->messenger->name,
			'MSG_message_type' => $this->message_type->name,
			'MSG_context' => $this->context,
			'STS_ID' => EEM_Message::status_incomplete,
			'MSG_priority' => $this->_get_priority_for_message_type()
		) );
		return $this->_EE_Message;
	}



	/**
	 * This returns the data_handler class name for the internal message type set.
	 * Note: this also verifies that the data handler class exists.  If it doesn't then $_valid is set to false
	 * and the data_handler_class name is set to an empty string.
	 *
	 * @param   bool    $preview    Used to indicate that the preview datahandler is to be returned.
	 * @return  string
	 */
	public function get_data_handler_class_name( $preview = false ) {
		if ( $this->_data_handler_class_name === '' && $this->valid() ) {
			$ref = $preview ? 'Preview' : $this->message_type->get_data_handler( $this->data );

			//verify
			$this->_data_handler_class_name = $this->_EEMSG->verify_and_retrieve_class_name_for_data_handler_reference( $ref );
			if ( $this->_data_handler_class_name === '' ) {
				$this->_valid = false;
			}
		}
		return $this->_data_handler_class_name;
	}


	/**
	 * Returns what the message type has set as a priority.
	 * @return  int   EEM_Message priority.
	 */
	protected function _get_priority_for_message_type() {
		return $this->send_now() ? EEM_Message::priority_high : $this->message_type->get_priority();
	}


} //end class EE_Message_To_Generate