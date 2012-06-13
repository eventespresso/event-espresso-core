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
		// array representation of the payment table and the data types for each field 
		$this->table_data_types = array (	
			'PAY_ID' 								=> '%d',
			'TXN_ID' 								=> '%d',
			'STS_ID' 								=> '%s',
			'PAY_timestamp' 				=> '%d',
			'PAY_method'						=> '%s',
			'PAY_amount'						=> '%s',
			'PAY_gateway'					=> '%s',
			'PAY_gateway_response'	=> '%s',
			'PAY_gateway_txn_id'		=> '%s',
			'PAY_extra_accntng'			=> '%s',
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
			self::$_instance = &new self();
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

		foreach ( $payments as $payment ) {
				$array_of_objects[ $payment->PAY_ID ] = new EE_Payment(
						$payment->TXN_ID,
						$payment->STS_ID,
						$payment->PAY_timestamp,
						$payment->PAY_method,
						$payment->PAY_amount,
						$payment->PAY_gateway,
						$payment->PAY_gateway_response,
						$payment->PAY_gateway_txn_id,
						$payment->PAY_extra_accntng,
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
//			echo printr( $payments );
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
			
		global $espresso_notices;

		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		$results = $this->_insert( $this->table_name, $this->table_data_types, $set_column_values );

		$rows_n_ID = array( 'rows' => $results['rows'], 'new-ID' => $results['new-ID'] );
	
		// set some table specific success messages
		if ( $results['rows'] == 1 ) {
			// one row was successfully updated
			$espresso_notices['success'][] = 'Payment details have been successfully saved to the database.';
		} elseif ( $results['rows'] > 1 ) {
			// multiple rows were successfully updated
			$espresso_notices['success'][] = 'Details for '.$results.' payments have been successfully saved to the database.';
		} else {
			if ( empty( $espresso_notices['errors'] )) {
				$espresso_notices['errors'][] = 'An error occured and the payment has not been saved to the database. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );	
			} 
			$rows_n_ID['errors'] = implode( "\n", $espresso_notices['errors'] );
		}
	
		return $rows_n_ID;
	
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
			
		global $espresso_notices;

		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		$results = $this->_update( $this->table_name, $this->table_data_types, $set_column_values, $where_cols_n_values );
	
		// set some table specific success messages
		if ( $results['rows'] == 1 ) {
			// one row was successfully updated
			$espresso_notices['success'][] = 'Payment details have been successfully updated.';
		} elseif ( $results['rows'] > 1 ) {
			// multiple rows were successfully updated
			$espresso_notices['success'][] = 'Details for '.$results.' payments have been successfully updated.';
		} else {
			// error message 
			$espresso_notices['errors'][] = 'An error occured and the payment has not been updated. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
		}
	
		return $results['rows'];
	
	}





}

// End of file EEM_Payment.model.php
// Location: /includes/models/EEM_Payment.model.php