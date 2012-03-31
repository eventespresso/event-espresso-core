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
			'TXN_total' 					=> '%d', 	
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
			self::$_instance = &new self();
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
						$transaction->TXN_total, 
						$transaction->STS_ID, 
						$transaction->TXN_details, 
						maybe_unserialize( $transaction->TXN_session_data ), 
						$transaction->TXN_hash_salt,
						$transaction->TXN_tax_data,
						$transaction->TXN_timestamp, 
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
			return $this->_create_objects( array( $transaction ));
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
			$espresso_notices['success'][] = 'Datetime details have been successfully saved to the database.';
		} elseif ( $results['rows'] > 1 ) {
			// multiple rows were successfully updated
			$espresso_notices['success'][] = 'Details for '.$results.' datetimes have been successfully saved to the database.';
		} else {
			// error message 
			$espresso_notices['errors'][] = 'An error occured and the datetime has not been saved to the database. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
		}
	
		return $results['rows'];
	
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
			$espresso_notices['success'][] = 'Datetime details have been successfully updated.';
		} elseif ( $results['rows'] > 1 ) {
			// multiple rows were successfully updated
			$espresso_notices['success'][] = 'Details for '.$results.' datetimes have been successfully updated.';
		} else {
			// error message 
			$espresso_notices['errors'][] = 'An error occured and the datetime has not been updated. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
		}
	
		return $results['rows'];
	
	}






}
// End of file EEM_Transaction.model.php
// Location: /includes/models/EEM_Transaction.model.php