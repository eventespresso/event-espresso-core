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
 * @subpackage	includes/core/admin/transactions/help_tours/Templates_Help_Tour.class.php
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
				'id' => 'default_view',
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
				'id' => 'display_venue_in_event_list',
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
				'id' => 'display_address_in_regform',
				'content' => $this->_display_address_in_reg_form_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
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
		$content = '<h3>' . __('Welcome to the Transaction overview page!', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('An introduction ...', 'event_espresso') . '</p>';
		return $content;
	}


	protected function _default_view_stop() {
		return '<p>' . __('choose default view', 'event_espresso') . '</p>';
	}


	protected function _event_list_grid_size_stop() {
		return '<p>' . __('about the event list grid size', 'event_espresso') . '</p>';
	}


	protected function _display_description_stop() {
		return '<p>' . __('about the display description', 'event_espresso') . '</p>';
	}

	protected function _display_address_stop() {
		return '<p>' . __('about the display address', 'event_espresso') . '</p>';
	}


	protected function _display_venue_stop() {
		return '<p>' . __('about the display venue', 'event_espresso') . '</p>';
	}

	protected function _display_expired_events_stop() {
		return '<p>' . __('about the expired events', 'event_espresso') . '</p>';
	}

	protected function _display_address_in_reg_form_stop() {
		return '<p>' . __('about the display address in reg form option', 'event_espresso') . '</p>';
	}

	protected function _end() {
		return '<p>' . sprintf( __('That\'s it for the tour!  At any time you can restart this tour by clicking on this help dropdown and then clicking the "%s" Tour button.  All the best with your events!', 'event_espresso'), $this->_label ) . '</p>';
	}
}