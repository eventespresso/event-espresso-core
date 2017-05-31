<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * espresso_events_Pricing_Hooks_mock
 *
 * @package			Event Espresso
 * @subpackage		mocks
 * @author			Darren
 * @since  4.6
 *
 */
require_once( EE_CAFF_PATH . 'admin/new/pricing/espresso_events_Pricing_Hooks.class.php' );
class espresso_events_Pricing_Hooks_Mock extends espresso_events_Pricing_Hooks {

	public function __construct( $admin_page = '' ) {
		$admin_page = ! $admin_page instanceof EE_Admin_Page ? new Admin_Mock_Valid_Admin_Page() : $admin_page;
		parent::__construct( $admin_page );
	}



	/**
	 * Used to overload the default _date_format_strings for testing with.
	 *
	 * @see _date_format_strings property in espresso_events_Pricing_Hooks for more info.
	 *
	 * @param array $format_strings
	 */
	public function set_date_format_strings( $format_strings ) {
		$this->_date_format_strings = $format_strings;
	}





	public function update_dtts( $evt_obj, $data ) {
		return $this->_update_datetimes( $evt_obj, $data );
	}



	public function update_tkts( $evtobj, $saved_dtts, $data ) {
		return $this->_update_tickets( $evtobj, $saved_dtts, $data );
	}


} //end espresso_events_Pricing_Hooks_mock
