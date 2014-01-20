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
				'id' => 'event',
				'content' => $this->event_column_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => -5,
					'tipAdjustmentY' => -30
					)
				),
			30 => array(
				'id' => 'message_type',
				'content' => $this->_message_type_column_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 20,
					'tipAdjustmentY' => -30
					)
				),
			40 => array(
				'id' => 'messenger',
				'content' => $this->_messenger_column_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 5,
					'tipAdjustmentY' => -30
					)
				),
			50 => array(
				'id' => 'description',
				'content' => $this->_description_column_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 5,
					'tipAdjustmentY' => -30
					)
				),
			60 => array(
				'class' => 'bulkactions',
				'content' => $this->_bulk_actions_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 25,
					'tipAdjustmentY' => -35
					)
				),
			70 => array(
				'id' => 'ee_messenger_filter_by',
				'content' => $this->_filters_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 25,
					'tipAdjustmentY' => -30
					)
				),
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Messages Overview', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This tour of the Messages Overview page will go over different areas of the screen to help you understand what they are used for.', 'event_espresso') . '</p>';
		return $content;
	}

	protected function event_column_stop() {
		return '<p>' . __('View if a message is associated with one event or multiple events. Can be sorted in ascending and descending order.', 'event_espresso') . '</p>';
	}

	protected function _message_type_column_stop() {
		return '<p>' . __('View the type of message. Can be sorted in ascending or descending order.', 'event_espresso') . '</p>';
	}

	protected function _messenger_column_stop() {
		return '<p>' . __('View who messages will be sent to. Can be sorted in ascending or descending order.', 'event_espresso') . '</p>';
	}
	
	protected function _description_column_stop() {
		return '<p>' . __('View the description for each message type.', 'event_espresso') . '</p>';
	}

	protected function _bulk_actions_stop() {
		return '<p>' . __('Perform bulk actions to multiple message types.', 'event_espresso') . '</p>';
	}

	protected function _filters_stop() {
		return '<p>' . __('You can filter by different notifications by making a selection below and clicking on the filter button. To reset your selection, just click on the reset filters button.', 'event_espresso') . '</p>';
	}
}