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
 * Event_Categories_Help_Tour
 *
 * This is the help tour object for the decaf Event Categories tab
 *
 *
 * @package		Event_Categories_Help_Tour
 * @subpackage	includes/core/admin/Event_Categories_Help_Tour.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Event_Categories_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Event Categories Tour', 'event_espresso');
		$this->_slug = 'event-categories-joyride';
	}
    
    protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			20 => array(
				'id' => 'id',
				'content' => $this->_id_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => -20,
					'tipAdjustmentY' => -30
					)
				),
			30 => array(
				'id' => 'name',
				'content' => $this->_name_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => -5,
					'tipAdjustmentY' => -30
					)
				),
			40 => array(
				'id' => 'shortcode',
				'content' => $this->_shortcode_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 5,
					'tipAdjustmentY' => -30
					)
				),
			50 => array(
				'id' => 'count',
				'content' => $this->_count_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 5,
					'tipAdjustmentY' => -30
					)
				),
			60 => array(
				'class' => 'bulkactions',
				'content' => $this->_bulk_actions_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 25,
					'tipAdjustmentY' => -35
					)
				),
			70 => array(
				'id' => 'event-espresso_page_espresso_categories-search-input',
				'content' => $this->_search_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => -15
					)
				),
			80 => array(
				'id' => 'add-new-category',
				'content' => $this->_new_category_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 10
					)
				),
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Event Categories', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This tour of the Event Categories page will provide an overview of the different areas of the screen to help you understand what they are used for.', 'event_espresso') . '</p>';
		return $content;
	}
	
	protected function _id_stop() {
		return '<p>' . __('View the event category ID. Can be sorted by ascending or descending order.', 'event_espresso') . '</p>';
	}
	
	protected function _name_stop() {
		return '<p>' . __('View the name of each event category. Can be sorted by ascending or descending order.', 'event_espresso') . '</p>';
	}

	protected function _shortcode_stop() {
		return '<p>' . __('View the shortcode for an event. This shortcode can be added to a WordPress post or WordPress page. ', 'event_espresso') . '</p>';
	}

	protected function _count_stop() {
		return '<p>' . __('View the number of events that are associated with an event category.', 'event_espresso') . '</p>';
	}

	protected function _bulk_actions_stop() {
		return '<p>' . __('Perform bulk actions to multiple event categories.', 'event_espresso') . '</p>';
	}

	protected function _search_stop() {
		return '<p>' . __('Search through event categories. The following sources will be searched: Event Category Name, Event Category Description.', 'event_espresso') . '</p>';
	}
	
	protected function _new_category_stop() {
		return '<p>' . __('Click here to add a new event category.', 'event_espresso') . '</p>';
	}
}