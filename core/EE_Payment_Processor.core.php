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
	 * Using the selected gateway, processes the payment for that transaction. 
	 * @param int $payment_method_id ID of the payment method to use
	 * @param EE_Transaction $transaction
	 * @param array $billing_info array of simple-key-value-pairs for cc details, billing address, etc
	 * @param string $success_url string used mostly by offsite gateways to specify where to go AFTER the offsite gateway
	 * @param string $fail_url similar to $success_url, except used by some gateways in case of failure
	 * @param string $method like 'CART', indicates who the client who called this was
	 * @param float $amount if only part of the transaction is to be paid for, how much. Leave null if payment is for the full amount owing
	 * @return EE_Payment
	 * @throws EE_Error
	 */
	public function process_payment($payment_method_id,$transaction, $billing_info = null, $success_url = null,$fail_url = null, $method = 'CART', $amount = null ){
		$payment = EE_Payment::new_instance(array(
								'TXN_ID' => $transaction->ID(),
								'STS_ID' => EEM_Payment::status_id_failed,
								'PAY_timestamp' => current_time('mysql',false),
								'PAY_method' => $method,
								'PAY_amount' => $amount !== NULL ? $amount : $transaction->total(),
								'PMD_ID' => $payment_method_name,
								'PAY_gateway_response' => $message,
								'PAY_txn_id_chq_nmbr' => isset( $PayPalResult['TRANSACTIONID'] )? $PayPalResult['TRANSACTIONID'] : null,
								'PAY_po_number' => NULL,
								'PAY_extra_accntng' => $primary_registration_code,
								'PAY_via_admin' => false,
								'PAY_details' => (array) $PayPalResult));
	}
	
	public function get_ipn_url_for_gateway($gateway_name){
		throw new EE_Error("gets the URL for the IPN");
	}
	/**
	 * Maybe we should pass in the name of the gateway used? That could be in the controller code too
	 * @return EE_Payment
	 * @throws EE_Error
	 */
	public function process_ipn(){
		throw new EE_Error("processing ipn should find the gateway from teh request, update the payment, and return it");
	}
	/**
	 * 
	 * @param type $payment_method_name
	 * @param type $payment_to_refund
	 * @param type $amount
	 * @return EE_Payment
	 */
	public function process_refund($payment_method_name,$payment_to_refund,$amount = null){
		throw new EE_Error("processing of refund not yet implemented. Should intake a payment object, then send off ot the gatewya for the refund, and be return the refund 'payment'");
	}
}
