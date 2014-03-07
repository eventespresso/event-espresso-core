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
 * Transaction_Details_Help_Tour
 *
 * This is the help tour object for the Registration Overview page
 *
 *
 * @package		Transaction_Details_Help_Tour
 * @subpackage	includes/core/admin/registration/help_tours/Transaction_Details_Help_Tour.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Transaction_Details_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('View Transaction Tour', 'event_espresso');
		$this->_slug = 'transaction-details-joyride';
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			20 => array(
				'id' => 'txn-date-h2',
				'content' => $this->_txn_date_h2_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -40,
					'tipAdjustmentX' => 200
					)
				),
			30 => array(
				'id' => 'txn-status-h2',
				'content' => $this->_txn_status_h2_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -40,
					'tipAdjustmentX' => 200
					)
				),
			40 => array(
				/*'id' => 'txn-amount-due-h2',*/
				'content' => $this->_txn_amount_due_h2_stop(),
				/*'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -40,
					'tipAdjustmentX' => 200
					)*/
				),
			50 => array(
				'id' => 'edit-txn-details-mbox',
				'content' => $this->_txn_details_metabox_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -30,
					'tipAdjustmentX' => 60
					)
				),
			55 => array(
				'id' => 'display-additional-transaction-session-info',
				'content' => $this->_txn_session_info_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -35,
					'tipAdjustmentX' => 60
					)
				),
			60 => array(
				'id' => 'edit-txn-attendees-mbox',
				'content' => $this->_txn_attendees_metabox_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -35,
					'tipAdjustmentX' => 60
					)
				),
			70 => array(
				'id' => 'edit-txn-registrant-mbox',
				'content' => $this->_txn_primary_reg_metabox_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -20,
					'tipAdjustmentX' => -10,
					)
				),
			80 => array(
				'id' => 'edit-txn-billing-info-mbox',
				'content' => $this->_txn_billing_metabox_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -20,
					'tipAdjustmentX' => -10,
					)
				)
			);
	}


	protected function _start() {
		$content = '<h3>' . __('View Transaction', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This tour of the View Transaction page will go over different areas of the screen to help you understand what they are used for.', 'event_espresso') . '</p>';
		return $content;
	}

	protected function _txn_date_h2_stop() {
		return '<p>' . __('This is the date that the transaction occurred on.', 'event_espresso') . '</p>';
	}

	protected function _txn_status_h2_stop() {
		return '<p>' . __('View current status of the transaction. Available statuses are Complete, Failed, Incomplete, and Overpaid.', 'event_espresso') . '</p>';
	}

	protected function _txn_amount_due_h2_stop() {
		return '<p>' . __('View the amount due for a transaction (will not appear if the transaction has been paid in full).', 'event_espresso') . '</p>';
	}

	protected function _txn_details_metabox_stop() {
		return '<p>' . __('The transaction details area displays various information including Line Item ID, Event Name, Event Date, Ticket Option, Price, Quantity, Line Total, Sales Tax, and the Grand Total. You can also view details about any payments made towards this transaction.', 'event_espresso') . '</p>';
	}

	protected function _txn_session_info_stop() {
		return '<p>' . __('You can view additional information about the transaction by clicking on the link below. Examples of available information includes IP Address and User Agent.', 'event_espresso') . '</p>';
	}

	protected function _txn_attendees_metabox_stop() {
		return '<p>' . __('View information about registrants that are linked to this transaction.', 'event_espresso') . '</p>';
	}

	protected function _txn_primary_reg_metabox_stop() {
		return '<p>' . __('View contact details on the primary registrant who is linked to this transaction.', 'event_espresso') . '</p>';
	}

	protected function _txn_billing_metabox_stop() {
		return '<p>' . __('View billing information for this transaction.', 'event_espresso') . '</p>';
	}

	protected function _event_name_stop() {
		return '<p>' . __('event name', 'event_espresso') . '</p>';
	}

}