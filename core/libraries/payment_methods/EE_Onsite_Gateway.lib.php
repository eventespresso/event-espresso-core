<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
class EE_Onsite_Gateway extends EE_Gateway{
	public function __construct() {
		$this->_supports_sending_refunds = true;
		parent::__construct();
	}
	/**
	 * Asks the gateway to do whatever it does to process the payment. Onsite gateways will
	 * usually send a request directly to the payment provider and update the payment's status based on that;
	 * whereas offsite gateways will usually just update the payment with the URL and query parameters to use
	 * for sending the request via http_remote_request()
	 * @param EE_Payment $payment
	 * @param array $billing_info
	 * @return EE_Payment updated
	 */
	public abstract function do_direct_payment($payment,$billing_info = null);
	/**
	 * Tries to refund the payment specified. Note: 
	 * @param type $payment
	 * @param type $refund_info
	 * @return EE_Payment for the refund
	 * @throws EE_Error
	 */
	public abstract function do_direct_refund($payment,$refund_info);
}
