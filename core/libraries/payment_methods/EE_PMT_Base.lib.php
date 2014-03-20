<?php 
abstract class EE_PMT_Base{
	/**
	 *
	 * @var EE_Payment_Method
	 */
	protected $_pm_instance = NULL;
	/**
	 **
	 * @var boolean
	 */
	protected $_requires_https = FALSE;
	/** @var EE_Gateway */
	protected $_gateway = NULL;
	/**
	 * @var EE_Form_Section_Proper
	 */
	protected $_settings_form = NULL;
	/** 
	 * @var EE_Form_Section_Proper
	 */
	protected $_billing_form = NULL;
	/**
	 * 
	 * @param EE_Payment_Method $pm_instance
	 */
	function __construct($pm_instance) {
		$this->_pm_instance = $pm_instance;
		if($this->_gateway && $this->_gateway instanceof EE_Gateway){
			$this->_gateway->_set_settings($pm_instance->settings_array());
		}
	}
	//two forms
	//requires https
	//how to get gateway
	//functions
	
	/**
	 * Gets teh form for displaying to admins where they setup the payment method
	 * @return EE_Form_Section_Proper
	 */
	function settings_form(){
		return $this->_settings_form;
	}
	/**
	 * Gets the form for displaying to attendees where they can enter their billing info
	 * which will be sent to teh gateway (can be null)
	 * @return EE_Form_Section_Proper
	 */
	function billing_form(){
		return $this->_billing_form;
	}
	/**
	 * Returns whether or not this payment method requires HTTPS to be used
	 * @return boolean
	 */
	function requires_https(){
		return $this->_requires_https;
	}
	/**
	 * 
	 * @param EE_Transaction $transaction
	 * @param type $billing_info
	 * @param type $success_url
	 * @param type $fail_url
	 * @param type $method
	 * @param type $by_admin
	 * @param type $amount
	 * @throws EE_Error
	 */
	function process_payment($transaction, $billing_info = null, $success_url = null,$fail_url = null, $method = 'CART', $by_admin = false, $amount = null ){
		//@todo: add surcharge for the payment method, if any
		if($this->_gateway){
			//there is a gateway, so we're going to create a payment object
			$payment = EE_Payment::new_instance(array(
								'TXN_ID' => $transaction->ID(),
								'STS_ID' => EEM_Payment::status_id_failed,
								'PAY_timestamp' => current_time('mysql',false),
								'PAY_method' => $method,
								'PAY_amount' => $amount !== NULL ? $amount : $transaction->total(),
								'PMD_ID' => $this->_pm_instance->ID(),
								'PAY_gateway_response' => '',
								'PAY_txn_id_chq_nmbr' => NULL,
								'PAY_po_number' => NULL,
								'PAY_extra_accntng' => NULL,
								'PAY_via_admin' => $by_admin,
								'PAY_details' => NULL));
			if($this->_gateway instanceof EE_Offsite_Gateway){
				$payment = $this->_gateway->set_redirection_info($payment,$billing_info,$success_url,$fail_url);
			}elseif($this->_gateway instanceof EE_Onsite_Gateway){
				$payment = $this->_gateway->do_direct_payment($payment,$billing_info);
				$payment->save();
				$transaction->update_based_on_payments();//also saves transaction
				$transaction->finalize();
			}else{
				throw new EE_Error(sprintf(__("Gateway for payment method type '%s' is '%s', not a subclass of either EE_Offsite_Gateway or EE_Onsite_Gateway, or NULL (to indicate NO gateway)", "event_espresso"),get_class($this),typeof($this->_gateway)));
			}
		}else{//no gateway provided
			//so create no payment. The payment processor will know how to handle this
		}
		return $payment;
	}
	/**
	 * Handles an instant payment notification when the transaction is known (by default).
	 * @param array $req_data
	 * @param EE_Transaction $transaction
	 * @return EE_Payment
	 * @throws EE_Error
	 */
	public function handle_ipn($req_data,$transaction){
		$transaction = EEM_Transaction::instance()->ensure_is_obj($transaction);
		if( ! $this->_gateway instanceof EE_Offsite_Gateway){
			throw new EE_Error(sprintf(__("Could not handle IPN because '%s' is not an offsite gateway", "event_espresso"),print_r($this->_gatewaymtrue)));
			
		}
		$payment = $transaction->last_payment();
		$payment = $this->_gateway->handle_payment_update($req_data,$payment,$this->_pm_instance->settings_array());
		return $payment;
	}
	
	/**
	 * In case generic code cannot provide the paymetn processor with a specific payment method
	 * and transaction, it will try calling this method on each activate payment method.
	 * If the payment method is able to identify the request as being for it, it should fetch
	 * the payment its for and return it. If not, it should throw an EE_Error to indicate it cannot 
	 * handle the IPN
	 * @param array $req_data
	 * @return EE_Payment only if this payment method can find the info its needs from $req_data
	 * and identifies the IPN as being for this paymetn method (not just fo ra paymetn method of this type)
	 * @throws EE_Error
	 */
	public function handle_unclaimed_ipn($req_data){
		throw new EE_Error(sprintf(__("Payment Method '%s' cannot handle unclaimed ipns", "event_espresso"),get_class($this)));
	}
	/**
	 * Logic to be accomplished when the payment attempt is complete.
	 * Most payment methods don't need to do anything at this point; but some, like Mijireh, do.
	 * (Mijireh is an offsite gateway which doesn't send an IPN. So when the user returns to EE from
	 * mijireh, this method needs to be called so the Mijireh PM can ping Mijireh to know the status
	 * of the payment). Fed a transaction because it's always assumed to be the last payment that
	 * 
	 * @param EE_Transaction $transaction
	 * @return void
	 */
	public function finalize_payment_for($transaction){
	}
	
	/**
	 * Whether or not this payment method's gateway supports sending refund requests
	 * @return boolean
	 */
	public function supports_sending_refunds(){
		if($this->_gateway && $this->_gateway instanceof EE_Gateway){
			return $this->_gateway->supports_sending_refunds();
		}else{
			return false;
		}
	}
	/**
	 * 
	 * @param type $payment
	 * @param type $refund_info
	 * @return EE_Payment
	 */
	public function process_refund($payment, $refund_info = array()){
		if($this->_gateway && $this->_gateway instanceof EE_Gateway){
			return $this->_gateway->do_direct_refund();
		}else{
			throw new EE_Error(sprintf(__("Payment Method Type '%s' does not support sending refund requests", "event_espresso"),get_class($this)));
		}
	}
}