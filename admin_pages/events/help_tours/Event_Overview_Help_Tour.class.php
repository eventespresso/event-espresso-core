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
				'content' => $this->_start(),
				),
            20 => array(
				'id' => 'id',
				'content' => $this->_event_id_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => -20,
					'tipAdjustmentY' => -30
					)
				),
			30 => array(
				'id' => 'name',
				'content' => $this->_event_name_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => -5,
					'tipAdjustmentY' => -30
					)
				),
			40 => array(
				'id' => 'venue',
				'content' => $this->_event_venue_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => -5,
					'tipAdjustmentY' => -30
					)
				),
			50 => array(
				'id' => 'start_date_time',
				'content' => $this->_event_start_date_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 5,
					'tipAdjustmentY' => -30
					)
				),
			60 => array(
				'id' => 'reg_begins',
				'content' => $this->_event_onsale_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => -5,
					'tipAdjustmentY' => -30
					)
				),
            70 => array(
				'id' => 'attendees',
				'content' => $this->_event_registrations_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentX' => -5,
					'tipAdjustmentY' => -50
					)
				),
			80 => array(
				'id' => 'actions',
				'content' => $this->_actions_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentX' => 0,
					'tipAdjustmentY' => -50
					)
				),
			90 => array(
				'class' => 'ee-list-table-legend-container',
				'content' => $this->_legend_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 15,
					'tipAdjustmentY' => -30
					)
				),
			100 => array(
				'id' => 'view-event-archive-page',
				'content' => $this->_stop_archive_button(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 10
					)
				),
            110 => array(
				'class' => 'subsubsub',
				'content' => $this->_views_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				),
			120 => array(
				'class' => 'bulkactions',
				'content' => $this->_bulkactions_stop(),
				'options' => array(
					'tipLocation' => 'bottom',
					'tipAdjustmentY' => -30,
					'tipAdjustmentX' => 15
					)
				),
            130 => array(
				'id' => 'EVT_CAT',
				'content' => $this->_stop_about_filters(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -40,
					'tipAdjustmentX' => -5
					)
				),
			140 => array(
				'id' => 'toplevel_page_espresso_events-search-input',
				'content' => $this->_search_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => -15
					)
				),
            150 => array(
				'id' => 'add-new-event',
				'content' => $this->_add_new_event_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 20
					)
				),
			);
	}
    
    protected function _start() {
		$content = '<h3>' . __('Events Overview', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This tour of the Events Overview page will go over different areas of the screen to help you understand what they are used for.', 'event_espresso') . '</p>';
		return $content;
	}

    
	protected function _event_id_stop() {
		return '<p>' . __('View an ID for an event. Can be sorted in ascending or descending order.', 'event_espresso') . '</p>';
	}
    
	protected function _event_name_stop() {
		return '<p>' . __('View the name (title) of an event. Can be sorted in ascending or descending order.', 'event_espresso') . '</p>';
	}
    
	protected function _event_venue_stop() {
		return '<p>' . __('View the venue for an event. Can be sorted in ascending or descending order.', 'event_espresso') . '</p>';
	}
    
	protected function _event_start_date_stop() {
		return '<p>' . __('View the date and time that an event begins on. Can be sorted in ascending or descending order.', 'event_espresso') . '</p>';
	}
    
    protected function _event_onsale_stop() {
		return '<p>' . __('View the datetime that the first ticket for an event is available for purchase. Can be sorted in ascending or descending order.', 'event_espresso') . '</p>';
	}
    
	protected function _event_registrations_stop() {
		return '<p>' . __('View the number of approved registrations for an event.', 'event_espresso') . '</p>';
	}
    
    protected function _actions_stop() {
		return '<p>' . __('Perform an action to an event. See legend in bottom left corner.', 'event_espresso') . '</p>';
	}
    
	protected function _legend_stop() {
		return '<p>' . __('This is the legend that describes the actions available in the actions column. Also shows the statuses that are available for an event.', 'event_espresso') . '</p>';
	}
    
	protected function _stop_archive_button() {
		return '<p>This button takes you to the event listings page on the front-end of your website.</p>';
	}
    
	protected function _views_stop() {
		return '<p>' . __('You can select different views by draft, time period, or look at events which have been moved to the trash.') . '</p>';
	}
    
	protected function _bulkactions_stop() {
		return '<p>' . __('Perform a bulk action to multiple events.', 'event_espresso') . '</p>';
	}
    
	protected function _stop_about_filters() {
		return '<p>' . __('Events can be filtered by status, date, or category.', 'event_espresso') . '</p>';
	}
	
	protected function _search_stop() {
		return '<p>' . __('Search through events. The following sources will be searched: Event Name, Event Description, and Event Short Description.', 'event_espresso') . '</p>';
	}
    
    protected function _add_new_event_stop() {
		return '<p>' . __('Click this button to add a new event.', 'event_espresso') . '</p>';
	}

}