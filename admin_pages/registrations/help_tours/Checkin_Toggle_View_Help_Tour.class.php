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
 * Checkin_Toggle_View_Help_Tour
 *
 * This is the help tour object for the Check-in status toggle page
 *
 *
 * @package		Checkin_Toggle_View_Help_Tour
 * @subpackage	includes/core/admin/registration/help_tours/Checkin_Toggle_View_Help_Tour.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Checkin_Toggle_View_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Check-in List Tour', 'event_espresso');
		$this->_slug = 'attendee-checkin-records-joyride';
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			20 => array(
				'id' => 'checkin-attendee-name',
				'content' => $this->_checkin_attendee_name_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			30 => array(
				'id' => 'checkin-dtt',
				'content' => $this->_checkin_dtt_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			40 => array(
				'id' => 'checkin-event-name',
				'content' => $this->_checkin_event_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			50 => array(
				'id' => 'CHK_in',
				'content' => $this->_checkin_column_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			60 => array(
				'id' => 'CHK_timestamp',
				'content' => $this->_checkin_timestamp_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				)
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Welcome to the Attendee Check-in Records page!', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('An introduction...', 'event_espresso') . '</p>';
		return $content;
	}


	protected function _checkin_attendee_name_stop() {
		return '<p>' . __('showing results for this attendee...', 'event_espresso') . '</p>';
	}

	protected function _checkin_dtt_stop() {
		return '<p>' . __('showing results for this datetime on...', 'event_espresso') . '</p>';
	}

	protected function _checkin_event_stop() {
		return '<p>' . __('....this event.', 'event_espresso') . '</p>';
	}


	protected function _checkin_column_stop() {
		return '<p>' . __('what status was toggled for this record', 'event_espresso') . '</p>';
	}

	protected function _checkin_timestamp_stop() {
		return '<p>' . __('the timestamp of this activity', 'event_espresso') . '</p>';
	}
}