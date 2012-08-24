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
 * @ version		 	3.1.P.7
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
	 *		private constructor to prevent direct creation
	 *		@Constructor
	 *		@access private
	 *		@return void
	 */	
	private function __construct() {	  
		global $wpdb;
		// set table name
		$this->table_name = $wpdb->prefix . 'esp_payment';
		// set item names
		$this->singlular_item = 'Payment';
		$this->plual_item = 'Payments';		
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
		);
		
		// load Payment object class file
		//require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Payment.class.php');

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
	*		cycle though array of payments and create objects out of each item
	* 
	* 		@access		private
	* 		@param		array		$payments		
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	private function _create_objects( $payments = FALSE ) {

		if ( ! $payments ) {
			return FALSE;
		} 		

		if ( ! is_array( $payments )) {
			$payments = array( $payments );
		} 	
		
	    require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Payment.class.php' );

		foreach ( $payments as $payment ) {
				$array_of_objects[ $payment->PAY_ID ] = new EE_Payment(
						$payment->TXN_ID,
						$payment->STS_ID,
						$payment->PAY_timestamp,
						$payment->PAY_method,
						$payment->PAY_amount,
						$payment->PAY_gateway,
						$payment->PAY_gateway_response,
						$payment->PAY_txn_id_chq_nmbr,
						$payment->PAY_po_number,
						$payment->PAY_extra_accntng,
						$payment->PAY_via_admin,
						$payment->PAY_details,
						$payment->PAY_ID
				 	);
		}	
		return $array_of_objects;	

	}




	/**
	*		retreive  ALL payments from db
	* 
	* 		@access		public
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	public function get_all_payments() { 
	
		$orderby = 'PAY_timestamp';
		// retreive all payments	
		if ( $payments = $this->select_all ( $orderby )) {
			return $this->_create_objects( $payments );
		} else {
			return FALSE;
		}
		
	}




	/**
	*		retreive  a single payment from db via it's' ID
	* 
	* 		@access		public
	* 		@param		$PAY_ID		
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	public function get_payment_by_ID( $PAY_ID = FALSE ) {

		if ( ! $PAY_ID ) {
			return FALSE;
		}
		// retreive a particular payment
		$where_cols_n_values = array( 'PAY_ID' => $PAY_ID );
		if ( $payment = $this->select_row_where ( $where_cols_n_values )) {
			$payment_array = $this->_create_objects( array( $payment ));
			return array_shift( $payment_array );
		} else {
			return FALSE;
		}

	}




	/**
	*		retreive  all payments from db for a particular transaction
	* 
	* 		@access		public
	* 		@param		$TXN_ID		
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	public function get_payments_for_transaction( $TXN_ID = FALSE ) {

		if ( ! $TXN_ID ) {
			global $espresso_notices;
			$espresso_notices['errors'][] = __('No Transaction ID was supplied.', 'event_espresso') . espresso_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}

		// retreive payments
		$where_cols_n_values = array( 'TXN_ID' => $TXN_ID );
		
		if ( $payments = $this->select_all_where ( $where_cols_n_values, 'PAY_timestamp' )) {		
			return $this->_create_objects( $payments );
		} else {
			return FALSE;
		}

	}





	/**
	*		recalculate_total_payments_for_transaction
	* 		@access		public
	* 		@param		$payment		payment object
	* 		@param		$what				text to describe action performed, used in notices
	*		@return 		mixed				array on success, FALSE on fail
	*/
	public function update_payment_transaction( EE_Payment $payment, $what ) {

		global $espresso_notices;
		if ( ! is_object( $payment ) && ! $payment->ID() ) {
			$espresso_notices['errors'][] = __('A vaild payment object was not supplied.', 'event_espresso') . espresso_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}

		// get transaction that this payment is being applied to
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Transaction.model.php');
		$TXN_MODEL = EEM_Transaction::instance();
		$transaction = $TXN_MODEL->get_transaction( $payment->TXN_ID() );

		// recalculate and set  total paid
		$total_paid = $this->recalculate_total_payments_for_transaction( $payment->TXN_ID() );
		$transaction->set_paid( $total_paid );

		// set transaction status to complete if paid in full or the event was a freebie
		if ( $total_paid == $transaction->total() || $transaction->total() == 0 ) {
			$transaction->set_status('TCM');
		} else {
			$transaction->set_status('TOP');
		}

		// update transaction and return results
		if ( $transaction->update() ) {
			$espresso_notices['success'] = array();
			$espresso_notices['success'][] = __('The payment has been ' . $what . ' succesfully.', 'event_espresso');
			return array( 
									'amount' => $payment->amount(), 
									'total_paid' => $transaction->paid(), 
									'txn_status' => $transaction->status_ID(),
									'pay_status' => $payment->STS_ID() 
								);
		} else {
			$espresso_notices['errors'][] = __('An error occured. The payment was ' . $what . ' succesfully but the amount paid for the transaction was not updated.', 'event_espresso') . espresso_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}

	}





	/**
	*		recalculate_total_payments_for_transaction
	* 		@access		public
	* 		@param		$TXN_ID		
	*		@return 		mixed		array on success, FALSE on fail
	*/
	public function recalculate_total_payments_for_transaction( $TXN_ID = FALSE ) {

		if ( ! $TXN_ID ) {
			global $espresso_notices;
			$espresso_notices['errors'][] = 'No Transaction ID was supplied.' . espresso_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}

		$total_paid = 0;
		if( $payments = $this->get_payments_for_transaction( $TXN_ID ) ) {
			foreach ( $payments as $payment ) {
				// only add successfully completed payments to the total paid
				if ( $payment->STS_ID() == 'PAP' ) {
					$total_paid += $payment->amount();
				}				
			}			
		}

		return $total_paid;
	}





	/**
	*		Delete a Payment, update all totals, and save info to db
	* 		@access		public
	*/
	public function delete_payment( $PAY_ID ) {

		global $espresso_notices;
		if ( ! $PAY_ID ) {
			$espresso_notices['errors'][] = __('No Payment ID was supplied.', 'event_espresso') . espresso_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		
		if( $payment = $this->get_payment_by_ID( $PAY_ID )) {
			//printr( $payment, '$payment' );
			if ( $this->delete ( array( 'PAY_ID' => $payment->ID() ))) {
				// recalculate and set total paid
				return $this->update_payment_transaction( $payment, 'deleted' );
				
			} else {
				$espresso_notices['errors'][] = __('An error occured. The payment has not been deleted succesfully.', 'event_espresso') . 
																	espresso_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
				return FALSE;
			}
			
		} else {
			$espresso_notices['errors'][] = __('An error occured. The database record for the payment could not be located for deletion.', 'event_espresso') . 
																espresso_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		

	}





	/**
	*		retreive  all payments from db between two dates
	* 
	* 		@access		public
	* 		@param		string		$start_date		
	* 		@param		string		$end_date		
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	public function get_payments_made_between_dates( $start_date = FALSE, $end_date = FALSE ) {

		if ( ! $start_date ) {
			$start_date = date('Y-m-d');
		}

		if ( ! $end_date ) {
			$end_date = date('Y-m-d');
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
		
		$SQL = 'SELECT * FROM '. $this->table_name .' WHERE PAY_timestamp >= %d AND PAY_timestamp <= %d  ORDER BY PAY_timestamp ASC';
		global $wpdb;

		if ( $payments = $wpdb->get_results( $wpdb->prepare( $SQL, $start_date, $end_date ))) {
//			echo $wpdb->last_query;
//			printr( $payments );
			return $payments;
		} else {
			return FALSE;
		}

	}




	/**
	 *		This function inserts table data
	 *		
	 *		@access public
	 *		@param array $set_column_values - array of column names and values for the SQL INSERT 
	 *		@return array
	 */	
	public function insert ($set_column_values) {

		//$this->display_vars( __FUNCTION__, array( 'set_column_values' => $set_column_values ) );
		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		return $this->_insert( $this->table_name, $this->table_data_types, $set_column_values );
	
	}





	/**
	 *		This function updates table data
	 *		
	 *		@access public
	 *		@param array $set_column_values - array of column names and values for the SQL SET clause
	 *		@param array $where_cols_n_values - column names and values for the SQL WHERE clause
	 *		@return array
	 */	
	public function update ($set_column_values, $where_cols_n_values) {
		//$this->display_vars( __FUNCTION__, array( 'set_column_values' => $set_column_values, 'where' => $where ) );
		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		return $this->_update( $this->table_name, $this->table_data_types, $set_column_values, $where_cols_n_values );
	}





}

// End of file EEM_Payment.model.php
// Location: /includes/models/EEM_Payment.model.php