<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * EE_Transaction class
 *
 * @package     Event Espresso
 * @subpackage 	includes/classes/EE_Transaction.class.php
 * @author      Brent Christensen
 */
class EE_Transaction extends EE_Base_Class implements EEI_Transaction {

	/**
	 * The length of time in seconds that a lock is applied before being considered expired.
	 * It is not long because a transaction should only be locked for the duration of the request that locked it
	 */
	const LOCK_EXPIRATION = 2;

	/**
	 * txn status upon initial construction.
	 *
	 * @var string
	 */
	protected $_old_txn_status;



	/**
	 * @param array  $props_n_values          incoming values
	 * @param string $timezone                incoming timezone (if not set the timezone set for the website will be
	 *                                        used.)
	 * @param array  $date_formats            incoming date_formats in an array where the first value is the
	 *                                        date_format and the second value is the time format
	 * @return EE_Transaction
	 * @throws \EE_Error
	 */
	public static function new_instance( $props_n_values = array(), $timezone = null, $date_formats = array() ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__, $timezone, $date_formats );
		$txn = $has_object
			? $has_object
			: new self( $props_n_values, false, $timezone, $date_formats );
		if ( ! $has_object ) {
			$txn->set_old_txn_status( $txn->status_ID() );
		}
		return $txn;
	}



	/**
	 * @param array  $props_n_values  incoming values from the database
	 * @param string $timezone        incoming timezone as set by the model.  If not set the timezone for
	 *                                the website will be used.
	 * @return EE_Transaction
	 * @throws \EE_Error
	 */
	public static function new_instance_from_db( $props_n_values = array(), $timezone = null ) {
		$txn = new self( $props_n_values, TRUE, $timezone );
		$txn->set_old_txn_status( $txn->status_ID() );
		return $txn;
	}



	/**
	 * lock
	 * Sets a meta field indicating that this TXN is locked and should not be updated in the db.
	 * If a lock has already been set, then we will attempt to remove it in case it has expired.
	 * If that also fails, then an exception is thrown.
	 *
	 * @access public
	 * @throws \EE_Error
	 */
	public function lock() {
		// attempt to set lock, but if that fails...
		if ( ! $this->add_extra_meta( 'lock', time(), true )  ) {
			// then attempt to remove the lock in case it is expired
			if ( $this->_remove_expired_lock() ) {
				// if removal was successful, then try setting lock again
				$this->lock();
			} else {
				// but if the lock can not be removed, then throw an exception
				throw new EE_Error(
					sprintf(
						__( 'Could not lock Transaction %1$d because it is already locked, meaning another part of the system is currently editing it. It should already be unlocked by the time you read this, so please refresh the page and try again.', 'event_espresso' ),
						$this->ID()
					)
				);
			}
		}
	}



	/**
	 * unlock
	 * removes transaction lock applied in EE_Transaction::lock()
	 *
	 * @access public
	 * @return int
	 * @throws \EE_Error
	 */
	public function unlock() {
		return $this->delete_extra_meta( 'lock' );
	}



	/**
	 * is_locked
	 * Decides whether or not now is the right time to update the transaction.
	 * This is useful because we don't always know if it is safe to update the transaction
	 * and its related data. why?
	 * because it's possible that the transaction is being used in another
	 * request and could overwrite anything we save.
	 * So we want to only update the txn once we know that won't happen.
	 * We also check that the lock isn't expired, and remove it if it is
	 *
	 * @access public
	 * @return boolean
	 * @throws \EE_Error
	 */
	public function is_locked() {
		// if TXN is not locked, then return false immediately
		if ( ! $this->_get_lock() ) {
			return false;
		}
		// if not, then let's try and remove the lock in case it's expired...
		// _remove_expired_lock() returns 0 when lock is valid (ie: removed = false)
		// and a positive number if the lock was removed (ie: number of locks deleted),
		// so we need to return the opposite
		return ! $this->_remove_expired_lock() ? true : false;
	}



	/**
	 * _get_lock
	 * Gets the meta field indicating that this TXN is locked
	 *
	 * @access protected
	 * @return int
	 * @throws \EE_Error
	 */
	protected function _get_lock() {
		return (int)$this->get_extra_meta( 'lock', true, 0 );
	}



	/**
	 * remove_expired_lock
	 * If the lock on this transaction is expired, then we want to remove it so that the transaction can be updated
	 *
	 * @access public
	 * @return int
	 * @throws \EE_Error
	 */
	protected function _remove_expired_lock() {
		$locked = $this->_get_lock();
		if ( $locked && time() - EE_Transaction::LOCK_EXPIRATION > $locked ) {
			return $this->unlock();
		}
		return 0;
	}



	/**
	 *        Set transaction total
	 *
	 * @access        public
	 * @param        float $total total value of transaction
	 * @throws \EE_Error
	 */
	public function set_total( $total = 0.00 ) {
		$this->set( 'TXN_total', (float)$total );
	}



	/**
	 *        Set Total Amount Paid to Date
	 *
	 * @access        public
	 * @param        float $total_paid total amount paid to date (sum of all payments)
	 * @throws \EE_Error
	 */
	public function set_paid( $total_paid = 0.00 ) {
		$this->set( 'TXN_paid', (float)$total_paid );
	}



	/**
	 *        Set transaction status
	 *
	 * @access        public
	 * @param        string $status whether the transaction is open, declined, accepted, or any number of custom values that can be set
	 * @throws \EE_Error
	 */
	public function set_status( $status = '' ) {
		$this->set( 'STS_ID', $status );
	}



	/**
	 *        Set hash salt
	 *
	 * @access        public
	 * @param        string $hash_salt required for some payment gateways
	 * @throws \EE_Error
	 */
	public function set_hash_salt( $hash_salt = '' ) {
		$this->set( 'TXN_hash_salt', $hash_salt );
	}



	/**
	 * Sets TXN_reg_steps array
	 *
	 * @param array $txn_reg_steps
	 * @throws \EE_Error
	 */
	public function set_reg_steps( array $txn_reg_steps ) {
		$this->set( 'TXN_reg_steps', $txn_reg_steps );
	}



	/**
	 * Gets TXN_reg_steps
	 *
	 * @return array
	 * @throws \EE_Error
	 */
	public function reg_steps() {
		$TXN_reg_steps = $this->get( 'TXN_reg_steps' );
		return is_array( $TXN_reg_steps ) ? (array)$TXN_reg_steps : array();
	}



	/**
	 * @return string of transaction's total cost, with currency symbol and decimal
	 * @throws \EE_Error
	 */
	public function pretty_total() {
		return $this->get_pretty( 'TXN_total' );
	}



	/**
	 * Gets the amount paid in a pretty string (formatted and with currency symbol)
	 *
	 * @return string
	 * @throws \EE_Error
	 */
	public function pretty_paid() {
		return $this->get_pretty( 'TXN_paid' );
	}



	/**
	 * calculate the amount remaining for this transaction and return;
	 *
	 * @access public
	 * @return float amount remaining
	 * @throws \EE_Error
	 */
	public function remaining() {
		return (float)( $this->total() - $this->paid() );
	}



	/**
	 *        get Transaction Total
	 *
	 * @access        public
	 * @return float
	 * @throws \EE_Error
	 */
	public function total() {
		return (float)$this->get( 'TXN_total' );
	}



	/**
	 *        get Total Amount Paid to Date
	 *
	 * @access        public
	 * @return float
	 * @throws \EE_Error
	 */
	public function paid() {
		return (float)$this->get( 'TXN_paid' );
	}



	/**
	 *    get_cart_session
	 *
	 * @access        public
	 * @throws \EE_Error
	 */
	public function get_cart_session() {
		$session_data = (array)$this->get( 'TXN_session_data' );
		return isset( $session_data[ 'cart' ] ) && $session_data[ 'cart' ] instanceof EE_Cart
			? $session_data[ 'cart' ]
			: null;
	}



	/**
	 *        get Transaction session data
	 *
	 * @access        public
	 * @throws \EE_Error
	 */
	public function session_data() {
		$session_data = $this->get( 'TXN_session_data' );
		if ( empty( $session_data ) ) {
			$session_data = array(
				'id'            => null,
				'user_id'       => null,
				'ip_address'    => null,
				'user_agent'    => null,
				'init_access'   => null,
				'last_access'   => null,
				'pages_visited' => array()
			);
		}
		return $session_data;
	}



	/**
	 *        Set session data within the TXN object
	 *
	 * @access        public
	 * @param        EE_Session|array $session_data
	 * @throws \EE_Error
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
	 *
	 * @access        public
	 * @throws \EE_Error
	 */
	public function hash_salt_() {
		return $this->get( 'TXN_hash_salt' );
	}



	/**
	 *    datetime
	 *    Returns the transaction datetime as either:
	 *            - unix timestamp format ($format = false, $gmt = true)
	 *            - formatted date string including the UTC (timezone) offset ($format = true ($gmt
	 *              has no affect with this option)), this also may include a timezone abbreviation if the
	 *              set timezone in this class differs from what the timezone is on the blog.
	 *            - formatted date string including the UTC (timezone) offset (default).
	 *
	 * @access    public
	 * @param    boolean $format - whether to return a unix timestamp (default) or formatted date string
	 * @param    boolean $gmt    - whether to return a unix timestamp with UTC offset applied (default) or no UTC offset applied
	 * @return    string | int
	 * @throws \EE_Error
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
	 *
	 * @param        array   $query_params array of query parameters
	 * @param        boolean $get_cached   TRUE to retrieve cached registrations or FALSE to pull from the db
	 * @return EE_Registration[]
	 * @throws \EE_Error
	 */
	public function registrations( $query_params = array(), $get_cached = FALSE ) {
		$query_params = ( empty( $query_params ) || ! is_array( $query_params ) )
			? array(
				'order_by' => array(
					'Event.EVT_name' => 'ASC',
					'Attendee.ATT_lname' => 'ASC',
					'Attendee.ATT_fname' => 'ASC'
				)
			)
			: $query_params;
		$query_params = $get_cached ? array() : $query_params;
		return $this->get_many_related( 'Registration', $query_params );
	}



	/**
	 * Gets all the attendees for this transaction (handy for use with EE_Attendee's get_registrations_for_event function
	 * for getting attendees and how many registrations they each have for an event)
	 *
	 * @return mixed EE_Attendee[] by default, int if $output is set to 'COUNT'
	 * @throws \EE_Error
	 */
	public function attendees() {
		return $this->get_many_related( 'Attendee', array( array( 'Registration.Transaction.TXN_ID' => $this->ID() ) ) );
	}



	/**
	 * Gets payments for this transaction. Unlike other such functions, order by 'DESC' by default
	 *
	 * @param array $query_params like EEM_Base::get_all
	 * @return EE_Payment[]
	 * @throws \EE_Error
	 */
	public function payments( $query_params = array() ) {
		return $this->get_many_related( 'Payment', $query_params );
	}



	/**
	 * gets only approved payments for this transaction
	 *
	 * @return EE_Payment[]
	 * @throws \EE_Error
	 */
	public function approved_payments() {
		EE_Registry::instance()->load_model( 'Payment' );
		return $this->get_many_related( 'Payment', array( array( 'STS_ID' => EEM_Payment::status_id_approved ), 'order_by' => array( 'PAY_timestamp' => 'DESC' ) ) );
	}



    /**
     * Gets all payments which have not been approved
     * @return \EEI_Payment[]
     * @throws EE_Error if a model is misconfigured somehow
     */
	public function pending_payments()
    {
        return $this->get_many_related(
            'Payment',
            array(
                array(
                    'STS_ID' => EEM_Payment::status_id_pending
                ),
                'order_by' => array(
                    'PAY_timestamp' => 'DESC'
                )
            )
        );
    }



    /**
	 * echoes $this->pretty_status()
	 *
	 * @param bool $show_icons
	 * @return string
	 * @throws \EE_Error
	 */
	public function e_pretty_status( $show_icons = FALSE ) {
		echo $this->pretty_status( $show_icons );
	}



	/**
	 * returns a pretty version of the status, good for displaying to users
	 *
	 * @param bool $show_icons
	 * @return string
	 * @throws \EE_Error
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
	 *
	 * @access        public
	 * @throws \EE_Error
	 */
	public function status_ID() {
		return $this->get( 'STS_ID' );
	}



	/**
	 * Returns TRUE or FALSE for whether or not this transaction cost any money
	 *
	 * @return boolean
	 * @throws \EE_Error
	 */
	public function is_free() {
		return EEH_Money::compare_floats( $this->get( 'TXN_total' ), 0, '==' );
	}



	/**
	 * Returns whether this transaction is complete
	 * Useful in templates and other logic for deciding if we should ask for another payment...
	 *
	 * @return boolean
	 * @throws \EE_Error
	 */
	public function is_completed() {
		return $this->status_ID() === EEM_Transaction::complete_status_code ? TRUE : FALSE;
	}



	/**
	 * Returns whether this transaction is incomplete
	 * Useful in templates and other logic for deciding if we should ask for another payment...
	 *
	 * @return boolean
	 * @throws \EE_Error
	 */
	public function is_incomplete() {
		return $this->status_ID() === EEM_Transaction::incomplete_status_code ? TRUE : FALSE;
	}



	/**
	 * Returns whether this transaction is overpaid
	 * Useful in templates and other logic for deciding if monies need to be refunded
	 *
	 * @return boolean
	 * @throws \EE_Error
	 */
	public function is_overpaid() {
		return $this->status_ID() === EEM_Transaction::overpaid_status_code ? TRUE : FALSE;
	}



	/**
	 * Returns whether this transaction was abandoned
	 * meaning that the transaction/registration process was somehow interrupted and never completed
	 * but that contact information exists for at least one registrant
	 *
	 * @return boolean
	 * @throws \EE_Error
	 */
	public function is_abandoned() {
		return $this->status_ID() === EEM_Transaction::abandoned_status_code ? TRUE : FALSE;
	}



	/**
	 * Returns whether this transaction failed
	 * meaning that the transaction/registration process was somehow interrupted and never completed
	 * and that NO contact information exists for any registrants
	 *
	 * @return boolean
	 * @throws \EE_Error
	 */
	public function failed() {
		return $this->status_ID() === EEM_Transaction::failed_status_code ? TRUE : FALSE;
	}



	/**
	 * This returns the url for the invoice of this transaction
	 *
	 * @param string $type 'html' or 'pdf' (default is pdf)
	 * @access public
	 * @return string
	 * @throws \EE_Error
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
	 *
	 * @return EE_Registration
	 * @throws \EE_Error
	 */
	public function primary_registration() {
		return $this->get_first_related( 'Registration', array( array( 'REG_count' => EEM_Registration::PRIMARY_REGISTRANT_COUNT ) ) );
	}



	/**
	 * Gets the URL for viewing the receipt
	 *
	 * @param string $type 'pdf' or 'html' (default is 'html')
	 * @return string
	 * @throws \EE_Error
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
	 * @throws \EE_Error
	 */
	public function payment_overview_url() {
		$primary_registration = $this->primary_registration();
		return $primary_registration instanceof EE_Registration ? $primary_registration->payment_overview_url() : FALSE;
	}



	/**
	 * @return string
	 * @throws \EE_Error
	 */
	public function gateway_response_on_transaction() {
		$payment = $this->get_first_related( 'Payment' );
		return $payment instanceof EE_Payment ? $payment->gateway_response() : '';
	}



	/**
	 * Get the status object of this object
	 *
	 * @return EE_Status
	 * @throws \EE_Error
	 */
	public function status_obj() {
		return $this->get_first_related( 'Status' );
	}



	/**
	 * Gets all the extra meta info on this payment
	 *
	 * @param array $query_params like EEM_Base::get_all
	 * @return EE_Extra_Meta
	 * @throws \EE_Error
	 */
	public function extra_meta( $query_params = array() ) {
		return $this->get_many_related( 'Extra_Meta', $query_params );
	}



	/**
	 * Wrapper for _add_relation_to
	 *
	 * @param EE_Registration $registration
	 * @return EE_Base_Class the relation was added to
	 * @throws \EE_Error
	 */
	public function add_registration( EE_Registration $registration ) {
		return $this->_add_relation_to( $registration, 'Registration' );
	}



	/**
	 * Removes the given registration from being related (even before saving this transaction).
	 * If an ID/index is provided and this transaction isn't saved yet, removes it from list of cached relations
	 *
	 * @param int $registration_or_id
	 * @return EE_Base_Class that was removed from being related
	 * @throws \EE_Error
	 */
	public function remove_registration_with_id( $registration_or_id ) {
		return $this->_remove_relation_to( $registration_or_id, 'Registration' );
	}



	/**
	 * Gets all the line items which are for ACTUAL items
	 *
	 * @return EE_Line_Item[]
	 * @throws \EE_Error
	 */
	public function items_purchased() {
		return $this->line_items( array( array( 'LIN_type' => EEM_Line_Item::type_line_item ) ) );
	}



	/**
	 * Wrapper for _add_relation_to
	 *
	 * @param EE_Line_Item $line_item
	 * @return EE_Base_Class the relation was added to
	 * @throws \EE_Error
	 */
	public function add_line_item( EE_Line_Item $line_item ) {
		return $this->_add_relation_to( $line_item, 'Line_Item' );
	}



	/**
	 * Gets ALL the line items related to this transaction (unstructured)
	 *
	 * @param array $query_params
	 * @return EE_Line_Item[]
	 * @throws \EE_Error
	 */
	public function line_items( $query_params = array() ) {
		return $this->get_many_related( 'Line_Item', $query_params );
	}



	/**
	 * Gets all the line items which are taxes on the total
	 *
	 * @return EE_Line_Item[]
	 * @throws \EE_Error
	 */
	public function tax_items() {
		return $this->line_items( array( array( 'LIN_type' => EEM_Line_Item::type_tax ) ) );
	}



	/**
	 * Gets the total line item (which is a parent of all other related line items,
	 * meaning it takes them all into account on its total)
	 *
	 * @param bool $create_if_not_found
	 * @return \EE_Line_Item
	 * @throws \EE_Error
	 */
	public function total_line_item( $create_if_not_found = true ) {
		$item =  $this->get_first_related( 'Line_Item', array( array( 'LIN_type' => EEM_Line_Item::type_total ) ) );
		if( ! $item && $create_if_not_found ){
			$item = EEH_Line_Item::create_total_line_item( $this );
		}
		return $item;
	}



	/**
	 * Returns the total amount of tax on this transaction
	 * (assumes there's only one tax subtotal line item)
	 *
	 * @return float
	 * @throws \EE_Error
	 */
	public function tax_total() {
		$tax_line_item = $this->tax_total_line_item();
		if ( $tax_line_item ) {
			return (float)$tax_line_item->total();
		} else {
			return (float)0;
		}
	}



	/**
	 * Gets the tax subtotal line item (assumes there's only one)
	 *
	 * @return EE_Line_Item
	 * @throws \EE_Error
	 */
	public function tax_total_line_item() {
		return EEH_Line_Item::get_taxes_subtotal( $this->total_line_item() );
	}



	/**
	 *  Gets the array of billing info for the gateway and for this transaction's primary registration's attendee.
	 *
	 * @return EE_Form_Section_Proper
	 * @throws \EE_Error
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
	 *
	 * @return int
	 * @throws \EE_Error
	 */
	public function payment_method_ID() {
		return $this->get('PMD_ID');
	}



	/**
	 * Sets PMD_ID
	 *
	 * @param int $PMD_ID
	 * @return boolean
	 * @throws \EE_Error
	 */
	public function set_payment_method_ID($PMD_ID) {
		$this->set('PMD_ID', $PMD_ID);
	}



	/**
	 * Gets the last-used payment method on this transaction
	 * (we COULD just use the last-made payment, but some payment methods, namely
	 * offline ones, dont' create payments)
	 *
	 * @return EE_Payment_Method
	 * @throws \EE_Error
	 */
	public function payment_method(){
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
	 *
	 * @return EE_Payment
	 * @throws \EE_Error
	 */
	public function last_payment() {
		return $this->get_first_related( 'Payment', array( 'order_by' => array( 'PAY_ID' => 'desc' ) ) );
	}



	/**
	 * Gets all the line items which are unrelated to tickets on this transaction
	 *
	 * @return EE_Line_Item[]
	 * @throws \EE_Error
	 */
	public function non_ticket_line_items(){
		return EEM_Line_Item::instance()->get_all_non_ticket_line_items_for_transaction( $this->ID() );
	}



	/**
	 * possibly toggles TXN status
	 *
	 * @param  boolean $update whether to save the TXN
	 * @return boolean whether the TXN was saved
	 * @throws \RuntimeException
	 */
	public function update_status_based_on_total_paid($update = true)
	{
		// set transaction status based on comparison of TXN_paid vs TXN_total
		if (EEH_Money::compare_floats($this->paid(), $this->total(), '>')) {
			$new_txn_status = EEM_Transaction::overpaid_status_code;
		} else if (EEH_Money::compare_floats($this->paid(), $this->total())) {
			$new_txn_status = EEM_Transaction::complete_status_code;
		} else if (EEH_Money::compare_floats($this->paid(), $this->total(), '<')) {
			$new_txn_status = EEM_Transaction::incomplete_status_code;
		} else {
			throw new RuntimeException(
				__('The total paid calculation for this transaction is inaccurate.', 'event_espresso')
			);
		}
		if ($new_txn_status !== $this->status_ID()) {
			$this->set_status($new_txn_status);
			if ($update) {
				return $this->save() ? true : false;
			}
		}
		return false;
	}



	/**
	 * Updates the transaction's status and total_paid based on all the payments
	 * that apply to it
	 *
	 * @deprecated
	 * @return boolean
	 * @throws \EE_Error
	 */
	public function update_based_on_payments()
	{
		EE_Error::doing_it_wrong(
			__CLASS__ . '::' . __FUNCTION__,
			sprintf(__('This method is deprecated. Please use "%s" instead', 'event_espresso'),
				'EE_Transaction_Processor::update_transaction_and_registrations_after_checkout_or_payment()'),
			'4.6.0'
		);
		/** @type EE_Transaction_Processor $transaction_processor */
		$transaction_processor = EE_Registry::instance()->load_class('Transaction_Processor');
		return $transaction_processor->update_transaction_and_registrations_after_checkout_or_payment($this);
	}



	/**
	 * @return string
	 */
	public function old_txn_status() {
		return $this->_old_txn_status;
	}



	/**
	 * @param string $old_txn_status
	 */
	public function set_old_txn_status( $old_txn_status ) {
		// only set the first time
		if ( $this->_old_txn_status === null ) {
			$this->_old_txn_status = $old_txn_status;
		}
	}



	/**
	 * reg_status_updated
	 *
	 * @return bool
	 */
	public function txn_status_updated() {
		return $this->status_ID() !== $this->_old_txn_status && $this->_old_txn_status !== null ? true : false;
	}



	/**
	 * _reg_steps_completed
	 * if $check_all is TRUE, then returns TRUE if ALL reg steps have been marked as completed,
	 * if a $reg_step_slug is provided, then this step will be skipped when testing for completion
	 * if $check_all is FALSE and a $reg_step_slug is provided, then ONLY that reg step will be tested for completion
	 *
	 * @access private
	 * @param string         $reg_step_slug
	 * @param bool           $check_all
	 * @return boolean | int
	 */
	private function _reg_steps_completed( $reg_step_slug = '', $check_all = true ) {
		$reg_steps = $this->reg_steps();
		if ( ! is_array( $reg_steps ) || empty( $reg_steps ) ) {
			return false;
		}
		// loop thru reg steps array)
		foreach ( $reg_steps as $slug => $reg_step_completed ) {
			// if NOT checking ALL steps (only checking one step)
			if ( ! $check_all ) {
				// and this is the one
				if ( $slug === $reg_step_slug ) {
					return $reg_step_completed;
				} else {
					// skip to next reg step in loop
					continue;
				}
			}
			// $check_all must be true, else we would never have gotten to this point
			if ( $slug === $reg_step_slug ) {
				// if we reach this point, then we are testing either:
				// all_reg_steps_completed_except() or
				// all_reg_steps_completed_except_final_step(),
				// and since this is the reg step EXCEPTION being tested
				// we want to return true (yes true) if this reg step is NOT completed
				// ie: "is everything completed except the final step?"
				// "that is correct... the final step is not completed, but all others are."
				return $reg_step_completed !== true ? true : false;
			} else if ( $reg_step_completed !== true ) {
				// if any reg step is NOT completed, then ALL steps are not completed
				return false;
			}
		}
		return true;
	}



	/**
	 * all_reg_steps_completed
	 * returns:
	 *    true if ALL reg steps have been marked as completed
	 *        or false if any step is not completed
	 *
	 * @return boolean
	 */
	public function all_reg_steps_completed() {
		return $this->_reg_steps_completed();
	}



	/**
	 * all_reg_steps_completed_except
	 * returns:
	 *        true if ALL reg steps, except a particular step that you wish to skip over, have been marked as completed
	 *        or false if any other step is not completed
	 *        or false if ALL steps are completed including the exception you are testing !!!
	 *
	 * @param string         $exception
	 * @return boolean
	 */
	public function all_reg_steps_completed_except( $exception = '' ) {
		return $this->_reg_steps_completed( $exception );
	}



	/**
	 * all_reg_steps_completed_except
	 * returns:
	 *        true if ALL reg steps, except the final step, have been marked as completed
	 *        or false if any step is not completed
	 *    or false if ALL steps are completed including the final step !!!
	 *
	 * @return boolean
	 */
	public function all_reg_steps_completed_except_final_step() {
		return $this->_reg_steps_completed( 'finalize_registration' );
	}



	/**
	 * reg_step_completed
	 * returns:
	 *    true if a specific reg step has been marked as completed
	 *    a Unix timestamp if it has been initialized but not yet completed,
	 *    or false if it has not yet been initialized
	 *
	 * @param string         $reg_step_slug
	 * @return boolean | int
	 */
	public function reg_step_completed( $reg_step_slug ) {
		return $this->_reg_steps_completed( $reg_step_slug, false );
	}



	/**
	 * completed_final_reg_step
	 * returns:
	 *    true if the finalize_registration reg step has been marked as completed
	 *    a Unix timestamp if it has been initialized but not yet completed,
	 *    or false if it has not yet been initialized
	 *
	 * @return boolean | int
	 */
	public function final_reg_step_completed() {
		return $this->_reg_steps_completed( 'finalize_registration', false );
	}



	/**
	 * set_reg_step_initiated
	 * given a valid TXN_reg_step, this sets it's value to a unix timestamp
	 *
	 * @access public
	 * @param string          $reg_step_slug
	 * @return boolean
	 * @throws \EE_Error
	 */
	public function set_reg_step_initiated( $reg_step_slug ) {
		return $this->_set_reg_step_completed_status( $reg_step_slug, time() );
	}



	/**
	 * set_reg_step_completed
	 * given a valid TXN_reg_step, this sets the step as completed
	 *
	 * @access public
	 * @param string          $reg_step_slug
	 * @return boolean
	 * @throws \EE_Error
	 */
	public function set_reg_step_completed( $reg_step_slug ) {
		return $this->_set_reg_step_completed_status( $reg_step_slug, true );
	}



	/**
	 * set_reg_step_completed
	 * given a valid TXN_reg_step slug, this sets the step as NOT completed
	 *
	 * @access public
	 * @param string          $reg_step_slug
	 * @return boolean
	 * @throws \EE_Error
	 */
	public function set_reg_step_not_completed( $reg_step_slug ) {
		return $this->_set_reg_step_completed_status( $reg_step_slug, false );
	}



	/**
	 * set_reg_step_completed
	 * given a valid reg step slug, this sets the TXN_reg_step completed status which is either:
	 *
	 * @access private
	 * @param  string          $reg_step_slug
	 * @param  boolean|int     $status
	 * @return boolean
	 * @throws \EE_Error
	 */
	private function _set_reg_step_completed_status( $reg_step_slug, $status ) {
		// validate status
		$status = is_bool( $status ) || is_int( $status ) ? $status : false;
		// get reg steps array
		$txn_reg_steps = $this->reg_steps();
		// if reg step does NOT exist
		if ( ! isset( $txn_reg_steps[ $reg_step_slug ] ) ) {
			return false;
		}
		// if  we're trying to complete a step that is already completed
		if ( $txn_reg_steps[ $reg_step_slug ] === true ) {
			return true;
		}
		// if  we're trying to complete a step that hasn't even started
		if ( $status === true && $txn_reg_steps[ $reg_step_slug ] === false ) {
			return false;
		}
		// if current status value matches the incoming value (no change)
		// type casting as int means values should collapse to either 0, 1, or a timestamp like 1234567890
		if ( (int) $txn_reg_steps[ $reg_step_slug ] === (int) $status ) {
			// this will happen in cases where multiple AJAX requests occur during the same step
			return true;
		}
		// if we're trying to set a start time, but it has already been set...
		if ( is_numeric( $status ) && is_numeric( $txn_reg_steps[ $reg_step_slug ] ) ) {
			// skip the update below, but don't return FALSE so that errors won't be displayed
			return true;
		}
		// update completed status
		$txn_reg_steps[ $reg_step_slug ] = $status;
		$this->set_reg_steps( $txn_reg_steps );
		$this->save();
		return true;
	}



	/**
	 * remove_reg_step
	 * given a valid TXN_reg_step slug, this will remove (unset)
	 * the reg step from the TXN reg step array
	 *
	 * @access public
	 * @param string          $reg_step_slug
	 * @return void
	 */
	public function remove_reg_step( $reg_step_slug ) {
		// get reg steps array
		$txn_reg_steps = $this->reg_steps();
		unset( $txn_reg_steps[ $reg_step_slug ] );
		$this->set_reg_steps( $txn_reg_steps );
	}



	/**
	 *    toggle_failed_transaction_status
	 * upgrades a TXNs status from failed to abandoned,
	 * meaning that contact information has been captured for at least one registrant
	 *
	 * @access public
	 * @param bool $save
	 * @return bool
	 */
	public function toggle_failed_transaction_status( $save = true ) {
		// if TXN status is still set as "failed"...
		if ( $this->status_ID() === EEM_Transaction::failed_status_code ) {
			$this->set_status( EEM_Transaction::abandoned_status_code );
			if ( $save ) {
				$this->save();
			}
			return true;
		}
		return false;
	}



	/**
	 * toggle_abandoned_transaction_status
	 * upgrades a TXNs status from failed or abandoned to incomplete
	 *
	 * @access public
	 * @return boolean
	 */
	public function toggle_abandoned_transaction_status() {
		// if TXN status has not been updated already due to a payment, and is still set as "failed" or "abandoned"...
		$txn_status = $this->status_ID();
		if (
			$txn_status === EEM_Transaction::failed_status_code
			|| $txn_status === EEM_Transaction::abandoned_status_code
		) {
			// if a contact record for the primary registrant has been created
			if (
				$this->primary_registration() instanceof EE_Registration
				&& $this->primary_registration()->attendee() instanceof EE_Attendee
			) {
				$this->set_status( EEM_Transaction::incomplete_status_code );
			} else {
				// no contact record? yer abandoned!
				$this->set_status( EEM_Transaction::abandoned_status_code );
			}
			return true;
		}
		return false;
	}



	/**
	 * checks if an Abandoned TXN has any related payments, and if so,
	 * updates the TXN status based on the amount paid
	 */
	public function verify_abandoned_transaction_status() {
		if ( $this->status_ID() !== EEM_Transaction::abandoned_status_code ) {
			return;
		}
		$payments = $this->get_many_related( 'Payment' );
		if ( ! empty( $payments ) ) {
			foreach ( $payments as $payment ) {
				if ( $payment instanceof EE_Payment ) {
					// kk this TXN should NOT be abandoned
					$this->update_status_based_on_total_paid();
					if ( is_admin() && ! ( defined('DOING_AJAX') && DOING_AJAX ) ) {
						EE_Error::add_attention(
							sprintf(
								esc_html__(
									'The status for Transaction #%1$d has been updated from "Abandoned" to "%2$s", because at least one payment has been made towards it. If the payment appears in the "Payment Details" table below, you may need to edit its status and/or other details as well.',
									'event_espresso'
								),
								$this->ID(),
								$this->pretty_status()
							)
						);
					}
					// get final reg step status
					$finalized = $this->final_reg_step_completed();
					// if the 'finalize_registration' step has been initiated (has a timestamp)
					// but has not yet been fully completed (TRUE)
					if ( is_int( $finalized ) && $finalized !== false && $finalized !== true ) {
						$this->set_reg_step_completed( 'finalize_registration' );
						$this->save();
					}
				}
			}
		}
	}

}/* End of file EE_Transaction.class.php */
/* Location: includes/classes/EE_Transaction.class.php */
