<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * Messages_Admin_Page_Mock
 * Used for testing Messages Admin Page tests.
 *
 * @package			Event Espresso
 * @subpackage		mocks
 * @author			Darren
 * @since  4.6
 *
 */
require_once EE_ADMIN . 'EE_Admin_Page.core.php';
require_once EE_ADMIN . 'EE_Admin_Page_CPT.core.php';
require_once EE_ADMIN_PAGES . 'messages/Messages_Admin_Page.core.php';
class Messages_Admin_Page_Mock extends Messages_Admin_Page {


	public function __construct( $routing = true ) {
		//define any constants that might not be defined yet when using this mock.
		if ( ! defined( 'EE_MSG_PG_SLUG' ) ) {
			define( 'EE_MSG_PG_SLUG', 'espresso_messages' );
			define( 'EE_MSG_PG_NAME', ucwords( str_replace( '_', '', EE_MSG_PG_SLUG ) ) );
			define( 'EE_MSG_ADMIN', EE_ADMIN_PAGES . 'messages/' );
			define( 'EE_MSG_ADMIN_URL', admin_url( 'admin.php?page=' . EE_MSG_PG_SLUG ) );
			define( 'EE_MSG_ASSETS_PATH', EE_MSG_ADMIN . 'assets/' );
			define( 'EE_MSG_ASSETS_URL', EE_PLUGIN_DIR_URL . 'admin_pages/messages/assets/' );
			define( 'EE_MSG_TEMPLATE_PATH', EE_MSG_ADMIN . 'templates/' );
			define( 'EE_MSG_TEMPLATE_URL', EE_PLUGIN_DIR_URL . 'admin_pages/messages/templates/' );
		}

		parent::__construct( false );
	}




	public function activate_messenger( $messenger_name ) {
		return $this->_activate_messenger( $messenger_name );
	}


	public function activate_message_type_for_messenger( $messenger_name, $message_type_name ) {
		return $this->_activate_message_type_for_messenger( $messenger_name, $message_type_name );
	}


	public function deactivate_messenger( $messenger_name ) {
		return $this->_deactivate_messenger( $messenger_name );
	}


	public function deactivate_message_type_for_messenger( $messenger_name, $message_type_name ) {
		return $this->_deactivate_message_type_for_messenger( $messenger_name, $message_type_name );
	}

} //end class Registrations_Admin_Page_Mock