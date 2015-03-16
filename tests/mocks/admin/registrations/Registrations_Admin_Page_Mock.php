<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * Registrations_Admin_Page_Mock
 * Used for testing Registrations Admin Page tests.
 *
 * @package			Event Espresso
 * @subpackage		mocks
 * @author			Darren
 * @since  4.6
 *
 */
require_once EE_ADMIN . 'EE_Admin_Page.core.php';
require_once EE_ADMIN . 'EE_Admin_Page_CPT.core.php';
require_once EE_ADMIN_PAGES . 'registrations/Registrations_Admin_Page.core.php';
class Registrations_Admin_Page_Mock extends Registrations_Admin_Page {


	public function __construct( $routing = TRUE ) {
		//define any constants that might not be defined yet when using this mock.
		if ( ! defined( 'REG_PG_SLUG' ) ) {
			define( 'REG_PG_SLUG', 'espresso_registrations' );
			define( 'REG_PG_NAME', ucwords( str_replace( '_', '', REG_PG_SLUG )));
			define( 'REG_ADMIN', EE_ADMIN_PAGES . 'registrations' . DS );
			define( 'REG_ADMIN_URL', admin_url( 'admin.php?page=' . REG_PG_SLUG ));
			define( 'REG_ASSETS_PATH', REG_ADMIN . 'assets' . DS );
			define( 'REG_ASSETS_URL', EE_PLUGIN_DIR_URL . 'admin_pages/registrations/assets/' );
			define( 'REG_TEMPLATE_PATH', REG_ADMIN . 'templates' . DS );
			define( 'REG_TEMPLATE_URL', EE_PLUGIN_DIR_URL . 'admin_pages/registrations/templates/' );
		}

		parent::__construct( false );
	}



	public function get_registrations( $per_page = 10, $count = FALSE, $this_month = FALSE, $today = FALSE ) {
			$this->_req_data = array_merge( $_POST, $_REQUEST );
			return parent::get_registrations( $per_page, $count, $this_month, $today );
	}

} //end class Registrations_Admin_Page_Mock
