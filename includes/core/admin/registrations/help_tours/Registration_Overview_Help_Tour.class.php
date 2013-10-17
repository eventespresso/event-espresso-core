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

	public function __construct() {
		$this->_label = __('Reg Overview Tour', 'event_espresso');
		$this->_slug = 'registration-overview-joyride';
		parent::__construct();
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			15 => array(
				'class' => 'subsubsub',
				'content' => $this->_views_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
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
			25 => array(
				'id' => 'EVT_CAT',
				'content' => $this->_stop_about_filters(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -30
					)
				),
			30 => array(
				'id' => 'REG_date',
				'content' => $this->_reg_date_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			40 => array(
				'id' => 'event_name',
				'content' => $this->_event_name_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			50 => array(
				'id' => 'DTT_EVT_start',
				'content' => $this->_dtt_evt_start_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			60 => array(
				'id' => 'REG_count',
				'content' => $this->_reg_count_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20,
					'tipAdjustmentX' => -15
					)
				),
			70 => array(
				'id' => 'ATT_fname',
				'content' => $this->_attendee_name_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			80 => array(
				'id' => 'REG_code',
				'content' => $this->_reg_code_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			90 => array(
				'id' => 'Reg_status',
				'content' => $this->_reg_status_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			100 => array(
				'id' => 'actions',
				'content' => $this->_actions_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -40,
					'tipAdjustmentX' => -10,
					)
				),
			110 => array(
				'class' => 'ee-list-table-legend-container',
				'content' => $this->_legend_stop(),
				'options' => array(
					'tipLocation' => 'right'
					)
				),
			
			120 => array(
				'id' => 'contextual-help-link',
				'content' => $this->_end(),
				'button_text' => __('End Tour', 'event_espresso'),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -20,
					'tipAdjustmentX' => 10
					)
				)
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Welcome to the Registration overview page!', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('An introduction to the registration overview page', 'event_espresso') . '</p>';
		return $content;
	}


	protected function _views_stop() {
		return '<p>' . __('About the views') . '</p>';
	}

	

	protected function _search_stop() {
		return '<p>' . __('Fields that will be searched with the value from the search are: Event Name, Event description, Attendee first and last name, Attendee bio, attendee email, attendee address, attendee comments, attendee notes, registration final price, registration code, registration group size, ticket name, ticket description', 'event_espresso') . '</p>';
	}


	protected function _stop_about_filters() {
		return '<p>' . __('You can filter the registrations in this list by blah blah blah', 'event_espresso') . '</p>';
	}


	protected function _reg_date_stop() {
		return '<p>' . __('about the reg date column', 'event_espresso') . '</p>';
	}


	protected function _event_name_stop() {
		return '<p>' . __('about the event name column', 'event_espresso') . '</p>';
	}


	protected function _dtt_evt_start_stop() {
		return '<p>' . __('about the event date & time column', 'event_espresso') . '</p>';
	}

	protected function _reg_count_stop() {
		return '<p>' . __('about the att # column', 'event_espresso') . '</p>';
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

	protected function _actions_stop() {
		return '<p>' . __('about the actions column', 'event_espresso') . '</p>';
	}


	protected function _legend_stop() {
		return '<p>' . __('This is the legend that describes the actions available in the Actions column.', 'event_espresso') . '</p>';
	}

	protected function _end() {
		return '<p>' . __('That\'s it for the tour through the Registration overview!  At any time you can restart this tour by clicking on this help dropdown and then clicking the Reg Overview Tour button.  All the best with your events!', 'event_espresso') . '</p>';
	}
}