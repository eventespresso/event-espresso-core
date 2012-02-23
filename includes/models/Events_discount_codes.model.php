<?php 
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/* 
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license				http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link						http://www.eventespresso.com
 * @ version		 	3.1.P.7
 *
 * ------------------------------------------------------------------------
 *
 * Events Discount Codes Model
 * 
 *
 * @package				Event Espresso
 * @subpackage		mvc-models
 * @author					Brent Christensen 
 * @table 						wp_events_discount_codes
 *
 * ------------------------------------------------------------------------
 */
class Events_discount_codes extends espresso_model {
	
	protected $table_name = EVENTS_DISCOUNT_CODES_TABLE;

	// array representation of wp_events_discount_codes table and the data types for each field 
	protected $table_data_types = array (	  	 	 	 	 	 	 
			'id' 																		=> '%d', 	
			'coupon_code' 										=> '%s', 	
			'coupon_code_price' 						=> '%d', 	
			'use_percentage' 								=> '%s', 	 	
			'coupon_code_description' 	=> '%s',
			'each_attendee'										=> '%s',
			'wp_user'														=> '%d'
		);

						
						
/**
 *		@Constructor
 *		@public private
 *		@return void
 */	
  public function __construct() {	
// uncomment these for example code samples of how to use them
//			self::how_to_use_insert();
//			self::how_to_use_update();
	}










/*
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
		$results = parent::eedb_select_all ( $this->table_name, $orderby, $sort, $output );
		return $results;
}





/**
 *		This function returns multiple rows from a table
 * 		SELECT * FROM table_name WHERE column_name operator value ORDER BY column_name(s) ASC|DESC
 *		
 *		@access public
 *		@param mixed (string, array) - $where - cloumn names to be used for WHERE clause 
 *		@param mixed (string, array) - $where_value - values to be used for WHERE clause  
 *		@param mixed (string, array) - $orderby - cloumn names to be used for sorting 
 *		@param string - $sort - ASC or DESC
 *		@param mixed (string, array) - $operator -  operator to be used for WHERE clause  > = < 
 *		@param string - $output - WP output types - OBJECT, OBJECT_K, ARRAY_A, ARRAY_N 
 *		@return mixed (object, array)
 */	
	public function select_all_where ( $where=FALSE, $where_value=FALSE, $orderby = FALSE, $sort = 'ASC', $operator = '=', $output = 'OBJECT_K' ) {
		$results = parent::eedb_select_all_where ( $this->table_name, $this->table_data_types, $where, $where_value, $orderby, $sort, $operator, $output );
		return $results;
}





/**
 *		This function returns one row from from a table
 * 		SELECT * FROM table_name WHERE column_name operator value
 *		
 *		@access public
 *		@param mixed (string, array) - $where - cloumn names to be used for WHERE clause 
 *		@param mixed (string, array) - $where_value - values to be used for WHERE clause  
 *		@param mixed (string, array) - $operator -  operator to be used for WHERE clause  > = < 
 *		@param string - $output - WP output types - OBJECT, OBJECT_K, ARRAY_A, ARRAY_N 
 *		@return mixed (object, array)
 */	
	public function select_row_where ( $where=FALSE, $where_value=FALSE, $operator = '=', $output = 'OBJECT_K' ) {
		$results = parent::eedb_select_row_where ( $this->table_name, $this->table_data_types, $where, $where_value, $operator, $output );
		return $results;
}





/**
 *		This function returns one value from from a table
 * 		SELECT column_name(s) FROM table_name WHERE column_name = value
 *		
 *		@access public
 *		@param string - $select - column name to be used for SELECT clause 
 *		@param mixed (string, array) - $where - column names to be used for WHERE clause 
 *		@param mixed (string, array) - $where_value - values to be used for WHERE clause  
 *		@param mixed (string, array) - $operator -  operator to be used for WHERE clause  > = < 
 *		@return mixed (object, array)
 */	
	public function select_value_where ( $select=FALSE, $where=FALSE, $where_value=FALSE, $operator = '=' ) {
		$results = parent::eedb_select_value_where ( $this->table_name, $this->table_data_types, $select, $where, $where_value, $operator );
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
	public function get_key_value_array ( $key=FALSE, $value=FALSE, $orderby = FALSE, $sort = 'ASC', $output = 'OBJECT_K' ) {
		$results = parent::eedb_get_key_value_array ( $this->table_name, $this->table_data_types, $key, $value, $orderby, $sort, $output );
		return $results;
}





/**
 *		This function returns an array of key => value pairs from from a table
 * 		SELECT * FROM table_name WHERE column_name operator value ORDER BY column_name(s) ASC|DESC
 *		
 *		@access public
 *		@param string - $key - column name to be used as the key for the returned array 
 *		@param string - $value - column name to be used as the value for the returned array 
 *		@param mixed (string, array) - $where - column names to be used for WHERE clause 
 *		@param mixed (string, array) - $where_value - values to be used for WHERE clause  
 *		@param mixed (string, array) - $orderby - cloumn names to be used for sorting 
 *		@param string - $sort - ASC or DESC
 *		@param mixed (string, array) - $operator -  operator to be used for WHERE clause  > = < 
 *		@return array - key => value 
 */	
	public function get_key_value_array_where( $key=FALSE, $value=FALSE, $where=FALSE, $where_value=FALSE, $orderby=FALSE, $sort='ASC', $operator='=' ) {
		$results = parent::eedb_get_key_value_array_where ( $this->table_name, $this->table_data_types, $key, $value, $where, $where_value, $orderby, $sort, $operator );
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
			
		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		$results = parent::eedb_update( $this->table_name, $this->table_data_types, $set_column_values );
	
//		// uncomment to set some table specific results messages - optional
//		if ( $results['rows'] == 1 ) {
//			// one row was successfully updated
//			$results['msg'] = 'The record has been successfully created.';
//		} elseif ( $results['rows'] > 1 ) {
//			// multiple rows were successfully updated
//			$results['msg'] = $results['rows'] .' records have been successfully created.';
//		} else {
//			// error message 
//			$results['msg'] = 'An error occured and the record was not created.';
//		}
	
		return $results;
	
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
			
		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		$results = parent::eedb_update( $this->table_name, $this->table_data_types, $set_column_values, $where );
	
//		// uncomment to set some table specific results messages - optional
//		if ( $results['rows'] == 1 ) {
//			// one row was successfully updated
//			$results['msg'] = 'The record has been successfully updated.';
//		} elseif ( $results['rows'] > 1 ) {
//			// multiple rows were successfully updated
//			$results['msg'] = $results['rows'] .' records have been successfully updated.';
//		} else {
//			// error message 
//			$results['msg'] = 'An error occured and the record was not updated.';
//		}
	
		return $results;
	
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
	protected function eedb_delete ( $where=FALSE, $where_value=FALSE, $operator = '=' ) {
		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		$results = parent::eedb_update( $this->table_name, $this->table_data_types, $where, $where_value, $operator );
		return $results;
	}

	
	
	
	
	
	
	
	
/** MOVE TO SOME HELPER FILE SOMEWHERE >> SHOULD NOT BE IN A MODEL ( only here for development purposes )
 *		@ create error code from filepath, function name, 
 *		@ and line number where exception was thrown
 *		@ param string $file
 *		@ param string $func
 *		@ param string $line
 *		@ return string
 */	
	public function check_results_for_errors ( $results, $file, $func, $line ) {

		if ( is_array( $results )) {
			$results['line_no'] = parent::eedb_get_error_code (  $file, $func, $line );
			return $results;
		} else {
			return FALSE;
		}
		
	}
	
	
	
	
	
	
	
	
	
/** MOVE TO SOME HELPER FILE SOMEWHERE >> SHOULD NOT BE IN A MODEL ( only here for development purposes )
 *		@ create error code from filepath, function name, 
 *		@ and line number where exception was thrown
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
			$template_path = EVENT_ESPRESSO_PLUGINFULLPATH . 'ee-mvc/templates/error_update_message.template.php';
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
	$action_results = $attendee_model->insert ($set_column_values);
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
	$action_results = $attendee_model->update ($set_column_values, $where);
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
		die();
	}


}
// End of file Events_discount_codes.model.php
// Location: /ee-mvc/models/Events_discount_codes.model.php