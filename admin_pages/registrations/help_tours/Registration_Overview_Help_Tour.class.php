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
 * Registration_Overview_Help_Tour
 *
 * This is the help tour object for the Registration Overview page
 *
 *
 * @package		Registration_Overview_Help_Tour
 * @subpackage	includes/core/admin/registration/help_tours/Registration_Overview_Help_Tour.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Registration_Overview_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Reg Overview Tour', 'event_espresso');
		if ( isset( $this->_req_data['event_id'] ) )
			$this->_slug = 'registration-per-event-overview-joyride';
		else
			$this->_slug = 'registration-overview-joyride';
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			20 => array(
				'id' => 'REG_ID',
				'content' => $this->_reg_id_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => -20,
					'tipAdjustmentY' => -30
					)
				),
			30 => array(
				'id' => 'REG_count',
				'content' => $this->_reg_count_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => -5,
					'tipAdjustmentY' => -30
					)
				),
			40 => array(
				'id' => 'ATT_fname',
				'content' => $this->_attendee_name_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => -5,
					'tipAdjustmentY' => -30
					)
				),
			50 => array(
				'id' => 'REG_date',
				'content' => $this->_reg_date_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 5,
					'tipAdjustmentY' => -30
					)
				),
			60 => array(
				'id' => 'event_name',
				'content' => $this->_event_name_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => -5,
					'tipAdjustmentY' => -30
					)
				),
			70 => array(
				'id' => 'DTT_EVT_start',
				'content' => $this->_dtt_evt_start_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 5,
					'tipAdjustmentY' => -30
					)
				),
			80 => array(
				'id' => 'REG_code',
				'content' => $this->_reg_code_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 0,
					'tipAdjustmentY' => -30
					)
				),
			90 => array(
				'id' => 'Reg_status',
				'content' => $this->_reg_status_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentX' => 0,
					'tipAdjustmentY' => -50
					)
				),
			100 => array(
				'id' => 'REG_final_price',
				'content' => $this->_txn_total_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentX' => 0,
					'tipAdjustmentY' => -50
					)
				),
			110 => array(
				'id' => 'actions',
				'content' => $this->_actions_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentX' => 0,
					'tipAdjustmentY' => -50
					)
				),
			120 => array(
				'class' => 'ee-list-table-legend-container',
				'content' => $this->_legend_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentX' => 0,
					'tipAdjustmentY' => -40
					)
				),
			130 => array(
				'class' => 'subsubsub',
				'content' => $this->_views_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				),
			140 => array(
				'class' => 'bulkactions',
				'content' => $this->_bulkactions_stop(),
				'options' => array(
					'tipLocation' => 'bottom',
					'tipAdjustmentY' => -30,
					'tipAdjustmentX' => 15
					)
				),
			150 => array(
				'id' => 'EVT_CAT',
				'content' => $this->_stop_about_filters(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -40,
					'tipAdjustmentX' => 25
					)
				),
			160 => array(
				'id' => 'event-espresso_page_espresso_registrations-search-input',
				'content' => $this->_search_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => -15
					)
				),
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Registration Overview', 'event_espresso') . '</h3>';
		if ( isset( $this->_req_data['event_id'] ) ) {
			$content .= '<p>' . __('An introduction to the registration overview page for a single event. This view is pretty much the same as the default overview registration page except you are only seeing registrations for a specific event.  There are also some changes to the available columns in this view.', 'event_espresso') . '</p>';
		} else {
			$content .= '<p>' . __('This tour of the registration overview page will go over different areas of the screen to help you understand what they are used for.', 'event_espresso') . '</p>';
		}
		return $content;
	}

	protected function _reg_id_stop() {
		return '<p>' . __('Sort by registration id in ascending or descending order.', 'event_espresso') . '</p>';
	}

	protected function _reg_count_stop() {
		return '<p>' . __('View registration number.', 'event_espresso') . '</p>';
	}

	protected function _attendee_name_stop() {
		return '<p>' . __('Sort by name of registrant in ascending or descending order.', 'event_espresso') . '</p>';
	}

	protected function _reg_date_stop() {
		return '<p>' . __('Sort by registration date in ascending or descending order.', 'event_espresso') . '</p>';
	}

	protected function _event_name_stop() {
		return '<p>' . __('Sort by name of event in ascending or descending order.', 'event_espresso') . '</p>';
	}

	protected function _dtt_evt_start_stop() {
		return '<p>' . __('Sort by date of event in ascending or descending order.', 'event_espresso') . '</p>';
	}

	protected function _reg_code_stop() {
		return '<p>' . __('View registration code for a registrant.', 'event_espresso') . '</p>';
	}

	protected function _reg_status_stop() {
		return '<p>' . __('Sort by registration status for a registrant in ascending or descending order.', 'event_espresso') . '</p>';
	}

	protected function _txn_total_stop() {
		return '<p>' . __('View price of registration.', 'event_espresso') . '</p>';
	}

	protected function _actions_stop() {
		return '<p>' . __('Perform an action to a registration. See legend in bottom left corner.', 'event_espresso') . '</p>';
	}

	protected function _legend_stop() {
		return '<p>' . __('This is the legend that describes the actions available in the actions column.', 'event_espresso') . '</p>';
	}

	protected function _views_stop() {
		return '<p>' . __('You can select different views by time period or look at registrations which have been moved to the trash.') . '</p>';
	}

	protected function _bulkactions_stop() {
		return '<p>' . __('Perform a bulk action to multiple registrations.', 'event_espresso') . '</p>';
	}

	protected function _stop_about_filters() {
		return '<p>' . __('Registrations can be filtered by date, categories, or status.', 'event_espresso') . '</p>';
	}
	
	protected function _search_stop() {
		return '<p>' . __('Search through registrations. The following sources will be searched: event name, event description, first name, last name, bio, email, address, comments, notes, registration final price, registration code, registration group size, ticket name, and ticket description.', 'event_espresso') . '</p>';
	}

}