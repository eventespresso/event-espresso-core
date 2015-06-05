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
 * Abstract base class for all gateways
 *
 * @package			Event Espresso
 * @subpackage		core/libraries/payment_methods
 * @author			Mike Nelson
 *
 * ------------------------------------------------------------------------
 * Class for processing payments. This has been designed in a way so that other WP Plugins
 * can use this class for processing payments, and theoreitcally any of its children, provided they implement the
 * interfaces it uses.
 * The necessary interfaces to be implemented are contained in core/libaries/payment_methods/EEI_Payment_Method_Interfaces.php and
 * EEI_Interfaces. After constructing a gateway object, you need to set all the properties which reference many of the
 * needed helpers and models (see all the methods starting with "set_", eg seg_line_item_helper which should be passed an object
 * which implements EEHI_Line_Item_Helper; etc).
 */
abstract class EE_Gateway{
	/**
	 * a constant used as a possible value for $_currencies_supported to indicate
	 * that ALL currencies are supported by this gateway
	 */
	const all_currencies_supported = 'all_currencies_supported';
	/**
	 * Where values are 3-letter currency codes
	 * @var array
	 */
	protected $_currencies_supported = array();
	/**
	 * Whether or not this gateway can support SENDING a refund request (ie, initiated by
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
	 * Concrete class that implements EEHI_Money, used by most gateways
	 * @var EEHI_Money
	 */
	protected $_money = NULL;

	/**
	 * Concrete class that implements EEHI_Line_Item, used for manipulating the line item tree
	 * @var EEHI_Line_Item
	 */
	protected $_line_item;

	/**
	 * The ID of the payment method using this gateway
	 * @var int
	 */
	protected $_ID;

	/**
	 * @var $_debug_mode boolean whether to send requests to teh sandbox site or not
	 */
	protected $_debug_mode = NULL;
	/**
	 *
	 * @var string $_name name to show for this payment method
	 */
	protected $_name = NULL;
	/**
	 *
	 * @var string name to show fir this payment method to admin-type users
	 */
	protected $_admin_name = NULL;

	/**
	 * @return EE_Gateway
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
	 * Returns whether or not this gateway should support SENDING refunds
	 * see $_supports_sending_refunds
	 * @return boolean
	 */
	public function supports_sending_refunds(){
		return $this->_supports_sending_refunds;
	}
	/**
	 * Returns whether or not this gateway should support RECEIVING refunds
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
	 * Sets the payment method's settings so the gateway knows where to send the request
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
	 * See this class description
	 * @param EEMI_Payment $payment_model
	 */
	public function set_payment_model($payment_model){
		$this->_pay_model = $payment_model;
	}
	/**
	 * See this class description
	 * @param EEMI_Payment_Log $payment_log_model
	 */
	public function set_payment_log($payment_log_model){
		$this->_pay_log = $payment_log_model;
	}

	/**
	 * See this class description
	 * @param EEHI_Template $template_helper
	 */
	public function set_template_helper($template_helper){
		$this->_template = $template_helper;
	}

	/**
	 * See this class description
	 * @param EEHI_Line_Item $line_item_helper
	 */
	public function set_line_item_helper( $line_item_helper ){
		$this->_line_item = $line_item_helper;
	}

	/**
	 * See this class description
	 * @param EEHI_Money $money_helper
	 */
	public function set_money_helper( $money_helper ){
		$this->_money = $money_helper;
	}


	/**
	 * @param $message
	 * @param $payment
	 */
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
		return number_format( $amount, 2, '.', '' );
//		return $this->_template->format_currency($amount, true);
	}

	/**
	 * Returns either an array of all the currency codes supported,
	 * or a string indicating they're all supported (EE_gateway::all_currencies_supported)
	 * @return mixed array or string
	 */
	public function currencies_supported(){
		return $this->_currencies_supported;
	}

	/**
	 * Returns what a simple summing of items and taxes for this transaction. This
	 * can be used to determine if some more complex line items, like promotions,
	 * surcharges, or cancellations occurred (in which case we might want to forget
	 * about creating an itemized list of purchases and instead only send the total due)
	 * @param EE_Transaction  $transaction
	 * @return float
	 */
	protected function _sum_items_and_taxes( EE_Transaction  $transaction){
		$total_line_item = $transaction->total_line_item();
		$total = 0;
		foreach($total_line_item->get_items() as $item_line_item ){
			$total += max( $item_line_item->total(), 0 );
		}
		foreach($total_line_item->tax_descendants() as $tax_line_item ){
			$total += max( $tax_line_item->total(), 0 );
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
		return  $this->_money->compare_floats(
					$this->_sum_items_and_taxes( $payment->transaction() ),
					$payment->transaction()->total() ) &&
				$this->_money->compare_floats(
					$payment->amount(),
					$payment->transaction()->total() );
	}

	/**
	 * Handles updating the transaction and any other related data based on the payment.
	 * You may be tempted to do this as part of do_direct_payment or handle_payment_update,
	 * but doing so on those functions might be too early. It's possible that the changes
	 * you make to teh transaction or registration or line items may just get overwritten
	 * at that point. Instead, you should store any info you need on the payment during those
	 * functions, and use that information at this step, which client code will decide
	 * for you when it should be called.
	 * @param EE_Payment $payment
	 * @return void
	 */
	public function update_txn_based_on_payment( $payment ){
		//maybe update the transaction or line items or registrations
		//but most gateways don't need to do this, because they only update the payment
	}



}