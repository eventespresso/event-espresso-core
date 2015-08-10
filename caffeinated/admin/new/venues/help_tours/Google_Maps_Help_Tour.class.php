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
 * Google_Maps_Help_Tour
 *
 * This is the help tour object for the Registration Overview page
 *
 *
 * @package		Google_Maps_Help_Tour
 * @subpackage	includes/core/admin/general_settings/help_tours/Google_Maps_Help_Tour.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Google_Maps_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Google Maps Tour', 'event_espresso');
		$this->_slug = 'google-maps-settings-joyride';
	}

	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			20 => array(
				'id' => 'use_google_maps',
				'content' => $this->_use_google_maps_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				),
			30 => array(
				'id' => 'event_details_map_width',
				'content' => $this->_reg_page_map_settings_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -75,
					'tipAdjustmentX' => 20
					)
				),
			40 => array(
				'id' => 'event_list_map_width',
				'content' => $this->_event_list_map_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -80,
					'tipAdjustmentX' => 20
					)
				)
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Google Maps Settings', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This tour of the Google Maps page will go over different areas of the screen to help you understand what they are used for.', 'event_espresso') . '</p>';
		return $content;
	}

	protected function _use_google_maps_stop() {
		return '<p>' . __('Turn Google maps on or off site wide for Event Espresso.', 'event_espresso') . '</p>';
	}

	protected function _reg_page_map_settings_stop() {
		return '<p>' . __('These settings affect the single registration page maps only.', 'event_espresso') . '</p>';
	}

	protected function _event_list_map_stop() {
		return '<p>' . __('These setting affect the event list page maps.', 'event_espresso') . '</p>';
	}

}