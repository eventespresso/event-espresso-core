<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }


/********************  FINALIZE ABANDONED TRANSACTIONS ********************/


static $espresso_abandoned_transactions = array();

/**
 * espresso_check_for_abandoned_transactions
 *
 * this is the callback for the action hook:
 * 'AHEE__EE_Cron_Tasks__espresso_finalize_abandoned_transactions'
 * which is utilized by wp_schedule_single_event()
 * in EE_SPCO_Reg_Step_Payment_Options::_post_payment_processing().
 * The passed TXN_ID gets added to an array, and then the
 * espresso_finalize_abandoned_transactions() function is hooked into
 * 'AHEE__EE_System__core_loaded_and_ready' which will actually handle the
 * processing of any abandoned transactions, because doing so now would be
 * too early and the required resources may not be available
 *
 * @param int $TXN_ID
 */
function espresso_check_for_abandoned_transactions( $TXN_ID = 0 ) {
	if ( absint( $TXN_ID )) {
		$espresso_abandoned_transactions[] = $TXN_ID;
		add_action( 'AHEE__EE_System__core_loaded_and_ready', 'espresso_finalize_abandoned_transactions'  );
	}
}
add_action(
	'AHEE__EE_Cron_Tasks__espresso_finalize_abandoned_transactions',
	'espresso_check_for_abandoned_transactions',
	10, 1
);

/**
 * espresso_finalize_abandoned_transactions
 *
 * loops through the $espresso_abandoned_transactions array
 * and attempts to finalize any TXNs that have not been completed
 * but have had their sessions expired, most likely due to a user not
 * returning from an off-site payment gateway
 */
function espresso_finalize_abandoned_transactions() {
	// are there any TXNs that need cleaning up ?
	if ( ! empty( $espresso_abandoned_transactions ) ) {
		/** @type EE_Transaction_Processor $transaction_processor */
		$transaction_processor = EE_Registry::instance()->load_class( 'Transaction_Processor' );
		// set revisit flag for txn processor
		$transaction_processor->set_revisit( false );
		/** @type EE_Payment_Processor $payment_processor */
		$payment_processor = EE_Registry::instance()->load_core( 'Payment_Processor' );
		// set revisit flag for payment processor
		$payment_processor->set_revisit( false );
		/** @var $TXN_model EEM_Transaction */
		$TXN_model = EE_Registry::instance()->load_model( 'Transaction' );
		foreach ( $espresso_abandoned_transactions as $TXN_ID ) {
			// let's not do anything now if any kind of m-mode is active
			if ( EE_Maintenance_Mode::instance()->level() ) {
				// reset cron job for finalizing the TXN
				wp_schedule_single_event(
					time() + 3600,
					'AHEE__EE_Cron_Tasks__espresso_finalize_abandoned_transactions',
					$TXN_ID
				);
				continue;
			}
			$transaction = $TXN_model->get_one_by_ID( $TXN_ID );
			// verify transaction
			if ( $transaction instanceof EE_Transaction ) {
				// don't bother with TXNs that have had their status updated
				if ( $transaction->status_ID() != EEM_Transaction::failed_status_code &&
					$transaction->status_ID() != EEM_Transaction::abandoned_status_code ) {
					continue;
				}
				// or have had all of their reg steps completed
				if ( ! $transaction_processor->all_reg_steps_completed( $transaction ) ) {
					continue;
				}
				// if it hasn't already been set as being started...
				$transaction_processor->set_reg_step_initiated(
					$transaction,
					'finalize_registration'
				);
				// now try to finalize any payment that may have been attempted
				// this will also finalize the TXN and trigger notifications
				$payment_processor->finalize_payment_for( $transaction );
			}
		}
	}

}


/************************************************************************************/








// End of file EE_Cron_Tasks.core.php
// Location: /EE_Cron_Tasks.core.php