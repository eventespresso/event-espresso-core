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
 * Event_Overview_Help_Tour
 *
 * This is the help tour object for the decaf Event Overview list table
 *
 *
 * @package		Event_Overview_Help_Tour
 * @subpackage	includes/core/admin/Event_Overview_Help_Tour.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Event_Overview_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Event Overview Tour', 'event_espresso');
		$this->_slug = $this->_is_caf ? 'event-overview-caf-joyride' : 'event-overview-joyride';
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_stop_one(),
				),
			15 => array(
				'id' => 'add-new-event',
				'content' => $this->_add_new_event_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 20
					)
				),
			20 => array(
				'class' => 'nav-tab-wrapper',
				'content' => $this->_stop_two(),
				'options' => array(
					'tipAdjustmentY' => -20
					)
				),
			30 => array(
				'class' => 'subsubsub',
				'content' => $this->_stop_three(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				),
			40 => array(
				'id' => 'month_range',
				'content' => $this->_stop_about_filters(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -35,
					'tipAdjustmentX' => 60
					)
				),
			45 => array(
				'id' => 'toplevel_page_espresso_events-search-input',
				'content' => $this->_stop_four(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => -15
					)
				),
			
			50 => array(
				'id' => 'start_date',
				'content' => $this->_stop_five(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -25
					)
				),
			60 => array(
				'id' => 'reg_begins',
				'content' => $this->_stop_six(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -25
					)
				),
			70 => array(
				'id' => 'actions',
				'content' => $this->_stop_seven(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -25,
					'tipAdjustmentX' => -15
					)
				),
			80 => array(
				'class' => 'ee-list-table-legend-container',
				'content' => $this->_stop_eight(),
				'options' => array(
					'tipLocation' => 'right'
					)
				),
			85 => array(
				'id' => 'view-event-archive-page',
				'content' => $this->_stop_archive_button(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -45,
					'tipAdjustmentX' => 5
					)
				)
			);
	}


	protected function _stop_one() {
		$content = '<h3>' . __('Event Overview', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This short tour of the event overview page will go over different areas of the screen to help you understand how to use Event Espresso.', 'event_espresso') . '</p>';
		return $content;
	}
	
	protected function _add_new_event_stop() {
		$content = '<p>' . __('Click here to add a new event.', 'event_espresso') . '</p>';
		return $content;
	}
	
	protected function _stop_two() {
		return '<p>You can click on any of these navigation tabs whenever you are on any admin page to visit different sections of that page.</p>';
	}

	protected function _stop_three() {
		return '<p>' . __('Quick filtering of events on this page.') . '</p>';
	}

	protected function _stop_four() {
		return '<p>' . __('Fields that will be searched with the value from the search are: Event Name, Event Description, Event Short Description', 'event_espresso') . '</p>';
	}

	protected function _stop_about_filters() {
		return '<p>' . __('Advanced filters for events in this list, using a combination of event status, month, and/or category. ', 'event_espresso') . '</p>';
	}

	protected function _stop_five() {
		return '<p>' . __('Start date for this event.', 'event_espresso') . '</p>';
	}

	protected function _stop_six() {
		return '<p>' . __('This column lists the earliest "on sale" value for the tickets attached to this event.', 'event_espresso') . '</p>';
	}


	protected function _stop_seven() {
		return '<p>' . __('The actions column lists the various "actions" you can do for each event listed here.', 'event_espresso') . '</p>';
	}

	protected function _stop_eight() {
		return '<p>' . __('This is the legend that describes the actions available in the Actions column.', 'event_espresso') . '</p>';
	}
	
	protected function _stop_archive_button() {
		return '<p>This button takes you to the event listings page on the front-end of your website.</p>';
	}
}