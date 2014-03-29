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
 * EE_Gateway
 *
 * ABstract base class for all gateways
 *
 * @package			Event Espresso
 * @subpackage		core/libraries/payment_methods
 * @author			Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
abstract class EE_Gateway{
	/**
	 * Where keys currency codes, values i18n strings for the currency
	 * @var array
	 */
	protected $_currencies_supported = array();
	/**
	 * WHether or not this gateway can support SENDING a refudn request (ie, initiated by
	 * admin in EE's wp-admin page)
	 * @var boolean
	 */
	protected $_supports_sending_refunds = false;
	
	/**
	 * Whether or not this gateway can support RECEIVING a refund request from the payment
	 * provider (ie, initiated by admin on the payment prover's website who sends an IPN to EE)
	 * @var boolean
	 */
	protected $_supports_receiving_refunds = false;
	/**
	 * 
	 */
	public function __construct(){
		
	}
	/**
	 * Returns whether or not this gateway shoudl support SENDING refunds
	 * see $_supports_sending_refunds
	 * @return boolean
	 */
	public function supports_sending_refunds(){
		return $this->_supports_sending_refunds;
	}
	/**
	 * Returns whether or not this gateway shoudl support RECEIVING refunds
	 * see $_supports_receiving_refunds
	 * @return boolean
	 */
	public function supports_receiving_refunds(){
		return $this->_supports_receiving_refunds;
	}
	
	/**
	 * Tries to refund the payment specified, taking into account the extra
	 * refund info. Note that if the gateway's _supports_sending_refunds is false, 
	 * this should just throw an exception.
	 * @param EE_Payment $payment
	 * @param array $refund_info
	 * @return EE_Payment for the refund
	 * @throws EE_Error
	 */
	public function do_direct_refund($payment,$refund_info = null){
		return NULL;
	}
	/**
	 * Sets the paymetn method's settings so the gateway knows where to send the request
	 * etc
	 * @param array $settings_array
	 */
	public function set_settings($settings_array){
		foreach($settings_array as $name => $value){
			$property_name = "_".$name;
			$this->$property_name = $value;
		}
	}
	
	
}