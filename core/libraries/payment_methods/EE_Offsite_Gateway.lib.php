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

	/**
	 * whether or not the gateway uses an IPN
	 * that is sent in a separate request than the returning registrant.
	 * if false, then we need to process the payment results manually
	 * as soon as the registrant returns from the off-site gateway
	 *
	 * @type bool
	 */
	protected $_uses_separate_IPN_request = false;



	/**
	 * @return EE_Offsite_Gateway
	 */
	public function __construct() {
		$this->_supports_receiving_refunds = true;
		parent::__construct();
	}



	/**
	 * Adds information into the payment object's redirect_url and redirect_args so
	 * client code can use that payment to know where (and with what information)
	 * to redirect the user to in order to make the payment on the offsite gateway's website.
	 * Saving the payment from within this method is unnecessary,
	 * as it is the responsibility of client code to save it.
	 * @param EE_Payment $payment    to process
	 * @param array      $billing_info
	 * @param string     $return_url URL to send the user to after a successful payment on the payment provider's website
	 * @param string      $notify_url   URL to send the instant payment notification
	 * @param string     $cancel_url URL to send the user to after a cancelled payment attempt on teh payment provider's website
	 * @return EE_Payment
	 */
	public abstract function set_redirection_info( $payment, $billing_info = array(), $return_url = NULL, $notify_url = NULL, $cancel_url = NULL);



	/**
	 * Often used for IPNs. But applies the info in $update_info to the payment.
	 * What is $update_info? Often the contents of $_REQUEST, but not necessarily. Whatever
	 * the payment method passes in. Saving the payment from within this method is unnecessary,
	 * as it is the responsibility of client code to save it.
	 * @param array $update_info of whatever
	 * @param EEI_Transaction $transaction
	 * @return EEI_Payment updated
	 */
	public abstract function handle_payment_update($update_info,$transaction);



	/**
	 * uses_separate_IPN_request
	 *
	 * return true or false for whether or not the gateway uses an IPN
	 * that is sent in a separate request than the returning registrant.
	 * if false, then we need to process the payment results manually
	 * as soon as the registrant returns from the off-site gateway
	 * @deprecated since version 4.8.39.rc.001 please use handle_IPN_in_this_request() instead
	 *
	 * @return bool
	 */
	public function uses_separate_IPN_request() {
		return $this->_uses_separate_IPN_request;
	}



	/**
	 * set_uses_separate_IPN_request
	 *
	 * @access protected
	 * @param boolean $uses_separate_IPN_request
	 */
	protected function set_uses_separate_IPN_request( $uses_separate_IPN_request ) {
		$this->_uses_separate_IPN_request = filter_var( $uses_separate_IPN_request, FILTER_VALIDATE_BOOLEAN );
	}

	/**
	 * Allows gateway to dynamically decide whether or not to handle a payment update
	 * by overriding this method. By default, if this is a "true" IPN (meaning
	 * it's a separate request from when the user returns from the offsite gateway)
	 * and this gateway class is setup to handle IPNs in separate "true" IPNs, then
	 * this will return true, otherwise it will return false.
	 * If however, this is a request when the user is returning
	 * from an offsite gateway, and this gateway class is setup to process the payment
	 * data when the user returns, then this will return true.
	 *
	 * @param array $request_data
	 * @param boolean $separate_IPN_request
	 * @return boolean
	 */
	public function handle_IPN_in_this_request( $request_data, $separate_IPN_request ) {
		if( $separate_IPN_request ) {
			// payment data being sent in a request separate from the user
			// it is this other request that will update the TXN and payment info
			return $this->_uses_separate_IPN_request;
		} else {
			// it's a request where the user returned from an offsite gateway WITH the payment data
			return ! $this->_uses_separate_IPN_request;
		}
	}



}
