<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
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
	 * @return EE_Transaction_Payments
	 */
	function __construct() {
	}



	/**
	 * Updates the provided EE_Transaction with all the applicable payments
	 * (or fetch the EE_Transaction from its ID)
	 * @param EE_Transaction/int $transaction_obj_or_id EE_Transaction or its ID
	 * @return boolean
	 */
	public function calculate_total_payments_and_update_status( EE_Transaction $transaction ){
		// verify transaction
		if ( ! $transaction instanceof EE_Transaction ) {
			EE_Error::add_error( __( 'Please provide a valid EE_Transaction object.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		// calculate total paid
		$total_paid = $this->recalculate_total_payments_for_transaction( $transaction, EEM_Payment::status_id_approved );
		// if total paid has changed
		if ( $total_paid != $transaction->paid() ) {
			$transaction->set_paid( $total_paid );
			// maybe update status, and make sure to save transaction if not done already
			if ( ! $this->update_transaction_status_based_on_total_paid( $transaction )) {
				$transaction->save();
			}
			return TRUE;
		}
		return FALSE;
	}



	/**
	 *		recalculate_total_payments_for_transaction
	 * 		@access		public
	 * 		@param EE_Transaction $transaction
	 *		@param	string $payment_status, one of EEM_Payment's statuses, like 'PAP' (Approved). By default, searches for approved payments
	 *		@return 		mixed		array on success, FALSE on fail
	 */
	public function recalculate_total_payments_for_transaction( EE_Transaction $transaction, $payment_status = EEM_Payment::status_id_approved ) {
		// verify transaction
		if ( ! $transaction instanceof EE_Transaction ) {
			EE_Error::add_error( __( 'Please provide a valid EE_Transaction object.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
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
	 * @return boolean
	 */
	public function update_transaction_status_based_on_total_paid( EE_Transaction $transaction ) {
		// verify transaction
		if ( ! $transaction instanceof EE_Transaction ) {
			EE_Error::add_error( __( 'Please provide a valid EE_Transaction object.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		// set transaction status based on comparison of TXN_paid vs TXN_total
		if ( $transaction->paid() > $transaction->total() ){
			$new_txn_status = EEM_Transaction::overpaid_status_code;
		} else if ( $transaction->paid() == $transaction->total() ) {
			$new_txn_status = EEM_Transaction::complete_status_code;
		} else if ( $transaction->paid() < $transaction->total() ) {
			$new_txn_status = EEM_Transaction::incomplete_status_code;
		} else {
			EE_Error::add_error( __( 'The total paid calculation for this transaction is inaccurate.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		if ( $new_txn_status !== $transaction->status_ID() ) {
			$transaction->set_status( $new_txn_status );
			return $transaction->save() ? TRUE : FALSE;
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
		$transaction = $payment->transaction();
		if ( ! $payment->delete() ) {
			EE_Error::add_error( __( 'The payment could not be deleted.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		return $this->calculate_total_payments_and_update_status( $transaction );
	}


}
// End of file EE_Transaction_Payments.class.php
// Location: /core/business/EE_Transaction_Payments.class.php