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
				'id' => '_REG_count',
				'content' => $this->_reg_count_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => -5,
					'tipAdjustmentY' => -20
					)
				),
			30 => array(
				'id' => 'ATT_name',
				'content' => $this->_attendee_name_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => -5,
					'tipAdjustmentY' => -20
					)
				),
			40 => array(
				'id' => 'ATT_email',
				'content' => $this->_attendee_email_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => -5,
					'tipAdjustmentY' => -20
					)
				),
			50 => array(
				'id' => '_REG_date',
				'content' => $this->_reg_date_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => -5,
					'tipAdjustmentY' => -20
					)
				),
			60 => array(
				'id' => '_REG_code',
				'content' => $this->_reg_code_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => -5,
					'tipAdjustmentY' => -20
					)
				),
			80 => array(
				'id' => '_REG_final_price',
				'content' => $this->_reg_final_price_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => -5,
					'tipAdjustmentY' => -20
					)
				),
			90 => array(
				'id' => 'TXN_paid',
				'content' => $this->_txn_paid_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentX' => 0,
					'tipAdjustmentY' => -50
					)
				),
			100 => array(
				'id' => 'TXN_total',
				'content' => $this->_txn_total_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentX' => 0,
					'tipAdjustmentY' => -50
					)
				),
			110 => array(
				'id' => 'PRC_name',
				'content' => $this->_prc_name_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentX' => 0,
					'tipAdjustmentY' => -50
					)
				),
			115 => array(
				'id' => 'actions',
				'content' => $this->_actions_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentX' => 0,
					'tipAdjustmentY' => -30
					)
				),
			120 => array(
				'class' => 'ee-list-table-legend-container',
				'content' => $this->_legend_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 15,
					'tipAdjustmentY' => -40
					)
				),
			125 => array(
				'class' => 'bulkactions',
				'content' => $this->_bulkactions_stop(),
				'options' => array(
					'tipLocation' => 'bottom',
					'tipAdjustmentY' => -30,
					'tipAdjustmentX' => 15
					)
				),
			130 => array(
				'id' => 'event_id',
				'content' => $this->_event_selector_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 25
					)
				),
			135 => array(
				'id' => 'DTT_ID',
				'content' => $this->_dtt_selector_stop(),
				'options' => array(
					'tipLocation' => 'bottom',
					'tipAdjustmentY' => -30,
					'tipAdjustmentX' => 15
					)
				),
			140 => array(
				'id' => 'event-espresso_page_espresso_registrations-search-input',
				'content' => $this->_search_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => -15
					)
				)
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Event Check-in', 'event_espresso') . '</h3>';
		if ( isset( $this->_req_data['event_id'] ) ) {
			$content .= '<p>' . __('This tour of the Event Check-in page will go over different areas of the screen to help you understand what they are used for.<br /><br /> Note: You are currently viewing the check-in for a specific event so you can toggle the check-in status for attendees.', 'event_espresso') . '</p>';
		} else {
			$content .= '<p>' . __('This tour of the event check-in page will go over different areas of the screen to help you understand what they are used for. <br /><br /> Note: You must select an event from the dropdown menu before you can toggle the check-in status for an attendee.', 'event_espresso') . '</p>';
		}
		return $content;
	}

	protected function _reg_count_stop() {
		return '<p>' . __('View registration number.', 'event_espresso') . '</p>';
	}

	protected function _attendee_name_stop() {
		return '<p>' . __('View name of registrant. Can be sorted in ascending or descending order.', 'event_espresso') . '</p>';
	}

	protected function _attendee_email_stop() {
		return '<p>' . __('View email address for a registrant.', 'event_espresso') . '</p>';
	}

	protected function _reg_date_stop() {
		return '<p>' . __('View registration date. Can be sorted in ascending or descending order.', 'event_espresso') . '</p>';
	}

	protected function _reg_code_stop() {
		return '<p>' . __('View registration code. Can be sorted in ascending or descending order.', 'event_espresso') . '</p>';
	}

	protected function _reg_final_price_stop() {
		return '<p>' . __('View price for ticket.', 'event_espresso') . '</p>';
	}

	protected function _txn_paid_stop() {
		return '<p>' . __('View if registrant has paid for ticket.', 'event_espresso') . '</p>';
	}

	protected function _txn_total_stop() {
		return '<p>' . __('View total amount paid.', 'event_espresso') . '</p>';
	}

	protected function _prc_name_stop() {
		return '<p>' . __('View type of ticket.', 'event_espresso') . '</p>';
	}

	protected function _actions_stop() {
		return '<p>' . __('Perform an action to a registration. See legend in bottom left corner.', 'event_espresso') . '</p>';
	}

	protected function _legend_stop() {
		return '<p>' . __('This is the legend that describes the different check-in statuses. Also shows available status for registrations.', 'event_espresso') . '</p>';
	}
	
	protected function _bulkactions_stop() {
		return '<p>' . __('Perform a bulk action to multiple registrations (only available when viewing check-in for a specific event).', 'event_espresso') . '</p>';
	}

	protected function _event_selector_stop() {
		return '<p>' . __('Select an event from this dropdown and click the filter button to see the check-in registration list for a specific event. You will then be able to toggle the check-in status for a registration.', 'event_espresso') . '</p>';
	}

	protected function _dtt_selector_stop() {
		return '<p>' . __('This dropdown shows you the date and time that a displayed registration is attached to. You can switch to a different event by selecting another date and clicking on the filter button. You can also switch out of this view by clicking on the reset filters button.', 'event_espresso') . '</p>';
	}

	protected function _search_stop() {
		return '<p>' . __('Search through registrations. The following sources will be searched: Event Name, Event Description, First Name, Last Name, Biography, Email Address, Address, Comments, Notes, Registration Final Price, Registration Code, Registration Group Size, Ticket Name, and Ticket Description.', 'event_espresso') . '</p>';
	}

}