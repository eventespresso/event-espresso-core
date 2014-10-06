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
			$this->checkout->generate_reg_form = FALSE;
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
		// ensure all data gets saved to the db and all model object relations get updated
		if ( $this->checkout->save_all_data() ) {
			/** @type EE_Transaction_Processor $transaction_processor */
			$transaction_processor = EE_Registry::instance()->load_class( 'Transaction_Processor' );
			// at this point we'll consider a TXN to not have failed
			if ( $transaction_processor->toggle_transaction_status( $this->checkout->transaction )) {
				$this->checkout->transaction->save();
			}
			// save TXN data to the cart
			$this->checkout->cart->get_grand_total()->save_this_and_descendants_to_txn( $this->checkout->transaction->ID() );
			// payment required ?
			if ( $this->checkout->payment_required() ) {
				/** @type EE_Payment_Processor $payment_processor */
				$payment_processor = EE_Registry::instance()->load_core( 'Payment_Processor' );
				// try to finalize any payment that may have been attempted
				$payment_processor->finalize_payment_for( $this->checkout->transaction );
			}
			if ( $this->checkout->revisit ) {
				// just update the status for the registrations
				$transaction_processor->toggle_registration_status_if_no_monies_owing( $this->checkout->transaction, $this->checkout->reg_cache_where_params );
			} else {
				// finalize the TXN, which will in turn, finalize all of it's registrations
				$transaction_processor->finalize( $this->checkout->transaction, $this->checkout->reg_cache_where_params );
			}
			// you don't have to go home but you can't stay here !
			$this->checkout->redirect = TRUE;
			// setup URL for redirect
			$this->checkout->redirect_url = add_query_arg(
				array( 'e_reg_url_link' => $this->checkout->transaction->primary_registration()->reg_url_link() ),
				$this->checkout->thank_you_page_url
			);
			$this->checkout->json_response->set_redirect_url( $this->checkout->redirect_url );
			// set a hook point
			do_action( 'AHEE__EE_SPCO_Reg_Step_Finalize_Registration__process_reg_step__completed', $this->checkout );
			return TRUE;
		}
		$this->checkout->redirect = FALSE;
		return FALSE;

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