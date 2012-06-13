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
	 *		private constructor to prevent direct creation
	 *		@Constructor
	 *		@access private
	 *		@return void
	 */	
	private function __construct() {	
		global $wpdb;
		// set table name
		$this->table_name = $wpdb->prefix . 'esp_transaction';
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
		);		
	
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
	*		cycle though array of transactions and create objects out of each item
	* 
	* 		@access		private
	* 		@param		array		$transactions		
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	private function _create_objects( $transactions = FALSE ) {

		if ( ! $transactions ) {
			return FALSE;
		} 		
		
		if ( is_object( $transactions )){
			$transactions = array( $transactions );
		}

		// load Transaction object class file
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Transaction.class.php');

		foreach ( $transactions as $transaction ) {
				$array_of_objects[ $transaction->TXN_ID ] = new EE_Transaction(
						$transaction->TXN_timestamp, 
						$transaction->TXN_total, 
						$transaction->TXN_paid, 
						$transaction->STS_ID, 
						maybe_unserialize( $transaction->TXN_details ), 
						maybe_unserialize( $transaction->TXN_session_data ), 
						$transaction->TXN_hash_salt,
						maybe_unserialize( $transaction->TXN_tax_data ),
						$transaction->TXN_ID
				 	);
		}	
		return $array_of_objects;	

	}





	/**
	*		retreive  a single transaction from db
	* 
	* 		@access		public
	* 		@param		$TXN_ID		
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	public function get_transaction( $TXN_ID = FALSE ) {

		if ( ! $TXN_ID ) {
			return FALSE;
		}
		// retreive a particular transaction
		$where_cols_n_values = array( 'TXN_ID' => $TXN_ID );
		if ( $transaction = $this->select_row_where ( $where_cols_n_values )) {
			$transaction_array = $this->_create_objects( array( $transaction ));
			return array_shift( $transaction_array );
		} else {
			return FALSE;
		}

	}





	/**
	*		retreive  ALL transactions from db
	* 
	* 		@access		public
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	public function get_all_transactions() {
	
		$orderby = 'TXN_timestamp';
		// retreive all transactions	
		if ( $transactions = $this->select_all ( $orderby )) {
			return $this->_create_objects( $transactions );
		} else {
			return FALSE;
		}
		
	}





	/**
	*		retreive transactions from db via foreign key from Registration table
	* 
	* 		@access		private
	* 		@param		$REG_ID		Registration ID
	* 		@param		$EVT_ID		Event ID
	* 		@param		$ATT_ID		Attendee ID
	*		@return 		mixed			array on success, FALSE on fail
	*/	
	private function _get_transactions_via_reg_table_foreign_key( $REG_ID = FALSE, $EVT_ID = FALSE, $ATT_ID = FALSE ) {
		
		// you gimme nothing??? you get nothing!!!
		if ( ! $REG_ID &&  ! $EVT_ID &&  ! $ATT_ID ) {
			return FALSE;
		}
		
		// determine what we will be searching for via trickle down conditionals - it's just like PLINKO only better!
		$what = $REG_ID ? 'REG_ID' : ( $EVT_ID ? 'EVT_ID' : 'ATT_ID' );
		$ID = $REG_ID ? $REG_ID : ( $EVT_ID ? $EVT_ID : $ATT_ID );
		
		global $wpdb;
		// retreive transaction
		$SQL = 'SELECT reg.TXN_ID, txn.* FROM ' . $wpdb->prefix . 'esp_registration reg LEFT JOIN ' . $this->table_name . ' txn ON reg.TXN_ID = txn.TXN_ID WHERE reg.'. $what .' = %d';	
		if ( $transactions = $wpdb->get_results( $wpdb->prepare( $SQL, $ID ))) {
			return $this->_create_objects( $transactions );
		} else {
			return FALSE;
		}
		
	}





	/**
	*		retreive  transaction from db for a specific registration
	* 
	* 		@access		public
	* 		@param		$REG_ID		Registration ID
	*		@return 		mixed			array on success, FALSE on fail
	*/	
	public function get_transaction_for_registration( $REG_ID = FALSE ) {	
		return $this->_get_transactions_via_reg_table_foreign_key( $REG_ID );		
	}





	/**
	*		retreive  ALL transactions from db for a specific event
	* 
	* 		@access		public
	* 		@param		$REG_ID		Registration ID
	*		@return 		mixed			array on success, FALSE on fail
	*/	
	public function get_all_transactions_for_event( $EVT_ID = FALSE ) {	
		return $this->_get_transactions_via_reg_table_foreign_key( FALSE, $EVT_ID );
	}




	/**
	*		retreive  ALL transactions from db for a specific attendee
	* 
	* 		@access		public
	* 		@param		$ATT_ID		Registration ID
	*		@return 		mixed			array on success, FALSE on fail
	*/	
	public function get_all_transactions_for_attendee( $ATT_ID = FALSE ) {	
		return $this->_get_transactions_via_reg_table_foreign_key( FALSE, FALSE, $ATT_ID );
	}





	/**
	*		retreive  all transactions from db between two dates
	* 
	* 		@access		public
	* 		@param		string		$start_date		
	* 		@param		string		$end_date		
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	public function get_transactions_for_admin_page( $start_date = FALSE, $end_date = FALSE ) { 

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
		
		$SQL = 'SELECT att.ATT_fname, att.ATT_lname, att.ATT_email, evt.id, evt.event_name, evt.slug, reg.REG_ID, txn.TXN_ID, txn.TXN_timestamp, txn.TXN_total, txn.TXN_paid, txn.STS_ID, txn.TXN_details ';
		$SQL .= 'FROM ' . $wpdb->prefix . 'esp_registration reg ';
		$SQL .= 'INNER JOIN ' . $wpdb->prefix . 'esp_attendee att ON reg.ATT_ID = att.ATT_ID ';
		$SQL .= 'INNER JOIN ' . $wpdb->prefix . 'events_detail evt ON reg.EVT_ID = evt.id ';
		$SQL .= 'INNER JOIN ' . $this->table_name . ' txn ON reg.TXN_ID = txn.TXN_ID ';
		$SQL .= 'WHERE TXN_timestamp >= %d ';
		$SQL .= 'AND TXN_timestamp <= %d ';
		$SQL .= 'AND reg.REG_is_primary = 1 ';
		$SQL .= 'ORDER BY TXN_timestamp DESC';

		if ( $results = $wpdb->get_results( $wpdb->prepare( $SQL, $start_date, $end_date ), ARRAY_A )) {
//			echo $wpdb->last_query;
//			echo printr( $payments );
			$transactions = array();
			foreach ( $results as $transaction ) {
				$transactions[ $transaction['TXN_ID'] ] = $transaction;
			}
			return $transactions;
		} else {
			global $espresso_notices;
			$espresso_notices['errors'][] = $wpdb->print_error();
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

		global $espresso_notices;

		if ( ! $TXN_ID ) {
			$espresso_notices['errors'][] = 'No Transaction ID was received.';
			return FALSE;
		}
		
		global $wpdb;
		
		$SQL = 'SELECT reg.*, txn.*, att.*, evt.id, evt.event_name, evt.slug ';
		$SQL .= 'FROM ' . $wpdb->prefix . 'esp_registration reg ';
		$SQL .= 'INNER JOIN ' . $wpdb->prefix . 'events_detail evt ON reg.EVT_ID = evt.id ';
		$SQL .= 'INNER JOIN ' . $wpdb->prefix . 'esp_attendee att ON reg.ATT_ID = att.ATT_ID ';
		$SQL .= 'INNER JOIN ' . $this->table_name . ' txn ON reg.TXN_ID = txn.TXN_ID ';
		$SQL .= 'WHERE txn.TXN_ID = %d ';
		$SQL .= 'AND reg.REG_is_primary = 1 ';
		$SQL .= 'ORDER BY TXN_timestamp DESC';

		if ( $transaction = $wpdb->get_results( $wpdb->prepare( $SQL, $TXN_ID ))) {
//			echo $wpdb->last_query;
//			echo printr( $payments );
			return $transaction;
		} else {
			$espresso_notices['errors'][] = $wpdb->print_error();
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
	
		// set some table specific success messages
		if ( $results['rows'] == 1 ) {
			// one row was successfully updated
			$espresso_notices['success'][] = 'Transaction details have been successfully saved to the database.';
		} elseif ( $results['rows'] > 1 ) {
			// multiple rows were successfully updated
			$espresso_notices['success'][] = 'Details for '.$results.' transactions have been successfully saved to the database.';
		} else {
			// error message 
			$espresso_notices['errors'][] = 'An error occured and the transaction has not been saved to the database. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
		}
	
		$rows_n_ID = array( 'rows' => $results['rows'], 'new-ID' => $results['new-ID'] );
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
	
		//$this->display_vars( __FUNCTION__, array( 'set_column_values' => $set_column_values, 'where' => $where_cols_n_values ) );
			
		global $espresso_notices;

		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		$results = $this->_update( $this->table_name, $this->table_data_types, $set_column_values, $where_cols_n_values );
	
		// set some table specific success messages
		if ( $results['rows'] == 1 ) {
			// one row was successfully updated
			$espresso_notices['success'][] = 'Transaction details have been successfully updated.';
		} elseif ( $results['rows'] > 1 ) {
			// multiple rows were successfully updated
			$espresso_notices['success'][] = 'Details for '.$results.' transactions have been successfully updated.';
		} else {
			// error message 
			$espresso_notices['errors'][] = 'An error occured and the transaction has not been updated. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
		}
	
		return $results['rows'];
	
	}






}
// End of file EEM_Transaction.model.php
// Location: /includes/models/EEM_Transaction.model.php