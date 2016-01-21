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
	 * @type string name of EE_Messenger
	 */
	protected $_messenger_name = null;

	/**
	 * @type string name of EE_Message_Type
	 */
	protected $_message_type_name = null;

	/**
	 * @type EE_Messenger
	 */
	protected $_messenger = null;

	/**
	 * @type EE_Message_Type
	 */
	protected $_message_type = null;

	/**
	 * Identifier for the context the message is to be generated for.
	 * @type string
	 */
	protected $_context = '';

	/**
	 * Data that will be used to generate message.
	 * @type array
	 */
	protected $_data = array();

	/**
	 * Whether this message is for a preview or not.
	 * @type bool
	 */
	protected $_preview = false;

	/**
	 * @type EE_Message $_message
	 */
	protected $_message = null;

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
	 * routine via the EE_Messenger::send_now() method.
	 * @type bool
	 */
	protected $_send_now = false;

	/**
	 * Holds the classname for the data handler used by the current message type.
	 * This is set on the first call to the public `get_data_handler_class_name()` method.
	 * @type string
	 */
	protected $_data_handler_class_name = '';



	/**
	 * Constructor
	 *
	 * @param string $messenger_name    Slug representing messenger
	 * @param string $message_type_name Slug representing message type.
	 * @param mixed  $data              Data used for generating message.
	 * @param string $context           Optional context to restrict message generated for.
	 * @param bool   $preview           Whether this is being used to generate a preview or not.
	 */
	public function __construct(
		$messenger_name,
		$message_type_name,
		$data,
		$context = '',
		$preview = false
	) {
		$this->_messenger_name 		= $messenger_name;
		$this->_message_type_name 	= $message_type_name;
		$this->_data 				= is_array( $data ) ? $data : array( $data );
		$this->_context 			= $context;
		$this->_preview 			= $preview;
		// attempt to generate message immediately
		$this->get_EE_Message();
	}



	/**
	 * @return string
	 */
	public function context() {
		return $this->_context;
	}



	/**
	 * @return array
	 */
	public function data() {
		return $this->_data;
	}



	/**
	 * @return EE_Messenger
	 */
	public function messenger() {
		return $this->_messenger;
	}



	/**
	 * @return EE_Message_Type
	 */
	public function message_type() {
		return $this->_message_type;
	}



	/**
	 * @return boolean
	 */
	public function preview() {
		return $this->_preview;
	}



	/**
	 * @return bool
	 */
	public function send_now() {
		return $this->_send_now;
	}



	/**
	 * Simply returns the state of the $_valid property.
	 *
	 * @return bool
	 */
	public function valid() {
		return $this->_valid;
	}



	/**
	 *  Returns an instantiated EE_Message object from the internal data.
	 *
	 * @return EE_Message
	 */
	public function get_EE_Message() {
		// already set ?
		if ( $this->_message instanceof EE_Message ) {
			return $this->_message;
		}
		// no? then let's create one
		$message = EE_Message_Factory::create(
			array(
				'MSG_messenger'    => $this->_messenger_name,
				'MSG_message_type' => $this->_message_type_name,
				'MSG_context'      => $this->_context,
				'STS_ID'           => EEM_Message::status_incomplete,
			)
		);
		// validate the message, and if it's good, set some properties
		try {
			$message->is_valid( true );
			$this->_valid 		 = true;
			$this->_messenger 	 = $message->messenger_object();
			$this->_message_type = $message->message_type_object();
			$this->_send_now 	 = $message->send_now();
			$this->_message 	 = $message;
		} catch ( Exception $e ) {
			$this->_valid 		= false;
			$this->_error_msg[] = $e->getMessage();
		}
		return $this->_message;
	}



	/**
	 * This returns the data_handler class name for the internal message type set.
	 * Note: this also verifies that the data handler class exists.  If it doesn't then $_valid is set to false
	 * and the data_handler_class name is set to an empty string.
	 *
	 * @param   bool    $preview    Used to indicate that the preview data handler is to be returned.
	 * @return  string
	 */
	public function get_data_handler_class_name( $preview = false ) {
		if ( $this->_data_handler_class_name === '' && $this->valid() ) {
			$ref = $preview ? 'Preview' : $this->_message_type->get_data_handler( $this->_data );
			//make sure internal data is updated.
			$this->_data = $this->_message_type->get_data();

			//verify
			$this->_data_handler_class_name = EE_Message_To_Generate::verify_and_retrieve_class_name_for_data_handler_reference( $ref );
			if ( $this->_data_handler_class_name === '' ) {
				$this->_valid = false;
			}
		}
		return $this->_data_handler_class_name;
	}



	/**
	 * Validates the given string as a reference for an existing, accessible data handler and returns the class name
	 * For the handler the reference matches.
	 *
	 * @param string $data_handler_reference
	 * @return string
	 */
	public static function verify_and_retrieve_class_name_for_data_handler_reference( $data_handler_reference ) {
		$class_name = 'EE_Messages_' . $data_handler_reference . '_incoming_data';
		if ( ! class_exists( $class_name ) ) {
			EE_Error::add_error(
				sprintf(
					__(
						'The included data handler reference (%s) does not match any valid, accessible, "EE_Messages_incoming_data" classes.  Looking for %s.',
						'event_espresso'
					),
					$data_handler_reference,
					$class_name
				),
				__FILE__,
				__FUNCTION__,
				__LINE__
			);
			$class_name = ''; //clear out class_name so caller knows this isn't valid.
		}
		return $class_name;
	}



} //end class EE_Message_To_Generate