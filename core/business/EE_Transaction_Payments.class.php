<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
EE_Registry::instance()->load_class( 'Processor_Base' );

/**
 * Class EE_Transaction_Payments
 *
 * This class contains business logic pertaining specifically to the interaction of EE_Transaction and EE_Payment model objects
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				4.6.0
 *
 */

class EE_Transaction_Payments {

	/**
	 * 	@var EE_Transaction_Payments $_instance
	 * 	@access 	private
	 */
	private static $_instance = null;

	/**
	 * initial txn status at the beginning of this request.
	 *
	 * @var string
	 */
	protected $_old_txn_status = null;

	/**
	 * txn status at the end of the request after all processing.
	 *
	 * @var string
	 */
	protected $_new_txn_status = null;



	/**
	 *@singleton method used to instantiate class object
	 *@access public
	 *@return EE_Transaction_Payments instance
	 */
	public static function instance() {
		// check if class object is instantiated
		if ( ! self::$_instance instanceof EE_Transaction_Payments ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}



	/**
	 * @return EE_Transaction_Payments
	 */
	private function __construct() {
	}



	/**
	 * @return string
	 */
	public function old_txn_status() {
		return $this->_old_txn_status;
	}



	/**
	 * @param string $old_txn_status
	 */
	public function set_old_txn_status( $old_txn_status ) {
		// only set the first time
		if ( $this->_old_txn_status === null ) {
			$this->_old_txn_status = $old_txn_status;
		}
	}



	/**
	 * @return string
	 */
	public function new_txn_status() {
		return $this->_new_txn_status;
	}



	/**
	 * @param string $new_txn_status
	 */
	public function set_new_txn_status( $new_txn_status ) {
		$this->_new_txn_status = $new_txn_status;
	}



	/**
	 * reg_status_updated
	 *
	 * @return bool
	 */
	public function txn_status_updated() {
		return $this->_new_txn_status !== $this->_old_txn_status && $this->_old_txn_status !== null  ? true : false;
	}



	/**
	 * Updates the provided EE_Transaction with all the applicable payments
	 * returns a boolean for whether the TXN was saved to the db
	 * (meaning a status change occurred)
	 * or not saved (which could **still** mean that
	 * the TXN status changed, but just was not yet saved).
	 * So if passing a value of false for the $update_txn param,
	 * then client code needs to take responsibility for saving the TXN
	 * regardless of what happens within EE_Transaction_Payments;
	 *
	 * @param EE_Transaction/int $transaction_obj_or_id EE_Transaction or its ID
	 * @param 	boolean $update_txn  	whether to save the TXN
	 * @return 	boolean 	 	whether the TXN was saved
	 */
	public function calculate_total_payments_and_update_status( EE_Transaction $transaction, $update_txn = true ){
		// verify transaction
		if ( ! $transaction instanceof EE_Transaction ) {
			EE_Error::add_error( __( 'Please provide a valid EE_Transaction object.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return false;
		}
		// set incoming TXN_Status
		$this->set_old_txn_status( $transaction->status_ID() );
		// calculate total paid
		$total_paid = $this->recalculate_total_payments_for_transaction( $transaction );
		// if total paid has changed
		if ( $total_paid != $transaction->paid() ) {
			$transaction->set_paid( $total_paid );
			// maybe update status, and make sure to save transaction if not done already
			if ( ! $this->update_transaction_status_based_on_total_paid( $transaction, $update_txn )) {
				if ( $update_txn ) {
					return $transaction->save() ? true : false;
				}
			} else {
				// the status got updated and was saved by
				// update_transaction_status_based_on_total_paid()
				return true;
			}
		}
		return false;
	}



	/**
	 *		recalculate_total_payments_for_transaction
	 * 		@access		public
	 * 		@param EE_Transaction $transaction
	 *		@param	string $payment_status, one of EEM_Payment's statuses, like 'PAP' (Approved). By default, searches for approved payments
	 *		@return 		mixed		float on success, false on fail
	 */
	public function recalculate_total_payments_for_transaction( EE_Transaction $transaction, $payment_status = EEM_Payment::status_id_approved ) {
		// verify transaction
		if ( ! $transaction instanceof EE_Transaction ) {
			EE_Error::add_error( __( 'Please provide a valid EE_Transaction object.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return false;
		}
		// ensure Payment model is loaded
		EE_Registry::instance()->load_model( 'Payment' );
		// calls EEM_Base::sum()
		return EEM_Payment::instance()->sum(
			// query params
			array( array( 'TXN_ID' => $transaction->ID(), 'STS_ID' => $payment_status )),
			// field to sum
			'PAY_amount'
		);
	}



	/**
	 * possibly toggles TXN status
	 *
	 * @param EE_Transaction $transaction
	 * @param 	boolean $update_txn  	whether to save the TXN
	 * @return 	boolean 	 	whether the TXN was saved
	 * @throws \EE_Error
	 */
	public function update_transaction_status_based_on_total_paid( EE_Transaction $transaction, $update_txn = TRUE ) {
		// verify transaction
		if ( ! $transaction instanceof EE_Transaction ) {
			EE_Error::add_error(
				__( 'Please provide a valid EE_Transaction object.', 'event_espresso' ),
				__FILE__, __FUNCTION__, __LINE__
			);
			return FALSE;
		}
		EE_Registry::instance()->load_helper( 'Money' );
		// set incoming TXN_Status
		$this->set_old_txn_status( $transaction->status_ID() );
		// set transaction status based on comparison of TXN_paid vs TXN_total
		if ( EEH_Money::compare_floats( $transaction->paid(), $transaction->total(), '>' ) ){
			$new_txn_status = EEM_Transaction::overpaid_status_code;
		} else if ( EEH_Money::compare_floats( $transaction->paid(), $transaction->total() ) ) {
			$new_txn_status = EEM_Transaction::complete_status_code;
		} else if ( EEH_Money::compare_floats( $transaction->paid(), $transaction->total(), '<' ) ) {
			$new_txn_status = EEM_Transaction::incomplete_status_code;
		} else {
			EE_Error::add_error(
				__( 'The total paid calculation for this transaction is inaccurate.', 'event_espresso' ),
				__FILE__, __FUNCTION__, __LINE__
			);
			return FALSE;
		}
		if ( $new_txn_status !== $transaction->status_ID() ) {
			// set incoming TXN_Status
			$this->set_new_txn_status( $new_txn_status );
			$transaction->set_status( $new_txn_status );
			if ( $update_txn ) {
				return $transaction->save() ? TRUE : FALSE;
			}
		}
		return FALSE;
	}




	/**
	 * delete_payment_and_update_transaction
	 *
	 * Before deleting the selected payment, we fetch it's transaction,
	 * then delete the payment, and update the transactions' amount paid.
	 *
	 * @param EE_Payment $payment
	 * @return boolean
	 */
	public function delete_payment_and_update_transaction( EE_Payment $payment ) {
		// verify payment
		if ( ! $payment instanceof EE_Payment ) {
			EE_Error::add_error( __( 'A valid Payment object was not received.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		if ( ! $this->delete_registration_payments_and_update_registrations( $payment ) ) {
			return false;
		}
		if ( ! $payment->delete() ) {
			EE_Error::add_error( __( 'The payment could not be deleted.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return false;
		}
		$transaction = $payment->transaction();
		return $this->calculate_total_payments_and_update_status( $transaction );
	}



	/**
	 * delete_registration_payments_and_update_registrations
	 *
	 * removes all registration payment records associated with a payment
	 * and subtracts their amounts from the corresponding registrations REG_paid field
	 *
	 * @param EE_Payment $payment
	 * @param array $reg_payment_query_params
	 * @return bool
	 * @throws \EE_Error
	 */
	public function delete_registration_payments_and_update_registrations( EE_Payment $payment, $reg_payment_query_params = array() ) {
		$reg_payment_query_params = ! empty( $reg_payment_query_params ) ? $reg_payment_query_params : array( array( 'PAY_ID' => $payment->ID() ) );
		$registration_payments = EEM_Registration_Payment::instance()->get_all( $reg_payment_query_params );
		if ( ! empty( $registration_payments )) {
			foreach ( $registration_payments as $registration_payment ) {
				if ( $registration_payment instanceof EE_Registration_Payment ) {
					$amount_paid = $registration_payment->amount();
					$registration = $registration_payment->get_first_related( 'Registration' );
					if ( $registration instanceof EE_Registration ) {
						$registration->set_paid( $registration->paid() - $amount_paid );
						if ( $registration->save() ) {
							$registration_payment->delete();
						}
					} else {
						EE_Error::add_error(
							sprintf(
								__( 'An invalid Registration object was associated with Registration Payment ID# %1$d.', 'event_espresso' ),
								$registration_payment->ID()
							),
							__FILE__, __FUNCTION__, __LINE__
						);
						return false;
					}
				} else {
					EE_Error::add_error(
						sprintf(
							__( 'An invalid Registration Payment object was associated with payment ID# %1$d.', 'event_espresso' ),
							$payment->ID()
						),
						__FILE__, __FUNCTION__, __LINE__
					);
					return false;
				}
			}
		}
		return true;
	}

}
// End of file EE_Transaction_Payments.class.php
// Location: /core/business/EE_Transaction_Payments.class.php
