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
 * EE_Onsite_Gateway
 *
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 *
 * @package			Event Espresso
 * @subpackage		core/libraries/payment_methods
 * @author			Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
abstract class EE_Onsite_Gateway extends EE_Gateway{
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
}
