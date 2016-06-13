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
	 * WordPress doesn't allow duplicate crons within 10 minutes of the original,
	 * so we'll set our retry time for just over 10 minutes to avoid that
	 */
	const reschedule_timeout = 605;


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
		do_action( 'AHEE_log', __CLASS__, __FUNCTION__ );
		// verify that WP Cron is enabled
		if ( defined( 'DISABLE_WP_CRON' ) && DISABLE_WP_CRON && is_admin() ) {
			EE_Error::add_persistent_admin_notice(
				'wp_cron_disabled',
				sprintf(
					__(
						'Event Espresso has detected that wp_cron is disabled. It\'s important that wp_cron is enabled because Event Espresso depends on wp_cron for critical scheduled tasks.%1$sSince it\'s possible that your site may have an alternative task scheduler set up, we strongly suggest that you inform the website host, or developer that set up the site, about this issue.',
						'event_espresso'
					),
					'<br />'
				)
			);
		}
		// UPDATE TRANSACTION WITH PAYMENT
		add_action(
			'AHEE__EE_Cron_Tasks__update_transaction_with_payment_2',
			array( 'EE_Cron_Tasks', 'setup_update_for_transaction_with_payment' ),
			10, 2
		);
		// FINALIZE ABANDONED TRANSACTIONS
		add_action(
			'AHEE__EE_Cron_Tasks__finalize_abandoned_transactions',
			array( 'EE_Cron_Tasks', 'check_for_abandoned_transactions' ),
			10, 1
		);
		// CLEAN OUT JUNK TRANSACTIONS AND RELATED DATA
		add_action(
				'AHEE__EE_Cron_Tasks__clean_up_junk_transactions',
				array( 'EE_Cron_Tasks', 'clean_out_junk_transactions' )
		);
		// logging
		add_action(
			'AHEE__EE_System__load_core_configuration__complete',
			array( 'EE_Cron_Tasks', 'log_scheduled_ee_crons' )
		);
		EE_Registry::instance()->load_lib( 'Messages_Scheduler' );
	}



	/**
	 * @access protected
	 * @return void
	 */
	public static function log_scheduled_ee_crons() {
		$ee_crons = array(
			'AHEE__EE_Cron_Tasks__update_transaction_with_payment',
			'AHEE__EE_Cron_Tasks__finalize_abandoned_transactions',
			'AHEE__EE_Cron_Tasks__clean_up_junk_transactions',
		);
		$crons = get_option( 'cron' );
		if ( ! is_array( $crons ) ) {
			return;
		}
		foreach ( $crons as $timestamp => $cron ) {
			foreach ( $ee_crons as $ee_cron ) {
				if ( isset( $cron[ $ee_cron ] ) ) {
					do_action( 'AHEE_log', __CLASS__, __FUNCTION__, $ee_cron, 'scheduled EE cron' );
					foreach ( $cron[ $ee_cron ] as $ee_cron_details ) {
						if ( ! empty( $ee_cron_details[ 'args' ] )) {
							do_action( 'AHEE_log', __CLASS__, __FUNCTION__, print_r( $ee_cron_details[ 'args' ], true ), "$ee_cron args" );
						}
					}
				}
			}
		}
	}




	/****************  UPDATE TRANSACTION WITH PAYMENT ****************/


	/**
	 * array of TXN IDs and the payment
	 * @var array
	 */
	protected static $_update_transactions_with_payment = array();



	/**
	 * schedule_update_transaction_with_payment
	 *
	 * sets a wp_schedule_single_event() for updating any TXNs that may
	 * require updating due to recently received payments
	 *
	 * @param int $timestamp
	 * @param int $TXN_ID
	 * @param int $PAY_ID
	 */
	public static function schedule_update_transaction_with_payment(
		$timestamp,
		$TXN_ID,
		$PAY_ID
	) {
		do_action( 'AHEE_log', __CLASS__, __FUNCTION__ );
		// validate $TXN_ID and $timestamp
		$TXN_ID = absint( $TXN_ID );
		$timestamp = absint( $timestamp );
		if ( $TXN_ID && $timestamp ) {
			wp_schedule_single_event(
				$timestamp,
				'AHEE__EE_Cron_Tasks__update_transaction_with_payment_2',
				array( $TXN_ID, $PAY_ID )
			);
		}
	}



	/**
	 * setup_update_for_transaction_with_payment
	 *
	 * this is the callback for the action hook:
	 * 'AHEE__EE_Cron_Tasks__update_transaction_with_payment'
	 * which is setup by EE_Cron_Tasks::schedule_update_transaction_with_payment().
	 * The passed TXN_ID and associated payment gets added to an array, and then
	 * the EE_Cron_Tasks::update_transaction_with_payment() function is hooked into
	 * 'shutdown' which will actually handle the processing of any
	 * transactions requiring updating, because doing so now would be too early
	 * and the required resources may not be available
	 *
	 * @param int  $TXN_ID
	 * @param int $PAY_ID
	 */
	public static function setup_update_for_transaction_with_payment( $TXN_ID = 0, $PAY_ID = 0 ) {
            do_action( 'AHEE_log', __CLASS__, __FUNCTION__, $TXN_ID, '$TXN_ID' );
		if ( absint( $TXN_ID )) {
			self::$_update_transactions_with_payment[ $TXN_ID ] = $PAY_ID;
			add_action(
				'shutdown',
				array( 'EE_Cron_Tasks', 'update_transaction_with_payment' ),
				5
			);
		}
	}



	/**
	 * update_transaction_with_payment
	 *
	 * loops through the self::$_abandoned_transactions array
	 * and attempts to finalize any TXNs that have not been completed
	 * but have had their sessions expired, most likely due to a user not
	 * returning from an off-site payment gateway
	 * 
	 * @throws \EE_Error
	 */
	public static function update_transaction_with_payment() {
		do_action( 'AHEE_log', __CLASS__, __FUNCTION__ );
		// are there any TXNs that need cleaning up ?
		if ( ! empty( self::$_update_transactions_with_payment ) ) {
			/** @type EE_Payment_Processor $payment_processor */
			$payment_processor = EE_Registry::instance()->load_core( 'Payment_Processor' );
			// set revisit flag for payment processor
			$payment_processor->set_revisit( false );
			// load EEM_Transaction
			EE_Registry::instance()->load_model( 'Transaction' );
			foreach ( self::$_update_transactions_with_payment as $TXN_ID => $PAY_ID ) {
				// reschedule the cron if we can't hit the db right now
				if ( ! EE_Maintenance_Mode::instance()->models_can_query() ) {
					// reset cron job for updating the TXN
					EE_Cron_Tasks::schedule_update_transaction_with_payment(
						time() + EE_Cron_Tasks::reschedule_timeout,
						$TXN_ID,
						$PAY_ID
					);
					continue;
				}
				$transaction = EEM_Transaction::instance()->get_one_by_ID( $TXN_ID );
				$payment = EEM_Payment::instance()->get_one_by_ID( $PAY_ID );
				// verify transaction
				if ( $transaction instanceof EE_Transaction && $payment instanceof EE_Payment ) {
					// now try to update the TXN with any payments
					$payment_processor->update_txn_based_on_payment( $transaction, $payment, true, true );
				}
				unset( self::$_update_transactions_with_payment[ $TXN_ID ] );
			}
		}
	}



	/************  END OF UPDATE TRANSACTION WITH PAYMENT  ************/



	/*****************  FINALIZE ABANDONED TRANSACTIONS *****************/



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
		do_action( 'AHEE_log', __CLASS__, __FUNCTION__, $TXN_ID, '$TXN_ID' );
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
	 * @param int $TXN_ID
	 */
	public static function check_for_abandoned_transactions(	$TXN_ID = 0 ) {
		do_action( 'AHEE_log', __CLASS__, __FUNCTION__, $TXN_ID, '$TXN_ID' );
		if ( absint( $TXN_ID )) {
			self::$_abandoned_transactions[]  = $TXN_ID;
			add_action(
				'shutdown',
				array( 'EE_Cron_Tasks', 'finalize_abandoned_transactions' ),
				5
			);
		}
	}



	/**
	 * finalize_abandoned_transactions
	 
	 * loops through the self::$_abandoned_transactions array
	 * and attempts to finalize any TXNs that have not been completed
	 * but have had their sessions expired, most likely due to a user not
	 * returning from an off-site payment gateway
	 *
	 * @throws \EE_Error
	 */
	public static function finalize_abandoned_transactions() {
		do_action( 'AHEE_log', __CLASS__, __FUNCTION__ );
		// are there any TXNs that need cleaning up ?
		if ( ! empty( self::$_abandoned_transactions ) ) {
			/** @type EE_Transaction_Processor $transaction_processor */
			$transaction_processor = EE_Registry::instance()->load_class( 'Transaction_Processor' );
			// set revisit flag for txn processor
			$transaction_processor->set_revisit( false );
			/** @type EE_Payment_Processor $payment_processor */
			$payment_processor = EE_Registry::instance()->load_core( 'Payment_Processor' );
			// load EEM_Transaction
			EE_Registry::instance()->load_model( 'Transaction' );
			foreach ( self::$_abandoned_transactions as $TXN_ID ) {
				do_action( 'AHEE_log', __CLASS__, __FUNCTION__, $TXN_ID, '$TXN_ID' );
				// reschedule the cron if we can't hit the db right now
				if ( ! EE_Maintenance_Mode::instance()->models_can_query() ) {
					// reset cron job for finalizing the TXN
					EE_Cron_Tasks::schedule_finalize_abandoned_transactions_check(
						time() + EE_Cron_Tasks::reschedule_timeout,
						$TXN_ID
					);
					continue;
				}
				$transaction = EEM_Transaction::instance()->get_one_by_ID( $TXN_ID );
				// verify transaction
				if ( $transaction instanceof EE_Transaction ) {
					// don't finalize the TXN if it has already been completed
					if ( $transaction_processor->all_reg_steps_completed( $transaction ) === true ) {
						continue;
					}
					// let's simulate an IPN here which will trigger any notifications that need to go out
					$payment_processor->update_txn_based_on_payment( $transaction, $transaction->last_payment(), true, true );
				}
				unset( self::$_abandoned_transactions[ $TXN_ID ] );
			}
		}
	}



	/*************  END OF FINALIZE ABANDONED TRANSACTIONS  *************/



	/************* START CLEAN UP BOT TRANSACTIONS **********************/

	//when a transaction is initially made, schedule this check.
	//if it has NO REG data by the time it has expired, forget about it
	public static function clean_out_junk_transactions() {
		if( EE_Maintenance_Mode::instance()->models_can_query() ) {
			EEM_Transaction::instance('')->delete_junk_transactions();
			EEM_Registration::instance('')->delete_registrations_with_no_transaction();
			EEM_Line_Item::instance('')->delete_line_items_with_no_transaction();
		}
	}


}
// End of file EE_Cron_Tasks.core.php
// Location: /EE_Cron_Tasks.core.php
