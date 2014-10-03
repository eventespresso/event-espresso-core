<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Transaction_Processor
 *
 * Provides method for manipulating and processing changes with regards to an EE_Transaction
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				4.6.0
 *
 */

class EE_Transaction_Processor {



	/**
	 * @return EE_Transaction_Processor
	 */
	function __construct() {
	}



	/**
	 * 	toggle_transaction_status
	 * 	changes TXN status based on monies owing
	 *
	 * 	@access public
	 * @param EE_Transaction $transaction
	 * 	@return 	boolean
	 */
	public function toggle_transaction_status( EE_Transaction $transaction ) {
		// if TXN status has not been updated already due to a payment, and is still set as "failed"...
		if ( $transaction->status_ID() == EEM_Transaction::failed_status_code ) {
			//but monies are still owing...
			if ( $transaction->total() > 0 ) {
				// then update to incomplete
				$transaction->set_status( EEM_Transaction::incomplete_status_code );
			} else {
				// or update to complete
				$transaction->set_status( EEM_Transaction::complete_status_code );
			}
			return TRUE;
		}
		return FALSE;
	}



	/**
	 * possibly toggles TXN status
	 * cycles thru related registrations and calls finalize_registration() on each
	 *
	 * @param EE_Transaction $transaction
	 * @param array          $query_params
	 * @param bool           $new_transaction
	 * @param bool           $from_admin
	 * @return void
	 */
	public function finalize( EE_Transaction $transaction, $query_params = array(), $new_transaction = FALSE ) {
		$reg_approved = FALSE;
		/** @type EE_Registration_Processor $registration_processor */
		$registration_processor = EE_Registry::instance()->load_class( 'Registration_Processor' );
		// make sure some query params are set for retrieving registrations
		$query_params = ! empty( $query_params ) ? $query_params : array(  'order_by' => array( 'REG_count' => 'ASC' ));
		// loop through cached registrations
		foreach ( $transaction->registrations( $query_params ) as $registration ) {
			if ( $registration instanceof EE_Registration ) {
				$reg_approved = $registration_processor->finalize( $registration, $new_transaction ) ? TRUE : $reg_approved;
			}
		}
		do_action( 'AHEE__EE_Transaction__finalize__transaction', $transaction, $new_transaction, $reg_approved, $from_admin );
	}


}



// End of file EE_Transaction_Processor.class.php
// Location: /EE_Transaction_Processor.class.php