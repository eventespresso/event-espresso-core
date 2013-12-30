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
class Venues_Categories_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Venue Categories Tour', 'event_espresso');
		$this->_slug = 'venue-overview-joyride';
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			15 => array(
				'id' => 'add-new-venue',
				'content' => $this->_new_venue_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 10
					)
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
				'id' => 'id',
				'content' => $this->_id_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20,
					'tipAdjustmentX' => -15
					)
				),
			40 => array(
				'id' => 'name',
				'content' => $this->_name_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20,
					'tipAdjustmentX' => -15
					)
				),
			50 => array(
				'id' => 'address',
				'content' => $this->_address_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20,
					'tipAdjustmentX' => -15
					)
				),
			60 => array(
				'id' => 'city',
				'content' => $this->_city_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20,
					'tipAdjustmentX' => -15
					)
				),
			70 => array(
				'id' => 'capacity',
				'content' => $this->_capacity_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20,
					'tipAdjustmentX' => -15
					)
				),
			80 => array(
				'id' => 'shortcode',
				'content' => $this->_shortcode_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -40
					)
				),
			90 => array(
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
		$content = '<h3>' . __('Venue Categories', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This tour of the venue categories page will provide an overview of the different areas of the screen to help you understand what they are used for.', 'event_espresso') . '</p>';
		return $content;
	}

	protected function _search_stop() {
		return '<p>' . __('Fields that will be searched with the value from the search are: Venue Name, Venue Description, Venue Short Description, Venue address, Venue city, Venue zip, Venue phone, Venue url, Venue virtual phone, Venue google map link, Event Name, Event description, Event Phone, Event external url', 'event_espresso') . '</p>';
	}
	
	protected function _new_venue_stop() {
		return '<p>' . __('Click here to add a new venue.', 'event_espresso') . '</p>';
	}
	
	protected function _id_stop() {
		return '<p>' . __('This column shows the ID of each venue. Can be used in your custom templates and shortcodes to output detail about a single venue.', 'event_espresso') . '</p>';
	}
	
	protected function _name_stop() {
		return '<p>' . __('This column shows the name of each venue.', 'event_espresso') . '</p>';
	}
	
	protected function _address_stop() {
		return '<p>' . __('This column shows the address of each venue.', 'event_espresso') . '</p>';
	}
	
	protected function _city_stop() {
		return '<p>' . __('This column shows the city of each venue.', 'event_espresso') . '</p>';
	}
	
	protected function _capacity_stop() {
		return '<p>' . __('This column shows the capacity of each venue.', 'event_espresso') . '</p>';
	}

	protected function _shortcode_stop() {
		return '<p>' . __('This column shows the specific venue shortcode should you need to add it to an event, post or page.', 'event_espresso') . '</p>';
	}

	protected function _end() {
		return '<p>' . __('That\'s it for the tour through the Venue Overview!  At any time you can restart this tour by clicking on this help dropdown and then clicking the Venue Overview Tour button.  All the best with your events!', 'event_espresso') . '</p>';
	}
}