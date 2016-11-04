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
 * Transactions_List_Table_Tips	
 *
 * Qtip config for the event editor.
 *
 * @package		Event Espresso
 * @subpackage	/admin_pages/transactions/qtips/Transactions_List_Table_Tips.lib.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Transactions_List_Table_Tips extends EE_Qtip_Config {


	protected function _set_tips_array() {
		$this->_qtipsa = array(
			/*0 => array(
				'content_id' => 'transaction-status-' . EEM_Transaction::overpaid_status_code,
				'target' => '.txn-status-' . EEM_Transaction::overpaid_status_code,
				'content' => $this->_transaction_status_legend(EEM_Transaction::overpaid_status_code),
				'options' => array(
					'position' => array(
						'target' => 'mouse'
					)
				)
			),
			1 => array(
				'content_id' => 'transaction-status-' . EEM_Transaction::complete_status_code,
				'target' => '.txn-status-' . EEM_Transaction::complete_status_code,
				'content' => $this->_transaction_status_legend(EEM_Transaction::complete_status_code),
				'options' => array(
					'position' => array(
						'target' => 'mouse'
					)
				)
			),
			2 => array(
				'content_id' => 'transaction-status-' . EEM_Transaction::incomplete_status_code,
				'target' => '.txn-status-' . EEM_Transaction::incomplete_status_code,
				'content' => $this->_transaction_status_legend(EEM_Transaction::incomplete_status_code),
				'options' => array(
					'position' => array(
						'target' => 'mouse'
					)
				)
			),
			3 => array(
				'content_id' => 'transaction-status-' . EEM_Transaction::failed_status_code,
				'target' => '.txn-status-' . EEM_Transaction::failed_status_code,
				'content' => $this->_transaction_status_legend(EEM_Transaction::failed_status_code),
				'options' => array(
					'position' => array(
						'target' => 'mouse'
					)
				)
			)/**/
			
		);
	}





	/**
	 * output the relevant ee-status-legend with the designated status highlighted.
	 * @param  EEM_Transaction constant $status What status is set (by class)
	 * @return string         The status legend with the related status highlighted
	 */
	private function _transaction_status_legend( $status ) {

		$status_array = array(
			'overpaid' => EEM_Transaction::overpaid_status_code,
			'complete' => EEM_Transaction::complete_status_code,
			'incomplete' => EEM_Transaction::incomplete_status_code,
			'failed' => EEM_Transaction::failed_status_code,
		);

		return EEH_Template::status_legend( $status_array, $status );
	}
}