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

	private $_registration_query_where_params = array();



	/**
	 * @param array $registration_query_where_params
	 * @return EE_Transaction_Processor
	 */
	function __construct( $registration_query_where_params = array() ) {
		// make sure some query params are set for retrieving registrations
		$this->_set_registration_query_where_params( $registration_query_where_params );
	}



	/**
	 * @param array $registration_query_where_params
	 */
	private function _set_registration_query_where_params( $registration_query_where_params ) {
		$this->_registration_query_where_params = ! empty( $registration_query_where_params ) ? $registration_query_where_params : array( 'order_by' => array( 'REG_count' => 'ASC' ));
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
	 * 	manually_update_registration_statuses
	 *
	 * 	@access public
	 * @param EE_Transaction $transaction
	 * @param string  	$new_reg_status
	 * @param array 	$registration_query_where_params - array of query WHERE params to use when retrieving cached registrations from a transaction
	 * 	@return 	boolean
	 */
	public function manually_update_registration_statuses( EE_Transaction $transaction, $new_reg_status = '', $registration_query_where_params = array() ) {
		$status_updates = FALSE;
		/** @type EE_Registration_Processor $registration_processor */
		$registration_processor = EE_Registry::instance()->load_class( 'Registration_Processor' );
		// make sure some query params are set for retrieving registrations
		$this->_set_registration_query_where_params( $registration_query_where_params );
		// loop through cached registrations
		foreach ( $transaction->registrations( $this->_registration_query_where_params ) as $registration ) {
			if ( $registration instanceof EE_Registration ) {
				// if the status was updated, then set flag to TRUE, otherwise carry over previous value
				$status_updates = $registration_processor->manually_update_registration_status( $registration, $new_reg_status ) ? TRUE : $status_updates;
			}
		}
		return $status_updates;
	}


	/**
	 * 	toggle_registration_status_for_approved_events
	 *
	 * 	@access public
	 * @param EE_Transaction $transaction
	 * @param array 	$registration_query_where_params - array of query WHERE params to use when retrieving cached registrations from a transaction
	 * 	@return 	boolean
	 */
	public function toggle_registration_status_for_approved_events( EE_Transaction $transaction, $registration_query_where_params = array() ) {
		$status_updates = FALSE;
		/** @type EE_Registration_Processor $registration_processor */
		$registration_processor = EE_Registry::instance()->load_class( 'Registration_Processor' );
		// make sure some query params are set for retrieving registrations
		$this->_set_registration_query_where_params( $registration_query_where_params );
		// loop through cached registrations
		foreach ( $transaction->registrations( $this->_registration_query_where_params ) as $registration ) {
			if ( $registration instanceof EE_Registration ) {
				// if the status was updated, then set flag to TRUE, otherwise carry over previous value
				$status_updates = $registration_processor->toggle_registration_status_for_approved_events( $registration ) ? TRUE : $status_updates;
			}
		}
		return $status_updates;
	}




	/**
	 * possibly toggles TXN status
	 * cycles thru related registrations and calls finalize_registration() on each
	 *
	 * @param EE_Transaction $transaction
	 * @param array 	$registration_query_where_params - array of query WHERE params to use when retrieving cached registrations from a transaction
	 * @return void
	 */
	public function finalize( EE_Transaction $transaction, $registration_query_where_params = array() ) {
		$reg_approved = FALSE;
		/** @type EE_Registration_Processor $registration_processor */
		$registration_processor = EE_Registry::instance()->load_class( 'Registration_Processor' );
		// make sure some query params are set for retrieving registrations
		$this->_set_registration_query_where_params( $registration_query_where_params );
		// loop through cached registrations
		foreach ( $transaction->registrations( $this->_registration_query_where_params ) as $registration ) {
			if ( $registration instanceof EE_Registration ) {
				$reg_approved = $registration_processor->finalize( $registration ) ? TRUE : $reg_approved;
			}
		}
		do_action( 'AHEE__EE_Transaction__finalize__transaction', $transaction, $reg_approved );
	}


}



// End of file EE_Transaction_Processor.class.php
// Location: /EE_Transaction_Processor.class.php