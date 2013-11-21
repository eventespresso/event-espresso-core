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
 * Templates_Help_Tour
 *
 * This is the help tour object for the Registration Overview page
 *
 *
 * @package		Templates_Help_Tour
 * @subpackage	includes/core/admin/general_settings/help_tours/Templates_Help_Tour.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Templates_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Templates Help Tour', 'event_espresso');
		$this->_slug = 'templates-settings-joyride';
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			20 => array(
				'id' => 'default_type',
				'content' => $this->_default_view_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				),
			30 => array(
				'id' => 'event_list_grid_size',
				'content' => $this->_event_list_grid_size_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				),
			40 => array(
				'id' => 'display_description_in_event_list',
				'content' => $this->_display_description_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				),
			50 => array(
				'id' => 'display_address_in_event_list',
				'content' => $this->_display_address_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				),
			60 => array(
				'id' => 'display_venue_details_in_event_list',
				'content' => $this->_display_venue_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				),
			70 => array(
				'id' => 'display_expired_events',
				'content' => $this->_display_expired_events_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				),
			80 => array(
				'id' => 'event_listings_url',
				'content' => $this->_event_listings_url_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				),
			90 => array(
				'id' => 'display_address_in_regform',
				'content' => $this->_display_address_in_reg_form_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				)
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Template Settings', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This section deals with the general front end settings.', 'event_espresso') . '</p>';
		return $content;
	}


	protected function _default_view_stop() {
		return '<p>' . __('Define how your basic event list will look', 'event_espresso') . '</p>';
	}


	protected function _event_list_grid_size_stop() {
		return '<p>' . __('If your list type is Grid View, these settings modify the size of the grids.', 'event_espresso') . '</p>';
	}


	protected function _display_description_stop() {
		return '<p>' . __('Change whether descriptions are shown on the event list, and how big they will be.', 'event_espresso') . '</p>';
	}

	protected function _display_address_stop() {
		return '<p>' . __('Change whether the venue address is displayed in the event list.', 'event_espresso') . '</p>';
	}


	protected function _display_venue_stop() {
		return '<p>' . __('Choose whether the venue information is displayed in the event list.', 'event_espresso') . '</p>';
	}

	protected function _display_expired_events_stop() {
		return '<p>' . __('Choose whether to show expired events or not on the default event list.', 'event_espresso') . '</p>';
	}
	
	protected function _event_listings_url_stop() {
		return '<p>' . __('This is the website address to your event listings page.', 'event_espresso') . '</p>';
	}

	protected function _display_address_in_reg_form_stop() {
		return '<p>' . __('Choose whether to display the venues address in the single registration page or not.', 'event_espresso') . '</p>';
	}

}