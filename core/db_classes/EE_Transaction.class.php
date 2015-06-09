<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package        Event Espresso
 * @ author        Event Espresso
 * @ copyright    (c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license        {@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link                {@link http://www.eventespresso.com}
 * @ since            4.0
 *
 */





/**
 * EE_Transaction class
 *
 * @package 			Event Espresso
 * @subpackage 	includes/classes/EE_Transaction.class.php
 * @author 				Brent Christensen
 */
class EE_Transaction extends EE_Base_Class implements EEI_Transaction{


	/**
	 *
	 * @param array $props_n_values
	 * @param string $timezone
	 * @return EE_Transaction
	 */
	public static function new_instance( $props_n_values = array(), $timezone = '' ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__ );
		return $has_object ? $has_object : new self( $props_n_values, FALSE, $timezone );
	}



	/**
	 *
	 * @param array $props_n_values
	 * @param string $timezone
	 * @return EE_Transaction
	 */
	public static function new_instance_from_db( $props_n_values = array(), $timezone = '' ) {
		return new self( $props_n_values, TRUE, $timezone );
	}



	/**
	 * 	lock
	 *
	 * 	sets a wp_option indicating that this TXN is locked
	 * and should not be updated in the db
	 *
	 * @access 	public
	 * @return 	void
	 */
	public function lock() {
		$locked_transactions = get_option( 'ee_locked_transactions', array() );
		$locked_transactions[ $this->ID() ] = true;
		update_option( 'ee_locked_transactions', $locked_transactions );
	}



	/**
	 * 	unlock
	 *
	 * 	removes transaction lock applied in lock_transaction()
	 *
	 * @access 	public
	 * @return 	void
	 */
	public function unlock() {
		$locked_transactions = get_option( 'ee_locked_transactions', array() );
		unset( $locked_transactions[ $this->ID() ] );
		update_option( 'ee_locked_transactions', $locked_transactions );
	}

	/**
	 * is_locked
	 *
	 * Decides whether or not now is the right time to update the transaction.
	 * This is useful because we don't always if it is safe to update the transaction
	 * and its related data. why?
	 * because it's possible that the transaction is being used in another
	 * request and could overwrite anything we save.
	 * So we want to only update the txn once we know that won't happen.
	 *
	 * @access 	public
	 * @return boolean
	 */
	public function is_locked() {
		$locked_transactions = get_option( 'ee_locked_transactions', array() );
		return isset( $locked_transactions[ $this->ID() ] ) ? true : false;
	}



	/**
	 *        Set transaction total
	 *
	 * @access        public
	 * @param        float $total total value of transaction
	 */
	public function set_total( $total = 0.00 ) {
		$this->set( 'TXN_total', $total );
	}



	/**
	 *        Set Total Amount Paid to Date
	 *
	 * @access        public
	 * @param        float $total_paid total amount paid to date (sum of all payments)
	 */
	public function set_paid( $total_paid = 0.00 ) {
		$this->set( 'TXN_paid', $total_paid );
	}



	/**
	 *        Set transaction status
	 *
	 * @access        public
	 * @param        string $status whether the transaction is open, declined, accepted, or any number of custom values that can be set
	 */
	public function set_status( $status = '' ) {
		$this->set( 'STS_ID', $status );
	}



	/**
	 *        Set hash salt
	 *
	 * @access        public
	 * @param        string $hash_salt required for some payment gateways
	 */
	public function set_hash_salt( $hash_salt = '' ) {
		$this->set( 'TXN_hash_salt', $hash_salt );
	}



	/**
	 * Sets TXN_reg_steps array
	 * @param array $txn_reg_steps
	 */
	function set_reg_steps( $txn_reg_steps ) {
		$this->set( 'TXN_reg_steps', $txn_reg_steps );
	}



	/**
	 * Gets TXN_reg_steps
	 * @return array
	 */
	function reg_steps() {
		$TXN_reg_steps = $this->get( 'TXN_reg_steps' );
		return is_array( $TXN_reg_steps ) ? $TXN_reg_steps : array();
	}



	/**
	 *
	 * @return string of transaction's total cost, with currency symbol and decimal
	 */
	public function pretty_total() {
		return $this->get_pretty( 'TXN_total' );
	}



	/**
	 * Gets the amount paid in a pretty string (formatted and with currency symbol)
	 * @return string
	 */
	public function pretty_paid() {
		return $this->get_pretty( 'TXN_paid' );
	}



	/**
	 * calculate the amount remaining for this transaction and return;
	 *
	 * @access public
	 * @return float amount remaining
	 */
	public function remaining() {
		return (float)( $this->total() - $this->paid() );
	}



	/**
	 *        get Transaction Total
	 * @access        public
	 * @return float
	 */
	public function total() {
		return $this->get( 'TXN_total' );
	}



	/**
	 *        get Total Amount Paid to Date
	 * @access        public
	 * @return float
	 */
	public function paid() {
		return $this->get( 'TXN_paid' );
	}



	/**
	 *    get_cart_session
	 * @access        public
	 */
	public function get_cart_session() {
		$session_data = $this->get( 'TXN_session_data' );
		return isset( $session_data[ 'cart' ] ) && $session_data[ 'cart' ] instanceof EE_Cart ? $session_data[ 'cart' ] : NULL;
	}



	/**
	 *        get Transaction session data
	 * @access        public
	 */
	public function session_data() {
		$session_data = $this->get( 'TXN_session_data' );
		if ( empty( $session_data ) ) {
			$session_data = array( 'id' => NULL, 'user_id' => NULL, 'ip_address' => NULL, 'user_agent' => NULL, 'init_access' => NULL, 'last_access' => NULL, 'pages_visited' => array() );
		}
		return $session_data;
	}



	/**
	 *        Set session data within the TXN object
	 *
	 * @access        public
	 * @param        EE_Session|array $session_data
	 */
	public function set_txn_session_data( $session_data ) {
		if ( $session_data instanceof EE_Session ) {
			$this->set( 'TXN_session_data', $session_data->get_session_data( NULL, TRUE ));
		} else {
			$this->set( 'TXN_session_data', $session_data );
		}
	}



	/**
	 *        get Transaction hash salt
	 * @access        public
	 */
	public function hash_salt_() {
		return $this->get( 'TXN_hash_salt' );
	}



	/**
	 *    datetime
	 *
	 *    Returns the transaction datetime as:
	 * 			- unix timestamp format including the UTC (timezone) offset (default)
	 * 			- formatted date string including the UTC (timezone) offset ($format = TRUE ($gmt has no affect with this option))
	 * 			- unix timestamp format in UTC+0 (GMT) ($gmt = TRUE)
	 *    Formatting options, including the UTC offset, are set via the WP General Settings page
	 *
	 * @access 	public
	 * @param 	boolean 	$format - whether to return a unix timestamp (default) or formatted date string
	 * @param 	boolean 	$gmt - whether to return a unix timestamp with UTC offset applied (default) or no UTC offset applied
	 * @return 	string | int
	 */
	public function datetime( $format = FALSE, $gmt = FALSE ) {
		if ( $format ) {
			return $this->get_pretty( 'TXN_timestamp' );
		} else if ( $gmt ) {
			return $this->get_raw( 'TXN_timestamp' );
		} else {
			return $this->get( 'TXN_timestamp' );
		}
	}



	/**
	 *    Gets registrations on this transaction
	 * @param        array   $query_params array of query parameters
	 * @param        boolean $get_cached   TRUE to retrieve cached registrations or FALSE to pull from the db
	 * @return EE_Registration[]
	 */
	public function registrations( $query_params = array(), $get_cached = FALSE ) {
		$query_params = ( empty( $query_params ) || ! is_array( $query_params ) ) ? array( 'order_by' => array( 'Event.EVT_name' => 'ASC', 'Attendee.ATT_lname' => 'ASC', 'Attendee.ATT_fname' => 'ASC' ) ) : $query_params;
		$query_params = $get_cached ? array() : $query_params;
		return $this->get_many_related( 'Registration', $query_params );
	}



	/**
	 * Gets all the attendees for this transaction (handy for use with EE_Attendee's get_registrations_for_event function
	 * for getting attendees and how many registrations they each have for an event)
	 * @return mixed EE_Attendee[] by default, int if $output is set to 'COUNT'
	 */
	public function attendees() {
		return $this->get_many_related( 'Attendee', array( array( 'Registration.Transaction.TXN_ID' => $this->ID() ) ) );
	}



	/**
	 * Gets payments for this transaction. Unlike other such functions, order by 'DESC' by default
	 * @param array $query_params like EEM_Base::get_all
	 * @return EE_Payment[]
	 */
	public function payments( $query_params = array() ) {
		return $this->get_many_related( 'Payment', $query_params );
	}



	/**
	 * gets only approved payments for this transaction
	 * @return EE_Payment[]
	 */
	public function approved_payments() {
		EE_Registry::instance()->load_model( 'Payment' );
		return $this->get_many_related( 'Payment', array( array( 'STS_ID' => EEM_Payment::status_id_approved ), 'order_by' => array( 'PAY_timestamp' => 'DESC' ) ) );
	}



	/**
	 * echoes $this->pretty_status()
	 * @param bool $show_icons
	 * @return string
	 */
	public function e_pretty_status( $show_icons = FALSE ) {
		echo $this->pretty_status( $show_icons );
	}



	/**
	 * returns a pretty version of the status, good for displaying to users
	 * @param bool $show_icons
	 * @return string
	 */
	public function pretty_status( $show_icons = FALSE ) {
		$status = EEM_Status::instance()->localized_status( array( $this->status_ID() => __( 'unknown', 'event_espresso' ) ), FALSE, 'sentence' );
		$icon = '';
		switch ( $this->status_ID() ) {
			case EEM_Transaction::complete_status_code:
				$icon = $show_icons ? '<span class="dashicons dashicons-yes ee-icon-size-24 green-text"></span>' : '';
				break;
			case EEM_Transaction::incomplete_status_code:
				$icon = $show_icons ? '<span class="dashicons dashicons-marker ee-icon-size-16 lt-blue-text"></span>' : '';
				break;
			case EEM_Transaction::abandoned_status_code:
				$icon = $show_icons ? '<span class="dashicons dashicons-marker ee-icon-size-16 red-text"></span>' : '';
				break;
			case EEM_Transaction::failed_status_code:
				$icon = $show_icons ? '<span class="dashicons dashicons-no ee-icon-size-16 red-text"></span>' : '';
				break;
			case EEM_Transaction::overpaid_status_code:
				$icon = $show_icons ? '<span class="dashicons dashicons-plus ee-icon-size-16 orange-text"></span>' : '';
				break;
		}
		return $icon . $status[ $this->status_ID() ];
	}



	/**
	 *        get Transaction Status
	 * @access        public
	 */
	public function status_ID() {
		return $this->get( 'STS_ID' );
	}



	/**
	 * Returns TRUE or FALSE for whether or not this transaction cost any money
	 * @return boolean
	 */
	public function is_free() {
		return (float)$this->get( 'TXN_total' ) == 0 ? TRUE : FALSE;
	}



	/**
	 * Returns whether this transaction is complete
	 * Useful in templates and other logic for deciding if we should ask for another payment...
	 * @return boolean
	 */
	public function is_completed() {
		return $this->status_ID() == EEM_Transaction::complete_status_code ? TRUE : FALSE;
	}



	/**
	 * Returns whether this transaction is incomplete
	 * Useful in templates and other logic for deciding if we should ask for another payment...
	 * @return boolean
	 */
	public function is_incomplete() {
		return $this->status_ID() == EEM_Transaction::incomplete_status_code ? TRUE : FALSE;
	}



	/**
	 * Returns whether this transaction is overpaid
	 * Useful in templates and other logic for deciding if monies need to be refunded
	 * @return boolean
	 */
	public function is_overpaid() {
		return $this->status_ID() == EEM_Transaction::overpaid_status_code ? TRUE : FALSE;
	}



	/**
	 * Returns whether this transaction was abandoned
	 * meaning that the transaction/registration process was somehow interrupted and never completed
	 * but that contact information exists for at least one registrant
	 * @return boolean
	 */
	public function is_abandoned() {
		return $this->status_ID() == EEM_Transaction::abandoned_status_code ? TRUE : FALSE;
	}



	/**
	 * Returns whether this transaction failed
	 * meaning that the transaction/registration process was somehow interrupted and never completed
	 * and that NO contact information exists for any registrants
	 * @return boolean
	 */
	public function failed() {
		return $this->status_ID() == EEM_Transaction::failed_status_code ? TRUE : FALSE;
	}



	/**
	 * This returns the url for the invoice of this transaction
	 * @param string $type 'html' or 'pdf' (default is pdf)
	 * @access public
	 * @return string
	 */
	public function invoice_url( $type = 'html' ) {
		$REG = $this->primary_registration();
		if ( ! $REG instanceof EE_Registration ) {
			return '';
		}
		return $REG->invoice_url( $type );
	}



	/**
	 * Gets the primary registration only
	 * @return EE_Registration
	 */
	public function primary_registration() {
		return $this->get_first_related( 'Registration', array( array( 'REG_count' => EEM_Registration::PRIMARY_REGISTRANT_COUNT ) ) );
	}



	/**
	 * Gets the URL for viewing the receipt
	 * @param string $type 'pdf' or 'html' (default is 'html')
	 * @return string
	 */
	public function receipt_url( $type = 'html' ) {
		$REG = $this->primary_registration();
		if ( ! $REG instanceof EE_Registration ) {
			return '';
		}
		return $REG->receipt_url( $type );
	}



	/**
	 * Gets the URL of the thank you page with this registration REG_url_link added as
	 * a query parameter
	 *
	 * @access public
	 * @return string
	 */
	public function payment_overview_url() {
		$primary_registration = $this->primary_registration();
		return $primary_registration instanceof EE_Registration ? $primary_registration->payment_overview_url() : FALSE;
	}



	/**
	 * Updates the transaction's status and total_paid based on all the payments
	 * that apply to it
	 * @deprecated
	 * @return boolean
	 */
	public function update_based_on_payments(){
		EE_Error::doing_it_wrong(
			__CLASS__ . '::' . __FUNCTION__,
			sprintf( __( 'This method is deprecated. Please use "%s" instead', 'event_espresso' ), 'EE_Transaction_Processor::update_transaction_and_registrations_after_checkout_or_payment()' ),
			'4.6.0'
		);
		/** @type EE_Transaction_Processor $transaction_processor */
		$transaction_processor = EE_Registry::instance()->load_class( 'Transaction_Processor' );
		return  $transaction_processor->update_transaction_and_registrations_after_checkout_or_payment( $this );
	}



	/**
	 * @return string
	 */
	public function gateway_response_on_transaction() {
		$payment = $this->get_first_related( 'Payment' );
		return $payment instanceof EE_Payment ? $payment->gateway_response() : '';
	}



	/**
	 * Get the status object of this object
	 * @return EE_Status
	 */
	public function status_obj() {
		return $this->get_first_related( 'Status' );
	}



	/**
	 * Gets all the extra meta info on this payment
	 * @param array $query_params like EEM_Base::get_all
	 * @return EE_Extra_Meta
	 */
	public function extra_meta( $query_params = array() ) {
		return $this->get_many_related( 'Extra_Meta', $query_params );
	}



	/**
	 * Wrapper for _add_relation_to
	 * @param EE_Registration $registration
	 * @return EE_Base_Class the relation was added to
	 */
	public function add_registration( EE_Registration $registration ) {
		return $this->_add_relation_to( $registration, 'Registration' );
	}



	/**
	 * Removes the given registration from being related (even before saving this transaction).
	 * If an ID/index is provided and this transaction isn't saved yet, removes it from list of cached relations
	 * @param int $registration_or_id
	 * @return EE_Base_Class that was removed from being related
	 */
	public function remove_registration_with_id( $registration_or_id ) {
		return $this->_remove_relation_to( $registration_or_id, 'Registration' );
	}



	/**
	 * Gets all the line items which are for ACTUAL items
	 * @return EE_Line_Item[]
	 */
	public function items_purchased() {
		return $this->line_items( array( array( 'LIN_type' => EEM_Line_Item::type_line_item ) ) );
	}



	/**
	 * Wrapper for _add_relation_to
	 * @param EE_Line_Item $line_item
	 * @return EE_Base_Class the relation was added to
	 */
	public function add_line_item( EE_Line_Item $line_item ) {
		return $this->_add_relation_to( $line_item, 'Line_Item' );
	}



	/**
	 * Gets ALL the line items related to this transaction (unstructured)
	 * @param array $query_params
	 * @return EE_Line_Item[]
	 */
	public function line_items( $query_params = array() ) {
		return $this->get_many_related( 'Line_Item', $query_params );
	}



	/**
	 * Gets all the line items which are taxes on the total
	 * @return EE_Line_Item[]
	 */
	public function tax_items() {
		return $this->line_items( array( array( 'LIN_type' => EEM_Line_Item::type_tax ) ) );
	}



	/**
	 * Gets the total line item (which is a parent of all other related line items,
	 * meaning it takes them all into account on its total)
	 * @return EE_Line_Item
	 */
	public function total_line_item() {
		$item =  $this->get_first_related( 'Line_Item', array( array( 'LIN_type' => EEM_Line_Item::type_total ) ) );
		if( ! $item ){
			EE_Registry::instance()->load_helper( 'Line_Item' );
			$item = EEH_Line_Item::create_default_total_line_item();
		}
		return $item;
	}



	/**
	 * Returns the total amount of tax on this transaction
	 * (assumes there's only one tax subtotal line item)
	 * @return float
	 */
	public function tax_total() {
		$tax_line_item = $this->tax_total_line_item();
		if ( $tax_line_item ) {
			return $tax_line_item->total();
		} else {
			return 0;
		}
	}



	/**
	 * Gets the tax subtotal line item (assumes there's only one)
	 * @return EE_Line_Item
	 */
	public function tax_total_line_item() {
		$item =  $this->get_first_related( 'Line_Item', array( array( 'LIN_type' => EEM_Line_Item::type_tax_sub_total ) ) );
		if( ! $item ){
			EE_Registry::instance()->load_helper( 'Line_Item' );
			$item = EEH_Line_Item::create_default_total_line_item();
		}
		return $item;
	}



	/**
	 *  Gets the array of billing info for the gateway and for this transaction's primary registration's attendee.
	 * @return EE_Form_Section_Proper
	 */
	public function billing_info(){
		$payment_method = $this->payment_method();
		if ( !$payment_method){
			EE_Error::add_error(__("Could not find billing info for transaction because no gateway has been used for it yet", "event_espresso"), __FILE__, __FUNCTION__, __LINE__);
			return false;
		}
		$primary_reg = $this->primary_registration();
		if ( ! $primary_reg ) {
			EE_Error::add_error( __( "Cannot get billing info for gateway %s on transaction because no primary registration exists", "event_espresso" ), __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		$attendee = $primary_reg->attendee();
		if ( ! $attendee ) {
			EE_Error::add_error( __( "Cannot get billing info for gateway %s on transaction because the primary registration has no attendee exists", "event_espresso" ), __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		return $attendee->billing_info_for_payment_method($payment_method);
	}



	/**
	 * Gets PMD_ID
	 * @return int
	 */
	function payment_method_ID() {
		return $this->get('PMD_ID');
	}



	/**
	 * Sets PMD_ID
	 * @param int $PMD_ID
	 * @return boolean
	 */
	function set_payment_method_ID($PMD_ID) {
		$this->set('PMD_ID', $PMD_ID);
	}



	/**
	 * Gets the last-used payment method on this transaction
	 * (we COULD just use the last-made payment, but some payment methods, namely
	 * offline ones, dont' create payments)
	 * @return EE_Payment_Method
	 */
	function payment_method(){
		$pm = $this->get_first_related('Payment_Method');
		if( $pm instanceof EE_Payment_Method ){
			return $pm;
		}else{
			$last_payment = $this->last_payment();
			if( $last_payment instanceof EE_Payment && $last_payment->payment_method() ){
				return $last_payment->payment_method();
			}else{
				return NULL;
			}
		}
	}

	/**
	 * Gets the last payment made
	 * @return EE_Payment
	 */
	public function last_payment() {
		return $this->get_first_related( 'Payment', array( 'order_by' => array( 'PAY_ID' => 'desc' ) ) );
	}

	/**
	 * Gets all the line items which are unrelated to tickets on this transaction
	 * @return EE_Line_Item[]
	 */
	public function non_ticket_line_items(){
		return EEM_Line_Item::instance()->get_all_non_ticket_line_items_for_transaction( $this->ID() );
	}




}/* End of file EE_Transaction.class.php */
/* Location: includes/classes/EE_Transaction.class.php */
