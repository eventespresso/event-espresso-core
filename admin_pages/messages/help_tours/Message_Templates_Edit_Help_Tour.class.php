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
 * Message_Templates_Edit_Help_Tour
 *
 * This is the help tour object for the Registration Overview page
 *
 *
 * @package		Message_Templates_Edit_Help_Tour
 * @subpackage	includes/core/admin/messages/help_tours/Message_Templates_Edit_Help_Tour.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Message_Templates_Edit_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Message Template Editor Tour', 'event_espresso');
		$this->_slug = 'messages-templates-edit-joyride';
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			20 => array(
				'id' => 'submit-msg-context-switcher-sbmt',
				'content' => $this->_context_switcher_stop(),
				'options' => array(
					'tipLocation' => 'bottom',
					'tipAdjustmentY' => -30,
					'tipAdjustmentX' => -60
					)
				),
			30 => array(
				'class' => 'messages-preview-button"',
				'content' => $this->_preview_button_stop(),
				'options' => array(
					'tipLocation' => 'bottom',
					'tipAdjustmentY' => -30
					)
				),
			40 => array(
				'content' => $this->_template_area_stop(),
				'options' => array(
					'tipAdjustmentY' => -100,
					'tipAdjustmentX' => -60
					)
				),
			50 => array(
				'id' => 'mtp_valid_shortcodes',
				'content' => $this->_mtp_valid_shortcodes_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => -15
					)
				),
			60 => array(
				'id' => 'mtp_extra_actions',
				'content' => $this->_mtp_extra_actions_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => -15
					)
				),
			70 => array(
				'id' => 'espresso_espresso_messages_editor_overview',
				'content' => $this->_update_metabox_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => -15
					)
				)
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Message Template Editor', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This tour of the Message Template Editor page will go over different areas of the screen to help you understand what they are used for.', 'event_espresso') . '</p>';
		return $content;
	}


	protected function _context_switcher_stop() {
		return '<p>' . __('This dropdown allows you to swap between the different recipients templates that are available in this message type. Be sure to save changes befor switching to a different context.', 'event_espresso') . '</p>';
	}


	protected function _preview_button_stop() {
		return '<p>' . __('Clicking this button will show you a preview of how your message will look.', 'event_espresso') . '</p>';
	}


	protected function _template_area_stop() {
		return '<p>' . __('Depending on the messenger (recipient) and the message type, the main screen can show different boxes. Overall the screen allows you to confirm who the messages go to and who from, and the actual content of the message.', 'event_espresso') . '</p>';
	}

	protected function _mtp_valid_shortcodes_stop() {
		return '<p>' . __('These shortcodes allow you to quickly add data into your messages, without touching code. From emails, to ticket details, to your company logo, building messages with shortcodes is easy and fast.', 'event_espresso') . '</p>';
	}


	protected function _mtp_extra_actions_stop() {
		return '<p>' . __('Here you will find miscellaneous options to assist you, including a test send button and a reset button.', 'event_espresso') . '</p>';
	}


	protected function _update_metabox_stop() {
		return '<p>' . __('When done creating your message, click here to save it.', 'event_espresso') . '</p>';
	}

}