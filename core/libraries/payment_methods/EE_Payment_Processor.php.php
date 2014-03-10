<?php

/*
 * CLass for handling processing of payments for transactions.
 * 
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
	 * @param string $payment_method_name
	 * @param EE_Transaction $transaction
	 * @param float $amount if only part of the transaction is to be paid for, how much. Leave null if payment is for the full amount owing
	 * @param array $billing_info array of simple-key-value-pairs for cc details, billing address, etc
	 * @param string $success_url string used mostly by offsite gateways to specify where to go AFTER the offsite gateway
	 * @param string $fail_url similar to $success_url, except used by some gateways in case of failure
	 * @return EE_Payment
	 * @throws EE_Error
	 */
	public function process_payment($payment_method_name,$transaction, $amount = null,$billing_info = null, $success_url = null,$fail_url = null){
		throw new EE_Error("processing of payments not yet finished. But it shoudl return an EE_Payment");
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
