<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class EE_SPCO_Reg_Step_Finalize_Registration
 * Description
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 * @since                 4.5.0
 */
class EE_SPCO_Reg_Step_Finalize_Registration extends EE_SPCO_Reg_Step {

	/**
	 *    class constructor
	 *
	 * @access    public
	 * @param    EE_Checkout $checkout
	 */
	public function __construct( EE_Checkout $checkout ) {
		$this->_slug = 'finalize_registration';
		$this->_name = __( 'Finalize Registration', 'event_espresso' );
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
		if ( $this->is_current_step() ) {
			$this->checkout->step = $_REQUEST['step'] = $this->slug();
			$this->checkout->action = $_REQUEST['action'] = 'process_reg_step';
			$this->checkout->generate_reg_form = false;
		}
		return true;
	}



    /**
     * @return string
     * @throws \EE_Error
     */
	public function generate_reg_form() {
		// create empty form so that things don't break
		$this->reg_form = new EE_Form_Section_Proper();
		return '';
	}



    /**
     * @return boolean
     * @throws \RuntimeException
     * @throws \EE_Error
     */
	public function process_reg_step() {
        // ensure all data gets refreshed from the db
		$this->checkout->refresh_all_entities( true );
		// ensures that all details and statuses for transaction, registration, and payments are updated
		$txn_update_params = $this->_finalize_transaction();
        // maybe send messages
        $this->_set_notification_triggers();
        // send messages
        /** @type EE_Registration_Processor $registration_processor */
        $registration_processor = EE_Registry::instance()->load_class('Registration_Processor');
        $registration_processor->trigger_registration_update_notifications(
            $this->checkout->transaction->primary_registration(),
            $txn_update_params
        );
        // set a hook point
		do_action(
			'AHEE__EE_SPCO_Reg_Step_Finalize_Registration__process_reg_step__completed',
			$this->checkout,
			$txn_update_params
		);
		// check if transaction has a primary registrant and that it has a related Attendee object
		if ( ! $this->_validate_primary_registrant() ) {
			return false;
		}
		// you don't have to go home but you can't stay here !
		$this->checkout->redirect = true;
		$this->checkout->continue_reg = true;
		$this->checkout->json_response->set_redirect_url( $this->checkout->redirect_url );
		if (
			! (
				$this->checkout->payment_method instanceof EE_Payment_Method
		        && $this->checkout->payment_method->is_off_site()
			)
		) {
			// mark this reg step as completed
			$this->set_completed();
		}
		$this->checkout->set_exit_spco();
		return true;
	}



    /**
     * _finalize_transaction
     * ensures that all details and statuses for transaction, registration, and payments are updated
     *
     * @return array
     * @throws \RuntimeException
     * @throws \EE_Error
     */
	protected function _finalize_transaction() {
		/** @type EE_Transaction_Processor $transaction_processor */
		$transaction_processor = EE_Registry::instance()->load_class( 'Transaction_Processor' );
		//set revisit flag in txn processor
		$transaction_processor->set_revisit( $this->checkout->revisit );
		// at this point we'll consider a TXN to not have been abandoned
		$this->checkout->transaction->toggle_abandoned_transaction_status();
		if ( $this->checkout->cart instanceof EE_Cart ) {
			// save TXN data to the cart
			$this->checkout->cart->get_grand_total()->save_this_and_descendants_to_txn(
				$this->checkout->transaction->ID()
			);
		}
		// maybe update status, but don't save transaction just yet
		$this->checkout->transaction->update_status_based_on_total_paid( false );
        // this will result in the base session properties getting saved to the TXN_Session_data field
		$this->checkout->transaction->set_txn_session_data(
			EE_Registry::instance()->SSN->get_session_data( null, true )
		);
        // update the TXN if payment conditions have changed, but do NOT trigger notifications,
        // because we will do that in process_reg_step() after setting some more triggers
		return $transaction_processor->update_transaction_and_registrations_after_checkout_or_payment(
			$this->checkout->transaction,
			$this->checkout->payment,
			$this->checkout->reg_cache_where_params,
            false
		);
	}



	/**
	 * If request is not a revisit, and an Off-Site gateway using IPNs has NOT been selected...
	 * OR
	 * if it IS a revisit and the TXN and/or one or more REG statuses have changed...
	 * then trigger notifications
	 *
	 * @return void
	 * @throws \EE_Error
	 */
	protected function _set_notification_triggers() {

		if ( $this->checkout->payment_method instanceof EE_Payment_Method ) {
		    // let's start with the assumption that we need to trigger notifications
            // then toggle this to false for conditions where we know we don't need to
		    $deliver_notifications = true;
            if (
                // if SPCO revisit
                filter_var($this->checkout->revisit, FILTER_VALIDATE_BOOLEAN)
                // and TXN or REG statuses have NOT changed due to a payment
                && ! (
                    $this->checkout->transaction->txn_status_updated()
                    || $this->checkout->any_reg_status_updated()
                )
            ) {
                $deliver_notifications = false;
            }
            if ($this->checkout->payment_method->is_off_site()) {
                /** @var EE_Gateway $gateway */
                $gateway = $this->checkout->payment_method->type_obj()->get_gateway();
                // and the gateway uses a separate request to process the IPN
                if (
                    $gateway instanceof EE_Offsite_Gateway
                    && $gateway->handle_IPN_in_this_request(\EE_Registry::instance()->REQ->params(), true)
                ) {
                    // IPN request will handle triggering notifications
                    $deliver_notifications = false;
                    // no really... don't send any notices in this request
                    remove_all_filters('FHEE__EED_Messages___maybe_registration__deliver_notifications');
                    add_filter(
                        'FHEE__EED_Messages___maybe_registration__deliver_notifications',
                        '__return_false',
                        15
                    );
                }
            }
            if ($deliver_notifications) {
                // send out notifications
                add_filter('FHEE__EED_Messages___maybe_registration__deliver_notifications', '__return_true', 10);
            }
		}
	}



	/**
	 * check if transaction has a primary registrant and that it has a related Attendee object
	 *
	 * @return boolean
	 * @throws \EE_Error
	 */
	protected function _validate_primary_registrant() {
		if ( ! $this->checkout->transaction_has_primary_registrant() ) {
			EE_Error::add_error(
				__( 'A valid Primary Registration for this Transaction could not be found.', 'event_espresso' ),
				__FILE__,
				__FUNCTION__,
				__LINE__
			);
			$this->checkout->redirect = false;
			$this->checkout->continue_reg = false;
			return false;
		}
		// setup URL for redirect
		$this->checkout->redirect_url = add_query_arg(
			array( 'e_reg_url_link' => $this->checkout->transaction->primary_registration()->reg_url_link() ),
			$this->checkout->thank_you_page_url
		);
		return true;
	}



	/**
	 * @return void
	 */
	public function update_reg_step() {
		EE_Error::doing_it_wrong(
			__CLASS__ . '::' . __FILE__,
			__(
				'Can not call update_reg_step() on the Finalize Registration reg step.',
				'event_espresso'
			),
			'4.6.0'
		);
	}



}
// End of file EE_SPCO_Reg_Step_Finalize_Registration.class.php
// Location: /EE_SPCO_Reg_Step_Finalize_Registration.class.php
