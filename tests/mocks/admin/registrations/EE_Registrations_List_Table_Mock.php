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
	function __construct( $admin_page ) {}

	//abstracts needing declared
	protected function _setup_data() {}
	protected function _set_properties() {}
	protected function _get_table_filters(): array { return []; }
	protected function _add_view_counts() {}



	public function total_registrations_this_month(): int {
		return $this->_total_registrations_this_month();
	}

	public function total_registrations_today(): int {
		return $this->_total_registrations_today();
	}
}
