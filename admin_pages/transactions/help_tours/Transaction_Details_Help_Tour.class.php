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
		$this->_label = __('TXN Details Tour', 'event_espresso');
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
					'tipAdjustmentY' => -30,
					'tipAdjustmentX' => 30
					)
				),
			30 => array(
				'id' => 'txn-status-h2',
				'content' => $this->_txn_status_h2_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -30,
					'tipAdjustmentX' => 30
					)
				),
			40 => array(
				'id' => 'txn-
				-due-h2',
				'content' => $this->_txn_amount_due_h2_stop(),
				'options' => array(
					'tipAdjustmentY' => -30,
					'tipAdjustmentX' => 30
					)
				),
			50 => array(
				'id' => 'edit-txn-details-mbox',
				'content' => $this->_txn_details_metabox_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			60 => array(
				'id' => 'edit-txn-attendees-mbox',
				'content' => $this->_txn_attendees_metabox_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20,
					'tipAdjustmentX' => -15
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
		$content = '<h3>' . __('Welcome to the Transaction Details page!', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('An introduction ...', 'event_espresso') . '</p>';
		return $content;
	}


	protected function _txn_status_h2_stop() {
		return '<p>' . __('about the column', 'event_espresso') . '</p>';
	}

	protected function _txn_date_h2_stop() {
		return '<p>' . __('about the column', 'event_espresso') . '</p>';
	}


	protected function _txn_amount_due_h2_stop() {
		return '<p>' . __('about the column', 'event_espresso') . '</p>';
	}

	protected function _txn_attendees_metabox_stop() {
		return '<p>' . __('about the column', 'event_espresso') . '</p>';
	}


	protected function _txn_primary_reg_metabox_stop() {
		return '<p>' . __('about the column', 'event_espresso') . '</p>';
	}

	protected function _txn_billing_metabox_stop() {
		return '<p>' . __('about the column', 'event_espresso') . '</p>';
	}

	protected function _event_name_stop() {
		return '<p>' . __('about the column', 'event_espresso') . '</p>';
	}

	protected function _txn_details_metabox_stop() {
		return '<p>' . __('about the column', 'event_espresso') . '</p>';
	}
}