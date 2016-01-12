<?php

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class EE_Message_Factory
 *
 * Description
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         $VID:$
 *
 */
class EE_Message_Factory {


	/**
	 * @type EE_Message_Factory $_instance
	 */
	protected static $_instance = null;


	/**
	 * @type EE_Messenger_And_Message_Type_Manager $_messenger_and_message_type_manager
	 */
	protected $_messenger_and_message_type_manager;



	/**
	 * EE_Message_Factory constructor.
	 *
	 * @access protected
	 * @param \EE_Messenger_And_Message_Type_Manager    $Messenger_And_Message_Type_Manager
	 */
	protected function __construct(
		EE_Messenger_And_Message_Type_Manager $Messenger_And_Message_Type_Manager
	) {
		$this->_messenger_and_message_type_manager = $Messenger_And_Message_Type_Manager;
	}



	/**
	 * @singleton method used to instantiate class object
	 * @access    public
	 * @param \EE_Messenger_And_Message_Type_Manager $Messenger_And_Message_Type_Manager
	 * @return \EE_Message_Factory instance
	 */
	public static function instance( EE_Messenger_And_Message_Type_Manager $Messenger_And_Message_Type_Manager = null ) {
		// check if class object is instantiated, and instantiated properly
		if ( ! self::$_instance instanceof EE_Message_Factory ) {
			self::$_instance = new EE_Message_Factory( $Messenger_And_Message_Type_Manager );
		}
		return self::$_instance;
	}



	/**
	 * @access public
	 * @param  array $props_n_values
	 * @return mixed
	 */
	public static function create( $props_n_values = array() ) {
		$Message_Factory = EE_Registry::instance()->load_lib( 'Message_Factory' );
		return $Message_Factory->_create( $props_n_values );
	}



	/**
	 * @access protected
	 * @param  array $props_n_values
	 * @return \EE_Message
	 * @throws \EE_Error
	 */
	protected function _create( $props_n_values = array() ) {
		if ( ! empty( $props_n_values['MSG_ID'] ) ) {
			$message = EE_Message::new_instance_from_db( $props_n_values );
		} else {
			$message = EE_Message::new_instance( $props_n_values );
		}
		$message = $this->_set_messenger( $message );
		$message = $this->_set_message_type( $message );
		return $message;

	}



	/**
	 * @access protected
	 * @param  \EE_Message $message
	 * @return \EE_Message
	 * @throws \EE_Error
	 */
	protected function _set_messenger( EE_Message $message ) {
		$messenger = $this->_messenger_and_message_type_manager->get_messenger( $message->messenger() );
		if ( ! $messenger instanceof  EE_Messenger ) {
			throw new EE_Error(
				sprintf(
					__( 'The %1$s messenger set for this message is missing or invalid. Please double-check the spelling and verify that the correct files exist.', 'event_espresso' ),
					$message->messenger()
				)
			);
		}
		$message->set_messenger_object( $messenger );
		return $message;
	}



	/**
	 * @access protected
	 * @param  \EE_Message $message
	 * @return \EE_Message
	 * @throws \EE_Error
	 */
	protected function _set_message_type( EE_Message $message ) {
		$message_type = $this->_messenger_and_message_type_manager->get_message_type( $message->message_type() );
		if ( ! $message_type instanceof  EE_Message_Type ) {
			throw new EE_Error(
				sprintf(
					__( 'The %1$s message type set for this message is missing or invalid. Please double-check the spelling and verify that the correct files exist.', 'event_espresso' ),
					$message->message_type()
				)
			);
		}
		$message->set_message_type_object( $message_type );
		return $message;
	}

}
// End of file EE_Message_Factory.php
// Location: /EE_Message_Factory.php