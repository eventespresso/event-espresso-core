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
class Venues_Add_Venue_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Venue Editor Tour', 'event_espresso');
		$this->_slug = 'venue-add-venue-joyride';
	}

	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_stop_one(),
				),
			20 => array(
				'id' => 'titlewrap',
				'content' => $this->_venue_title_stop(),
				'options' => array(
					'tipLocation' => 'bottom',
					'tipAdjustmentY' => -30,
					)
				),
			30 => array(
				'id' => 'wp-content-editor-tools',
				'content' => $this->_venue_editor_stop(),
				'options' => array(
					'tipLocation' => 'right',
					)
				),
			40 => array(
				'id' => 'tagsdiv-post_tag',
				'content' => $this->_venue_tags_stop(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
			50 => array(
				'id' => 'espresso_venue_categoriesdiv',
				'content' => $this->_venue_categories_stop(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
			60 => array(
				'id' => 'espresso_venue_address_options',
				'content' => $this->_venue_physical_location_stop(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
			70 => array(
				'id' => 'espresso_venue_gmap_options',
				'content' => $this->_venue_gmap_stop(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
			80 => array(
				'id' => 'espresso_venue_virtual_loc_options',
				'content' => $this->_venue_virtual_location_stop(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
			90 => array(
				'id' => 'postimagediv',
				'content' => $this->_stop_featured_image(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
			100 => array(
				'id' => 'submitpost',
				'content' => $this->_stop_publish_box(),
				'options' => array(
					'tipLocation' => 'left'
					)
				),
			
			);
	}


	protected function _stop_one() {
		$content = '<h3>' . __('Add Venue', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This tour of the Venue Editor page will provide an overview of the different areas of the screen to help you understand what they are used for.', 'event_espresso') . '</p>';
		return $content;
	}

	protected function _venue_title_stop() {
		return '<p>Enter the title for your venue in this field.</p>';
	}

	protected function _venue_editor_stop() {
		return '<p>' . __('The rich text editor can be used to add information about your venue. Images and links can also be added along with your text.', 'event_espresso') . '</p>';
	}
	
	protected function _venue_tags_stop() {
		return '<p>' . __('Quickly add tags to your venue.', 'event_espresso') . '</p>';
	}

	protected function _venue_categories_stop() {
		return '<p>' . __('Venues can also be categorized if you wish.', 'event_espresso') . '</p>';
	}

	protected function _venue_physical_location_stop() {
		return '<p>' . __('Add a physical address for your venue.', 'event_espresso') . '</p>';
	}

	protected function _venue_gmap_stop() {
		return '<p>' . __('Enable or disable a Google Map for your venue.', 'event_espresso') . '</p>';
	}

	protected function _venue_virtual_location_stop() {
		return '<p>' . __('Setup a virtual location for your venue.', 'event_espresso') . '</p>';
	}
	
	protected function _stop_featured_image() {
		return '<p>' . __('Set a feature image for your venue here.', 'event_espresso') . '</p>';
	}

	protected function _stop_publish_box() {
		return '<p>' . __('Easily control the status of your venue. The main options are Published, Pending Review, and Draft.', 'event_espresso') . '</p>';
	}
	
}