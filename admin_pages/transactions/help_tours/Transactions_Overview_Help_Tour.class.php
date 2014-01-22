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
		$this->_label = __('Transactions Overview Tour', 'event_espresso');
		$this->_slug = 'transaction-overview-joyride';
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			20 => array(
				'id' => 'TXN_ID',
				'content' => $this->_txn_id_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => -20,
					'tipAdjustmentY' => -30
					)
				),
			30 => array(
				'id' => 'TXN_timestamp',
				'content' => $this->_txn_timestamp_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 25,
					'tipAdjustmentY' => -30
					)
				),
			50 => array(
				'id' => 'TXN_total',
				'content' => $this->_txn_total_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 5,
					'tipAdjustmentY' => -30
					)
				),
			60 => array(
				'id' => 'TXN_paid',
				'content' => $this->_txn_paid_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 5,
					'tipAdjustmentY' => -30
					)
				),
			70 => array(
				'id' => 'ATT_fname',
				'content' => $this->_attendee_name_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 20,
					'tipAdjustmentY' => -30
					)
				),
			80 => array(
				'id' => 'ATT_email',
				'content' => $this->_att_email_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 15,
					'tipAdjustmentY' => -30
					)
				),
			90 => array(
				'id' => 'event_name',
				'content' => $this->_event_name_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 0,
					'tipAdjustmentY' => -30
					)
				),
			100 => array(
				'id' => 'actions',
				'content' => $this->_actions_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentX' => -5,
					'tipAdjustmentY' => -50
					)
				),
			110 => array(
				'class' => 'ee-list-table-legend-container',
				'content' => $this->_legend_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentX' => 15,
					'tipAdjustmentY' => -40
					)
				),
			120 => array(
				'id' => 'txn-filter-start-date',
				'content' => $this->_stop_about_filters(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 105,
					'tipAdjustmentY' => -45
					)
				),
			130 => array(
				'id' => 'event-espresso_page_espresso_transactions-search-input',
				'content' => $this->_search_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => -15
					)
				),
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Transactions Overview', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This tour of the Transactions Overview page will go over different areas of the screen to help you understand what they are used for.', 'event_espresso') . '</p>';
		return $content;
	}

	protected function _txn_id_stop() {
		return '<p>' . __('View transaction ID. Can be sorted in ascending or descending order.', 'event_espresso') . '</p>';
	}

	protected function _txn_timestamp_stop() {
		return '<p>' . __('View transaction date. Can be sorted in ascending or descending order.', 'event_espresso') . '</p>';
	}

	protected function _txn_total_stop() {
		return '<p>' . __('View total for transaction.', 'event_espresso') . '</p>';
	}
	
	protected function _txn_paid_stop() {
		return '<p>' . __('View amount paid for transaction.', 'event_espresso') . '</p>';
	}

	protected function _attendee_name_stop() {
		return '<p>' . __('View name for the primary registrant. Can be sorted in ascending or descending order.', 'event_espresso') . '</p>';
	}

	protected function _att_email_stop() {
		return '<p>' . __('View email address for primary registrant. Can be sorted in ascending or descending order.', 'event_espresso') . '</p>';
	}

	protected function _event_name_stop() {
		return '<p>' . __('View name of event. Can be sorted in ascending or descending order.', 'event_espresso') . '</p>';
	}

	protected function _actions_stop() {
		return '<p>' . __('Perform an action to a transaction. See legend in bottom left corner.', 'event_espresso') . '</p>';
	}

	protected function _legend_stop() {
		return '<p>' . __('This legend that describes the actions available in the actions column. Also shows available statuses for a transaction.', 'event_espresso') . '</p>';
	}

	protected function _stop_about_filters() {
		return '<p>' . __('Filter transactions by date by selecting two dates and clicking on the filter button. You can clear your current date selection by clicking on the reset filters button.', 'event_espresso') . '</p>';
	}

	protected function _search_stop() {
		return '<p>' . __('Search through transactions. The following sources will be searched: Event Name, Event Description, First Name, Last Name, Biography, Email Address, Address, Comments, Notes, Registration Final Price, Registration Code, Registration Group Size, Ticket Name, Ticket Description, Payment Method, Payment Gateway, Transaction Details, and Transaction Session.', 'event_espresso') . '</p>';
	}

}