<?php
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Payment_Processor
 *
 * CLass for handling processing of payments for transactions.
 *
 * @package			Event Espresso
 * @subpackage		core/libraries/payment_methods
 * @author			Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Payment_Processor{
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
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! ( self::$_instance instanceof EE_Data_Migration_Manager )) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}



	/**
	 *private constructor to prevent direct creation
	 *@Constructor
	 *@access private
	 *@return void
	 */	
	private function __construct() {
		do_action( 'AHEE__EE_Payment_Processor__construct' );
	}



	/**
	 * Using the selected gateway, processes the payment for that transaction. 
	 * @param int $payment_method ID of the payment method to use
	 * @param EE_Transaction $transaction
	 * @param float $amount if only part of the transaction is to be paid for, how much. Leave null if payment is for the full amount owing
	 * @param EE_Billing_Info_Form $billing_form (or probably null, if it's an offline or offsite payment method). receive_form_submission() should
	 * have already been called on the billing form (ie, its inputs should have their normalized values set).
	 * @param string $success_url string used mostly by offsite gateways to specify where to go AFTER the offsite gateway
	 * @param string $method like 'CART', indicates who the client who called this was
	 * @param boolean $save_txn whether or not to save the transaction as part of this function call
	 * @return EE_Payment
	 * @throws EE_Error (espeically if the specified payment method's type is no longer defined)
	 */
	public function process_payment( $payment_method, $transaction, $amount = NULL, $billing_form = NULL, $success_url = NULL, $method = 'CART', $by_admin = FALSE, $save_txn = true ) {
		//overwrite billing info for testing
//		$billing_info = array(
//			'first_name'=>'payman',
//			'last_name'=>'lordy',
//			'email'=>'few@fewf.efw',
//			'address'=>'1124 wonky rd',
//			'address2'=>'#32',
//			'city'=>'powerlo',
//			'state'=>'ark',
//			'country'=>'US',
//			'zip'=>'12345',
//			'phone'=>'2503242342',
//			'credit_card'=>'5424180818927383',
//			'credit_card_type'=>'MasterCard',
//			'exp_month'=>'02',
//			'exp_year'=>'2020',
//			'cvv'=>'115',
//		);
		$payment_method = EEM_Payment_Method::instance()->ensure_is_obj( $payment_method, TRUE );
		EEM_Transaction::instance()->ensure_is_obj( $transaction );
		$transaction->set_payment_method_ID($payment_method->ID());
		if($payment_method->type_obj() && $payment_method->type_obj() instanceof EE_PMT_Base){
			$payment = $payment_method->type_obj()->process_payment( $transaction, $amount, $billing_form, $success_url, $method, $by_admin );
			if ( empty( $payment )) {
				$transaction->set_status( EEM_Transaction::incomplete_status_code );
				if($save_txn) $transaction->save();
			do_action( 'AHEE__EE_Payment_Processor__process_payment__no_payment_made', $transaction );
			
			} else {
				$payment = EEM_Payment::instance()->ensure_is_obj( $payment, TRUE );
				//ok, now process the transaction according to the payment
				$transaction->update_based_on_payments($save_txn);//also saves transaction
				do_action( 'AHEE__EE_Payment_Processor__process_payment__successful', $transaction, $payment );
			}
		}else{
			EE_Error::add_error( 
					sprintf( 
						__( 'A valid payment method could not be determined due to a technical issue.%sPlease try again or contact %s for assistance.', 'event_espresso' ),
						'<br/>',
						EE_Registry::instance()->CFG->organization->email 
					), __FILE__, __FUNCTION__, __LINE__ 
				);	
		}
		
		return $payment;
	}

	/**
	 * 
	 * @param EE_Transaction $transaction
	 * @param type $payment_method
	 */
	public function get_ipn_url_for_payment_method($transaction, $payment_method){
		$transaction = EEM_Transaction::instance()->ensure_is_obj($transaction);
		$primary_reg = $transaction->primary_registration();
		if( ! $primary_reg ){
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
	 * we can easily find what registration the IPN is for and what paymetn method.
	 * However, if not, we'll give all payment methods a chance to claim it and process it.
	 * @param EE_Transaction $transaction optional (or a transactions id)
	 * @param EE_Payment_Method $payment_method (or a slug or id of one)
	 * @param boolean $save_txn whether to save the associated transaction or not
	 * @return EE_Payment
	 * @throws EE_Error
	 */
	public function process_ipn( $_req_data, $transaction = NULL, $payment_method = NULL, $save_txn = true ){
		//do_action('AHEE__log',__FILE__,__FUNCTION__,  sprintf("Logged IPN for payment method %s, registration_url_link '%s'", ))
		EEM_Payment_Log::instance()->log("processing ipn. raw request data sent:".print_r($_req_data,true), $transaction,$payment_method);
		try{
			/**
			 * @var EE_Payment $payment
			 */
			$payment = NULL;
			if($transaction && $payment_method){
				$transaction = EEM_Transaction::instance()->ensure_is_obj($transaction);
				$payment_method = EEM_Payment_Method::instance()->ensure_is_obj($payment_method);
				if ( $payment_method->type_obj() instanceof EE_PMT_Base ) {
						$payment = $payment_method->type_obj()->handle_ipn( $_req_data, $transaction );
				} else {
					// not a payment
					EE_Error::add_error( 
						sprintf( 
							__( 'A valid payment method could not be determined due to a technical issue.%sPlease refresh your browser and try again or contact %s for assistance.', 'event_espresso' ),
							'<br/>',
							EE_Registry::instance()->CFG->organization->email 
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
						break;
					} catch( EE_Error $e ) {
						//that's fine- it apparently couldn't handle the IPN
					}
				}
				
			}
// 			EEM_Payment_Log::instance()->log("got to 7",$transaction,$payment_method);
			if($payment && $payment instanceof EE_Payment){
				$payment->save();
				if($save_txn){
					$payment->transaction()->update_based_on_payments();
				}
			}
			return $payment;
			
		} catch( EE_Error $e ) {
			do_action(
				'AHEE__log', __FILE__, __FUNCTION__, sprintf(
					"Error occured while receiving IPN. Transaction: %s, req data: %s. The error was '%s'",
					print_r( $transaction, TRUE ),
					print_r( $_req_data, TRUE ),
					$e->getMessage()
				)
			);
			throw $e;
		}
	}
	/**
	 * Should be called just before displaying the payment attempt results to the user, 
	 * when the payment attempt has finished. Some payment methods may have special
	 * logic to perform here. For example, if process_payment() happens on a special request 
	 * and then the user is redirected to a page that displays the payment's status, this
	 * should be called while loading the page that displays the payment's status. If the user is
	 * sent to an offsite paymetn provider, this should be called upon returning from that offsite payment
	 * provider.
	 * @param EE_Transaction $transaction
	 * @return void
	 */
	public function finalize_payment_for($transaction){
		$transaction = EEM_Transaction::instance()->ensure_is_obj($transaction);
		$last_payment_method = $transaction->payment_method();
		if ( $last_payment_method instanceof EE_Payment_Method ) {
			$last_payment_method->type_obj()->finalize_payment_for($transaction);
		}
	}
	/**
	 * 
	 * @param EE_Payment_Method $payment_method
	 * @param type $payment_to_refund
	 * @param type $amount
	 * @return EE_Payment
	 */
	public function process_refund($payment_method,$payment_to_refund,$refund_info = array()){
		$payment_method = EEM_Payment_Method::instance()->ensure_is_ID($payment_method);
		if($payment_method->type_obj()->supports_sending_refunds()){
			$payment_method->do_direct_refund($payment_to_refund,$refund_info);
		}
	}
}
