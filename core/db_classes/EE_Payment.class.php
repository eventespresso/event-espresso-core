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
 * Payment class
 *
 * @package               Event Espresso
 * @subpackage            includes/classes/EE_Payment.class.php
 * @author                Brent Christensen
 */
class EE_Payment extends EE_Base_Class {

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
	 *        Set Payment Method
	 *
	 * @access        public
	 * @param        string $pay_method
	 */
	public function set_method( $pay_method = '' ) {
		$this->set( 'PAY_method', $pay_method );
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
	 *        Set Payment Gateway
	 *
	 * @access        public
	 * @param        string $gateway
	 */
	public function set_gateway( $gateway = '' ) {
		$this->set( 'PAY_gateway', $gateway );
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
		$this->set( 'PAY_via_admin', $via_admin );
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
	 *        get Payment Transaction ID
	 * @access        public
	 */
	public function TXN_ID() {
		return $this->get( 'TXN_ID' );
	}



	/**
	 * @param string $dt_frmt
	 * @param string $tm_frmt
	 * @param string $date_or_time
	 * @return string
	 */
	public function timestamp( $dt_frmt = '', $tm_frmt = '', $date_or_time = '' ) {
		return $this->get_datetime( 'PAY_timestamp', $dt_frmt, $tm_frmt, $date_or_time );
	}



	/**
	 *        get Payment Method
	 * @access        public
	 */
	public function method() {
		return $this->get( 'PAY_method' );
	}



	/**
	 *        get Payment Amount
	 * @access        public
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
	 *        get Payment made via admin flag
	 * @access        public
	 */
	public function payment_made_via_admin() {
		return $this->get( 'PAY_via_admin' );
	}



	/**
	 *        get Payment Details
	 * @access        public
	 */
	public function details() {
		return $this->get( 'PAY_details' );
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
	 *        get Payment Status
	 * @access        public
	 */
	public function STS_ID() {
		return $this->get( 'STS_ID' );
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
	 * Echoes out the payment overview HTML from the gateway used on this payment
	 */
	public function e_gateway_payment_overview_content() {
		echo $this->gateway_payment_overview_content();
	}



	/**
	 * Gets the payment overview content from the gateway used on this payment.
	 * @return string
	 */
	public function gateway_payment_overview_content() {
		$gateway_name = $this->gateway();
		$EEM_Gateways = EEM_Gateways::instance();
		//call its render payment results, feeding it the current payment
		return $EEM_Gateways->get_payment_overview_content( $gateway_name, $this );
	}



	/**
	 *        get Payment Gateway
	 * @access        public
	 */
	public function gateway() {
		return $this->get( 'PAY_gateway' );
	}



	/**
	 *        Apply a Payment to a Transaction, update all totals, and save payment info to db
	 * @internal param bool $via_admin
	 * @return \EE_Transaction
	 */
	public function apply_payment_to_transaction() {
		if ( ! $this->ID() ) {
			$this->save();
		}
		// recalculate and set  total paid
		return EE_Registry::instance()->load_model( 'Payment', $this->_timezone )->update_payment_transaction( $this, 'processed' );
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
	 *        apply wp_strip_all_tags to all elements within an array
	 *
	 * @access        private
	 * @param        mixed $item
	 * @param        mixed $key
	 */
	private function _strip_all_tags_within_array( &$item, $key ) {
		$item = wp_strip_all_tags( $item );
	}
}

/* End of file EE_Payment.class.php */
/* Location: /includes/classes/EE_Payment.class.php */
