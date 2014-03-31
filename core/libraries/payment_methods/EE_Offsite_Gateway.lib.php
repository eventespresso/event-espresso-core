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
 * @ version		 	4.2
 *
 * ------------------------------------------------------------------------
 *
 * EE_Offsite_Gateway
 *
 * For gateways which mostly just perform a redirect to the payment provider and then
 * receive some kind of IPN
 *
 * @package			Event Espresso
 * @subpackage		core/libraries/payment_methods
 * @author			Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
abstract class EE_Offsite_Gateway extends EE_Gateway{
	public function __construct() {
		$this->_supports_receiving_refunds = true;
		parent::__construct();
	}
	/**
	 * @param EE_Payment $payment to process
	 * @param string $return_url URL to send the user to after a successful payment on the payment provider's website
	 * @param string $fail_url URL to send the user to after a failed payment attempt on teh payment provider's website
	 * @param string $cancel_url URL to send the user to after a cancelled payment attempt on teh payment provider's website
	 * @param boolean $send_full_itemized_list whether or not to try itemizing all the items purchased when
	 * informing the payment provider of the purchase or not. If charging for the entire transaction, this is usually
	 * set to TRUE; however if we are just charing for a part, it's harder to nail down exactly what the payment is for, 
	 * so its usually set to FALSE in that case
	 * @return EE_Payment
	 */
	public abstract function set_redirection_info($payment,$billing_info = array(),$return_url = NULL, $cancel_url = NULL);
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
