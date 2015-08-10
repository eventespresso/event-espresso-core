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
}
 * Payment class
 *
 * @package               Event Espresso
 * @subpackage            includes/classes/EE_Payment.class.php
 * @author                Brent Christensen
 */
class EE_Payment extends EE_Base_Class implements EEI_Payment{

	/**
	 *
	 * @param array $props_n_values
	 * @return EE_Payment
	 */
	public static function new_instance( $props_n_values = array() ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__ );
		return $has_object ? $has_object : new self( $props_n_values );
	}



	/**
	 * @param array $props_n_values
	 * @param null  $timezone
	 * @return EE_Payment
	 */
	public static function new_instance_from_db( $props_n_values = array(), $timezone = NULL ) {
		return new self( $props_n_values, TRUE, $timezone );
	}



	/**
	 *        Set Transaction ID
	 *
	 * @access        public
	 * @param int $TXN_ID
	 */
	public function set_transaction_id( $TXN_ID = 0 ) {
		$this->set( 'TXN_ID', $TXN_ID );
	}



	/**
	 * Gets the transaction related to this payment
	 * @return EE_Transaction
	 */
	public function transaction() {
		return $this->get_first_related( 'Transaction' );
	}



	/**
	 *        Set Status
	 *
	 * @access        public
	 * @param        string $STS_ID
	 */
	public function set_status( $STS_ID = '' ) {
		$this->set( 'STS_ID', $STS_ID );
	}



	/**
	 *        Set Payment Timestamp
	 *
	 * @access        public
	 * @param        int $timestamp
	 */
	public function set_timestamp( $timestamp = 0 ) {
		$this->set( 'PAY_timestamp', $timestamp );
	}



	/**
	*		Set Payment Method
	*
	* 		@access		public
	*		@param		string		$PAY_source
	*/
	public function set_source( $PAY_source = '' ) {
		$this->set('PAY_source',$PAY_source);
	}



	/**
	 *        Set Payment Amount
	 *
	 * @access        public
	 * @param float $amount
	 */
	public function set_amount( $amount = 0.00 ) {
		$this->set( 'PAY_amount', $amount );
	}



	/**
	 *        Set Payment Gateway Response
	 *
	 * @access        public
	 * @param        string $gateway_response
	 */
	public function set_gateway_response( $gateway_response = '' ) {
		$this->set( 'PAY_gateway_response', $gateway_response );
	}
	/**
	 * Returns the name of the paymetn method used on this payment (previously known merely as 'gateway')
	 * but since 4.6.0, payment methods are models and the paymetn keeps a foreign key to the paymetn method
	 * used on it
	 * @deprecated
	 * @return string
	 */
	public function gateway(){
		EE_Error::doing_it_wrong('EE_Payment::gateway', __( 'The method EE_Payment::gateway() has been deprecated. Consider instead using EE_Payment::payment_method()->name()', 'event_espresso' ), '4.6.0' );
		if( $this->payment_method() ){
			return $this->payment_method()->name();
		}else{
			return __( 'Unknown', 'event_espresso' );
		}
	}



	/**
	 *        Set Gateway Transaction ID
	 *
	 * @access        public
	 * @param        string $txn_id_chq_nmbr
	 */
	public function set_txn_id_chq_nmbr( $txn_id_chq_nmbr = '' ) {
		$this->set( 'PAY_txn_id_chq_nmbr', $txn_id_chq_nmbr );
	}



	/**
	 *        Set Purchase Order Number
	 *
	 * @access        public
	 * @param        string $po_number
	 */
	public function set_po_number( $po_number = '' ) {
		$this->set( 'PAY_po_number', $po_number );
	}



	/**
	 *        Set Extra Accounting Field
	 *
	 * @access        public
	 * @param        string $extra_accntng
	 */
	public function set_extra_accntng( $extra_accntng = '' ) {
		$this->set( 'PAY_extra_accntng', $extra_accntng );
	}



	/**
	 *        Set Payment made via admin flag
	 *
	 * @access        public
	 * @param        bool $via_admin
	 */
	public function set_payment_made_via_admin( $via_admin = FALSE ) {
		if($via_admin){
			$this->set('PAY_source',  EEM_Payment_Method::scope_admin);
		}else{
			$this->set('PAY_source', EEM_Payment_Method::scope_cart);
		}

	}



	/**
	 *        Set Payment Details
	 *
	 * @access        public
	 * @param        string $details
	 */
	public function set_details( $details = '' ) {
		if ( is_array( $details ) ) {
			array_walk_recursive( $details, array( $this, '_strip_all_tags_within_array' ));
		} else {
			$details = wp_strip_all_tags( $details );
		}
		$this->set( 'PAY_details', $details );
	}

	/**
	 * Sets redirect_url
	 * @param string $redirect_url
	 */
	function set_redirect_url($redirect_url) {
		$this->set('PAY_redirect_url', $redirect_url);
	}

	/**
	 * Sets redirect_args
	 * @param array $redirect_args
	 */
	function set_redirect_args($redirect_args) {
		$this->set('PAY_redirect_args', $redirect_args);
	}



	/**
	 *        get Payment Transaction ID
	 * @access        public
	 */
	public function TXN_ID() {
		return $this->get( 'TXN_ID' );
	}



	/**
	*		get Payment Status
	* 		@access		public
	*/
	public function status() {
		return $this->get('STS_ID');
	}
	/**
	*		get Payment Status
	* 		@access		public
	*/
	public function STS_ID() {
		return $this->get('STS_ID');
	}



	/**
	 *        get Payment Timestamp
	 *
	 * @access        public
	 * @param string $dt_frmt
	 * @param string $tm_frmt
	 * @param null $date_or_time
	 * @return string
	 */
	public function timestamp( $dt_frmt = '', $tm_frmt = '', $date_or_time = NULL ) {
		return $this->get_datetime('PAY_timestamp', $dt_frmt, $tm_frmt, $date_or_time );
	}



	/**
	*		get Payment Source
	* 		@access		public
	*/
	public function source() {
		return $this->get('PAY_source');
	}



	/**
	 *        get Payment Amount
	 * @access        public
	 * @return float
	 */
	public function amount() {
		return $this->get( 'PAY_amount' );
	}



	/**
	 * @return mixed
	 */
	public function amount_no_code() {
		return $this->get_pretty( 'PAY_amount', 'no_currency_code' );
	}



	/**
	 *        get Payment Gateway Response
	 * @access        public
	 */
	public function gateway_response() {
		return $this->get( 'PAY_gateway_response' );
	}



	/**
	 *        get Payment Gateway Transaction ID
	 * @access        public
	 */
	public function txn_id_chq_nmbr() {
		return $this->get( 'PAY_txn_id_chq_nmbr' );
	}



	/**
	 *        get Purchase Order Number
	 * @access        public
	 */
	public function po_number() {
		return $this->get( 'PAY_po_number' );
	}



	/**
	 *        get Extra Accounting Field
	 * @access        public
	 */
	public function extra_accntng() {
		return $this->get( 'PAY_extra_accntng' );
	}



	/**
	*		get Payment made via admin source
	* 		@access		public
	*/
	public function payment_made_via_admin() {
		return ($this->get('PAY_source') == EEM_Payment_Method::scope_admin);
	}



	/**
	 *        get Payment Details
	 * @access        public
	 */
	public function details() {
		return $this->get( 'PAY_details' );
	}


	/**
	 * Gets redirect_url
	 * @return string
	 */
	function redirect_url() {
		return $this->get('PAY_redirect_url');
	}



	/**
	 * Gets redirect_args
	 * @return array
	 */
	function redirect_args() {
		return $this->get('PAY_redirect_args');
	}



	/**
	 * echoes $this->pretty_status()
	 * @param bool $show_icons
	 * @return void
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
		$status = EEM_Status::instance()->localized_status( array( $this->STS_ID() => __( 'unknown', 'event_espresso' ) ), FALSE, 'sentence' );
		$icon = '';
		switch ( $this->STS_ID() ) {
			case EEM_Payment::status_id_approved:
				$icon = $show_icons ? '<span class="dashicons dashicons-yes ee-icon-size-24 green-text"></span>' : '';
				break;
			case EEM_Payment::status_id_pending:
				$icon = $show_icons ? '<span class="dashicons dashicons-clock ee-icon-size-16 orange-text"></span>' : '';
				break;
			case EEM_Payment::status_id_cancelled:
				$icon = $show_icons ? '<span class="dashicons dashicons-no ee-icon-size-16 lt-grey-text"></span>' : '';
				break;
			case EEM_Payment::status_id_declined:
				$icon = $show_icons ? '<span class="dashicons dashicons-no ee-icon-size-16 red-text"></span>' : '';
				break;
		}
		return $icon . $status[ $this->STS_ID() ];
	}




	/**
	 * For determining the status of the payment
	 * @return boolean whether the payment is approved or not
	 */
	public function is_approved() {
		return $this->status_is( EEM_Payment::status_id_approved );
	}



	/**
	 * Generally determines if the status of this payment equals
	 * the $STS_ID string
	 * @param string $STS_ID an ID from the esp_status table/
	 *                       one of the status_id_* on the EEM_Payment model
	 * @return boolean whether the status of this payment equals the status id
	 */
	protected function status_is( $STS_ID ) {
		if ( $STS_ID == $this->STS_ID() ) {
			return TRUE;
		} else {
			return FALSE;
		}
	}



	/**
	 * For determining the status of the payment
	 * @return boolean whether the payment is pending or not
	 */
	public function is_pending() {
		return $this->status_is( EEM_Payment::status_id_pending );
	}



	/**
	 * For determining the status of the payment
	 * @return boolean
	 */
	public function is_cancelled() {
		return $this->status_is( EEM_Payment::status_id_cancelled );
	}



	/**
	 * For determining the status of the payment
	 * @return boolean
	 */
	public function is_declined() {
		return $this->status_is( EEM_Payment::status_id_declined );
	}



	/**
	 * For determining the status of the payment
	 * @return boolean
	 */
	public function is_failed() {
		return $this->status_is( EEM_Payment::status_id_failed );
	}



	/**
	 * For determining if the payment is actually a refund ( ie: has a negative value )
	 * @return boolean
	 */
	public function is_a_refund() {
		return $this->amount() < 0 ? true : false;
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
	 * Gets the last-used payment method on this transaction
	 * (we COULD just use the last-made payment, but some payment methods, namely
	 * offline ones, dont' create payments)
	 * @return EE_Payment_Method
	 */
	function payment_method(){
		return $this->get_first_related('Payment_Method');
	}



	/**
	 * Gets the HTML for redirecting the user to an offsite gateway
	 * You can pass it special content to put inside the form, or use
	 * the default inner content (or possibly generate this all yourself using
	 * redirect_url() and redirect_args() or redirect_args_as_inputs()).
	 * Creates a POST request by default, but if no redirect args are specified, creates a GET request instead.
	 * @param string $inside_form_html
	 * @return string html
	 */
	function redirect_form( $inside_form_html = NULL ) {
		$redirect_url = $this->redirect_url();
		if ( ! empty( $redirect_url )) {
			EE_Registry::instance()->load_helper('HTML');
			// what ? no inner form content?
			if( $inside_form_html === NULL ) {
				$inside_form_html = EEH_HTML::p(
					sprintf(
						__('If you are not automatically redirected to the payment website within 10 seconds... %1$s %2$s Click Here %3$s', 'event_espresso'),
						EEH_HTML::br(2),
						'<input type="submit" value="',
						'">'
					),
					'', '', 'text-align:center;'
				);
			}
			$method = $this->redirect_args() ? 'POST' : 'GET';
			$form = EEH_HTML::nl(1) . '<form method="' . $method . '" name="gateway_form" action="' . $redirect_url . '">';
			$form .= EEH_HTML::nl(1) . $this->redirect_args_as_inputs();
			$form .= $inside_form_html;
			$form .= EEH_HTML::nl(-1) . '</form>' . EEH_HTML::nl(-1);
			return $form;
		} else {
			return NULL;
		}

	}



	/**
	 * Changes all the name-value pairs of
	 * @return string
	 */
	function redirect_args_as_inputs(){
		$html = '';
		if( $this->redirect_args() !== NULL && is_array( $this->redirect_args() )) {
			EE_Registry::instance()->load_helper('HTML');
			foreach($this->redirect_args() as $name => $value){
				$html .= EEH_HTML::nl(0) . '<input type="hidden" name="' . $name . '" value="' . esc_attr( $value ) . '"/>';
			}
		}
		return $html;
	}



	/**
	 * Returns the currency of the payment.
	 * (At the time of writing, this will always be the currency in the configuration;
	 * however in the future it is anticipated that this will be stored on the payment
	 * object itself)
	 * @return string for the currency code
	 */
	public function currency_code(){
		return EE_Config::instance()->currency->code;
	}





	/**
	 *        apply wp_strip_all_tags to all elements within an array
	 *
	 * @access        private
	 * @param        mixed $item
	 */
	private function _strip_all_tags_within_array( &$item ) {
		if( is_object( $item ) ) {
			$item = (array) $item;
		}
		if( is_array( $item ) ){
			array_walk_recursive( $item, array( $this, '_strip_all_tags_within_array' ) );
		}else{
			$item = wp_strip_all_tags( $item );
		}
	}

	/**
	 * Returns TRUE is this payment was set to approved during this request (or
	 * is approved and was created during this request). False otherwise.
	 * @return boolean
	 */
	public function just_approved(){
		EE_Registry::instance()->load_helper( 'Array' );
		$original_status =EEH_Array::is_set( $this->_props_n_values_provided_in_constructor, 'STS_ID', $this->get_model()->field_settings_for( 'STS_ID' )->get_default_value() );
		$current_status = $this->status();
		if( $original_status !== EEM_Payment::status_id_approved && $current_status === EEM_Payment::status_id_approved ){
			return TRUE;
		}else{
			return FALSE;
		}
	}

	/**
	 * Overrides parents' get_pretty() function just for legacy reasons
	 * (to allow ticket https://events.codebasehq.com/projects/event-espresso/tickets/7420)
	 * @param string $field_name
	 * @param string         $extra_cache_ref This allows the user to specify an extra cache ref for the given property (in cases where the same property may be used for different outputs - i.e. datetime, money etc.)
	 * @return mixed
	 */
	public function get_pretty($field_name, $extra_cache_ref = NULL){
		if( $field_name == 'PAY_gateway' ){
			return $this->gateway();
		}
		return  $this->_get_cached_property( $field_name, TRUE, $extra_cache_ref );
	}
}

/* End of file EE_Payment.class.php */
/* Location: /includes/classes/EE_Payment.class.php */
