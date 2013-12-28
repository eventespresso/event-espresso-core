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
			20 => array(
				'id' => 'event-espresso_page_espresso_registrations-search-input',
				'content' => $this->_search_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => -15
					)
				),
			30 => array(
				'id' => 'ATT_fname',
				'content' => $this->_attendee_name_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			50 => array(
				'id' => 'ATT_lname',
				'content' => $this->_att_lname_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			60 => array(
				'id' => 'ATT_email',
				'content' => $this->_att_email_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				)
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Welcome to the Contact List overview page!', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('An introduction to the contact list overview page. This is the default view for the contact list overview page ', 'event_espresso') . '</p>';
		return $content;
	}

	

	protected function _search_stop() {
		return '<p>' . __('Fields that will be searched with the value from the search are: Event Name, Event description, Attendee first and last name, Attendee bio, attendee email, attendee address, registration final price, registration code, registration group size', 'event_espresso') . '</p>';
	}


	protected function _attendee_name_stop() {
		return '<p>' . __('about the attendee first name column', 'event_espresso') . '</p>';
	}

	protected function _att_lname_stop() {
		return '<p>' . __('about the attendee last name column', 'event_espresso') . '</p>';
	}

	protected function _att_email_stop() {
		return '<p>' . __('about the attendee email column', 'event_espresso') . '</p>';
	}
}