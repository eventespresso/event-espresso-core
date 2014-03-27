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
 * EEG_Paypal_Pro
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EEG_Paypal_Pro extends EE_Onsite_Gateway{
	/**
	 * 
	 * @param EE_Payment $payment
	 * @param array $billing_info
	 */
	public function do_direct_payment($payment,$billing_info = null){
		$payment->set_status(EEM_Payment::status_id_approved);
		$payment->set_gateway_response('test run was a-ok');
		return $payment;
	}
}

// End of file EEG_Paypal_Pro.gateway.php