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
		$status_updates = $this->_call_method_on_registrations_via_Registration_Processor( 'manually_update_registration_status', $transaction, $registration_query_where_params, $new_reg_status );
		do_action( 'AHEE__EE_Transaction_Processor__manually_update_registration_statuses', $transaction, $status_updates );
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
		$status_updates = $this->_call_method_on_registrations_via_Registration_Processor( 'toggle_registration_status_for_approved_events', $transaction, $registration_query_where_params );
		do_action( 'AHEE__EE_Transaction_Processor__toggle_registration_status_for_approved_events', $transaction, $status_updates );
		return $status_updates;
	}



	/**
	 * 	toggle_registration_status_if_no_monies_owing
	 *
	 * 	@access public
	 * @param EE_Transaction $transaction
	 * @param array 	$registration_query_where_params - array of query WHERE params to use when retrieving cached registrations from a transaction
	 * 	@return 	boolean
	 */
	public function toggle_registration_status_if_no_monies_owing( EE_Transaction $transaction, $registration_query_where_params = array() ) {
		$status_updates = $this->_call_method_on_registrations_via_Registration_Processor( 'toggle_registration_status_if_no_monies_owing', $transaction, $registration_query_where_params );
		do_action( 'AHEE__EE_Transaction_Processor__toggle_registration_status_if_no_monies_owing', $transaction, $status_updates );
		return $status_updates;
	}




	/**
	 * possibly toggles TXN status
	 * cycles thru related registrations and calls finalize_registration() on each
	 *
	 * @param EE_Transaction $transaction
	 * @param array 	$registration_query_where_params - array of query WHERE params to use when retrieving cached registrations from a transaction
	 * @return boolean
	 */
	public function finalize( EE_Transaction $transaction, $registration_query_where_params = array() ) {
		$status_updates = $this->_call_method_on_registrations_via_Registration_Processor( 'finalize', $transaction, $registration_query_where_params );
		do_action( 'AHEE__EE_Transaction_Processor__finalize', $transaction, $status_updates );
		return $status_updates;
	}



	/**
	 * possibly toggles TXN status
	 * cycles thru related registrations and calls finalize_registration() on each
	 *
	 * @param string         $method_name
	 * @param EE_Transaction $transaction
	 * @param array          $registration_query_where_params - array of query WHERE params to use when retrieving cached registrations from a transaction
	 * @param string         $additional_param
	 * @throws \EE_Error
	 * @return boolean
	 */
	public function _call_method_on_registrations_via_Registration_Processor( $method_name,  EE_Transaction $transaction, $registration_query_where_params = array(), $additional_param = NULL ) {
		$response = FALSE;
		/** @type EE_Registration_Processor $registration_processor */
		$registration_processor = EE_Registry::instance()->load_class( 'Registration_Processor' );
		// check that method exists
		if ( ! method_exists( $registration_processor, $method_name )) {
			throw new EE_Error( __( 'Method does nto exist.', 'event_espresso' ));
		}
		// make sure some query params are set for retrieving registrations
		$this->_set_registration_query_where_params( $registration_query_where_params );
		// loop through cached registrations
		foreach ( $transaction->registrations( $this->_registration_query_where_params ) as $registration ) {
			if ( $registration instanceof EE_Registration ) {
				if ( $additional_param ) {
					$response = $registration_processor->$method_name( $registration, $additional_param ) ? TRUE : $response;
				} else {
					$response = $registration_processor->$method_name( $registration ) ? TRUE : $response;
				}
			}
		}
		return $response;
	}


}



// End of file EE_Transaction_Processor.class.php
// Location: /EE_Transaction_Processor.class.php