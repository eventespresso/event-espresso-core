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
 * Registration_Reports_Help_Tour
 *
 * This is the help tour object for the Registration Reports page
 *
 *
 * @package		Registration_Reports_Help_Tour
 * @subpackage	includes/core/admin/registration/help_tours/Registration_Reports_Help_Tour.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Registration_Reports_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Registration Reports Tour', 'event_espresso');
		$this->_slug = 'registration-reports-joyride';
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			20 => array(
				'id' => 'reg-admin-registrations-per-day-report-dv',
				'content' => $this->_reg_per_day_report_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -40
					)
				),
			30 => array(
				'id' => 'reg-admin-registrations-per-event-report-dv',
				'content' => $this->_reg_per_event_report_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -40
					)
				)
			);
	}

	protected function _start() {
		$content = '<h3>' . __('Registration Reports', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This tour of the Registration Reports page will go over different areas of the screen to help you understand what they are used for.', 'event_espresso') . '</p>';
		return $content;
	}

	protected function _reg_per_day_report_stop() {
		return '<p>' . __('This graph shows registrations for each day.', 'event_espresso') . '</p>';
	}

	protected function _reg_per_event_report_stop() {
		return '<p>' . __('This graph shows registrations for each event.', 'event_espresso') . '</p>';
	}

}