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
		$content = '<h3>' . __('Welcome to the Messages overview page!', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('An introduction ...', 'event_espresso') . '</p>';
		return $content;
	}


	protected function _stop_about_filters() {
		return '<p>' . __('You can filter the message templates in this list by blah blah blah', 'event_espresso') . '</p>';
	}


	protected function event_column_stop() {
		return '<p>' . __('about the column', 'event_espresso') . '</p>';
	}


	protected function _message_type_column_stop() {
		return '<p>' . __('about the column', 'event_espresso') . '</p>';
	}

	protected function _messenger_column_stop() {
		return '<p>' . __('about the column', 'event_espresso') . '</p>';
	}

	protected function _end() {
		return '<p>' . sprintf( __('That\'s it for the tour!  At any time you can restart this tour by clicking on this help dropdown and then clicking the "%s" Tour button.  All the best with your events!', 'event_espresso'), $this->_label ) . '</p>';
	}
}