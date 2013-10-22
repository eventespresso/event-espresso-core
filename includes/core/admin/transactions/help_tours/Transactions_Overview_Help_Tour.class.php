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
 * @subpackage	includes/core/admin/registration/help_tours/Transactions_Overview_Help_Tour.class.php
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
					'tipAdjustmentY' => -20
					)
				),
			50 => array(
				'id' => 'TXN_total',
				'content' => $this->_txn_total_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			60 => array(
				'id' => 'TXN_paid',
				'content' => $this->_txn_paid_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20,
					'tipAdjustmentX' => -15
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
					'tipAdjustmentY' => -20
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
				),
			120 => array(
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
		$content = '<h3>' . __('Welcome to the Transaction overview page!', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('An introduction ...', 'event_espresso') . '</p>';
		return $content;
	}

	

	protected function _search_stop() {
		return '<p>' . __('Fields that will be searched with the value from the search are: event name, event description, attendee name, attendee bio, attendee email, attendee address, attendee comments, attendee notes, registration final price, registration code, registration count, registration group size, ticket name, ticket description, payment method, payment gateway, transaction details, and transaction session data.', 'event_espresso') . '</p>';
	}


	protected function _stop_about_filters() {
		return '<p>' . __('You can filter the transactions in this list by blah blah blah', 'event_espresso') . '</p>';
	}


	protected function _txn_timestamp_stop() {
		return '<p>' . __('about the column', 'event_espresso') . '</p>';
	}


	protected function _txn_status_stop() {
		return '<p>' . __('about the column', 'event_espresso') . '</p>';
	}

	protected function _txn_paid_stop() {
		return '<p>' . __('about the column', 'event_espresso') . '</p>';
	}


	protected function _attendee_name_stop() {
		return '<p>' . __('about the column', 'event_espresso') . '</p>';
	}

	protected function _att_email_stop() {
		return '<p>' . __('about the column', 'event_espresso') . '</p>';
	}

	protected function _event_name_stop() {
		return '<p>' . __('about the column', 'event_espresso') . '</p>';
	}

	protected function _txn_total_stop() {
		return '<p>' . __('about the column', 'event_espresso') . '</p>';
	}

	protected function _actions_stop() {
		return '<p>' . __('about the actions column', 'event_espresso') . '</p>';
	}

	protected function _legend_stop() {
		return '<p>' . __('This is the legend that describes the actions available in the Actions column.', 'event_espresso') . '</p>';
	}

	protected function _end() {
		return '<p>' . sprintf( __('That\'s it for the tour!  At any time you can restart this tour by clicking on this help dropdown and then clicking the "%s" Tour button.  All the best with your events!', 'event_espresso'), $this->_label ) . '</p>';
	}
}