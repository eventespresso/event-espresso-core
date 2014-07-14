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
	 * a constant used as a possibel value for $_currencies_supported to indicate
	 * that ALL currencies are supported by this gateway
	 */
	const all_currencies_supported = 'all_currencies_supported';
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
	 * Model for querying for existing payments
	 * @var EEMI_Payment
	 */
	protected $_pay_model = NULL;

	/**
	 * Model used for adding to the payments log
	 * @var EEMI_Payment_Log
	 */
	protected $_pay_log = NULL;

	/**
	 * Used for formatting some input to gateways
	 * @var EEHI_Template
	 */
	protected $_template = NULL;

	/**
	 * The ID of the payment method using this gateway
	 * @var int
	 */
	protected $_ID;

	/**
	 * @var $_debug_mode boolean whether to send reqeusts to teh sandbox site or not
	 */
	protected $_debug_mode = NULL;
	/**
	 *
	 * @var $_name name to show for this paymetn method
	 */
	protected $_name = NULL;
	/**
	 *
	 * @var string name to show fir this payment method to admin-type users
	 */
	protected $_admin_name = NULL;

	/**
	 * @param EEMI_Payment $model
	 */
	public function __construct(){
	}

	/**
	 * We don't want to serialize models as they often have circular structures
	 * (eg a payment model has a reference to each payment model object; and most
	 * payments have a transaction, most transactions have a payment method;
	 * most payment methods have a payment method type; most payment method types
	 * have a gateway. And if a gateway serializes its models, we start at the
	 * beginning again)
	 * @return array
	 */
	public function __sleep(){
		$properties = get_object_vars($this);
		unset( $properties[ '_pay_model' ] );
		unset( $properties[ '_pay_log' ] );
		return array_keys($properties);
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
	/**
	 * Sets the model which is used for querying for existing payments
	 * @param EEMI_Payment $payment_model
	 */
	public function set_payment_model($payment_model){
		$this->_pay_model = $payment_model;
	}
	/**
	 * Sets the payment log
	 * @param EEMI_Payment_Log $payment_log_model
	 */
	public function set_payment_log($payment_log_model){
		$this->_pay_log = $payment_log_model;
	}

	/**
	 *
	 * @param EEHI_Template $template_helper
	 */
	public function set_template_helper($template_helper){
		$this->_template = $template_helper;
	}

	public function log($message,$payment){
		if($payment instanceof EEI_Payment){
			$type='Payment';
			$id = $payment->ID();
		}else{
			$type = 'Payment_Method';
			$id = $this->_ID;
		}
		$this->_pay_log->gateway_log($message,$id,$type);
	}
	/**
	 * Formats the amount so it can generally be sent to gateways
	 * @param float $amount
	 * @return string
	 */
	public function format_currency($amount){
		return $this->_template->format_currency($amount, true);
	}

	/**
	 * Returns either an array of all the currency codes supported,
	 * or a string indicating they're all supported (EE_gateway::all_currencies_suported)
	 * @return mixed array or string
	 */
	public function currencies_supported(){
		return $this->_currencies_supported;
	}

	/**
	 * Returns what a simpl summing of items and taxes for this transaction. This
	 * can be used to determine if some more complex line items, like promotions,
	 * surcharges, or cancellations occurred (in which case we might want to forget
	 * about creating an itemized list of purchases and instead only send the total due)
	 * @param EE_Line_Item $total_line_item
	 * @return float
	 */
	protected function _sum_items_and_taxes( EE_Transaction  $transaction){
		$total_line_item = $transaction->total_line_item();
		$total = 0;
		foreach($total_line_item->get_items() as $item_line_item ){
			$total += $item_line_item->total();
		}
		foreach($total_line_item->tax_descendants() as $tax_line_item ){
			$total += $tax_line_item->total();
		}
		return $total;
	}

	/**
	 * Determines whether or not we can easily itemize the transaction using only
	 * items and taxes (ie, no promotions or surcharges or cancellations needed)
	 * @param EEI_Payment $payment
	 * @return boolean
	 */
	protected function _can_easily_itemize_transaction_for( EEI_Payment $payment ){
		return  $this->_sum_items_and_taxes( $payment->transaction() ) == $payment->transaction()->total() &&
					$payment->amount() == $payment->transaction()->total();
	}
}