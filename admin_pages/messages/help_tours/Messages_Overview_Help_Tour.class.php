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
 * Messages_Overview_Help_Tour
 *
 * This is the help tour object for the Registration Overview page
 *
 *
 * @package		Messages_Overview_Help_Tour
 * @subpackage	includes/core/admin/messages/help_tours/Messages_Overview_Help_Tour.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Messages_Overview_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Messages Overview Tour', 'event_espresso');
		$this->_slug = 'messages-overview-joyride';
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			20 => array(
				'id' => 'ee_messenger_filter_by',
				'content' => $this->_stop_about_filters(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -30
					)
				),
			30 => array(
				'id' => 'event',
				'content' => $this->event_column_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			40 => array(
				'id' => 'message_type',
				'content' => $this->_message_type_column_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			50 => array(
				'id' => 'messenger',
				'content' => $this->_messenger_column_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			60 => array(
				'id' => 'description',
				'content' => $this->_description_column_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				)
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Messages Overview', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('Messages are a new way of dealing with emails and other notifications to both yourself and your customers.', 'event_espresso') . '</p>';
		$content .= '<p>' . __('Please be sure to open the "Help" tab in the top right corer of this page to view the documentation for this page.', 'event_espresso') . '</p>';
		return $content;
	}


	protected function _stop_about_filters() {
		return '<p>' . __('These dropdowns will allow you to filter the different notifications.', 'event_espresso') . '</p>';
	}


	protected function event_column_stop() {
		return '<p>' . __('This column shows you if the message is specific to one or more events.', 'event_espresso') . '</p>';
	}


	protected function _message_type_column_stop() {
		return '<p>' . __('Here you can see what type of message it is. The types refer to things like payment emails, or registration emails.', 'event_espresso') . '</p>';
	}

	protected function _messenger_column_stop() {
		return '<p>' . __('Each message can be sent to multiple recipients, and this column shows which ones will receive the message.', 'event_espresso') . '</p>';
	}
	
	protected function _description_column_stop() {
		return '<p>' . __('A short description of each message type.', 'event_espresso') . '</p>';
	}
}