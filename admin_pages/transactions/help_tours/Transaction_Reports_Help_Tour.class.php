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
 * Transaction_Reports_Help_Tour
 *
 * This is the help tour object for the Registration Reports page
 *
 *
 * @package		Transaction_Reports_Help_Tour
 * @subpackage	includes/core/admin/registration/help_tours/Transaction_Reports_Help_Tour.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Transaction_Reports_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Transaction Reports Tour', 'event_espresso');
		$this->_slug = 'transaction-reports-joyride';
	}

	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			20 => array(
				'id' => 'txn-admin-revenue-per-day-report-dv',
				'content' => $this->_txn_per_day_report(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -40
					)
				),
			30 => array(
				'id' => 'txn-admin-revenue-per-event-report-dv',
				'content' => $this->_txn_per_event_report(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -40
					)
				)
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Transaction Reports', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This tour of the Transaction Reports page will go over different areas of the screen to help you understand what they are used for.', 'event_espresso') . '</p>';
		return $content;
	}

	protected function _txn_per_day_report() {
		return '<p>' . __('This graph shows revenue for each day.', 'event_espresso') . '</p>';
	}

	protected function _txn_per_event_report() {
		return '<p>' . __('This graph shows revenue for each event.', 'event_espresso') . '</p>';
	}
}