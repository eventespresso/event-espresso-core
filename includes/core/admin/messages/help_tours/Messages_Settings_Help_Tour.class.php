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
 * Messages_Settings_Help_Tour
 *
 * This is the help tour object for the Registration Overview page
 *
 *
 * @package		Messages_Settings_Help_Tour
 * @subpackage	includes/core/admin/messages/help_tours/Messages_Settings_Help_Tour.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Messages_Settings_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Messages Settings Tour', 'event_espresso');
		$this->_slug = 'messages-settings-joyride';
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			20 => array(
				'class' => 'messenger_links',
				'content' => $this->_messenger_links_stop(),
				'options' => array(
					'tipLocation' => 'bottom',
					'tipAdjustmentY' => -20
					)
				),
			30 => array(
				'id' => 'espresso_email_settings',
				'content' => $this->_email_settings_metabox_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			40 => array(
				'id' => 'on-off-email',
				'content' => $this->_on_off_toggle_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => -15
					)
				),
			50 => array(
				'id' => 'active-message-types',
				'content' => $this->_active_mts_container_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			60 => array(
				'id' => 'inactive-message-types',
				'content' => $this->_inactive_mts_container_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => -15
					)
				),
			70 => array(
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
		$content = '<h3>' . __('Welcome to the Messages Settings page!', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('An introduction ...', 'event_espresso') . '</p>';
		return $content;
	}


	protected function _messenger_links_stop() {
		return '<p>' . __('this row contains the various messengers available in the system', 'event_espresso') . '</p>';
	}


	protected function _email_settings_metabox_stop() {
		return '<p>' . __('about the messenger settings metabox', 'event_espresso') . '</p>';
	}


	protected function _on_off_toggle_stop() {
		return '<p>' . __('about the messenger on/off toggle', 'event_espresso') . '</p>';
	}

	protected function _active_mts_container_stop() {
		return '<p>' . __('about the active message types container', 'event_espresso') . '</p>';
	}


	protected function _inactive_mts_container_stop() {
		return '<p>' . __('about the inactive message types container', 'event_espresso') . '</p>';
	}

	protected function _end() {
		return '<p>' . sprintf( __('That\'s it for the tour!  At any time you can restart this tour by clicking on this help dropdown and then clicking the "%s" Tour button.  All the best with your events!', 'event_espresso'), $this->_label ) . '</p>';
	}
}