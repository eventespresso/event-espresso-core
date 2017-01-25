<?php
/**
 * EE_Gateway
 * Abstract base class for all gateways for processing payments.
 * This has been designed in a way so that other WP Plugins
 * can use this class for processing payments, and theoretically any of its children,
 * provided they implement the interfaces it uses.
 * The necessary interfaces to be implemented are contained in:
 * core/libraries/payment_methods/EEI_Payment_Method_Interfaces.php and EEI_Interfaces.
 * After constructing a gateway object, you need to set all the properties which reference many of the
 * needed helpers and models (see all the methods starting with "set_",
 * eg seg_line_item_helper which should be passed an object which implements EEHI_Line_Item_Helper; etc).
 *
 * @package            Event Espresso
 * @subpackage		core/libraries/payment_methods
 * @author			Mike Nelson
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
	protected $_pay_model;

	/**
	 * Model used for adding to the payments log
	 * @var EEMI_Payment_Log
	 */
	protected $_pay_log;

	/**
	 * Used for formatting some input to gateways
	 * @var EEHI_Template
	 */
	protected $_template;

	/**
	 * Concrete class that implements EEHI_Money, used by most gateways
	 * @var EEHI_Money
	 */
	protected $_money;

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
	protected $_debug_mode;
	/**
	 *
	 * @var string $_name name to show for this payment method
	 */
	protected $_name;
	/**
	 *
	 * @var string name to show fir this payment method to admin-type users
	 */
	protected $_admin_name;

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
		unset( $properties[ '_pay_model' ], $properties[ '_pay_log' ] );
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
	public function do_direct_refund( EE_Payment $payment, $refund_info = null ) {
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
			$this->{$property_name} = $value;
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
	
	/**
	 * Gets the first event for this payment (it's possible that it could be for multiple)
	 * @param EEI_Payment $payment
	 * @return EEI_Event|null
	 */
	protected function _get_first_event_for_payment( EEI_Payment $payment ) {
		$transaction = $payment->transaction();
		if( $transaction instanceof EEI_Transaction ) {
			$primary_registrant = $transaction->primary_registration();
			if( $primary_registrant instanceof EE_Registration ) {
				return $primary_registrant->event_obj();
			}
		}
		return null;
	}
	
	/**
	 * Gets the name of the first event for which is being paid
	 * @param EEI_Payment $payment
	 * @return string
	 */
	protected function _get_first_event_name_for_payment( EEI_Payment $payment ) {
		$event = $this->_get_first_event_for_payment( $payment );
		return $event instanceof EEI_Event ? $event->name() : __( 'Event', 'event_espresso' );
	}
	/**
	 * Gets the text to use for a gateway's line item name when this is a partial payment
	 * @param EE_Payment $payment
	 * @return string
	 */
	protected function _format_partial_payment_line_item_name( EEI_Payment $payment ){
		return apply_filters( 
			'EEG_Paypal_Pro__do_direct_payment__partial_amount_line_item_name', 
			$this->_get_first_event_name_for_payment( $payment ), 
			$this,
			$payment
		);
	}
	/**
	 * Gets the text to use for a gateway's line item description when this is a partial payment
	 * @param EEI_Payment $payment
	 * @return string
	 */
	protected function _format_partial_payment_line_item_desc( EEI_Payment $payment ) {
		return apply_filters(
			'FHEE__EE_Gateway___partial_payment_desc',
			sprintf(
				__("Payment of %s for %s", "event_espresso"), 
				$payment->get_pretty( 'PAY_amount', 'no_currency_code' ), 
				$this->_get_first_event_name_for_payment( $payment ) ),
			$this,
			$payment
		);
	}
	
	/**
	 * Gets the name to use for a line item when sending line items to the gateway
	 * @param EEI_Line_Item $line_item
	 * @param EEI_Payment $payment
	 * @return string
	 */
	protected function _format_line_item_name( EEI_Line_Item $line_item, EEI_Payment $payment ) {
		return apply_filters( 
			'FHEE__EE_gateway___line_item_name', 
			sprintf( _x( '%1$s for %2$s', 'Ticket for Event', 'event_espresso' ), $line_item->name(), $line_item->ticket_event_name() ), 
			$this,
			$line_item, 
			$payment 
		);
	}
	
	/**
	 * Gets the description to use for a line item when sending line items to the gateway
	 * @param EEI_Line_Item $line_item
	 * @param EEI_Payment $payment
	 * @return string
	 */
	protected function _format_line_item_desc( EEI_Line_Item $line_item, EEI_Payment $payment ) {
		return apply_filters( 
			'FHEE__EE_Gateway___line_item_desc', 
			$line_item->desc(), 
			$this, 
			$line_item,
			$payment
		);
	}
	
	/**
	 * Gets the order description that should generlly be sent to gateways
	 * @param EEI_Payment $payment
	 * @return type
	 */
	protected function _format_order_description( EEI_Payment $payment ) {
		return apply_filters( 
			'FHEE__EE_Gateway___order_description',
			sprintf(
				__('Event Registrations from %1$s for %2$s', "event_espresso"),
				get_bloginfo('name'),
				$this->_get_first_event_name_for_payment( $payment ) ),
			$this,
			$payment
		);
	}

    /**
     * Removes emojis, for gateways that can't handle them. See https://drive.google.com/file/d/0B2KCao4zFjaxTXU0WUhxbUNLQ0k/view?usp=drivesdk
     * @param $input
     * @return string
     */
    protected function _remove_emojis($input){
        return trim( preg_replace('/[\x00-\x1F\x80-\xFF]/', '',
            $input ) );
    }




}