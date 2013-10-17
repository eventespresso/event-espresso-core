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
 * Venue_Overview_Help_Tour
 *
 * This is the help tour object for the Venue Overview page
 *
 *
 * @package		Venue_Overview_Help_Tour
 * @subpackage	caffeinated/admin/new/pricing/help_tours/Venue_Overview_Help_Tour.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Venue_Overview_Help_Tour extends EE_Help_Tour {

	public function __construct() {
		$this->_label = __('Venue Overview Tour', 'event_espresso');
		$this->_slug = 'venue-overview-joyride';
		parent::__construct();
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			20 => array(
				'id' => 'event-espresso_page_espresso_venues-search-input',
				'content' => $this->_search_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => -15
					)
				),
			30 => array(
				'id' => 'shortcode',
				'content' => $this->_shortcode_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -40
					)
				),
			40 => array(
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
		$content = '<h3>' . __('Welcome to the Venue Overview Page!', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('An introduction to the Venue Admin.', 'event_espresso') . '</p>';
		return $content;
	}

	

	protected function _search_stop() {
		return '<p>' . __('Fields that will be searched with the value from the search are: Venue Name, Venue Description, Venue Short Description, Venue address, Venue city, Venue zip, Venue phone, Venue url, Venue virtual phone, Venue google map link, Event Name, Event description, Event Phone, Event external url', 'event_espresso') . '</p>';
	}


	protected function _shortcode_stop() {
		return '<p>' . __('about the Venue Shortcodes column', 'event_espresso') . '</p>';
	}


	protected function _end() {
		return '<p>' . __('That\'s it for the tour through the Venue Overview!  At any time you can restart this tour by clicking on this help dropdown and then clicking the Venue Overview Tour button.  All the best with your events!', 'event_espresso') . '</p>';
	}
}