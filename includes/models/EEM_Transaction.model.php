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
 * Transaction Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Base.model.php' );


class EEM_Transaction extends EEM_Base {

  	// private instance of the Transaction object
	private static $_instance = NULL;

	
	
	/**
	 * Status ID (STS_ID on esp_status table) to indicate a complete transaction.
	 */
	const complete_status_code = 'TCM';
	
	
	
	/**
	 * STatus ID(STS_ID on esp_status table) to indicate an incomplete transaction
	 */
	const incomplete_status_code = 'TIN';
	
	
	
	/**
	 * Status ID(STS_ID on esp_status table) to indicate the transaction is complete,
	 * but payment is pending. This is the state for transactions where payment is promised
	 * from an offline gateway. 
	 */
	const pending_status_code = 'TPN';

	
	
	/**
	 *  Status ID(STS_ID on esp_status table) to indicate the transaction is overpaid.
	 *  This is the same as complete, but site admins actually owe clients the moneys!
	 * from an offline gateway. 
	 */
	const overpaid_status_code = 'TOP';
	
	
	
	
	
	/**
	 *		private constructor to prevent direct creation
	 *		@Constructor
	 *		@access protected
	 *		@return void
	 */	
	protected function __construct() {	
		$this->singlular_item = __('Transaction','event_espresso');
		$this->plural_item = __('Transactions','event_espresso');		
		// set table name
		/*$this->_get_main_table()->get_table_name() = $wpdb->prefix . 'esp_transaction';
		// set item names
		
		// array representation of the transaction table and the data types for each field 
		$this->table_data_types = array (	
			'TXN_ID' 						=> '%d', 	
			'TXN_timestamp' 		=> '%d', 	
			'TXN_total' 					=> '%f', 	
			'TXN_paid' 					=> '%f', 	
			'STS_ID'						=> '%s', 	 	
			'TXN_details'				=> '%s', 	 	
			'TXN_session_data'		=> '%s',
			'TXN_hash_salt'			=> '%s',
			'TXN_tax_data'			=> '%s'	
		);*/
//		$this->_fields_settings = array(
//			'TXN_ID' 			=> new EE_Model_Field('Transaction ID', 'primary_key', false),
//			'TXN_timestamp' 	=> new EE_Model_Field('Transaction Teimstamp', 'int', false,time()),
//			'TXN_total' 		=> new EE_Model_Field('Total amount due for this transaction', 'float', true,0),
//			'TXN_paid' 			=> new EE_Model_Field('Total amoutn paid so far', 'float', false,0),
//			'STS_ID' 			=> new EE_Model_Field('Status of Transaction.','foreign_text_key',false,  EEM_Transaction::incomplete_status_code,null,'Status'),
//			'TXN_details' 		=> new EE_Model_Field('Serialized array of Transaction details as returned from the Payment Gateway', 'serialized_text', true, null),
//			'TXN_tax_data' 		=> new EE_Model_Field('Serialized array of tax data', 'serialized_text', true, null),
//			'TXN_session_data'	=> new EE_Model_Field('Serialized array of session data', 'serialized_text', true, null),
//			'TXN_hash_salt' 	=> new EE_Model_Field('Payment Gateway hash salt value. Possibly deprecated.', 'plaintext', true,null)
//		);
//		$this->_related_models = array(
//			'Payments' 		=> new EE_Model_Relation('hasMany', 'Payment', 'TXN_ID'),
//			'Registrations' => new EE_Model_Relation('hasMany', 'Registration', 'TXN_ID'),
//			//'Status' =>			new EE_Model_Relation('belongsTo','Status','STS_ID')
//		);
		$this->_tables = array(
			'Transaction'=>new EE_Primary_Table('esp_transaction','TXN_ID')
		);
		$this->_fields = array(
			'Transaction'=>array(
				'TXN_ID'=>new EE_Primary_Key_Int_Field('TXN_ID', __('Transaction ID','event_espresso'), false, 0),
				'TXN_timestamp'=>new EE_Datetime_Field('TXN_timestamp', __('date when transaction was created','event_espresso'), false, current_time('timestamp')),
				'TXN_total'=>new EE_Money_Field('TXN_total', __('Total value of Transaction','event_espresso'), false, 0),
				'TXN_paid'=>new EE_Money_Field('TXN_paid', __('Amount paid towards transaction to date','event_espresso'), false, 0),
				'STS_ID'=>new EE_Foreign_Key_String_Field('STS_ID', __('Status ID','event_espresso'), false, EEM_Transaction::incomplete_status_code, 'Status'),
				'TXN_details'=>new EE_Serialized_Text_Field('TXN_details', __('Serialized Mess of details about the last payment on this transaction','event_espresso'), true, ''),
				'TXN_tax_data'=>new EE_Serialized_Text_Field('TXN_tax_data', __('Serialized mess of tax data','event_espresso'), true, ''),
				'TXN_session_data'=>new EE_Serialized_Text_Field('TXN_session_data', __('Serialized mess of session data','event_espresso'), true, ''),
				'TXN_hash_salt'=>new EE_Plain_Text_Field('TXN_hash_salt', __('Transaction Hash Salt','event_espresso'), true, '')
			)
		);
		$this->_model_relations = array(
			'Registration'=>new EE_Has_Many_Relation(),
			'Payment'=>new EE_Has_Many_Relation()
		);
		parent::__construct();
	
		// uncomment these for example code samples of how to use them
		//			self::how_to_use_insert();
		//			self::how_to_use_update();
	}

	/**
	 *		This funtion is a singleton method used to instantiate the Espresso_model object
	 *
	 *		@access public
	 *		@return EEM_Transaction instance
	 */	
	public static function instance(){
	
		// check if instance of Espresso_model already exists
		if ( self::$_instance === NULL ) {
			// instantiate Espresso_model 
			self::$_instance = new self();
		}
		// Espresso_model object
		return self::$_instance;
	}




	




	/**
	*		retreive  all transactions from db between two dates
	* 
	* 		@access		public
	* 		@param		string		$start_date		
	* 		@param		string		$end_date		
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	public function get_transactions_for_admin_page( $start_date = FALSE, $end_date = FALSE, $orderby = 'TXN_timestamp', $order = 'DESC', $limit = NULL, $count = FALSE ) { 

		if ( ! $start_date ) {
			$start_date = date('Y-m-d', strtotime( 'Jan 1, 2010' ));
		}

		if ( ! $end_date ) {
			$end_date = date('Y-m-d');
		}
		
		// make sure our timestamps start and end right at the boundries for each day
		$start_date = date( 'Y-m-d', strtotime( $start_date )) . ' 00:00:00';
		$end_date = date( 'Y-m-d', strtotime( $end_date )) . ' 23:59:59';
		
		// convert to timestamps
		$start_date = strtotime( $start_date );
		$end_date = strtotime( $end_date );

		// make sure our start date is the lowest value and vice versa
		$start_date = min( $start_date, $end_date );
		$end_date = max( $start_date, $end_date );

		global $wpdb;
		
		$SQL = $count ? "SELECT COUNT(txn.TXN_ID) " : "SELECT att.ATT_ID, CONCAT(att.ATT_fname, ' ', att.ATT_lname) as TXN_att_name, att.ATT_email, evt.id, evt.event_name, evt.slug, reg.REG_ID, reg.REG_url_link, txn.TXN_ID, txn.TXN_timestamp, txn.TXN_total, txn.TXN_paid, txn.STS_ID, txn.TXN_details ";		

		$SQL .= 'FROM ' . $wpdb->prefix . 'esp_registration reg ';
		$SQL .= 'LEFT JOIN ' . $wpdb->prefix . 'esp_attendee att ON reg.ATT_ID = att.ATT_ID ';
		$SQL .= 'JOIN ' . $wpdb->prefix . 'events_detail evt ON reg.EVT_ID = evt.id ';
		$SQL .= 'RIGHT JOIN ' . $this->_get_main_table()->get_table_name() . ' txn ON reg.TXN_ID = txn.TXN_ID ';
		$SQL .= 'WHERE TXN_timestamp >= %d ';
		$SQL .= 'AND TXN_timestamp <= %d ';
		$SQL .= 'AND reg.REG_count = 1 ';

		//setup orderby
		switch ( $orderby ) {
			case 'TXN_ID':
				$orderby = 'txn.TXN_ID';
				break;
			case 'TXN_att_name':
				$orderby = 'TXN_att_name';
				break;
			case 'event_name':
				$orderby = 'evt.event_name';
				break;
			default: //'TXN_timestamp'
				$orderby = 'txn.TXN_timestamp';
		}


		//let's set limit
		$limit = !empty($limit) ? 'LIMIT ' . implode(',', $limit) : '';
		$SQL .= $count ? '' : "ORDER BY $orderby $order $limit";

		$results = $count ? $wpdb->get_var( $wpdb->prepare( $SQL, $start_date, $end_date ) ) : $wpdb->get_results( $wpdb->prepare( $SQL, $start_date, $end_date ), ARRAY_A );

		if ( $results ) {
			if ( !$count ) {
				$transactions = array();
				foreach ( $results as $transaction ) {
					$transactions[ $transaction['TXN_ID'] ] = $transaction;
				}
			} else {
				$transactions = $results;
			}
			return $transactions;
		} else {
			return FALSE;
		}

	}





	/**
	*		retreive a single transaction from db via the TXN_ID
	* 
	* 		@access		public
	* 		@param		string		$TXN_ID			
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	public function get_transaction_for_admin_page( $TXN_ID = FALSE ) { 

		if ( ! $TXN_ID ) {
			$msg = __( 'No Transaction ID was received.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		
		global $wpdb;
		
		$SQL = 'SELECT reg.*, txn.*, att.*, evt.id, evt.event_name, evt.slug ';
		$SQL .= 'FROM ' . $wpdb->prefix . 'esp_registration reg ';
		$SQL .= 'INNER JOIN ' . $wpdb->prefix . 'events_detail evt ON reg.EVT_ID = evt.id ';
		$SQL .= 'INNER JOIN ' . $wpdb->prefix . 'esp_attendee att ON reg.ATT_ID = att.ATT_ID ';
		$SQL .= 'INNER JOIN ' . $this->_get_main_table()->get_table_name() . ' txn ON reg.TXN_ID = txn.TXN_ID ';
		$SQL .= 'WHERE txn.TXN_ID = %d ';
		$SQL .= 'AND reg.REG_count = 1 ';
		$SQL .= 'ORDER BY TXN_timestamp DESC';

		if ( $transaction = $wpdb->get_results( $wpdb->prepare( $SQL, $TXN_ID ))) {
//			echo $wpdb->last_query;
//			echo printr( $payments );
			return $transaction;
		} else {
//			EE_Error::add_error( $wpdb->print_error(), __FILE__, __FUNCTION__, __LINE__ ); print_error echos immediately  >:()
			return FALSE;
		}

	}





	/**
	*		get the revenue per day  for the Transaction Admin page Reports Tab
	* 		@access		public
	*/
	public function get_revenue_per_day_report( $period = '-1 month' ) {

		global $wpdb;
		$date_mod = strtotime( $period );

		$SQL = 'SELECT DATE(FROM_UNIXTIME(TXN_timestamp)) AS txnDate, SUM(TXN_paid) AS revenue';
		$SQL .= ' FROM ' . $this->_get_main_table()->get_table_name();
		$SQL .= ' WHERE TXN_timestamp >= %d';
		$SQL .= ' GROUP BY `txnDate`';
		$SQL .= ' ORDER BY TXN_timestamp DESC';

		//echo '<h3>$SQL : ' . $SQL . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';

		return $wpdb->get_results( $wpdb->prepare( $SQL, $date_mod ));

	}





	/**
	*		get the revenue per event  for the Transaction Admin page Reports Tab
	* 		@access		public
	*/
	public function get_revenue_per_event_report( $period = 'month' ) {

		global $wpdb;
		$date_mod = strtotime( '-1 ' . $period );

		$SQL = 'SELECT event_name, SUM(TXN_paid) AS revenue';
		$SQL .= ' FROM ' . $this->_get_main_table()->get_table_name() . ' txn';
		$SQL .= ' LEFT JOIN ' . $wpdb->prefix . 'esp_registration reg ON reg.TXN_ID = txn.TXN_ID';
		$SQL .= ' LEFT JOIN ' . EVENTS_DETAIL_TABLE . ' evt ON evt.id = reg.EVT_ID';
		$SQL .= ' WHERE REG_date >= %d';
		$SQL .= ' GROUP BY event_name';
		$SQL .= ' ORDER BY event_name';
		$SQL .= ' LIMIT 0, 24';
		
		return $wpdb->get_results( $wpdb->prepare( $SQL, $date_mod ));

	}



	/**
	 * retrieve the status details from esp_status table as an array.
	 * @return array 
	 */
	 public function status_array() {
	 	global $wpdb;
	 	$SQL = 'SELECT STS_ID, STS_code FROM '. $wpdb->prefix . 'esp_status WHERE STS_type = "transaction"';
	 	$results = $wpdb->get_results( $SQL );
	 	$txn_status = array();
	 	foreach ( $results as $status ) {
            $txn_status[ $status->STS_ID ] = __( $status->STS_code, 'event_espresso' );
        }
        return $txn_status;
    }

	
	


	/**
	 * Gets teh current transaction given teh reg_url_link, or assumes the reg_url_link is in the
	 * $_REQUEST global variable. Either way, tries to find the current transaction (through
	 * teh registration poitned to by reg_url_link), if not reutrns null
	 * @param string $reg_url_link
	 * @return EE_Transaction
	 */
	public function get_transaction_from_reg_url_link( $reg_url_link = NULL ){
		if( NULL == $reg_url_link ){
			$reg_url_link = $_REQUEST['e_reg_url_link'];
		}
		$transaction = $this->get_one(array(array('Registration.REG_url_link'=>$reg_url_link)));
		return $transaction;
	}
	
	
	
	
	
	
	
	/**
	 * Updates teh provided EE_Transaction with all the applicable payments 
	 * (or fetche the EE_Transaction from its ID)
	 * @param EE_Transaction/int $transaction_obj_or_id EE_Transaction or its ID
	 * @return boolean success
	 */
	public function update_based_on_payments($transaction_obj_or_id){
		$transaction = $this->ensure_is_obj($transaction_obj_or_id);
		require_once('EEM_Payment.model.php');
		$PAY = EEM_Payment::instance();
		$total_paid = $PAY->recalculate_total_payments_for_transaction( $transaction->ID(),  EEM_Payment::status_id_approved );
		$total_pending = $PAY->recalculate_total_payments_for_transaction( $transaction->ID(),  EEM_Payment::status_id_pending );
		$transaction->set_paid( $total_paid );
		// set transaction status to complete if paid in full or the event was a freebie
		if($total_paid > $transaction->total()){
			$transaction->set_status(EEM_Transaction::overpaid_status_code);
		}elseif ( $total_paid == $transaction->total() ) {
			$transaction->set_status(EEM_Transaction::complete_status_code);
		} elseif( $total_paid < $transaction->total() ) {
			$transaction->set_status(EEM_Transaction::pending_status_code);
		}else{
			$transaction->set_status(EEM_Transaction::incomplete_status_code);
		}
		
		// update transaction and return results
		return $transaction->save();
	}





}
// End of file EEM_Transaction.model.php
// Location: /includes/models/EEM_Transaction.model.php