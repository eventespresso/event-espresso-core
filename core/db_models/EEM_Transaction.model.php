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
require_once ( EE_MODELS . 'EEM_Base.model.php' );


class EEM_Transaction extends EEM_Base {

  	// private instance of the Transaction object
	private static $_instance = NULL;

	/**
	 * Status ID(STS_ID on esp_status table) to indicate the transaction is complete,
	 * but payment is pending. This is the state for transactions where payment is promised
	 * from an offline gateway.
	 */
//	const open_status_code = 'TPN';

	/**
	 * Status ID(STS_ID on esp_status table) to indicate the transaction failed, either due to a technical reason (server or computer crash during registration),
	 *  or due to an abandoned cart after registrant was forwarded to an off-site gateway ie: got to PayPal, then bailed
	 */
	const failed_status_code = 'TFL';

	/**
	 * STatus ID(STS_ID on esp_status table) to indicate an incomplete transaction  TXN_paid < TXN_total
	 */
	const incomplete_status_code = 'TIN';

	/**
	 * Status ID (STS_ID on esp_status table) to indicate a complete transaction. TXN_paid == TXN_total
	 */
	const complete_status_code = 'TCM';

	/**
	 *  Status ID(STS_ID on esp_status table) to indicate the transaction is overpaid.  TXN_paid > TXN_total
	 *  This is the same as complete, but site admins actually owe clients the moneys!
	 */
	const overpaid_status_code = 'TOP';





	/**
	 *		private constructor to prevent direct creation
	 *		@Constructor
	 *		@access protected
	 *		@param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any incoming timezone data that gets saved).  Note this just sends the timezone info to the date time model field objects.  Default is NULL (and will be assumed using the set timezone in the 'timezone_string' wp option)
	 *		@return void
	 */
	protected function __construct( $timezone ) {
		$this->singular_item = __('Transaction','event_espresso');
		$this->plural_item = __('Transactions','event_espresso');

		$this->_tables = array(
			'Transaction'=>new EE_Primary_Table('esp_transaction','TXN_ID')
		);
		$this->_fields = array(
			'Transaction'=>array(
				'TXN_ID'=>new EE_Primary_Key_Int_Field('TXN_ID', __('Transaction ID','event_espresso')),
				'TXN_timestamp'=>new EE_Datetime_Field('TXN_timestamp', __('date when transaction was created','event_espresso'), false, current_time('timestamp'), $timezone ),
				'TXN_total'=>new EE_Money_Field('TXN_total', __('Total value of Transaction','event_espresso'), false, 0),
				'TXN_paid'=>new EE_Money_Field('TXN_paid', __('Amount paid towards transaction to date','event_espresso'), false, 0),
				'STS_ID'=>new EE_Foreign_Key_String_Field('STS_ID', __('Status ID','event_espresso'), false, EEM_Transaction::incomplete_status_code, 'Status'),
				'TXN_session_data'=>new EE_Serialized_Text_Field('TXN_session_data', __('Serialized session data','event_espresso'), true, ''),
				'TXN_hash_salt'=>new EE_Plain_Text_Field('TXN_hash_salt', __('Transaction Hash Salt','event_espresso'), true, '')
			)
		);
		$this->_model_relations = array(
			'Registration'=>new EE_Has_Many_Relation(),
			'Payment'=>new EE_Has_Many_Relation(),
			'Status'=>new EE_Belongs_To_Relation(),
			'Line_Item'=>new EE_Has_Many_Relation(false),//you can delete a transaction without needing to delete its line items
		);
		parent::__construct( $timezone );

	}




	/**
	 *		This function is a singleton method used to instantiate the Espresso_model object
	 *
	 *		@access public
	 *		@param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any incoming timezone data that gets saved).  Note this just sends the timezone info to the date time model field objects.  Default is NULL (and will be assumed using the set timezone in the 'timezone_string' wp option)
	 *		@return EEM_Transaction instance
	 */
	public static function instance( $timezone = NULL ){

		// check if instance of Espresso_model already exists
		if ( self::$_instance === NULL ) {
			// instantiate Espresso_model
			self::$_instance = new self( $timezone );
		}

		//we might have a timezone set, let set_timezone decide what to do with it
		self::$_instance->set_timezone( $timezone );

		// Espresso_model object
		return self::$_instance;
	}









	/**
	*		retrieve  all transactions from db between two dates
	*
	* 		@access		public
	* 		@param		string		$start_date
	* 		@param		string		$end_date
	*		@return 		mixed		array on success, FALSE on fail
	*/
	public function get_transactions_for_admin_page( $start_date = FALSE, $end_date = FALSE, $orderby = 'TXN_timestamp', $order = 'DESC', $limit = NULL, $count = FALSE ) {

		if ( ! $start_date ) {
			$start_date = date('Y-m-d', strtotime(  '-10 year' ));
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

		if ( $count ) {
			$SQL =  'SELECT COUNT(txn.TXN_ID) ';
		} else {
			$SQL =  "SELECT att.ATT_ID, CONCAT(att.ATT_fname, ' ', att.ATT_lname) as TXN_att_name, att.ATT_email, evt.id, evt.event_name, evt.slug, reg.REG_ID, reg.REG_url_link, txn.TXN_ID, txn.TXN_timestamp, txn.TXN_total, txn.TXN_paid, txn.STS_ID ";
		}

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

		$transactions = $count ? $wpdb->get_var( $wpdb->prepare( $SQL, $start_date, $end_date ) ) : $wpdb->get_results( $wpdb->prepare( $SQL, $start_date, $end_date ), ARRAY_A );

		if ( $transactions ) {
			return $transactions;
		} else {
			return FALSE;
		}

	}





	/**
	*		retrieve a single transaction from db via the TXN_ID
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

		$sql_date = date("Y-m-d H:i:s", strtotime($period) );
		$results = $this->_get_all_wpdb_results(
			array(
				array(
					'TXN_timestamp' => array('>=', $sql_date)),
					'group_by' => 'txnDate',
					'order_by' => array('TXN_timestamp' => 'DESC' )
					),
				OBJECT,
				array(
					'txnDate' => array('DATE(Transaction.TXN_timestamp)','%s'),
					'revenue' => array('SUM(Transaction.TXN_paid)', '%d')
					));
		return $results;
	}





	/**
	*		get the revenue per event  for the Transaction Admin page Reports Tab
	* 		@access		public
	*/
	public function get_revenue_per_event_report( $period = 'month' ) {
		global $wpdb;
		$date_mod = strtotime( '-1 ' . $period );

		$SQL = 'SELECT post_name as event_name, SUM(TXN_paid) AS revenue';
		$SQL .= ' FROM ' . $this->_get_main_table()->get_table_name() . ' txn';
		$SQL .= ' LEFT JOIN ' . $wpdb->prefix . 'esp_registration reg ON reg.TXN_ID = txn.TXN_ID';
		$SQL .= ' LEFT JOIN ' . $wpdb->posts . ' evt ON evt.ID = reg.EVT_ID';
		$SQL .= ' WHERE REG_count = 1';
		$SQL .= ' AND REG_date >= %d';
		$SQL .= ' GROUP BY event_name';
		$SQL .= ' ORDER BY event_name';
		$SQL .= ' LIMIT 0, 24';

		return $wpdb->get_results( $wpdb->prepare( $SQL, $date_mod ));

	}






	/**
	 * Gets the current transaction given the reg_url_link, or assumes the reg_url_link is in the
	 * $_REQUEST global variable. Either way, tries to find the current transaction (through
	 * the registration poitned to by reg_url_link), if not reutrns null
	 * @param string $reg_url_link
	 * @return EE_Transaction
	 */
	public function get_transaction_from_reg_url_link( $reg_url_link = NULL ){
		if( $reg_url_link === NULL ){
			$reg_url_link = EE_Registry::instance()->REQ->get( 'e_reg_url_link' );
		}
		$transaction = $this->get_one(array(array('Registration.REG_url_link'=>$reg_url_link)));
		return $transaction;
	}







	/**
	 * Updates the provided EE_Transaction with all the applicable payments
	 * (or fetche the EE_Transaction from its ID)
	 * @param EE_Transaction/int $transaction_obj_or_id EE_Transaction or its ID
	 * @return boolean success
	 */
	public function update_based_on_payments($transaction_obj_or_id){
		$transaction = $this->ensure_is_obj($transaction_obj_or_id);
		$PAY = EE_Registry::instance()->load_model( 'Payment' );
		$total_paid = $PAY->recalculate_total_payments_for_transaction( $transaction->ID(),  EEM_Payment::status_id_approved );
		//$total_pending = $PAY->recalculate_total_payments_for_transaction( $transaction->ID(),  EEM_Payment::status_id_pending );
		$transaction->set_paid( $total_paid );
		// set transaction status to complete if paid in full or the event was a freebie
		if($total_paid > $transaction->total()){
			$transaction->set_status(EEM_Transaction::overpaid_status_code);
		}elseif ( $total_paid == $transaction->total() ) {
			$transaction->set_status(EEM_Transaction::complete_status_code);
		} elseif( $total_paid < $transaction->total() ) {
			$transaction->set_status(EEM_Transaction::incomplete_status_code);
		}

		// update transaction and return results
		return $transaction->save();
	}





}
// End of file EEM_Transaction.model.php
// Location: /includes/models/EEM_Transaction.model.php