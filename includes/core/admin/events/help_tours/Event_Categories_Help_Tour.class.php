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

	public function __construct() {
		$this->_label = __('Event Categories Tour', 'event_espresso');
		$this->_slug = 'event-categories-joyride';
		parent::__construct();
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
				),
			70 => array(
				'id' => 'espresso_news_post_box',
				'content' => $this->_stop_five(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
			80 => array(
				'id' => 'espresso_links_post_box',
				'content' => $this->_stop_six(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
			90 => array(
				'id' => 'contextual-help-link',
				'content' => $this->_stop_seven(),
				'button_text' => __('End Tour', 'event_espresso'),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -20,
					'tipAdjustmentX' => 10
					)
				)
			
			);
	}


	protected function _stop_one() {
		$content = '<h3>' . __('Welcome to the Event Espresso Event Categories Help Tour!', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This brief tour will go over all the different areas of this screen to help you understand what they are for.', 'event_espresso') . '</p>';
		return $content;
	}


	protected function _stop_two() {
		return '<p>' . __('Fields that will be searched with the value from the search are: Category Name, Category Description', 'event_espresso') . '</p>';
	}

	protected function _stop_three() {
		return '<p>' . __('help about the shortcode column.', 'event_espresso') . '</p>';
	}

	protected function _stop_four() {
		return '<p>' . __('Help about the "Events" column and what the numbers mean here.', 'event_espresso') . '</p>';
	}


	protected function _stop_five() {
		return '<p>' . __('You\'ll find this "news" box on various pages throughout the Event Admin', 'event_espresso') . '</p>';
	}

	protected function _stop_six() {
		return '<p>' . __('These helpful plugin links...blah.blah..blah', 'event_espresso') . '</p>';
	}

	protected function _stop_seven() {
		return '<p>' . __('That\'s it for the tour through the event categories tab!  At any time you can restart this tour by clicking on this help dropdown and then clicking the Event Categories Tour button.  All the best with your events!', 'event_espresso') . '</p>';
	}
}