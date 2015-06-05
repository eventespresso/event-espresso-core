<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
EE_Registry::instance()->load_class( 'Processor_Base' );
/**
 *
 * EE_Payment_Processor
 *
 * Class for handling processing of payments for transactions.
 *
 * @package			Event Espresso
 * @subpackage		core/libraries/payment_methods
 * @author			Mike Nelson
 *
 */
class EE_Payment_Processor extends EE_Processor_Base {
	/**
     * 	@var EE_Payment_Processor $_instance
	 * 	@access 	private
     */
	private static $_instance = NULL;



	/**
	 *@singleton method used to instantiate class object
	 *@access public
	 *@return EE_Payment_Processor instance
	 */
	public static function instance() {
		// check if class object is instantiated
		if ( ! self::$_instance instanceof EE_Payment_Processor ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}



	/**
	 *private constructor to prevent direct creation
	 *@Constructor
	 *@access private
	 *@return EE_Payment_Processor
	 */
	private function __construct() {
		do_action( 'AHEE__EE_Payment_Processor__construct' );
	}



	/**
	 * Using the selected gateway, processes the payment for that transaction, and updates
	 * the transaction appropriately. Saves the payment that is generated
	 * @param EE_Payment_Method 	$payment_method
	 * @param EE_Transaction 				$transaction
	 * @param float                					$amount 		if only part of the transaction is to be paid for, how much. Leave null if payment is for the full amount owing
	 * @param EE_Billing_Info_Form 		$billing_form 	(or probably null, if it's an offline or offsite payment method). receive_form_submission() should
	 *                                             										have already been called on the billing form (ie, its inputs should have their normalized values set).
	 * @param string               				$return_url 	string used mostly by offsite gateways to specify where to go AFTER the offsite gateway
	 * @param string               				$method 		like 'CART', indicates who the client who called this was
	 * @param bool                 				$by_admin
	 * @param boolean              				$update_txn  	whether or not to call EE_Transaction_Processor::update_transaction_and_registrations_after_checkout_or_payment()
	 * @return EE_Payment
	 */
	public function process_payment( EE_Payment_Method $payment_method, EE_Transaction $transaction, $amount = NULL, $billing_form = NULL, $return_url = NULL, $method = 'CART', $by_admin = FALSE, $update_txn = TRUE ) {
		// verify payment method
		$payment_method = EEM_Payment_Method::instance()->ensure_is_obj( $payment_method, TRUE );
		// verify transaction
		EEM_Transaction::instance()->ensure_is_obj( $transaction );
		$transaction->set_payment_method_ID( $payment_method->ID() );
		// verify payment method type
		if ( $payment_method->type_obj() instanceof EE_PMT_Base ){
			$payment = $payment_method->type_obj()->process_payment(
				$transaction,
				min( $amount, $transaction->remaining() ),//make sure we don't overcharge
				$billing_form,
				$return_url,
				add_query_arg( array( 'ee_cancel_payment' => true ), $return_url ),
				$method,
				$by_admin
			);
			// check if payment method uses an off-site gateway
			if ( $payment_method->type_obj()->payment_occurs() != EE_PMT_Base::offsite ) {
				// don't process payments for off-site gateways yet because no payment has occurred yet
				$this->update_txn_based_on_payment( $transaction, $payment, $update_txn );
			}
			return $payment;
		} else {
			EE_Error::add_error(
				sprintf(
					__( 'A valid payment method could not be determined due to a technical issue.%sPlease try again or contact %s for assistance.', 'event_espresso' ),
					'<br/>',
					EE_Registry::instance()->CFG->organization->get_pretty( 'email' )
				), __FILE__, __FUNCTION__, __LINE__
			);
			return NULL;
		}
	}



	/**
	 *
	 * @param EE_Transaction $transaction
	 * @param EE_Payment_Method 	$payment_method
	 * @throws EE_Error
	 * @return string
	 */
	public function get_ipn_url_for_payment_method( $transaction, $payment_method ){
		/** @type EE_Transaction $transaction */
		$transaction = EEM_Transaction::instance()->ensure_is_obj( $transaction );
		$primary_reg = $transaction->primary_registration();
		if( ! $primary_reg instanceof EE_Registration ){
			throw new EE_Error(sprintf(__("Cannot get IPN URL for transaction with ID %d because it has no primary registration", "event_espresso"),$transaction->ID()));
		}
		$payment_method = EEM_Payment_Method::instance()->ensure_is_obj($payment_method,true);
		$url = add_query_arg(
			array(
				'e_reg_url_link'=>$primary_reg->reg_url_link(),
				'ee_payment_method'=>$payment_method->slug()
			),
			EE_Registry::instance()->CFG->core->txn_page_url()
		);
		return $url;
	}



	/**
	 * Process the IPN. Firstly, we'll hope we put the standard args into the IPN URL so
	 * we can easily find what registration the IPN is for and what payment method.
	 * However, if not, we'll give all payment methods a chance to claim it and process it.
	 * If a payment is found for the IPN info, it is saved.
	 * @param 	$_req_data
	 * @param EE_Transaction    			$transaction    optional (or a transactions id)
	 * @param EE_Payment_Method 	$payment_method (or a slug or id of one)
	 * @param boolean           				$update_txn  	whether or not to call EE_Transaction_Processor::update_transaction_and_registrations_after_checkout_or_payment()
	 * @param bool $separate_IPN_request whether the IPN uses a separate request ( true like PayPal ) or is processed manually ( false like Mijireh )
	 * @throws EE_Error
	 * @throws Exception
	 * @return EE_Payment
	 */
	public function process_ipn( $_req_data, $transaction = NULL, $payment_method = NULL, $update_txn = true, $separate_IPN_request = true ){
		$_req_data = $this->_remove_unusable_characters( $_req_data );
		EE_Registry::instance()->load_model( 'Change_Log' );
		EE_Processor_Base::set_IPN( $separate_IPN_request );
		if( $transaction instanceof EE_Transaction && $payment_method instanceof EE_Payment_Method ){
			$obj_for_log = EEM_Payment::instance()->get_one( array( array( 'TXN_ID' => $transaction->ID(), 'PMD_ID' => $payment_method->ID() ), 'order_by' => array( 'PAY_timestamp' => 'desc' ) ) );
		}elseif( $payment_method instanceof EE_Payment ){
			$obj_for_log = $payment_method;
		}elseif( $transaction instanceof EE_Transaction ){
			$obj_for_log = $transaction;
		}else{
			$obj_for_log = null;
		}
		$log = EEM_Change_Log::instance()->log(EEM_Change_Log::type_gateway, array('IPN data received'=>$_req_data), $obj_for_log);
		try{
			/**
			 * @var EE_Payment $payment
			 */
			$payment = NULL;
			if($transaction && $payment_method){
				/** @type EE_Transaction $transaction */
				$transaction = EEM_Transaction::instance()->ensure_is_obj($transaction);
				/** @type EE_Payment_Method $payment_method */
				$payment_method = EEM_Payment_Method::instance()->ensure_is_obj($payment_method);
				if ( $payment_method->type_obj() instanceof EE_PMT_Base ) {
						$payment = $payment_method->type_obj()->handle_ipn( $_req_data, $transaction );
						$log->set_object($payment);
				} else {
					// not a payment
					EE_Error::add_error(
						sprintf(
							__( 'A valid payment method could not be determined due to a technical issue.%sPlease refresh your browser and try again or contact %s for assistance.', 'event_espresso' ),
							'<br/>',
							EE_Registry::instance()->CFG->organization->get_pretty( 'email' )
						),
						__FILE__, __FUNCTION__, __LINE__
					);
				}
			}else{
				//that's actually pretty ok. The IPN just wasn't able
				//to identify which transaction or payment method this was for
				// give all active payment methods a chance to claim it
				$active_pms = EEM_Payment_Method::instance()->get_all_active();
				foreach( $active_pms as $payment_method ){
					try{
						$payment = $payment_method->type_obj()->handle_unclaimed_ipn( $_req_data );
						EEM_Change_Log::instance()->log(EEM_Change_Log::type_gateway, array('IPN data'=>$_req_data), $payment);
						break;
					} catch( EE_Error $e ) {
						//that's fine- it apparently couldn't handle the IPN
					}
				}

			}
// 			EEM_Payment_Log::instance()->log("got to 7",$transaction,$payment_method);
			if( $payment instanceof EE_Payment){
				$payment->save();
				//  update the TXN
				$this->update_txn_based_on_payment( $transaction, $payment, $update_txn, $separate_IPN_request );
			}else{
				//we couldn't find the payment for this IPN... let's try and log at least SOMETHING
				if($payment_method){
					EEM_Change_Log::instance()->log(EEM_Change_Log::type_gateway, array('IPN data'=>$_req_data), $payment_method);
				}elseif($transaction){
					EEM_Change_Log::instance()->log(EEM_Change_Log::type_gateway, array('IPN data'=>$_req_data), $transaction);
				}
			}
			return $payment;

		} catch( EE_Error $e ) {
			do_action(
				'AHEE__log', __FILE__, __FUNCTION__, sprintf(
					"Error occurred while receiving IPN. Transaction: %s, req data: %s. The error was '%s'",
					print_r( $transaction, TRUE ),
					print_r( $_req_data, TRUE ),
					$e->getMessage()
				)
			);
			throw $e;
		}
	}

	/**
	 * Removes any non-printable illegal characters from the input, which might cause a raucus
	 * when trying to insert into the database
	 * @param type $request_data
	 * @return array|string
	 */
	protected function _remove_unusable_characters( $request_data ) {
		if( is_array( $request_data ) ) {
			$return_data = array();
			foreach( $request_data as $key => $value ) {
				$return_data[ $this->_remove_unusable_characters( $key ) ] = $this->_remove_unusable_characters( $value );
			}
		}else{
			$return_data =  preg_replace('/[^[:print:]]/', '', $request_data);
		}
		return $return_data;
	}



	/**
	 * Should be called just before displaying the payment attempt results to the user,
	 * when the payment attempt has finished. Some payment methods may have special
	 * logic to perform here. For example, if process_payment() happens on a special request
	 * and then the user is redirected to a page that displays the payment's status, this
	 * should be called while loading the page that displays the payment's status. If the user is
	 * sent to an offsite payment provider, this should be called upon returning from that offsite payment
	 * provider.
	 *
	 * @param EE_Transaction | int $transaction
	 * @param bool 	$update_txn  whether or not to call EE_Transaction_Processor::update_transaction_and_registrations_after_checkout_or_payment()
	 * @throws \EE_Error
	 * @return EE_Payment
	 * @deprecated 4.6.24 method is no longer used. Instead it is up to client code, like SPCO, to call handle_ipn() for offsite gateways that don't receive separate IPNs
	 */
	public function finalize_payment_for( $transaction, $update_txn = TRUE ){
		/** @var $transaction EE_Transaction */
		$transaction = EEM_Transaction::instance()->ensure_is_obj( $transaction );
		$last_payment_method = $transaction->payment_method();
		if ( $last_payment_method instanceof EE_Payment_Method ) {
			$payment = $last_payment_method->type_obj()->finalize_payment_for( $transaction );
			$this->update_txn_based_on_payment( $transaction, $payment, $update_txn );
			return $payment;
		} else {
			return NULL;
		}
	}



	/**
	 * Processes a direct refund request, saves the payment, and updates the transaction appropriately.
	 * @param EE_Payment_Method $payment_method
	 * @param EE_Payment        $payment_to_refund
	 * @param array             $refund_info
	 * @internal param float $amount
	 * @return EE_Payment
	 */
	public function process_refund( $payment_method, $payment_to_refund, $refund_info = array() ){
		/** @type EE_Payment_Method $payment_method */
		$payment_method = EEM_Payment_Method::instance()->ensure_is_ID($payment_method);
		if ( $payment_method->type_obj()->supports_sending_refunds() ) {
			$payment_method->do_direct_refund( $payment_to_refund,$refund_info );
			$this->update_txn_based_on_payment( $payment_to_refund->transaction(), $payment_to_refund );
		}
		return $payment_to_refund;
	}



	/**
	 * This should be called each time there may have been an update to a
	 * payment on a transaction (ie, we asked for a payment to process a
	 * payment for a transaction, or we told a payment method about an IPN, or
	 * we told a payment method to
	 * "finalize_payment_for" (a transaction), or we told a payment method to
	 * process a refund. This should handle firing the correct hooks to
	 * indicate
	 * what exactly happened and updating the transaction appropriately). This
	 * could be integrated directly into EE_Transaction upon save, but we want
	 * this logic to be separate from 'normal' plain-jane saving and updating
	 * of transactions and payments, and to be tied to payment processing.
	 *
	 * Note: this method DOES NOT save the payment passed into it. It is the responsibility
	 * of previous code to decide whether or not to save (because the payment passed into
	 * this method might be a temporary, never-to-be-saved payment from an offline gateway,
	 * in which case we only want that payment object for some temporary usage during this request,
	 * but we don't want it to be saved).
	 *
	 * @param EE_Transaction $transaction
	 * @param EE_Payment     $payment
	 * @param boolean        $update_txn
	 *                        whether or not to call
	 *                        EE_Transaction_Processor::
	 *                        update_transaction_and_registrations_after_checkout_or_payment()
	 *                        (you can save 1 DB query if you know you're going
	 *                        to save it later instead)
	 * @param bool           $IPN
	 *                        if processing IPNs or other similar payment
	 *                        related activities that occur in alternate
	 *                        requests than the main one that is processing the
	 *                        TXN, then set this to true to check whether the
	 *                        TXN is locked before updating
	 * @throws \EE_Error
	 */
	public function update_txn_based_on_payment( $transaction, $payment, $update_txn = true, $IPN = false ){
		$do_action = 'AHEE__EE_Payment_Processor__update_txn_based_on_payment__not_successful';
		/** @type EE_Transaction $transaction */
		$transaction = EEM_Transaction::instance()->ensure_is_obj( $transaction );
		// can we freely update the TXN at this moment?
		if ( $IPN && $transaction->is_locked() ) {
			// don't update the transaction at this exact moment
			// because the TXN is active in another request
			EE_Cron_Tasks::schedule_update_transaction_with_payment(
				time(),
				$transaction->ID(),
				$payment
			);
		} else {
			// verify payment and that it has been saved
			if ( $payment instanceof EE_Payment && $payment->ID() ) {
				if( $payment->payment_method() instanceof EE_Payment_Method && $payment->payment_method()->type_obj() instanceof EE_PMT_Base ){
					$payment->payment_method()->type_obj()->update_txn_based_on_payment( $payment );
					// update TXN registrations with payment info
					$this->process_registration_payments( $transaction, $payment );
				}
				$do_action = $payment->just_approved() ? 'AHEE__EE_Payment_Processor__update_txn_based_on_payment__successful' : $do_action;
			} else {
				// send out notifications
				add_filter( 'FHEE__EED_Messages___maybe_registration__deliver_notifications', '__return_true' );
				$do_action = 'AHEE__EE_Payment_Processor__update_txn_based_on_payment__no_payment_made';
			}
			// if this is an IPN, then we want to know the initial TXN status prior to updating the TXN
			// so that we know whether the status has changed and notifications should be triggered
			if ( $IPN ) {
				/** @type EE_Transaction_Processor $transaction_processor */
				$transaction_processor = EE_Registry::instance()->load_class( 'Transaction_Processor' );
				$transaction_processor->set_old_txn_status( $transaction->status_ID() );
			}
			if ( $payment->status() !== EEM_Payment::status_id_failed ) {
				/** @type EE_Transaction_Payments $transaction_payments */
				$transaction_payments = EE_Registry::instance()->load_class( 'Transaction_Payments' );
				// set new value for total paid
				$transaction_payments->calculate_total_payments_and_update_status( $transaction );
				// call EE_Transaction_Processor::update_transaction_and_registrations_after_checkout_or_payment() ???
				if ( $update_txn ) {
					$this->_post_payment_processing( $transaction, $payment, $IPN );
				}
			}
			// granular hook for others to use.
			do_action( $do_action, $transaction, $payment );
			//global hook for others to use.
			do_action( 'AHEE__EE_Payment_Processor__update_txn_based_on_payment', $transaction, $payment );
		}
	}



	/**
	 * update registrations REG_paid field after successful payment and link registrations with payment
	 *
	 * @param EE_Transaction $transaction
	 * @param EE_Payment $payment
	 * @param EE_Registration[] $registrations
	 * @throws \EE_Error
	 */
	public function process_registration_payments( EE_Transaction $transaction, EE_Payment $payment, $registrations = array() ) {
		// only process if payment was successful
		if ( $payment->status() !== EEM_Payment::status_id_approved ) {
			return;
		}
		//EEM_Registration::instance()->show_next_x_db_queries();
		if ( empty( $registrations )) {
			// find registrations with monies owing that can receive a payment
			$registrations = $transaction->registrations( array(
				array(
					// only these reg statuses can receive payments
					'STS_ID'  => array( 'IN', EEM_Registration::reg_statuses_that_allow_payment() ),
					'REG_final_price'  => array( '!=', 0 ),
					'REG_final_price*' => array( '!=', 'REG_paid', true ),
				)
			) );
		}
		// still nothing ??!??
		if ( empty( $registrations )) {
			return;
		}

		// todo: break out the following logic into a separate strategy class
		// todo: named something like "Sequential_Reg_Payment_Strategy"
		// todo: which would apply payments using the capitalist "first come first paid" approach
		// todo: then have another strategy class like "Distributed_Reg_Payment_Strategy"
		// todo: which would be the socialist "everybody gets a piece of pie" approach,
		// todo: which would be better for deposits, where you want a bit of the payment applied to each registration

		$refund = $payment->is_a_refund();
		// how much is available to apply to registrations?
		$available_payment_amount = abs( $payment->amount() );
		//EEH_Debug_Tools::printr( $available_payment_amount, '$available_payment_amount', __FILE__, __LINE__ );
		foreach ( $registrations as $registration ) {
			if ( $registration instanceof EE_Registration ) {
				// nothing left?
				if ( $available_payment_amount <= 0 ) {
					break;
				}
				if ( $refund ) {
					$available_payment_amount = $this->process_registration_refund( $registration, $payment, $available_payment_amount );
				} else {
					$available_payment_amount = $this->process_registration_payment( $registration, $payment, $available_payment_amount );
				}
			}
		}
	}



	/**
	 * update registration REG_paid field after successful payment and link registration with payment
	 *
	 * @param EE_Registration $registration
	 * @param EE_Payment $payment
	 * @param float $available_payment_amount
	 * @return float
	 */
	public function process_registration_payment( EE_Registration $registration, EE_Payment $payment, $available_payment_amount = 0.00 ) {
		$owing = $registration->final_price() - $registration->paid();
		//EEH_Debug_Tools::printr( $owing, '$owing', __FILE__, __LINE__ );
		//EEH_Debug_Tools::printr( $payment->amount(), '$payment->amount()', __FILE__, __LINE__ );
		if ( $owing > 0 ) {
			// don't allow payment amount to exceed the available payment amount, OR the amount owing
			$payment_amount = min( $available_payment_amount, $owing );
			// update $available_payment_amount
			$available_payment_amount = $available_payment_amount - $payment_amount;
			//calculate and set new REG_paid
			$registration->set_paid( $registration->paid() + $payment_amount );
			// now save it
			$this->_apply_registration_payment( $registration, $payment, $payment_amount );
		}
		return $available_payment_amount;
	}



	/**
	 * update registration REG_paid field after successful payment and link registration with payment
	 *
	 * @param EE_Registration $registration
	 * @param EE_Payment $payment
	 * @param float $payment_amount
	 * @return float
	 */
	protected function _apply_registration_payment( EE_Registration $registration, EE_Payment $payment, $payment_amount = 0.00 ) {
		// find any existing reg payment records for this registration and payment
		$existing_reg_payment = EEM_Registration_Payment::instance()->get_one(
			array( array( 'REG_ID' => $registration->ID(), 'PAY_ID' => $payment->ID() ) )
		);
		// if existing registration payment exists
		if ( $existing_reg_payment instanceof EE_Registration_Payment ) {
			// then update that record
			$existing_reg_payment->set_amount( $payment_amount );
			$existing_reg_payment->save();
		} else {
			// or add new relation between registration and payment and set amount
			$registration->_add_relation_to( $payment, 'Payment', array( 'RPY_amount' => $payment_amount ) );
			// make it stick
			$registration->save();
		}
	}



	/**
	 * update registration REG_paid field after refund and link registration with payment
	 *
	 * @param EE_Registration $registration
	 * @param EE_Payment $payment
	 * @param float $available_refund_amount - IMPORTANT !!! SEND AVAILABLE REFUND AMOUNT AS A POSITIVE NUMBER
	 * @return float
	 */
	public function process_registration_refund( EE_Registration $registration, EE_Payment $payment, $available_refund_amount = 0.00 ) {
		//EEH_Debug_Tools::printr( $payment->amount(), '$payment->amount()', __FILE__, __LINE__ );
		if ( $registration->paid() > 0 ) {
			// ensure $available_refund_amount is NOT negative
			$available_refund_amount = abs( $available_refund_amount );
			// don't allow refund amount to exceed the available payment amount, OR the amount paid
			$refund_amount = min( $available_refund_amount, $registration->paid() );
			// update $available_payment_amount
			$available_refund_amount = $available_refund_amount - $refund_amount;
			//calculate and set new REG_paid
			$registration->set_paid( $registration->paid() - $refund_amount );
			// convert payment amount back to a negative value for storage in the db
			$refund_amount = abs( $refund_amount ) * -1;
			// now save it
			$this->_apply_registration_payment( $registration, $payment, $refund_amount );
		}
		return $available_refund_amount;
	}



	/**
	 * Process payments and transaction after payment process completed.
	 * ultimately this will send the TXN and payment details off so that notifications can be sent out.
	 * if this request happens to be processing an IPN,
	 * then we will also set the Payment Options Reg Step to completed,
	 * and attempt to completely finalize the TXN if all of the other Reg Steps are completed as well.
	 *
	 * @param EE_Transaction $transaction
	 * @param EE_Payment     $payment
	 * @param bool           $IPN
	 */
	protected function _post_payment_processing( EE_Transaction $transaction, EE_Payment $payment, $IPN = false ) {

		/** @type EE_Transaction_Processor $transaction_processor */
		$transaction_processor = EE_Registry::instance()->load_class( 'Transaction_Processor' );
		// is the Payment Options Reg Step completed ?
		$payment_options_step_completed = $transaction_processor->reg_step_completed( $transaction, 'payment_options' );
		// DEBUG LOG
		//$this->log(
		//	__CLASS__, __FUNCTION__, __LINE__,
		//	$transaction,
		//	array(
		//		'IPN'             => $IPN,
		//		'payment_options' => $payment_options_step_completed,
		//	)
		//);
		// if the Payment Options Reg Step is completed...
		$revisit = $payment_options_step_completed === true ? true : false;
		// then this is kinda sorta a revisit with regards to payments at least
		$transaction_processor->set_revisit( $revisit );
		// if this is an IPN, let's consider the Payment Options Reg Step completed if not already
		if (
			$IPN &&
			$payment_options_step_completed !== true &&
			( $payment->is_approved() || $payment->is_pending() )
		) {
			$payment_options_step_completed = $transaction_processor->set_reg_step_completed( $transaction, 'payment_options' );
		}
		// DEBUG LOG
		//$this->log(
		//	__CLASS__, __FUNCTION__, __LINE__,
		//	$transaction,
		//	array(
		//		'IPN'             => $IPN,
		//		'payment_options' => $payment_options_step_completed,
		//	)
		//);
		/** @type EE_Transaction_Payments $transaction_payments */
		$transaction_payments = EE_Registry::instance()->load_class( 'Transaction_Payments' );
		// maybe update status, but don't save transaction just yet
		$transaction_payments->update_transaction_status_based_on_total_paid( $transaction, false );
		// check if 'finalize_registration' step has been completed...
		$finalized = $transaction_processor->reg_step_completed( $transaction, 'finalize_registration' );
		// DEBUG LOG
		//$this->log(
		//	__CLASS__, __FUNCTION__, __LINE__,
		//	$transaction,
		//	array(
		//		'IPN'       => $IPN,
		//		'finalized' => $finalized,
		//	)
		//);
		//  if this is an IPN and the final step has not been initiated
		if ( $IPN && $payment_options_step_completed && $finalized === false ) {
			// and if it hasn't already been set as being started...
			$finalized = $transaction_processor->set_reg_step_initiated( $transaction, 'finalize_registration' );
			// DEBUG LOG
			//$this->log(
			//	__CLASS__, __FUNCTION__, __LINE__,
			//	$transaction,
			//	array(
			//		'IPN'                   => $IPN,
			//		'finalized'             => $finalized,
			//	)
			//);
		}
		$transaction->save();
		// because the above will return false if the final step was not fully completed, we need to check again...
		if ( $IPN && $finalized !== false ) {
			// and if we are all good to go, then send out notifications
			add_filter( 'FHEE__EED_Messages___maybe_registration__deliver_notifications', '__return_true' );
			// DEBUG LOG
			//$this->log( __CLASS__, __FUNCTION__, __LINE__, $transaction );
			//ok, now process the transaction according to the payment
			$transaction_processor->update_transaction_and_registrations_after_checkout_or_payment( $transaction, $payment );
		}
		// DEBUG LOG
		//$this->log(
		//	__CLASS__, __FUNCTION__, __LINE__,
		//	$transaction,
		//	array(
		//		'IPN'  => $IPN,
		//		'finalized' => $finalized,
		//		'payment' => $payment,
		//		'payment_method' => $payment->payment_method() instanceof EE_Payment_Method ? $payment->payment_method
		//()->name() : 'off-line',
		//		'deliver_notifications' => has_filter( 'FHEE__EED_Messages___maybe_registration__deliver_notifications' ),
		//	)
		//);
	}



 }
