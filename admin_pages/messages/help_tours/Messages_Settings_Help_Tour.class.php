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
		$this->_label = __('Msgs Settings Tour', 'event_espresso');
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
				)
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Messages Settings Overview', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This settings page controls the activation/deactivation of message types, as well as different settings for each type.', 'event_espresso') . '</p>';
		return $content;
	}


	protected function _messenger_links_stop() {
		return '<p>' . __('This row contains the various messengers available in the system', 'event_espresso') . '</p>';
	}


	protected function _email_settings_metabox_stop() {
		return '<p>' . __('View the different message types that are currently active.', 'event_espresso') . '</p>';
	}


	protected function _on_off_toggle_stop() {
		return '<p>' . __('This will turn ALL messages on or off for this message type.', 'event_espresso') . '</p>';
	}

	protected function _active_mts_container_stop() {
		return '<p>' . __('These are your active message types; click them to see a description and settings for each one.', 'event_espresso') . '</p>';
	}


	protected function _inactive_mts_container_stop() {
		return '<p>' . __('Drag message types here to de-activate them. Drag them from here to the active box to re-activate them.', 'event_espresso') . '</p>';
	}
}