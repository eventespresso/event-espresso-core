<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link		http://www.eventespresso.com
 * @version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * Contact_List_Help_Tour
 *
 * This is the help tour object for the Contact List Overview page
 *
 *
 * @package		Contact_List_Help_Tour
 * @subpackage	includes/core/admin/registration/help_tours/Contact_List_Help_Tour.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Contact_List_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Contact List Tour', 'event_espresso');
		$this->_slug = 'contact-list-overview-joyride';
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			15 => array(
				'id' => 'ATT_ID',
				'content' => $this->_attendee_id_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => -20,
					'tipAdjustmentY' => -30
					)
				),
			20 => array(
				'id' => 'ATT_fname',
				'content' => $this->_attendee_name_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 5,
					'tipAdjustmentY' => -30
					)
				),
			30 => array(
				'id' => 'ATT_lname',
				'content' => $this->_att_lname_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 5,
					'tipAdjustmentY' => -30
					)
				),
			40 => array(
				'id' => 'ATT_email',
				'content' => $this->_att_email_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 10,
					'tipAdjustmentY' => -30
					)
				),
			50 => array(
				'id' => 'ATT_phone',
				'content' => $this->_att_phone_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => -5,
					'tipAdjustmentY' => -30
					)
				),
			60 => array(
				'id' => 'ATT_address',
				'content' => $this->_att_address_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 0,
					'tipAdjustmentY' => -30
					)
				),
			70 => array(
				'id' => 'ATT_city',
				'content' => $this->_att_city_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentX' => 0,
					'tipAdjustmentY' => -50
					)
				),
			80 => array(
				'id' => 'STA_ID',
				'content' => $this->_sta_id_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentX' => 0,
					'tipAdjustmentY' => -50
					)
				),
			90 => array(
				'id' => 'CNT_ISO',
				'content' => $this->_cnt_iso_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentX' => 0,
					'tipAdjustmentY' => -50
					)
				),
			100 => array(
				'class' => 'bulkactions',
				'content' => $this->_bulkactions_stop(),
				'options' => array(
					'tipLocation' => 'bottom',
					'tipAdjustmentY' => -30,
					'tipAdjustmentX' => 15
					)
				),
			110 => array(
				'id' => 'event-espresso_page_espresso_registrations-search-input',
				'content' => $this->_search_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => -15
					)
				),
			120 => array(
				'id' => 'contact-list-csv-export',
				'content' => $this->_contact_list_csv_export_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 25
					)
				)
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Contact List', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This tour of the Contact List page will go over different areas of the screen to help you understand what they are used for.', 'event_espresso') . '</p>';
		return $content;
	}

	protected function _attendee_id_stop() {
		return '<p>' . __('View ID for registrants. Can be sorted in ascending or descending order.', 'event_espresso') . '</p>';
	}

	protected function _attendee_name_stop() {
		return '<p>' . __('View first name for registrants. Can be sorted in ascending or descending order.', 'event_espresso') . '</p>';
	}

	protected function _att_lname_stop() {
		return '<p>' . __('View last name for registrants. Can be sorted in ascending or descending order.', 'event_espresso') . '</p>';
	}

	protected function _att_email_stop() {
		return '<p>' . __('View email address for registrants. Can be sorted in ascending or descending order.', 'event_espresso') . '</p>';
	}

	protected function _att_phone_stop() {
		return '<p>' . __('View phone number for registrants.', 'event_espresso') . '</p>';
	}

	protected function _att_address_stop() {
		return '<p>' . __('View address for registrants.', 'event_espresso') . '</p>';
	}

	protected function _att_city_stop() {
		return '<p>' . __('View city for registrants.', 'event_espresso') . '</p>';
	}

	protected function _sta_id_stop() {
		return '<p>' . __('View state/province for registrants. Can be sorted in ascending or descending order.', 'event_espresso') . '</p>';
	}

	protected function _cnt_iso_stop() {
		return '<p>' . __('View country for registrants. Can be sorted in ascending or descending order.', 'event_espresso') . '</p>';
	}

	protected function _bulkactions_stop() {
		return '<p>' . __('Perform a bulk action to multiple registrants.', 'event_espresso') . '</p>';
	}

	protected function _search_stop() {
		return '<p>' . __('Search through contacts. The following sources will be searched: Event Name, Event Description, First Name, Last Name, Biography, Email Address, Address, Comments, Notes, Registration Final Price, and Registration Code.', 'event_espresso') . '</p>';
	}

	protected function _contact_list_csv_export_stop() {
		return '<p>' . __('Export your contact list to a CSV file.', 'event_espresso') . '</p>';
	}

}