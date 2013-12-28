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
 * Transactions_Overview_Help_Tour
 *
 * This is the help tour object for the Registration Overview page
 *
 *
 * @package		Transactions_Overview_Help_Tour
 * @subpackage	includes/core/admin/transactions/help_tours/Transactions_Overview_Help_Tour.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Transactions_Overview_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('TXN Overview Tour', 'event_espresso');
		$this->_slug = 'transaction-overview-joyride';
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			20 => array(
				'id' => 'event-espresso_page_espresso_transactions-search-input',
				'content' => $this->_search_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => -15
					)
				),
			25 => array(
				'id' => 'txn-filter-start-date',
				'content' => $this->_stop_about_filters(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -30
					)
				),
			30 => array(
				'id' => 'TXN_timestamp',
				'content' => $this->_txn_timestamp_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			40 => array(
				'id' => 'STS_ID',
				'content' => $this->_txn_status_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20,
					'tipAdjustmentX' => -10
					)
				),
			50 => array(
				'id' => 'TXN_total',
				'content' => $this->_txn_total_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20,
					'tipAdjustmentX' => 5
					)
				),
			60 => array(
				'id' => 'TXN_paid',
				'content' => $this->_txn_paid_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20,
					'tipAdjustmentX' => 5
					)
				),
			70 => array(
				'id' => 'ATT_fname',
				'content' => $this->_attendee_name_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			80 => array(
				'id' => 'ATT_email',
				'content' => $this->_att_email_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			90 => array(
				'id' => 'event_name',
				'content' => $this->_event_name_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -15
					)
				),
			100 => array(
				'id' => 'actions',
				'content' => $this->_actions_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -40,
					'tipAdjustmentX' => -10,
					)
				),
			110 => array(
				'class' => 'ee-list-table-legend-container',
				'content' => $this->_legend_stop(),
				'options' => array(
					'tipLocation' => 'right'
					)
				)
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Transaction Overview', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('The transactions page provides you with all the information about the tickets purchased for your events.', 'event_espresso') . '</p>';
		return $content;
	}

	

	protected function _search_stop() {
		return '<p>' . __('Fields that will be searched with the value from the search are: event name, event description, attendee name, attendee bio, attendee email, attendee address, registration final price, registration code, registration count, registration group size, ticket name, ticket description, payment method, payment gateway, transaction details, and transaction session data.', 'event_espresso') . '</p>';
	}


	protected function _stop_about_filters() {
		return '<p>' . __('Use these date fields to filter your results by purchase date.', 'event_espresso') . '</p>';
	}


	protected function _txn_timestamp_stop() {
		return '<p>' . __('This column lists the date the transaction was made.', 'event_espresso') . '</p>';
	}


	protected function _txn_status_stop() {
		return '<p>' . __('Here you will see the current status of the transaction, whether it is complete, pending or incomplete.', 'event_espresso') . '</p>';
	}

	protected function _txn_total_stop() {
		return '<p>' . __('This amount is for all the events and tickets purchased in the single transaction.', 'event_espresso') . '</p>';
	}
	
	protected function _txn_paid_stop() {
		return '<p>' . __('This column will show you how much has been paid. If the value matches the value in the Total column, then they have fully paid.', 'event_espresso') . '</p>';
	}


	protected function _attendee_name_stop() {
		return '<p>' . __('This is the name of the primary registrant.', 'event_espresso') . '</p>';
	}

	protected function _att_email_stop() {
		return '<p>' . __('The primary registrants email address.', 'event_espresso') . '</p>';
	}

	protected function _event_name_stop() {
		return '<p>' . __('The name of the event.', 'event_espresso') . '</p>';
	}

	protected function _actions_stop() {
		return '<p>' . __('These actions provide extra functionality such as seeing the customers invoice, or sending a payment reminder.', 'event_espresso') . '</p>';
	}

	protected function _legend_stop() {
		return '<p>' . __('This is the legend that describes the actions available in the Actions column.', 'event_espresso') . '</p>';
	}
}