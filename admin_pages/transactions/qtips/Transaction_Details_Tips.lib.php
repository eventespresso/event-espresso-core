<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('NO direct script access allowed'); }

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
 * Transaction_Details_Tips	
 *
 * Qtip config for the event editor.
 *
 * @package		Event Espresso
 * @subpackage	/admin_pages/transactions/qtips/Transaction_Details_Tips.lib.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Transaction_Details_Tips extends EE_Qtip_Config {


	protected function _set_tips_array() {
		$this->_qtipsa = array(
			0 => array(
				'content_id' => 'payment-status-' . EEM_Payment::status_id_approved,
				'target' => '.pymt-status-' . EEM_Payment::status_id_approved,
				'content' => $this->_payment_status_legend(EEM_Payment::status_id_approved),
				'options' => array(
					'position' => array(
						'target' => 'mouse'
						)
					)
				),
			1 => array(
				'content_id' => 'payment-status-' . EEM_Payment::status_id_pending,
				'target' => '.pymt-status-' . EEM_Payment::status_id_pending,
				'content' => $this->_payment_status_legend(EEM_Payment::status_id_pending),
				'options' => array(
					'position' => array(
						'target' => 'mouse'
						)
					)
				),
			2 => array(
				'content_id' => 'payment-status-' . EEM_Payment::status_id_cancelled,
				'target' => '.pymt-status-' . EEM_Payment::status_id_cancelled,
				'content' => $this->_payment_status_legend(EEM_Payment::status_id_cancelled),
				'options' => array(
					'position' => array(
						'target' => 'mouse'
						)
					)
				),
			3 => array(
				'content_id' => 'payment-status-' . EEM_Payment::status_id_declined,
				'target' => '.pymt-status-' . EEM_Payment::status_id_declined,
				'content' => $this->_payment_status_legend(EEM_Payment::status_id_declined),
				'options' => array(
					'position' => array(
						'target' => 'mouse'
						)
					)
				),
			4 => array(
				'content_id' => 'payment-status-' . EEM_Payment::status_id_failed,
				'target' => '.pymt-status-' . EEM_Payment::status_id_failed,
				'content' => $this->_payment_status_legend(EEM_Payment::status_id_failed),
				'options' => array(
					'position' => array(
						'target' => 'mouse'
						)
					)
				),
			);
	}





	/**
	 * output the relevant ee-status-legend with the designated status highlighted.
	 * @param  EEM_Payment constant $status What status is set (by class)
	 * @return string         The status legend with the related status highlighted
	 */
	private function _payment_status_legend( $status ) {

		$status_array = array(
			'approved' => EEM_Payment::status_id_approved,
			'pending' => EEM_Payment::status_id_pending,
			'cancelled' => EEM_Payment::status_id_cancelled,
			'declined' => EEM_Payment::status_id_declined,
			'failed' => EEM_Payment::status_id_failed,
			);

		return EEH_Template::status_legend( $status_array, $status );
	}
}