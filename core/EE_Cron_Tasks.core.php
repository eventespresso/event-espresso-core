<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 *
 * Class EE_Cron_Tasks
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 *
 */
class EE_Cron_Tasks extends EE_BASE {


	/**
	 * @var EE_Cron_Tasks
	 */
	private static $_instance;



	/**
	 * @return EE_Cron_Tasks
	 */
	public static function instance() {
		if ( ! self::$_instance instanceof EE_Cron_Tasks ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}



	/**
	 * @access private
	 * @return EE_Cron_Tasks
	 */
	private function __construct() {
		// FINALIZE ABANDONED TRANSACTIONS
		add_action(
			'AHEE__EE_Cron_Tasks__finalize_abandoned_transactions',
			array( 'EE_Cron_Tasks', 'check_for_abandoned_transactions' ),
			10, 1
		);
	}


	/*******************  FINALIZE ABANDONED TRANSACTIONS *******************/


	/**
	 * array of TXN IDs
	 * @var array
	 */
	protected static $_abandoned_transactions = array();



	/**
	 * schedule_finalize_abandoned_transactions_check
	 *
	 * sets a wp_schedule_single_event() for finalizing any TXNs that may
	 * have been abandoned during the registration process
	 *
	 * @param int $timestamp
	 * @param int $TXN_ID
	 */
	public static function schedule_finalize_abandoned_transactions_check(
		$timestamp,
		$TXN_ID
	) {
		// validate $TXN_ID and $timestamp
		$TXN_ID = absint( $TXN_ID );
		$timestamp = absint( $timestamp );
		if ( $TXN_ID && $timestamp ) {
			wp_schedule_single_event(
				$timestamp,
				'AHEE__EE_Cron_Tasks__finalize_abandoned_transactions',
				array( $TXN_ID )
			);
		}
	}



	/**
	 * check_for_abandoned_transactions
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
	 * @param array $TXN_IDs
	 */
	public static function check_for_abandoned_transactions(	$TXN_IDs = array() ) {
		if ( is_array( $TXN_IDs ) && ! empty( $TXN_IDs )) {
			self::$_abandoned_transactions = array_merge(
				self::$_abandoned_transactions,
				$TXN_IDs
			);
			add_action(
				'AHEE__EE_System__core_loaded_and_ready',
				array( 'EE_Cron_Tasks', 'finalize_abandoned_transactions' )
			);
		}
	}



	/**
	 * finalize_abandoned_transactions
	 *
	 * loops through the self::$_abandoned_transactions array
	 * and attempts to finalize any TXNs that have not been completed
	 * but have had their sessions expired, most likely due to a user not
	 * returning from an off-site payment gateway
	 */
	public static function finalize_abandoned_transactions() {
		// are there any TXNs that need cleaning up ?
		if ( ! empty( self::$_abandoned_transactions ) ) {
			/** @type EE_Transaction_Processor $transaction_processor */
			$transaction_processor = EE_Registry::instance()->load_class( 'Transaction_Processor' );
			// set revisit flag for txn processor
			$transaction_processor->set_revisit( false );
			/** @type EE_Payment_Processor $payment_processor */
			$payment_processor = EE_Registry::instance()->load_core( 'Payment_Processor' );
			// set revisit flag for payment processor
			$payment_processor->set_revisit( false );
			// load EEM_Transaction
			EE_Registry::instance()->load_model( 'Transaction' );
			foreach ( self::$_abandoned_transactions as $TXN_ID ) {
				// reschedule the cron if we can't hit the db right now
				if ( ! EE_Maintenance_Mode::instance()->models_can_query() ) {
					// reset cron job for finalizing the TXN
					EE_Cron_Tasks::schedule_finalize_abandoned_transactions_check(
						time() + HOUR_IN_SECONDS,
						$TXN_ID
					);
					continue;
				}
				$transaction = EEM_Transaction::instance()->get_one_by_ID( $TXN_ID );
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
					$payment = $payment_processor->finalize_payment_for( $transaction );
					if ( $payment instanceof EE_Payment_Method ) {
						// at this point we'll consider a TXN to not have been abandoned
						if ( $transaction_processor->toggle_abandoned_transaction_status( $transaction )) {
							$transaction->save();
						}
					}
				}
			}
		}

	}


	/***************  END OF FINALIZE ABANDONED TRANSACTIONS  ***************/

}
// End of file EE_Cron_Tasks.core.php
// Location: /EE_Cron_Tasks.core.php