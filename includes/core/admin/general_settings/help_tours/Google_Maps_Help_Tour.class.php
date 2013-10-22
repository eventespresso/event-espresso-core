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
					'tipAdjustmentY' => -30,
					'tipAdjustmentX' => 20
					)
				),
			40 => array(
				'id' => 'event_list_map_width',
				'content' => $this->_event_list_map_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -30,
					'tipAdjustmentX' => 20
					)
				),
			50 => array(
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
		$content = '<h3>' . __('Welcome to the Google Maps Settings page!', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('An introduction ...', 'event_espresso') . '</p>';
		return $content;
	}

	

	protected function _use_google_maps_stop() {
		return '<p>' . __('about setting', 'event_espresso') . '</p>';
	}


	protected function _reg_page_map_settings_stop() {
		return '<p>' . __('about setting', 'event_espresso') . '</p>';
	}


	protected function _event_list_map_stop() {
		return '<p>' . __('about setting', 'event_espresso') . '</p>';
	}



	protected function _end() {
		return '<p>' . sprintf( __('That\'s it for the tour!  At any time you can restart this tour by clicking on this help dropdown and then clicking the "%s" Tour button.  All the best with your events!', 'event_espresso'), $this->_label ) . '</p>';
	}
}