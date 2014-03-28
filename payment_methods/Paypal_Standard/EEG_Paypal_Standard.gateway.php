<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.3
 *
 * ------------------------------------------------------------------------
 *
 * EEG_Paypal_Standard
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EEG_Paypal_Standard extends EE_Offsite_Gateway {
	/**
	 * @param EE_Payment $payment to process
	 * @param string $success_url URL to send the user to after a successful payment on the payment provider's website
	 * @param string $fail_url URL to send the user to after a failed payment attempt on teh payment provider's website
	 * @param string $cancel_url URL to send the user to after a cancelled payment attempt on teh payment provider's website
	 * @param boolean $send_full_itemized_list whether or not to try itemizing all the items purchased when
	 * informing the payment provider of the purchase or not. If charging for the entire transaction, this is usually
	 * set to TRUE; however if we are just charing for a part, it's harder to nail down exactly what the payment is for, 
	 * so its usually set to FALSE in that case
	 * @return EE_Payment
	 */
	public function set_redirection_info($payment,$billing_info = array(),$success_url = NULL, $fail_url = NULL, $cancel_url = NULL){
		$payment->set_redirect_url('https://www.paypal.com/cgi-bin/webscr');
		$payment->set_redirect_args(array('arg1'=>'foo','arg2'=>'bar'));
		return $payment;
	}
	/**
	 * Often used for IPNs. But applies the info in $update_info to the payment.
	 * What is $update_info? Often the contents of $_REQUEST, but not necessarily. Whatever
	 * the payment method passes in.
	 * @param EE_Payment $payment
	 * @param array $update_info of whatever
	 * @return EE_Payment updated
	 */
	public function handle_payment_update($payment,$update_info){
		$payment->set_status(EEM_Payment::status_id_approved);
		$payment->set_gateway_response('IPN received a-ok');
		return $payment;
	}
}

// End of file EEG_Paypal_Standard.gateway.php