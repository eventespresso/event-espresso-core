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
	 * @type EE_Message_Resource_Manager $_message_resource_manager
	 */
	protected $_message_resource_manager;



	/**
	 * EE_Message_Factory constructor.
	 *
	 * @access protected
	 * @param \EE_Message_Resource_Manager $Message_Resource_Manager
	 */
	protected function __construct(
		EE_Message_Resource_Manager $Message_Resource_Manager
	) {
		$this->_message_resource_manager = $Message_Resource_Manager;
	}



	/**
	 * @singleton method used to instantiate class object
	 * @access    public
	 * @param \EE_Message_Resource_Manager $Message_Resource_Manager
	 * @return \EE_Message_Factory instance
	 */
	public static function instance( EE_Message_Resource_Manager $Message_Resource_Manager ) {
		// check if class object is instantiated, and instantiated properly
		if ( ! self::$_instance instanceof EE_Message_Factory ) {
			self::$_instance = new EE_Message_Factory( $Message_Resource_Manager );
		}
		return self::$_instance;
	}



	/**
	 * @access public
	 * @param  array $props_n_values
	 * @return mixed
	 */
	public static function create( $props_n_values = array() ) {
		/** @type EE_Message_Factory $Message_Factory */
		$Message_Factory = EE_Registry::instance()->load_lib( 'Message_Factory' );
		return $Message_Factory->_create( $props_n_values );
	}



	/**
	 * @access public
	 * @param  \EE_Message $message
	 * @return \EE_Message
	 * @throws \EE_Error
	 */
	public static function set_messenger_and_message_type( EE_Message $message ) {
		/** @type EE_Message_Factory $Message_Factory */
		$Message_Factory = EE_Registry::instance()->load_lib( 'Message_Factory' );
		return $Message_Factory->_set_messenger_and_message_type( $message );
	}



	/**
	 * @access public
	 * @param  \EE_Message $message
	 * @return \EE_Message
	 * @throws \EE_Error
	 */
	public static function set_messenger( EE_Message $message ) {
		/** @type EE_Message_Factory $Message_Factory */
		$Message_Factory = EE_Registry::instance()->load_lib( 'Message_Factory' );
		return $Message_Factory->_set_messenger( $message );
	}



	/**
	 * @access public
	 * @param  \EE_Message $message
	 * @return \EE_Message
	 * @throws \EE_Error
	 */
	public static function set_message_type( EE_Message $message ) {
		/** @type EE_Message_Factory $Message_Factory */
		$Message_Factory = EE_Registry::instance()->load_lib( 'Message_Factory' );
		return $Message_Factory->_set_message_type( $message );
	}



	/**
	 * @access protected
	 * @param  array $props_n_values
	 * @return \EE_Message
	 * @throws \EE_Error
	 */
	protected function _create( $props_n_values = array() ) {
		$new_instance = false;
		if ( ! empty( $props_n_values['MSG_ID'] ) ) {
			$message = EE_Message::new_instance_from_db( $props_n_values );
		} else {
			$message = EE_Message::new_instance( $props_n_values );
			$new_instance = true;
		}
		return $this->_set_messenger_and_message_type( $message, $new_instance );
	}



	/**
	 * @access public
	 * @param  \EE_Message $message
	 * @param  bool        $new_instance Whether the message type was setup from the database (false) or not (true)
	 * @return \EE_Message
	 * @throws \EE_Error
	 */
	protected function _set_messenger_and_message_type( EE_Message $message, $new_instance = false ) {
		$message = $this->_set_messenger( $message );
		$message = $this->_set_message_type( $message, $new_instance );
		return $message;
	}



	/**
	 * @access protected
	 * @param  \EE_Message $message
	 * @return \EE_Message
	 * @throws \EE_Error
	 */
	protected function _set_messenger( EE_Message $message ) {
		$messenger = $this->_message_resource_manager->get_messenger( $message->messenger() );
		if ( $messenger instanceof EE_messenger ) {
			$message->set_messenger_object( $messenger );
		}
		return $message;
	}



	/**
	 * @access protected
	 * @param  \EE_Message $message
	 * @param  bool        $new_instance Whether the message type was setup from the database (false) or not (true)
	 * @return \EE_Message
	 * @throws \EE_Error
	 */
	protected function _set_message_type( EE_Message $message, $new_instance = false ) {
		$message_type = $this->_message_resource_manager->get_message_type( $message->message_type() );
		if ( $message_type instanceof EE_message_type ) {
			$message->set_message_type_object( $message_type, $new_instance );
		}
		return $message;
	}



}
// End of file EE_Message_Factory.lib.php
// Location: /EE_Message_Factory.lib.php