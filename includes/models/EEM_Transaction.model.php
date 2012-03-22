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

  	// private instance of the Transactione object
	private static $_instance = NULL;
		
	protected $table_name = '';
	
	// holder for the parent class espresso_model
	private $EEDB = NULL;
	

	
	// array representation of the transaction table and the data types for each field 
	protected $table_data_types = array (	
			'TXN_ID' 						=> '%d', 	
			'TXN_timestamp' 		=> '%d', 	
			'TXN_total' 					=> '%d', 	
			'STS_ID'						=> '%s', 	 	
			'TXN_details'				=> '%s', 	 	
			'TXN_session_data'		=> '%s',
			'TXN_hash_salt'			=> '%s',
			'TXN_tax_data'			=> '%s'	
		);

						


						
	/**
	 *		private constructor to prevent direct creation
	 *		@Constructor
	 *		@access private
	 *		@return void
	 */	
	private function __construct() {	
		global $wpdb;
	 	// load base model for direct access
	 	$this->EEDB = &parent::instance();
		// set table name
		$this->table_name = $wpdb->prefix . 'esp_transaction';
		// load Transaction object class file
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Transaction.class.php');
	
		// uncomment these for example code samples of how to use them
		//			self::how_to_use_insert();
		//			self::how_to_use_update();
	}

	/**
	 *		This funtion is a singleton method used to instantiate the Espresso_model object
	 *
	 *		@access public
	 *		@return Espresso_model instance
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
		$where = array( 'TXN_ID' => $TXN_ID );
		if ( $transaction = $this->select_row_where ( $where )) {
			return $this->_create_objects( array( $transaction ));
		} else {
			return FALSE;
		}

	}





	/**
	*		get event start date from db
	* 
	* 		@access		public		
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	public function get_event_start_dates( $EVT_ID = FALSE ) {
	
		if ( ! $EVT_ID ) {
			return FALSE;
		}		
		return $this->_get_event_datetimes( $EVT_ID, 'E', 'S' );			
	}









	/**
	 *		This function returns multiple rows from a table
	 * 		SELECT * FROM table_name ORDER BY column_name(s) ASC|DESC
	 *		
	 *		@access public
	 *		@param mixed (string, array) - $orderby - cloumn names to be used for sorting 
	 *		@param mixed (string, array) - $sort - ASC or DESC
	 *		@param string - $output - WP output types - OBJECT, OBJECT_K, ARRAY_A, ARRAY_N 
	 *		@return mixed (object, array)
	 */
	public function select_all ( $orderby=FALSE, $sort=FALSE, $output='OBJECT_K' ) {
		$results = $this->EEDB->_select_all ( $this->table_name, $orderby, $sort, $output );
		return $results;
	}





	/**
	 *		This function returns multiple rows from a table
	 * 		SELECT * FROM table_name WHERE column_name operator value ORDER BY column_name(s) ASC|DESC
	 *		
	 *		@access public
	 *		@param mixed (string, array) 		$where_cols_n_values - array of key => value pairings with the db cloumn name as the key, to be used for WHERE clause 
	 *		@param mixed (string, array)		$orderby - cloumn names to be used for sorting 
	 *		@param string								$sort - ASC or DESC
	 *		@param mixed (string, array)		$operator -  operator to be used for WHERE clause  > = < 
	 *		@param string								$output - WP output types - OBJECT, OBJECT_K, ARRAY_A, ARRAY_N 
	 *		@return mixed (object, array)
	 */	
	public function select_all_where ( $where=FALSE, $orderby = FALSE, $sort = 'ASC', $operator = '=', $output = 'OBJECT_K' ) {
		$results = $this->EEDB->_select_all_where ( $this->table_name, $this->table_data_types, $where, $orderby, $sort, $operator, $output );
		return $results;
	}





	/**
	 *		This function returns one row from from a table
	 * 		SELECT * FROM table_name WHERE column_name operator value
	 *		
	 *		@access public
	 *		@param mixed (string, array) 		$where_cols_n_values - array of key => value pairings with the db cloumn name as the key, to be used for WHERE clause 
	 *		@param mixed (string, array) 		$operator -  operator to be used for WHERE clause  > = < 
	 *		@param string 								$output - WP output types - OBJECT,  ARRAY_A, ARRAY_N 
	 *		@return mixed (object, array)
	 */	
	public function select_row_where ( $where=FALSE, $operator = '=', $output = 'OBJECT' ) {
		$results = $this->EEDB->_select_row_where ( $this->table_name, $this->table_data_types, $where, $operator, $output );
		return $results;
	}





	/**
	 *		This function returns one value from from a table
	 * 		SELECT column_name(s) FROM table_name WHERE column_name = value
	 *		
	 *		@access public
	 *		@param string - $select - column name to be used for SELECT clause 
	 *		@param mixed (string, array) 		$where_cols_n_values - array of key => value pairings with the db cloumn name as the key, to be used for WHERE clause 
	 *		@param mixed (string, array)		$operator -  operator to be used for WHERE clause  > = < 
	 *		@return mixed (object, array)
	 */	
	public function select_value_where ( $select=FALSE, $where=FALSE, $operator = '=' ) {
		$results = $this->EEDB->_select_value_where ( $this->table_name, $this->table_data_types, $select, $where, $operator );
		return $results;
	}





	/**
	 *		This function returns an array of key => value pairs from from a table
	 * 		SELECT * FROM table_name ORDER BY column_name(s) ASC|DESC
	 *		
	 *		@access public
	 *		@param string - $key - column name to be used as the key for the returned array 
	 *		@param string - $value - column name to be used as the value for the returned array 
	 *		@param mixed (string, array) - $orderby - cloumn names to be used for sorting 
	 *		@param string - $sort - ASC or DESC
	 *		@return array - key => value 
	 */	
	public function get_key_value_array ( $key=FALSE, $value=FALSE, $orderby = FALSE, $sort = 'ASC', $output = 'ARRAY_A' ) {
		$results = $this->EEDB->_get_key_value_array ( $this->table_name, $this->table_data_types, $key, $value, $orderby, $sort, $output );
		return $results;
	}





	/**
	 *		This function returns an array of key => value pairs from from a table
	 * 		SELECT * FROM table_name WHERE column_name operator value ORDER BY column_name(s) ASC|DESC
	 *		
	 *		@access public
	 *		@param string 								$key - column name to be used as the key for the returned array 
	 *		@param string 								$value - column name to be used as the value for the returned array 
	 *		@param mixed (string, array) 		$where_cols_n_values - array of key => value pairings with the db cloumn name as the key, to be used for WHERE clause 
	 *		@param mixed (string, array) 		$orderby - cloumn names to be used for sorting 
	 *		@param string								$sort - ASC or DESC
	 *		@param mixed (string, array) 		$operator -  operator to be used for WHERE clause  > = < 
	 *		@return array - key => value 
	 */	
	public function get_key_value_array_where( $key=FALSE, $value=FALSE, $where=FALSE, $orderby=FALSE, $sort='ASC', $operator='=' ) {
		$results = $this->EEDB->_get_key_value_array_where ( $this->table_name, $this->table_data_types, $key, $value, $where, $orderby, $sort, $operator );
		return $results;
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
		$results = $this->EEDB->_insert( $this->table_name, $this->table_data_types, $set_column_values );
	
		// set some table specific success messages
		if ( $results['rows'] == 1 ) {
			// one row was successfully updated
			$espresso_notices['success'][] = 'Datetime details have been successfully saved to the database.';
		} elseif ( $results['rows'] > 1 ) {
			// multiple rows were successfully updated
			$espresso_notices['success'][] = 'Details for '.$results.' datetimes have been successfully saved to the database.';
		} else {
			// error message 
			$espresso_notices['errors'][] = 'An error occured and the datetime has not been saved to the database. ' . $this->EEDB->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
		}
	
		return $results['rows'];
	
	}










	/**
	 *		This function updates table data
	 *		
	 *		@access public
	 *		@param array $set_column_values - array of column names and values for the SQL SET clause
	 *		@param array $where - column names and values for the SQL WHERE clause
	 *		@return array
	 */	
	public function update ($set_column_values, $where) {
	
		//$this->display_vars( __FUNCTION__, array( 'set_column_values' => $set_column_values, 'where' => $where ) );
			
		global $espresso_notices;

		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		$results = $this->EEDB->_update( $this->table_name, $this->table_data_types, $set_column_values, $where );
	
		// set some table specific success messages
		if ( $results['rows'] == 1 ) {
			// one row was successfully updated
			$espresso_notices['success'][] = 'Datetime details have been successfully updated.';
		} elseif ( $results['rows'] > 1 ) {
			// multiple rows were successfully updated
			$espresso_notices['success'][] = 'Details for '.$results.' datetimes have been successfully updated.';
		} else {
			// error message 
			$espresso_notices['errors'][] = 'An error occured and the datetime has not been updated. ' . $this->EEDB->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
		}
	
		return $results['rows'];
	
	}
	
	
	
	
	
	
	
	
	
	/**
	 *		This function will delete a row from a table 
	 *		
	 *		@access protected
	 *		@param string - $table_name - 
	 *		@param array - $em_table_data_types
	 *		@param mixed (string, array) - $where - cloumn names to be used for WHERE clause 
	 *		@param mixed (string, array) - $where_value - values to be used for WHERE clause  
	 *		@param mixed (string, array) - $operator -  operator to be used for WHERE clause  > = < 
	 *		@return mixed (object, array)
	 */	
	protected function eedb_delete ( $where=FALSE, $operator = '=' ) {
		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		$results = $this->EEDB->_update( $this->table_name, $this->table_data_types, $where, $operator );
		return $results;
	}
	
	
	
	
	
	
	
	
	
	
	/**
	 *		@ create error code from filepath, function name, 
	 *		@ and line number where exception was thrown
	 *		@ param string $file
	 *		@ param string $func
	 *		@ param string $line
	 *		@ return string
	 */	
	public function check_results_for_errors ( $results, $file, $func, $line ) {

		if ( is_array( $results )) {
			$results['line_no'] = $this->EEDB->_get_error_code (  $file, $func, $line );
			return $results;
		} else {
			return FALSE;
		}
		
	}
	
	
	
	
	
	
	
	
	
	/** 
	 *		create error code from filepath, function name and line number where exception was thrown
	 *  
	 * 		MOVE TO SOME HELPER FILE SOMEWHERE >> SHOULD NOT BE IN A MODEL ( only here for development purposes )
	 *		@ param string $file
	 *		@ param string $func
	 *		@ param string $line
	 *		@ return string
	 */	
	public function generate_result_messages ($action_results) {

		// empty string to write parsed templates to
		$error_update_messages = '';
		
		if ( $action_results !== FALSE ) {
		
			// empty array to hold message variables in 
			$msg_vars = array();
			
			// HTML template file for error and update messages 
			$template_path = EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/error_update_message.template.php';
			if ( ! file_exists($template_path)) {
				return '';
			}
			
			ob_start();

			foreach ( $action_results as $action_result ) {
			
				$type = $action_result['type'];
				$msg = __($action_result['msg'], 'event_espresso');
				
				if ( $action_result['line_no'] ) { 
					$line_no =  __( 'code: ', 'event_espresso') . ' ' . $action_result['line_no'];
				} else {
					$line_no =  FALSE;
				}
				
				if ( $action_result['rows'] ) { 
					$rows =  __( 'rows affected: ', 'event_espresso') . ' ' . $action_result['rows'];
				} else {
					$rows =  FALSE;
				}
			
				include($template_path);
		
			}
		}
		
		$buffer = ob_get_contents();
		@ob_end_clean();
		return $buffer;
		
	}
	











		public function how_to_use_insert() {
			echo '
<h2>Cut and paste the following into your code:</h2>
<pre>
	// array of column names and values for the SQL INSERT... VALUES clause
	$set_column_values = array(
					\'key\' => \'value\',
					\'key\' => $value,
				);
	// model function to perform error checking and then run update
	$results = $attendee_model->insert ($set_column_values);
</pre>
';
			die();
		}





		public function how_to_use_update() {
			echo '
<h2>Cut and paste the following into your code:</h2>
<pre>
	// array of column names and values for the SQL SET clause
	$set_column_values = array(
					\'key\' => \'value\',
					\'key\' => $value,
				);
	// array of column names and values for the SQL WHERE clause
	$where = array(
					\'key\' => \'value\',
					\'key\' => $value,
				);
	// model function to perform error checking and then run update
	$results = $attendee_model->update ($set_column_values, $where);
</pre>
';
			die();
		}





	private function display_vars( $method, $vars_array ) {
	
		echo '<h1>Class: '.get_class($this).'</h1>';
		echo '<h2>Method: '.$method.'</h2>';
		echo '<h3>TABLE : ' . $this->table_name . '</h3>';
		
		foreach ( $vars_array as $var => $var_array ) {
			echo '<h4> ' . $this->table_name . ' '.$var.'</h4>';
			echo '<pre>';
			echo print_r($var_array);
			echo '</pre>';
		}
		//die();
	}


}
// End of file EEM_Transaction.model.php
// Location: /includes/models/EEM_Transaction.model.php