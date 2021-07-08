<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EE_Registrations_List_Table_Mock
 *
 * @package			Event Espresso
 * @subpackage		mocks
 * @author			Darren
 * @since  4.6
 *
 */
require_once( EE_ADMIN . 'EE_Admin_List_Table.core.php' );
require_once( EE_ADMIN_PAGES . 'registrations/EE_Registrations_List_Table.class.php' );
class EE_Registrations_List_Table_Mock extends EE_Registrations_List_Table {

	//don't call parent __construct for now until we actually need it in tests
	function __construct( $admin_page = null ) {
		$admin_page = ! $admin_page instanceof Registrations_Admin_Page
            ? new Registrations_Admin_Page_Mock()
            : $admin_page;
        parent::__construct($admin_page);
	}

	//abstracts needing declared
	protected function _setup_data() {}
	protected function _set_properties() {
        $this->_wp_list_args = [
            'singular' => __('registration', 'event_espresso'),
            'plural'   => __('registrations', 'event_espresso'),
            'ajax'     => true,
            'screen'   => $this->_admin_page->get_current_screen()->id,
        ];
	}
	protected function _get_table_filters() {}
	protected function _add_view_counts() {}



	public function total_registrations_this_month() {
		return $this->_total_registrations_this_month();
	}

	public function total_registrations_today() {
		return $this->_total_registrations_today();
	}
}
