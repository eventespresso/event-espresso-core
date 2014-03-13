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
class EE_Gateway{
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
	 * Simple key-value pairs containing all the gateway's settings.
	 * In EE, this will be all the payment method's fields (but removing the 'PMD_' prefix), and all the
	 * extra meta entries' keys.
	 * @var array
	 */
	protected $_settings = array();
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
	
	public function _set_settings($settings_array){
		$this->_settings = $settings_array;
	}
	
	
}