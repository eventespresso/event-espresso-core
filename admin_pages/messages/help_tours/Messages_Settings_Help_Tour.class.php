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
					'tipAdjustmentX' => -5,
					'tipAdjustmentY' => -25
					)
				),
			30 => array(
				'id' => 'espresso_email_settings',
				'content' => $this->_email_settings_metabox_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 20,
					'tipAdjustmentY' => -30
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
					'tipAdjustmentY' => -30
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
		$content = '<h3>' . __('Messages Settings', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This tour of the Messages Settings page will go over different areas of the screen to help you understand what they are used for.', 'event_espresso') . '</p>';
		return $content;
	}

	protected function _messenger_links_stop() {
		return '<p>' . __('Available messengers are shown above.', 'event_espresso') . '</p>';
	}

	protected function _email_settings_metabox_stop() {
		return '<p>' . __('View the different message types that are currently active.', 'event_espresso') . '</p>';
	}

	protected function _on_off_toggle_stop() {
		return '<p>' . __('This toggle will turn all messages on or off for this message type.', 'event_espresso') . '</p>';
	}

	protected function _active_mts_container_stop() {
		return '<p>' . __('These are your active message types. Click them to see a description and settings for each one.', 'event_espresso') . '</p>';
	}

	protected function _inactive_mts_container_stop() {
		return '<p>' . __('Drag message types here to deactivate them. Drag them from here to the active box to reactivate them.', 'event_espresso') . '</p>';
	}
}