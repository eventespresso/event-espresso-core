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
		$this->_label = __('Msg Template Edit Tour', 'event_espresso');
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
					'tipAdjustmentY' => -20,
					'tipAdjustmentX' => -30
					)
				),
			30 => array(
				'class' => 'messages-preview-button"',
				'content' => $this->_preview_button_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
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
		$content = '<h3>' . __('Welcome to the edit message template view!', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('An introduction ...', 'event_espresso') . '</p>';
		return $content;
	}


	protected function _context_switcher_stop() {
		return '<p>' . __('about the context switcher', 'event_espresso') . '</p>';
	}


	protected function _preview_button_stop() {
		return '<p>' . __('about the preview button', 'event_espresso') . '</p>';
	}


	protected function _template_area_stop() {
		return '<p>' . __('about the template area (dynamic) - the layout of this area could change depending on the messenger/message_type combination', 'event_espresso') . '</p>';
	}

	protected function _mtp_valid_shortcodes_stop() {
		return '<p>' . __('what are valid shortcodes?', 'event_espresso') . '</p>';
	}


	protected function _mtp_extra_actions_stop() {
		return '<p>' . __('extra actions metabox (some messenger/message_type combinations will have extra actions that are available from this view.  There will always be a "Reset Templates" button but the other stuff is more dynamic.', 'event_espresso') . '</p>';
	}


	protected function _update_metabox_stop() {
		return '<p>' . __('everything related to updating the mtps goes here', 'event_espresso') . '</p>';
	}

}