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
 * Event_Default_Settings_Help_Tour
 *
 * This is the help tour object for the decaf Event Categories tab
 *
 *
 * @package		Event_Default_Settings_Help_Tour
 * @subpackage	caffeinated/admin/extend/events/help_tours/Event_Default_Settings_Help_Tour.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Event_Default_Settings_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Default Settings Tour', 'event_espresso');
		$this->_slug = 'event-default-settings-caf-joyride';
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_stop_one(),
				),
			20 => array(
				'id' => 'default_reg_status',
				'content' => $this->_stop_two(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				),
			30 => array(
				'id' => 'pending_counts_reg_limit',
				'content' => $this->_stop_three(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				),
			35 => array(
				'id' => 'use_attendee_pre_approval',
				'content' => $this->_pending_approval_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 15
					)
				),
			40 => array(
				'id' => 'contextual-help-link',
				'content' => $this->_stop_four(),
				'button_text' => __('End Tour', 'event_espresso'),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -20,
					'tipAdjustmentX' => 10
					)
				)
			
			);
	}


	protected function _stop_one() {
		$content = '<h3>' . __('Welcome to the Event Espresso Event Default Settings Help Tour!', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This brief tour will go over all the different areas of this screen to help you understand what they are for.', 'event_espresso') . '</p>';
		return $content;
	}


	protected function _stop_two() {
		return '<p>' . __('Default registration status info', 'event_espresso') . '</p>';
	}

	protected function _stop_three() {
		return '<p>' . __('Pending Registrations count etc info blah blah blah', 'event_espresso') . '</p>';
	}

	protected function _pending_approval_stop() {
		return '<p>' . __('What the heck is pending approval?', 'event_espresso') . '</p>';
	}

	protected function _stop_four() {
		return '<p>' . __('That\'s it for the tour through the event categories tab!  At any time you can restart this tour by clicking on this help dropdown and then clicking the Event Categories Tour button.  All the best with your events!', 'event_espresso') . '</p>';
	}
}