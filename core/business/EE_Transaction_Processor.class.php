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

	private $_registration_query_params = array();



	/**
	 * @param array $registration_query_params
	 * @return EE_Transaction_Processor
	 */
	function __construct( $registration_query_params = array() ) {
		// make sure some query params are set for retrieving registrations
		$this->_set_registration_query_params( $registration_query_params );
	}



	/**
	 * @access private
	 * @param array $registration_query_params
	 */
	private function _set_registration_query_params( $registration_query_params ) {
		$this->_registration_query_params = ! empty( $registration_query_params ) ? $registration_query_params : array( 'order_by' => array( 'REG_count' => 'ASC' ));
	}



	/**
	 * set_reg_step_completed
	 * given a valid TXN_reg_step, this sets the step as completed
	 *
	 * @access public
	 * @param \EE_Transaction $transaction
	 * @param string          $reg_step_slug
	 * @return boolean
	 */
	public function set_reg_step_completed(  EE_Transaction $transaction, $reg_step_slug ) {
		return $this->_set_reg_step_completed_status( $transaction, $reg_step_slug, TRUE );
	}



	/**
	 * set_reg_step_completed
	 * given a valid TXN_reg_step slug, this sets the step as NOT completed
	 *
	 * @access public
	 * @param \EE_Transaction $transaction
	 * @param string          $reg_step_slug
	 * @return boolean
	 */
	public function set_reg_step_not_completed(  EE_Transaction $transaction, $reg_step_slug ) {
		return $this->_set_reg_step_completed_status( $transaction, $reg_step_slug, FALSE );
	}



	/**
	 * set_reg_step_completed
	 * given a valid reg step slug, this sets the TXN_reg_step as completed
	 *
	 * @access private
	 * @param \EE_Transaction $transaction
	 * @param string          $reg_step_slug
	 * @param                 $status
	 * @return boolean
	 */
	private function _set_reg_step_completed_status(  EE_Transaction $transaction, $reg_step_slug, $status ) {
		// ensure boolean value
		$status = is_bool( $status ) ? $status : FALSE;
		// get reg steps array
		$txn_reg_steps = $transaction->reg_steps();
		// if reg step exists AND it's current value doesn't match the incoming value
		if ( isset( $txn_reg_steps[ $reg_step_slug ] ) && $txn_reg_steps[ $reg_step_slug ] !== $status ) {
			// update completed status
			$txn_reg_steps[ $reg_step_slug ] = $status;
			$transaction->set_reg_steps( $txn_reg_steps );
			return TRUE;
		}
		return FALSE;
	}



	/**
	 * 	toggle_failed_transaction_status
	 * 	changes TXN status based on monies owing
	 *
	 * 	@access public
	 * @param EE_Transaction $transaction
	 * 	@return 	boolean
	 */
	public function toggle_failed_transaction_status( EE_Transaction $transaction ) {
		// if TXN status has not been updated already due to a payment, and is still set as "failed"...
		if ( $transaction->status_ID() == EEM_Transaction::failed_status_code ) {
			$transaction->set_status( EEM_Transaction::incomplete_status_code );
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
	 * @param array 	$registration_query_params - array of query WHERE params to use when retrieving cached registrations from a transaction
	 * 	@return 	boolean
	 */
	public function manually_update_registration_statuses( EE_Transaction $transaction, $new_reg_status = '', $registration_query_params = array() ) {
		$status_updates = $this->_call_method_on_registrations_via_Registration_Processor( 'manually_update_registration_status', $transaction, $registration_query_params, $new_reg_status );
		do_action( 'AHEE__EE_Transaction_Processor__manually_update_registration_statuses', $transaction, $status_updates );
		return $status_updates;
	}



	/**
	 * 	toggle_registration_statuses_for_default_approved_events
	 *
	 * 	@access public
	 * @param EE_Transaction $transaction
	 * @param array 	$registration_query_params - array of query WHERE params to use when retrieving cached registrations from a transaction
	 * 	@return 	boolean
	 */
	public function toggle_registration_statuses_for_default_approved_events( EE_Transaction $transaction, $registration_query_params = array() ) {
		$status_updates = $this->_call_method_on_registrations_via_Registration_Processor( 'toggle_registration_status_for_default_approved_events', $transaction, $registration_query_params );
		do_action( 'AHEE__EE_Transaction_Processor__toggle_registration_statuses_for_default_approved_events', $transaction, $status_updates );
		return $status_updates;
	}



	/**
	 * 	toggle_registration_statuses_if_no_monies_owing
	 *
	 * 	@access public
	 * @param EE_Transaction $transaction
	 * @param array 	$registration_query_params - array of query WHERE params to use when retrieving cached registrations from a transaction
	 * 	@return 	boolean
	 */
	public function toggle_registration_statuses_if_no_monies_owing( EE_Transaction $transaction, $registration_query_params = array() ) {
		$status_updates = $this->_call_method_on_registrations_via_Registration_Processor( 'toggle_registration_statuses_if_no_monies_owing', $transaction, $registration_query_params );
		do_action( 'AHEE__EE_Transaction_Processor__toggle_registration_statuses_if_no_monies_owing', $transaction, $status_updates );
		return $status_updates;
	}



	/**
	 * possibly toggles TXN status
	 * cycles thru related registrations and calls finalize_registration() on each
	 *
	 * @param EE_Transaction $transaction
	 * @return boolean
	 */
	public function check_and_update_transaction_completion( EE_Transaction $transaction ) {
		if ( ! $transaction->all_reg_steps_completed() ) {
			return FALSE;
		}
		// zero monies owing
		if ( $transaction->is_free() || $transaction->remaining() == 0 ) {
			// update to complete
			$transaction->set_status( EEM_Transaction::complete_status_code );
		} else if ( $transaction->paid() > $transaction->total() ) {
			// paid too much so update to overpaid
			$transaction->set_status( EEM_Transaction::overpaid_status_code );
		} else {
			return FALSE;
		}
		return TRUE;
	}



	/**
	 * finalize
	 *
	 * cycles thru related registrations and calls finalize_registration() on each
	 *
	 * @param EE_Transaction $transaction
	 * @return boolean
	 */
	public function finalize( EE_Transaction $transaction ) {
		// don't repeat this step if this TXN has already been finalized
		if ( $transaction->all_reg_steps_completed() ) {
			return FALSE;
		}
		// now update the registrations
		$status_updates = $this->_call_method_on_registrations_via_Registration_Processor( 'finalize', $transaction );
		do_action( 'AHEE__EE_Transaction_Processor__finalize', $transaction, $status_updates );
		// if we've made it this far, then set the 'finalize_registration' as completed
		$this->set_reg_step_completed( $transaction, 'finalize_registration' );
		return $status_updates;
	}



	/**
	 * _call_method_on_registrations_via_Registration_Processor
	 * cycles thru related registrations and calls the requested method on each
	 *
	 * @access private
	 * @param string 	$method_name
	 * @param EE_Transaction $transaction
	 * @param array 	$registration_query_params - array of query WHERE params to use when retrieving cached registrations from a transaction
	 * @param string 	$additional_param
	 * @throws \EE_Error
	 * @return boolean
	 */
	private function _call_method_on_registrations_via_Registration_Processor( $method_name,  EE_Transaction $transaction, $registration_query_params = array(), $additional_param = NULL ) {
		$response = FALSE;
		/** @type EE_Registration_Processor $registration_processor */
		$registration_processor = EE_Registry::instance()->load_class( 'Registration_Processor' );
		// check that method exists
		if ( ! method_exists( $registration_processor, $method_name )) {
			throw new EE_Error( __( 'Method does nto exist.', 'event_espresso' ));
		}
		// make sure some query params are set for retrieving registrations
		$this->_set_registration_query_params( $registration_query_params );
		// loop through cached registrations
		foreach ( $transaction->registrations( $this->_registration_query_params ) as $registration ) {
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