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
require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Base.model.php' );
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
	 * Status id in esp_status table that represents a canceleld payment (eg, the
	 * user went to PayPal, but on the paypal site decided to cancel teh payment)
	 */
	const status_id_cancelled = 'PCN';
	
	
	
	/**
	 * Status id in esp_status table that represents a payment taht was declined by
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
	 *		@return void
	 */	
	protected function __construct() {	  
		//global $wpdb;
		// set table name
		/*$this->table_name = $wpdb->prefix . 'esp_payment';
		// set item names
				
		// array representation of the payment table and the data types for each field 
		$this->table_data_types = array (	
			'PAY_ID' 								=> '%d',
			'TXN_ID' 								=> '%d',
			'STS_ID' 								=> '%s',
			'PAY_timestamp' 				=> '%d',
			'PAY_method'					=> '%s',
			'PAY_amount'						=> '%s',
			'PAY_gateway'					=> '%s',
			'PAY_gateway_response'	=> '%s',
			'PAY_txn_id_chq_nmbr'		=> '%s',
			'PAY_po_number'				=> '%s',
			'PAY_extra_accntng'			=> '%s',
			'PAY_via_admin'					=> '%d',
			'PAY_details'						=> '%s'
		);*/
		$this->singlular_item = __('Payment','event_espresso');
		$this->plural_item = __('Payments','event_espresso');
//		$this->_fields_settings = array(
//			'PAY_ID'=>				new EE_Model_Field('Payment ID', 'primary_key', false),
//			'TXN_ID'=>				new EE_Model_Field('Tranaction ID related to payment', 'foreign_key', false, null, null, 'Transaction'),
//			'STS_ID'=>				new EE_Model_Field('Status of payment', 'foreign_text_key', false, EEM_Payment::status_id_failed,null,'Status'),
//			'PAY_timestamp'=>		new EE_Model_Field('Unix Timestamp of when Payment occured','date',false,time()),
//			'PAY_method'=>			new EE_Model_Field('String stating method of payment', 'all_caps_key', true,'CART'),
//			'PAY_amount'=>			new EE_Model_Field('Amount this payment is for', 'float', false, 0),
//			'PAY_gateway'=>			new EE_Model_Field('Gateway name used for payment', 'plaintext', true, 'PayPal_Standard'),
//			'PAY_gateway_response'=>new EE_Model_Field('Response text from gateway that users would want to see', 'simplehtml', true,''),
//			'PAY_txn_id_chq_nmbr'=>	new EE_Model_Field('Unique ID for this payment in gateway, or cheque number', 'plaintext', true,''),
//			'PAY_po_number'=>		new EE_Model_Field('Purhcase or Sales Order Number','plaintext',true,''),
//			'PAY_extra_accntng'=>	new EE_Model_Field('Extra Accounting Info for Payment','simplehtml',true,''),
//			'PAY_via_admin'=>		new EE_Model_Field('Whether this payment was made via the admin', 'bool', false,false),
//			'PAY_details'=>			new EE_Model_Field('Full Response from Gateway concernign Payment', 'serialized_text', true,'')
//		);
//		$this->_related_models = array(
//			'Transaction'=>			new EE_Model_Relation('belongsTo', 'Transaction', 'TXN_ID'),
//			'Status'=>				new EE_Model_Relation('belongsTo', 'Status', 'STS_ID')
//		);
		$this->_tables = array(
			'Payment'=>new EE_Primary_Table('esp_payment','PAY_ID')
		);
		$this->_fields = array(
			'Payment'=>array(
				'PAY_ID'=>new EE_Primary_Key_Int_Field('PAY_ID', 'Payment ID', false, 0),
				'TXN_ID'=>new EE_Foreign_Key_Int_Field('TXN_ID', 'Transaction ID', false, 0, 'Transaction'),
				'STS_ID'=>new EE_Foreign_Key_String_Field('STS_ID', 'STatus ID', false, EEM_Payment::status_id_cancelled, 'Status'),
				'PAY_timestamp'=> new EE_Datetime_Field('PAY_timestamp', 'Timestamp of when payment was attemped', false, current_time('timestamp')),
				'PAY_method'=>new EE_All_Caps_Text_Field_Base('PAY_method', 'User-friendly description of payment', false, 'CART'),
				'PAY_amount'=>new EE_Money_Field('PAY_amount', 'Amount Payment should be for', false, 0),
				'PAY_gateway'=>new EE_Plain_Text_Field('PAY_gateway', 'Gateway name used for payment', false, __('Unspecified','event_espresso')),
				'PAY_gateway_response'=>new EE_Full_HTML_Field('PAY_gateway_response', 'Response from Gateway about the payment', false, ''),
				'PAY_txn_id_chq_nmbr'=>new EE_Plain_Text_Field('PAY_txn_id_chq_nmbr', 'Transaction ID or Cheque Number', true, ''),
				'PAY_po_number'=>new EE_Plain_Text_Field('PAY_po_number', 'Purchase or Sales Number', true, ''),
				'PAY_extra_accntng'=>new EE_Simple_HTML_Field('PAY_extra_accntng', 'Extra Account Info', true, ''),
				'PAY_via_admin'=>new EE_Boolean_Field('PAY_via_admin', 'Whehter payment made via admin', false, false),
				'PAY_details'=>new EE_Serialized_Text_Field('PAY_details', 'Full Gateway response about payment', true, '')
			)
		);
		$this->_model_relations = array(
			'Transaction'=>new EE_Belongs_To_Relation()
		);
		
		
		// load Payment object class file
		//require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Payment.class.php');
		parent::__construct();
	}

	/**
	 *		This funtion is a singleton method used to instantiate the EEM_Payment object
	 *
	 *		@access public
	 *		@return EEM_Payment instance
	 */	
	public static function instance(){
	
		// check if instance of EEM_Payment already exists
		if ( self::$_instance === NULL ) {
			// instantiate Espresso_model 
			self::$_instance = new self();
		}
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
	*		retreive  all payments from db for a particular transaction, optionally with
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
		// retreive payments
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
	* 		@param		$payment		payment object
	*		@return		boolean success of updating the transaction or not. Note: returning 'true' doesnt necessarily mean the
	 * transaction has been changed, it just means what's saved to teh db has been successful
	*/
	public function update_payment_transaction( EE_Payment $payment ) {

		$payment = $this->ensure_is_obj($payment);
		$transaction = $payment->transaction();
		if( $transaction){
			// recalculate and set total paid, and how much is pending
			$success = $transaction->update_based_on_payments();
			return $success;
		}else{
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
	*		Delete a Payment, update all totals, and save info to db
	* 		@access		public
	*/
	public function delete_by_ID($id) {
		$payment_obj = $this->ensure_is_obj($id);
		$transaction_id = $payment_obj->TXN_ID();
		$success = parent::delete_by_ID($id);
		if($success){
			require_once('EEM_Transaction.model.php');
			$success = EEM_Transaction::instance()->update_based_on_payments($transaction_id);
		}
		return $success;
		}





	/**
	*		retreive  all payments from db between two dates
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
