<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 *
 * Payment Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Michael Nelson, Brent Christensen
 *
 */
class EEM_Payment extends EEM_Base implements EEMI_Payment{

  	// private instance of the Payment object
	protected static $_instance = NULL;



/**
	 * Status id in esp_status table that represents an approved payment
	 */
	const status_id_approved = 'PAP';


	/**
	 * Status id in esp_status table that represents a pending payment
	 */
	const status_id_pending = 'PPN';


	/**
	 * Status id in esp_status table that represents a cancelled payment (eg, the
	 * user went to PayPal, but on the paypal site decided to cancel the payment)
	 */
	const status_id_cancelled = 'PCN';



	/**
	 * Status id in esp_status table that represents a payment that was declined by
	 * the gateway. (eg, the user's card had no funds, or it was a fraudulent card)
	 */
	const status_id_declined = 'PDC';



	/**
	 * Status id in esp_status table that represents a payment that failed for technical reasons.
	 * (Eg, there was some error in communicating with the payment gateway.)
	 */
	const status_id_failed = 'PFL';

	/**
	 *		private constructor to prevent direct creation
	 *		@Constructor
	 *		@access protected
	 *		@param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any incoming timezone data that gets saved).  Note this just sends the timezone info to the date time model field objects.  Default is NULL (and will be assumed using the set timezone in the 'timezone_string' wp option)
	 *		@return EEM_Payment
	 */
	protected function __construct( $timezone ) {

		$this->singular_item = __('Payment','event_espresso');
		$this->plural_item = __('Payments','event_espresso');

		$this->_tables = array(
			'Payment'=>new EE_Primary_Table('esp_payment','PAY_ID')
		);
		$this->_fields = array(
			'Payment'=>array(
				'PAY_ID'=>new EE_Primary_Key_Int_Field('PAY_ID', __('Payment ID','event_espresso')),
				'TXN_ID'=>new EE_Foreign_Key_Int_Field('TXN_ID', __('Transaction ID','event_espresso'), false, 0, 'Transaction'),
				'STS_ID'=>new EE_Foreign_Key_String_Field('STS_ID', __('Status ID','event_espresso'), false, EEM_Payment::status_id_failed, 'Status'),
				'PAY_timestamp'=> new EE_Datetime_Field('PAY_timestamp', __('Timestamp of when payment was attempted','event_espresso'), false, EE_Datetime_Field::now, $timezone ),
				'PAY_source'=>new EE_All_Caps_Text_Field('PAY_source', __('User-friendly description of payment','event_espresso'), false, 'CART'),
				'PAY_amount'=>new EE_Money_Field('PAY_amount', __('Amount Payment should be for','event_espresso'), false, 0),
				'PMD_ID'=>new EE_Foreign_Key_Int_Field('PMD_ID', __("Payment Method ID", 'event_espresso'), false, NULL, 'Payment_Method'),
				'PAY_gateway_response'=>new EE_Plain_Text_Field('PAY_gateway_response', __('Response from Gateway about the payment','event_espresso'), false, ''),
				'PAY_txn_id_chq_nmbr'=>new EE_Plain_Text_Field('PAY_txn_id_chq_nmbr', __('Gateway Transaction ID or Cheque Number','event_espresso'), true, ''),
				'PAY_po_number'=>new EE_Plain_Text_Field('PAY_po_number', __('Purchase or Sales Number','event_espresso'), true, ''),
				'PAY_extra_accntng'=>new EE_Simple_HTML_Field('PAY_extra_accntng', __('Extra Account Info','event_espresso'), true, ''),
				'PAY_details'=>new EE_Serialized_Text_Field('PAY_details', __('Full Gateway response about payment','event_espresso'), true, ''),
				'PAY_redirect_url'=>new EE_Plain_Text_Field('PAY_redirect_url', __("Redirect URL", 'event_espresso'), true),
				'PAY_redirect_args'=>new EE_Serialized_Text_Field('PAY_redirect_args', __("Key-Value POST vars to send along with redirect", 'event_espresso'), true)
			)
		);
		$this->_model_relations = array(
			'Transaction'=> new EE_Belongs_To_Relation(),
			'Status'=> new EE_Belongs_To_Relation(),
			'Payment_Method'=>new EE_Belongs_To_Relation(),
			'Registration_Payment' => new EE_Has_Many_Relation(),
			'Registration' => new EE_HABTM_Relation( 'Registration_Payment' ),
		);
		$this->_model_chain_to_wp_user = 'Payment_Method';
		$this->_caps_slug = 'transactions';
		parent::__construct( $timezone );
	}




	/**
	 * Gets the payment by the gateway server's unique ID. Eg, the unique ID PayPal assigned
	 * to the payment. This is handy for verifying an IPN hasn't already been processed.
	 * @param string $PAY_txn_id_chq_nmbr
	 * @return EE_Payment
	 */
	public function get_payment_by_txn_id_chq_nmbr( $PAY_txn_id_chq_nmbr ){
		return $this->get_one(array(array('PAY_txn_id_chq_nmbr'=>$PAY_txn_id_chq_nmbr)));
	}




	/**
	*		retrieve  all payments from db for a particular transaction, optionally with
	 *		a particular status
	*
	* 		@access		public
	* 		@param		$TXN_ID
	 *		@param	string	$status_of_payment one of EEM_Payment::status_id_*, like 'PAP','PCN',etc. If none is provided, gets payments with any status
	*		@return		EE_Payment[]
	*/
	public function get_payments_for_transaction( $TXN_ID = FALSE, $status_of_payment = null ) {
		// all payments for a TXN ordered chronologically
		$query_params = array( array( 'TXN_ID' => $TXN_ID ), 'order_by' => array( 'PAY_timestamp' => 'ASC' ));
		// if provided with a status, search specifically for that status. Otherwise get them all
		if ( $status_of_payment ){
			$query_params[0]['STS_ID'] = $status_of_payment;
		}
		// retrieve payments
		return $this->get_all ( $query_params );
	}



	/**
	 * Only gets payments which have been approved
	 * @param int $TXN_ID
	 * @return EE_Payment[]
	 */
	public function get_approved_payments_for_transaction( $TXN_ID = 0 ) {
		return $this->get_payments_for_transaction( $TXN_ID, EEM_Payment::status_id_approved );

	}





	/**
	 * retrieve  all payments from db between two dates,
	 *
	 * @param string $start_date incoming start date. If empty the beginning of today is used.
	 * @param string $end_date   incoming end date. If empty the end of today is used.
	 * @param string $format  	If you include $start_date or $end_date then you must include the format string
	 *                         		for the format your date is in.
	 * @param string $timezone   If your range is in a different timezone then the current setting on this
	 *                           		WordPress install, then include it here.
	 * @throws EE_Error
	 *
	 * @return EE_Payment[]
	 */
	public function get_payments_made_between_dates( $start_date = '', $end_date = '', $format = '', $timezone = '' ) {
		$timezone = empty( $timezone ) ? EEH_DTT_Helper::get_timezone() : $timezone;
		//if $start_date or $end date, verify $format is included.
		if ( ( ! empty( $start_date ) || ! empty( $end_date ) ) && empty( $format ) ) {
			throw new EE_Error( __('You included a start date and/or a end date for this method but did not include a format string.  The format string is needed for setting up the query', 'event_espresso' ) );
		}
		$now = new DateTime( 'now' );
		// setup timezone objects once
		$modelDateTimeZone = new DateTimeZone( $this->_timezone );
		$passedDateTimeZone = new DateTimeZone( $timezone );
		// setup start date
		$start_date = ! empty( $start_date ) ? date_create_from_format( $format, $start_date, $passedDateTimeZone ) : $now;
		$start_date->setTimeZone( $modelDateTimeZone );
		$start_date = $start_date->format( 'Y-m-d' ) . ' 00:00:00';
		$start_date = strtotime( $start_date );
		// setup end date
		$end_date = ! empty( $end_date ) ? date_create_from_format( $format, $end_date, $passedDateTimeZone ) : $now;
		$end_date->setTimeZone( $modelDateTimeZone );
		$end_date = $end_date->format('Y-m-d') . ' 23:59:59';
		$end_date = strtotime( $end_date );

		// make sure our start date is the lowest value and vice versa
		$start = min( $start_date, $end_date );
		$end = max( $start_date, $end_date );

		//yes we generated the date and time string in utc but we WANT this start date and time used in the set timezone on the model.
		$start_date = $this->convert_datetime_for_query( 'PAY_timestamp', date( 'Y-m-d', $start ) . ' 00:00:00', 'Y-m-d H:i:s', $this->get_timezone() );
		$end_date = $this->convert_datetime_for_query( 'PAY_timestamp', date( 'Y-m-d', $end) . ' 23:59:59' , 'Y-m-d H:i:s', $this->get_timezone() );

		return $this->get_all(array(array('PAY_timestamp'=>array('>=',$start_date),'PAY_timestamp*'=>array('<=',$end_date))));
	}

	/**
	 * methods for EEMI_Payment
	 */
	/**
	 * returns a string for the approved status
	 * @return 	string
	 */
	function approved_status(){
		return self::status_id_approved;
	}
	/**
	 * returns a string for the pending status
	 * @return 	string
	 */
	function pending_status(){
		return self::status_id_pending;
	}
	/**
	 * returns a string for the cancelled status
	 * @return 	string
	 */
	function cancelled_status(){
		return self::status_id_cancelled;
	}
	/**
	 * returns a string for the failed status
	 * @return 	string
	 */
	function failed_status(){
		return self::status_id_failed;
	}
	/**
	 * returns a string for the declined status
	 * @return 	string
	 */
	function declined_status(){
		return self::status_id_declined;
	}



}
// End of file EEM_Payment.model.php
// Location: /includes/models/EEM_Payment.model.php
