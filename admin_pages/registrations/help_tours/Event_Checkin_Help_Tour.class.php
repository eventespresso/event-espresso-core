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
 * Event_Checkin_Help_Tour
 *
 * This is the help tour object for the Event Check-in page
 *
 *
 * @package		Event_Checkin_Help_Tour
 * @subpackage	includes/core/admin/registration/help_tours/Event_Checkin_Help_Tour.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Event_Checkin_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Event Check-in Tour', 'event_espresso');
		if ( isset( $this->_req_data['event_id'] ) )
			$this->_slug = 'event-checkin-overview-joyride';
		else
			$this->_slug = 'all-event-checkin-overview-joyride';
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
				'id' => 'event_id',
				'content' => $this->_event_selector_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 20
					)
				),
			35 => array(
				'id' => 'DTT_ID',
				'content' => $this->_dtt_selector_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 20
					)
				),
			40 => array(
				'id' => 'ATT_name',
				'content' => $this->_attendee_name_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			50 => array(
				'id' => 'REG_date',
				'content' => $this->_reg_date_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			60 => array(
				'id' => 'REG_code',
				'content' => $this->_reg_code_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			70 => array(
				'id' => 'Reg_status',
				'content' => $this->_reg_status_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			80 => array(
				'id' => 'TXN_paid',
				'content' => $this->_txn_paid_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			90 => array(
				'id' => 'TXN_total',
				'content' => $this->_txn_total_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			100 => array(
				'id' => 'PRC_name',
				'content' => $this->_ticket_name_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20,
					'tipAdjustmentX' => 0,
					)
				),
			110 => array(
				'class' => 'ee-list-table-legend-container',
				'content' => $this->_legend_stop(),
				'options' => array(
					'tipLocation' => 'right'
					)
				)
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Welcome to the Event Check-in page!', 'event_espresso') . '</h3>';
		if ( isset( $this->_req_data['event_id'] ) ) {
			$content .= '<p>' . __('An introduction to the Event Check-in page. Since you are viewing the Check-in for a specific event, you are able to toggle the Check-in status for registrations for the displayed datetime.', 'event_espresso') . '</p>';
		} else {
			$content .= '<p>' . __('An introduction to the Event Check-in page. This shows the check-in status of all registrations in the system. You cannot toggle the Check-in status via this view.  In order to toggle check-in status select an event from the dropdown.', 'event_espresso') . '</p>';
		}
		return $content;
	}


	

	protected function _search_stop() {
		return '<p>' . __('Fields that will be searched with the value from the search are: Event Name, Event description, Attendee first and last name, Attendee bio, attendee email, attendee address, registration final price, registration code, registration group size, ticket name, ticket description', 'event_espresso') . '</p>';
	}


	protected function _event_selector_stop() {
		return '<p>' . __('Select an event from this dropdown and click the filter button to see the Check-in registration list for a specific event.  Then you will be able to toggle the check-in status for a registration.', 'event_espresso') . '</p>';
	}

	protected function _dtt_selector_stop() {
		return '<p>' . __('This dropdown not only shows you the datetime the displayed registrations are attached to (and which you can toggle the check-in status for) but also allows you to switch to a different datetime to check-in and out registrations on.', 'event_espresso') . '</p>';
	}


	protected function _reg_date_stop() {
		return '<p>' . __('about the reg date column', 'event_espresso') . '</p>';
	}


	protected function _attendee_name_stop() {
		return '<p>' . __('about the attendee name column', 'event_espresso') . '</p>';
	}

	protected function _reg_code_stop() {
		return '<p>' . __('about the reg code column', 'event_espresso') . '</p>';
	}

	protected function _reg_status_stop() {
		return '<p>' . __('about the reg status column', 'event_espresso') . '</p>';
	}

	protected function _txn_total_stop() {
		return '<p>' . __('about the txn total column', 'event_espresso') . '</p>';
	}

	protected function _txn_paid_stop() {
		return '<p>' . __('about the txn paid column', 'event_espresso') . '</p>';
	}

	protected function _ticket_name_stop() {
		return '<p>' . __('about the ticket name column', 'event_espresso') . '</p>';
	}


	protected function _legend_stop() {
		return '<p>' . __('This is the legend that describes the different Check-in statuses.', 'event_espresso') . '</p>';
	}
}