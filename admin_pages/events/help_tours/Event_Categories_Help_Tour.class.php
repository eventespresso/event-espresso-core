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
		$this->_label = __('Categories Tour', 'event_espresso');
		$this->_slug = 'event-categories-joyride';
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_stop_one(),
				),
			20 => array(
				'id' => 'toplevel_page_espresso_events-search-input',
				'content' => $this->_stop_two(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => -15
					)
				),
			30 => array(
				'id' => 'shortcode',
				'content' => $this->_stop_three(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -40
					)
				),
			40 => array(
				'id' => 'count',
				'content' => $this->_stop_four(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -40
					)
				)
			);
	}


	protected function _stop_one() {
		$content = '<h3>' . __('Event Categories', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This brief tour will go over all the different areas of this screen to help you understand what they are for.', 'event_espresso') . '</p>';
		return $content;
	}


	protected function _stop_two() {
		return '<p>' . __('Fields that will be searched with the value from the search are: Category Name, Category Description', 'event_espresso') . '</p>';
	}

	protected function _stop_three() {
		return '<p>' . __('The category shortcodes can be used to generate a list of events in a particular category. You can place these shortcodes in the HTML view of a page or post.', 'event_espresso') . '</p>';
	}

	protected function _stop_four() {
		return '<p>' . __('This is a count of the events currently assigned to this category. Clicking the number will take you to the list of events for this category.', 'event_espresso') . '</p>';
	}

}