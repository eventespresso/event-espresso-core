<?php

/*
 * For gateways which mostly just perform a redirect to the payment provider and then
 * receive some kind of IPN
 */
class EE_Offsite_Gateway extends EE_Gateway{
	public function __construct() {
		$this->_supports_receiving_refunds = true;
		parent::__construct();
	}
	public abstract function set_redirection_info($payment,$billing_info = array());
	/**
	 * Often used for IPNs. But applies the info in $update_info to the payment.
	 * What is $update_info? Often the contents of $_REQUEST, but not necessarily. Whatever
	 * the payment method passes in.
	 * @param EE_Payment $payment
	 * @param array $update_info of whatever
	 * @return EE_Payment updated
	 */
	public abstract function handle_payment_update($payment,$update_info);
}
