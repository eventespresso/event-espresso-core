<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
 /**
 *
 * Class EE_SPCO_Reg_Step_Finalize_Registration
 *
 * Description
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				4.5.0
 *
 */
class EE_SPCO_Reg_Step_Finalize_Registration extends EE_SPCO_Reg_Step {

	/**
	 *    class constructor
	 *
	 * @access    public
	 * @param    EE_Checkout $checkout
	 * @return 	\EE_SPCO_Reg_Step_Finalize_Registration
	 */
	public function __construct( EE_Checkout $checkout ) {
		$this->_slug = 'finalize_registration';
		$this->_name = __('Finalize Registration', 'event_espresso');
		$this->_submit_button_text = $this->_name;
		$this->_template = '';
		$this->checkout = $checkout;

	}



	public function translate_js_strings() {

	}

	public function enqueue_styles_and_scripts() {

	}



	/**
	 * @return boolean
	 */
	public function initialize_reg_step() {
		// there's actually no reg form to process if this is the final step
		if ( $this->checkout->current_step instanceof EE_SPCO_Reg_Step_Finalize_Registration ) {
			$this->checkout->action = 'process_reg_step';
			$this->checkout->generate_reg_form = false;
		}
	}



	/**
	 * @return string
	 */
	public function generate_reg_form() {
		// create empty form so that things don't break
		$this->reg_form = new EE_Form_Section_Proper();
	}



	/**
	 * @return boolean
	 */
	public function process_reg_step() {
//		printr( $this->checkout, '$this->checkout', __FILE__, __LINE__ );
		// ensure all data gets saved to the db and all model object relations get updated
		if ( $this->checkout->save_all_data() ) {
			// ensures that all details and statuses for transaction, registration, and payments are updated
			$txn_update_params = $this->_finalize_transaction();
			// this will result in the base session properties getting saved to the TXN_Session_data field
			$this->checkout->transaction->set_txn_session_data( EE_Registry::instance()->SSN->get_session_data( null, true ));
			// you don't have to go home but you can't stay here !
			$this->checkout->redirect = true;
			// check if transaction has a primary registrant and that it has a related Attendee object
			if ( $this->checkout->transaction_has_primary_registrant() ) {
				// setup URL for redirect
				$this->checkout->redirect_url = add_query_arg(
					array( 'e_reg_url_link' => $this->checkout->transaction->primary_registration()->reg_url_link() ),
					$this->checkout->thank_you_page_url
				);
			} else {
				EE_Error::add_error( __( 'A valid Primary Registration for this Transaction could not be found.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__);
			}
			$this->checkout->json_response->set_redirect_url( $this->checkout->redirect_url );
			// set a hook point
			do_action( 'AHEE__EE_SPCO_Reg_Step_Finalize_Registration__process_reg_step__completed', $this->checkout, $txn_update_params );
			return true;
		}
		$this->checkout->redirect = false;
		// mark this reg step as completed
		$this->checkout->current_step->set_completed();
		return false;

	}



	/**
	 * _finalize_transaction
	 * ensures that all details and statuses for transaction, registration, and payments are updated
	 * @return array
	 */
	protected function _finalize_transaction() {
		/** @type EE_Transaction_Processor $transaction_processor */
		$transaction_processor = EE_Registry::instance()->load_class( 'Transaction_Processor' );
		//set revisit flag in txn processor
		$transaction_processor->set_revisit( $this->checkout->revisit );
		// at this point we'll consider a TXN to not have been abandoned
		if ( $transaction_processor->toggle_abandoned_transaction_status( $this->checkout->transaction )) {
			$this->checkout->transaction->save();
		}
		// save TXN data to the cart
		//$this->checkout->cart->get_grand_total()->save_this_and_descendants_to_txn( $this->checkout->transaction->ID() );
		// update the TXN if payment conditions have changed
		return $transaction_processor->update_transaction_and_registrations_after_checkout_or_payment(
			$this->checkout->transaction,
			$this->_payment_details(),
			$this->checkout->reg_cache_where_params
		);
	}



	/**
	 * _payment_details
	 * perform updates based on payments, if any
	 * @return EE_Payment | null
	 */
	protected function _payment_details() {
		// payment required ?
		if ( $this->checkout->payment_required() ) {
			/** @type EE_Payment_Processor $payment_processor */
			$payment_processor = EE_Registry::instance()->load_core( 'Payment_Processor' );
			//have to do this because $transaction_processor is not a singleton and payment_processor instantiates a new transaction_processor.
			$payment_processor->set_revisit( $this->checkout->revisit );
			// try to finalize any payment that may have been attempted,
			// but do NOT call EE_Transaction_Processor::update_transaction_and_registrations_after_checkout_or_payment(),
			// we'll do that manually below
			return $payment_processor->finalize_payment_for( $this->checkout->transaction, false );
		} else {
			/** @type EE_Transaction_Payments $transaction_payments */
			$transaction_payments = EE_Registry::instance()->load_class( 'Transaction_Payments' );
			// maybe update status, and make sure to save transaction if not done already
			$transaction_payments->update_transaction_status_based_on_total_paid( $this->checkout->transaction, false );
			// nothing to see here
			return null;
		}
	}



	/**
	 * @return boolean
	 */
	public function update_reg_step() {
		EE_Error::doing_it_wrong( __CLASS__ . '::' . __FILE__, __( 'Can not call update_reg_step() on the Finalize Registration reg step.', 'event_espresso'), '4.6.0' );
	 }




}
// End of file EE_SPCO_Reg_Step_Finalize_Registration.class.php
// Location: /EE_SPCO_Reg_Step_Finalize_Registration.class.php
