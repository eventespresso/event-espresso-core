<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
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
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * Payment Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
require_once ( EE_MODELS . 'EEM_Base.model.php' );
class EEM_Payment extends EEM_Base {

  	// private instance of the Payment object
	private static $_instance = NULL;



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
	 *		@return void
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
				'STS_ID'=>new EE_Foreign_Key_String_Field('STS_ID', __('STatus ID','event_espresso'), false, EEM_Payment::status_id_cancelled, 'Status'),
				'PAY_timestamp'=> new EE_Datetime_Field('PAY_timestamp', __('Timestamp of when payment was attemped','event_espresso'), false, current_time('timestamp'), $timezone ),
				'PAY_method'=>new EE_All_Caps_Text_Field('PAY_method', __('User-friendly description of payment','event_espresso'), false, 'CART'),
				'PAY_amount'=>new EE_Money_Field('PAY_amount', __('Amount Payment should be for','event_espresso'), false, 0),
				'PAY_gateway'=>new EE_Plain_Text_Field('PAY_gateway', __('Gateway name used for payment','event_espresso'), false, __('Unspecified','event_espresso')),
				'PAY_gateway_response'=>new EE_Plain_Text_Field('PAY_gateway_response', __('Response from Gateway about the payment','event_espresso'), false, ''),
				'PAY_txn_id_chq_nmbr'=>new EE_Plain_Text_Field('PAY_txn_id_chq_nmbr', __('Gateway Transaction ID or Cheque Number','event_espresso'), true, ''),
				'PAY_po_number'=>new EE_Plain_Text_Field('PAY_po_number', __('Purchase or Sales Number','event_espresso'), true, ''),
				'PAY_extra_accntng'=>new EE_Simple_HTML_Field('PAY_extra_accntng', __('Extra Account Info','event_espresso'), true, ''),
				'PAY_via_admin'=>new EE_Boolean_Field('PAY_via_admin', __('Whether payment made via admin','event_espresso'), false, false),
				'PAY_details'=>new EE_Serialized_Text_Field('PAY_details', __('Full Gateway response about payment','event_espresso'), true, '')
			)
		);
		$this->_model_relations = array(
			'Transaction'=> new EE_Belongs_To_Relation(),
			'Status'=> new EE_Belongs_To_Relation()
		);
		parent::__construct( $timezone );
	}




	/**
	 *		This function is a singleton method used to instantiate the EEM_Payment object
	 *
	 *		@access public
	 *		@param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any incoming timezone data that gets saved).  Note this just sends the timezone info to the date time model field objects.  Default is NULL (and will be assumed using the set timezone in the 'timezone_string' wp option)
	 *		@return EEM_Payment instance
	 */
	public static function instance( $timezone = NULL ){

		// check if instance of EEM_Payment already exists
		if ( self::$_instance === NULL ) {
			// instantiate Espresso_model
			self::$_instance = new self( $timezone );
		}

		//we might have a timezone set, let set_timezone decide what to do with it
		self::$_instance->set_timezone( $timezone );

		// EEM_Payment object
		return self::$_instance;
	}




	/**
	 * Gets the payment by the gateway server's unique ID. Eg, the unique ID PayPal assigned
	 * to the payment. This is handy for verifying an IPN hasn't already been processed.
	 * @param string $txn_id_chq_nmbr
	 * @return EE_Payment
	 */
	public function get_payment_by_txn_id_chq_nmbr($PAY_txn_id_chq_nmbr){
		return $this->get_one(array(array('PAY_txn_id_chq_nmbr'=>$PAY_txn_id_chq_nmbr)));
	}




	/**
	*		retrieve  all payments from db for a particular transaction, optionally with
	 *		a particular status
	*
	* 		@access		public
	* 		@param		$TXN_ID
	 *		@param	string	$status_of_payment one of EEM_Payment::status_id_*, like 'PAP','PCN',etc. If none is provided, gets
	 *		payments with any status
	*		@return		EE_Payment[]
	*/
	public function get_payments_for_transaction( $TXN_ID = FALSE, $status_of_payment = null ) {
		$query_params = array(array('TXN_ID'=>$TXN_ID),'order_by'=>array('PAY_timestamp'=>'ASC'));

		//if provided with a status, search specifically for that status. Otherwise get them all
		if($status_of_payment){
			$query_params[0]['STS_ID'] = $status_of_payment;
		}
		// retrieve payments
		return $this->get_all ( $query_params );
	}

	/**
	 * Only gets payments which have been approved
	 * @param type $TXN_ID
	 * @return type
	 */
	public function get_approved_payments_for_transaction( $TXN_ID = FALSE){
		return $this->get_payments_for_transaction($TXN_ID, EEM_Payment::status_id_approved);

	}



	/**
	*		Applies $payment to its associated EE_Transaction. This should update
	 *		its EE_Transaction's status and TXN_paid.
	* 		@access		public
	* 		@param		EE_Payment/id $payment
	*		@return		EE_Transaction that gets updated.
	*/
	public function update_payment_transaction( $payment ) {

		$payment = $this->ensure_is_obj($payment);
		$transaction = $payment->transaction();
		if( $transaction instanceof EE_Transaction ){
			// recalculate and set total paid, and how much is pending
			$transaction->update_based_on_payments();
			return $transaction;
		} else {
			return false;
		}


	}





	/**
	*		recalculate_total_payments_for_transaction
	* 		@access		public
	* 		@param		$TXN_ID
	 *		@param	string	$status_of_payments, one of EEM_Payment's statuses, like 'PAP' (Approved). By default, searches for approved payments
	*		@return 		mixed		array on success, FALSE on fail
	*/
	public function recalculate_total_payments_for_transaction( $TXN_ID = FALSE , $status_of_payments = EEM_Payment::status_id_approved) {
		return $this->sum(array(array('TXN_ID'=>$TXN_ID,'STS_ID'=>$status_of_payments)), 'PAY_amount');
	}




	/**
	 * Before deletign the selected payments, we fetch their transactions,
	 * then delete the payments, and update the transactions' amount paid.
	 * This may be a somewhat expensive operation which could be optimized, but we'll deal with that
	 * if it's a noticeable problem.
	 * @param array $query_params lik eEEM_Base::get_all
	 * @param boolean $allow_blocking if TRUE, matched objects will only be deleted if there is no related model info
	 * that blocks it (ie, there' sno other data that depends on this data); if false, deletes regardless of other objects
	 * which may depend on it. Its generally advisable to always leave this as TRUE, otherwise you could easily corrupt your DB
	 * @return int number of payment deleted
	 */
	public function delete($query_params, $allow_blocking = true) {
		$payments_to_be_deleted = $this->get_all($query_params);
		$transactions = array();
		foreach($payments_to_be_deleted as $payment){
			$transactions[$payment->transaction()->ID()] = $payment->transaction();
		}
		$success = parent::delete($query_params);
		foreach($transactions as $transaction){
			/* @var $transaction EE_Transaction */
			$transaction->update_based_on_payments();
		}
		return $success;
	}

	/**
	 * Deleted the payment indicated by the payment object or id, and returns
	 * the EE_transaction which gets affected and updated in the process
	 * @param EE_Payment or id $payment_obj_or_id
	 * @return EE_Transaction
	 */
	public function delete_by_ID($payment_obj_or_id) {
		$payment_before_deleted = $this->ensure_is_obj($payment_obj_or_id);
		$query_params = array();
		$query_params[0] = array($this->get_primary_key_field()->get_name() => $payment_obj_or_id);
		$query_params['limit'] = 1;
		parent::delete($query_params);
		$transaction = $payment_before_deleted->transaction();
		$transaction->update_based_on_payments();
		return $transaction;
	}





	/**
	*		retrieve  all payments from db between two dates
	*
	* 		@access		public
	* 		@param		string		$start_date
	* 		@param		string		$end_date
	*		@return 	EE_Payment[]
	*/
	public function get_payments_made_between_dates( $start_date = FALSE, $end_date = FALSE ) {
		if ( ! $start_date ) {
			$start_date = date('Y-m-d',current_time('timestamp'));
		}

		if ( ! $end_date ) {
			$end_date = date('Y-m-d',current_time('timestamp'));
		}

//echo '<h3>$start_date : ' . $start_date . '  <span style="margin:0 0 0 3em;font-size:12px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h3>';
//echo '<h3>$end_date : ' . $end_date . '  <span style="margin:0 0 0 3em;font-size:12px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h3>';

		// make sure our timestamps start and end right at the boundries for each day
		$start_date = date( 'Y-m-d', strtotime( $start_date )) . ' 00:00:00';
		$end_date = date( 'Y-m-d', strtotime( $end_date )) . ' 23:59:59';

//echo '<h3>$start_date : ' . $start_date . '  <span style="margin:0 0 0 3em;font-size:12px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h3>';
//echo '<h3>$end_date : ' . $end_date . '  <span style="margin:0 0 0 3em;font-size:12px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h3>';

		// convert to timestamps
		$start_date = strtotime( $start_date );
		$end_date = strtotime( $end_date );

		// make sure our start date is the lowest value and vice versa
		$start_date = min( $start_date, $end_date );
		$end_date = max( $start_date, $end_date );


//echo '<h3>$start_date : ' . $start_date . '  <span style="margin:0 0 0 3em;font-size:12px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h3>';
//echo '<h3>$end_date : ' . $end_date . '  <span style="margin:0 0 0 3em;font-size:12px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h3>';
		return $this->get_all(array(array('PAY_timestamp'=>array('>=',$start_date),'PAY_timestamp*'=>array('<=',$end_date))));
	}
}

// End of file EEM_Payment.model.php
// Location: /includes/models/EEM_Payment.model.php
