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
 * Event Espresso Base Model Class
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class Espresso_base {
				
  	// private instance of the Espresso_model object
	private static $_instance = NULL;





	/**
	 *		private constructor to prevent direct creation
	 *		@Constructor
	 *		@access private
	 *		@return void
	 */	
	private function __construct() {
		
	}

	/**
	 *		This funtion is a singleton method used to instantiate the Espresso_model object
	 *
	 *		@access protected
	 *		@return Espresso_model instance
	 */	
	protected static function instance(){
	
		// check if instance of Espresso_model already exists
		if ( self::$_instance === NULL ) {
			// instantiate Espresso_model 
			self::$_instance = &new self();
		}
		// Espresso_model object
		return self::$_instance;
	}
	
	
	
	
	
	
	
	
	/**
	 *		This function returns multiple rows from a table
	 * 		ie: SELECT * FROM table_name ORDER BY column_name(s) ASC|DESC
	 *		
	 *		@access protected
	 *		@param string - $em_table_name - 
	 *		@param mixed (string, array) - $orderby - cloumn names to be used for sorting 
	 *		@param string - $sort - ASC or DESC
	 *		@param string - $output - WP output types - OBJECT, OBJECT_K, ARRAY_A, ARRAY_N 
	 *		@return mixed (object, array)
	 */	
	protected function _select_all (  $em_table_name=FALSE, $orderby = FALSE, $sort = 'ASC', $output = 'OBJECT_K' )	{
	
		global $espresso_notices;
		
		// what?? no table name ??? Get outta here!!!
		if ( ! $em_table_name ) {
			$espresso_notices['errors'][] = 'No table has been specified. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		
		$SQL = 'SELECT * FROM '.$em_table_name;
		
		if ( $orderby ) {
			$SQL .= $this->_orderby_n_sort ($orderby, $sort);
		}
		
		global $wpdb;
		$results = $wpdb->get_results( $SQL, $output );
		return $results;
	}
	









	/**
	 *		This function returns multiple rows from a table
	 * 		ie: SELECT * FROM table_name WHERE column_name operator value ORDER BY column_name(s) ASC|DESC
	 *		
	 *		@access protected
	 *		@param string - $em_table_name - 
	 *		@param array - $em_table_data_types
	 *		@param mixed (string, array) - $where - cloumn names to be used for WHERE clause 
	 *		@param mixed (string, array) - $where_value - values to be used for WHERE clause  
	 *		@param mixed (string, array) - $orderby - cloumn names to be used for sorting 
	 *		@param string - $sort - ASC or DESC
	 *		@param mixed (string, array) - $operator -  operator to be used for WHERE clause  > = < 
	 *		@param string - $output - WP output types - OBJECT, OBJECT_K, ARRAY_A, ARRAY_N 
	 *		@return mixed (object, array)
	 */	
	protected function _select_all_where ( $em_table_name=FALSE, $em_table_data_types=array(), $where=FALSE, $where_value=FALSE, $orderby = FALSE, $sort = 'ASC', $operator = '=', $output = 'OBJECT_K' ) {
	
		global $espresso_notices;

		// what?? no table name ??? Get outta here!!!
		if ( ! $em_table_name ) {
			$espresso_notices['errors'][] = 'No table has been specified. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		
		$SQL = 'SELECT * FROM '.$em_table_name;

		if ( $where ) {
			$prepped = $this->_prepare_where ($where, $where_value, $em_table_data_types, $operator);
			$SQL .= $prepped['where'];
			$VAL = $prepped['value'];
		}

		if ( $orderby ) {
			$SQL .= $this->_orderby_n_sort ($orderby, $sort);
		}

		global $wpdb;
		$wpdb->show_errors();
		$results = $wpdb->get_results( $wpdb->prepare( $SQL, $VAL ), $output );
		echo $wpdb->last_query;
		
		return $results;
	}
	









	/**
	 *		This function returns one row from from a table
	 * 		ie: SELECT * FROM table_name WHERE column_name operator value
	 *		
	 *		@access protected
	 *		@param string - $em_table_name - 
	 *		@param array - $em_table_data_types
	 *		@param mixed (string, array) - $where - cloumn names to be used for WHERE clause 
	 *		@param mixed (string, array) - $where_value - values to be used for WHERE clause  
	 *		@param mixed (string, array) - $operator -  operator to be used for WHERE clause  > = < 
	 *		@param string - $output - WP output types - OBJECT, OBJECT_K, ARRAY_A, ARRAY_N 
	 *		@return mixed (object, array)
	 */	
	protected function _select_row_where ( $em_table_name=FALSE, $em_table_data_types=array(), $where=FALSE, $where_value=FALSE, $operator = '=', $output = 'OBJECT_K' ) {
	
		global $espresso_notices;

		// what?? no table name ??? Get outta here!!!
		if ( ! $em_table_name ) {
			$espresso_notices['errors'][] = 'No table has been specified. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		
		$SQL = 'SELECT * FROM '.$em_table_name;
		
		if ( $where ) {
			$prepped = $this->_prepare_where ($where, $where_value, $em_table_data_types, $operator);
			$SQL .= $prepped['where'];
			$VAL = $prepped['value'];
		}
		
		global $wpdb;
		$results = $wpdb->get_row( $wpdb->prepare( $SQL, $VAL ), $output );
		return $results;
	}
	









	/**
	 *		This function returns one value from from a table
	 * 		ie: SELECT column_name(s) FROM table_name WHERE column_name = value
	 *		
	 *		@access protected
	 *		@param string - $em_table_name - 
	 *		@param array - $em_table_data_types
	 *		@param mixed (string, array) - $select - column name to be used for SELECT clause 
	 *		@param mixed (string, array) - $where - column names to be used for WHERE clause 
	 *		@param mixed (string, array) - $where_value - values to be used for WHERE clause  
	 *		@param mixed (string, array) - $operator -  operator to be used for WHERE clause  > = < 
	 *		@return mixed (object, array)
	 */	
	protected function _select_value_where ( $em_table_name=FALSE, $em_table_data_types=array(), $select=FALSE, $where=FALSE, $where_value=FALSE, $operator = '=' ) {
	
		global $espresso_notices;

		// what?? no table name ??? Get outta here!!!
		if ( ! $em_table_name ) {
			//return array( 'type' =>  'error', 'msg' => 'No table has been specified', 'rows' => FALSE );
			$espresso_notices['errors'][] = 'No table has been specified. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		
		// ya gotta let us know what you want!!! 
		if ( ! $select ) {
			$espresso_notices['errors'][] = 'No column name has been specified for the SELECT clause. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		
		$SQL = 'SELECT ';
		
		// if it's not, then make the select into an array 
		if ( ! is_array( $select ) ) {
			$select = array( $select );
		}
		
		// then add each select column name 
		foreach ( $select as $select_column ) {
			$SQL .= $select_column.', ';
		}
		// remove last ', '
		$SQL = substr( $SQL, 0, -2);
		
		$SQL .= ' FROM '.$em_table_name;
		
		if ( $where ) {
			$prepped = $this->_prepare_where ($where, $where_value, $em_table_data_types, $operator);
			$SQL .= $prepped['where'];
			$VAL = $prepped['value'];
		}
		
		global $wpdb;
		$results = $wpdb->get_var( $wpdb->prepare( $SQL, $VAL ) ); 
		return $results;
	}
	









	/**
	 *		This function returns an array of key => value pairs from from a table
	 * 		ie: SELECT * FROM table_name ORDER BY column_name(s) ASC|DESC
	 *		
	 *		@access protected
	 *		@param string - $em_table_name - 
	 *		@param array - $em_table_data_types
	 *		@param string - $key - column name to be used as the key for the returned array 
	 *		@param string - $value - column name to be used as the value for the returned array 
	 *		@param mixed (string, array) - $operator -  operator to be used for WHERE clause  > = < 
	 *		@return array - key => value 
	 */	
	protected function _get_key_value_array ( $em_table_name=FALSE, $em_table_data_types=array(), $key=FALSE, $value=FALSE, $orderby = FALSE, $sort = 'ASC', $output = 'OBJECT_K' ) {
	
		global $espresso_notices;

		// what?? no table name ??? Get outta here!!!
		if ( ! $em_table_name ) {
			$espresso_notices['errors'][] = 'No table has been specified. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		
		// ya gotta let us know what you want!!! 
		if ( ! $key or ! $value ) {
			$espresso_notices['errors'][] = 'Column names for both the "key" and "value" need to be provided. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		
		$SQL = 'SELECT '.$key.', '.$value.' FROM '.$em_table_name;
		
		if ( $orderby ) {
			$SQL .= $this->_orderby_n_sort ($orderby, $sort);
		}
		
		global $wpdb;

		if ( $results = $wpdb->get_results( $wpdb->prepare( $SQL ), $output ) ) {
		
			$key_value_array = array();
			foreach ( $results as $result ) {
				// create the key => value array
				$key_value_array[$result->$key] = $result->$value;
			}
			
			// it's good to give back
			return $key_value_array;
			
		} else {
			return FALSE;
		}
		
	}
	









	/**
	 *		This function returns an array of key => value pairs from from a table
	 * 		ie: SELECT * FROM table_name WHERE column_name operator value ORDER BY column_name(s) ASC|DESC
	 *		
	 *		@access protected
	 *		@param string - $em_table_name - 
	 *		@param array - $em_table_data_types
	 *		@param string - $key - column name to be used as the key for the returned array 
	 *		@param string - $value - column name to be used as the value for the returned array 
	 *		@param mixed (string, array) - $where - column names to be used for WHERE clause 
	 *		@param mixed (string, array) - $where_value - values to be used for WHERE clause  
	 *		@param mixed (string, array) - $operator -  operator to be used for WHERE clause  > = < 
	 *		@return array - key => value 
	 */	
	protected function _get_key_value_array_where( $em_table_name=FALSE, $em_table_data_types=array(), $key=FALSE, $value=FALSE, $where=FALSE, $where_value=FALSE, $orderby = FALSE, $sort = 'ASC', $operator = '=', $output = 'OBJECT_K' ) {
	
		global $espresso_notices;

		// what?? no table name ??? Get outta here!!!
		if ( ! $em_table_name ) {
			$espresso_notices['errors'][] = 'No table has been specified. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
	
		// ya gotta let us know what you want!!! 
		if ( ! $key or ! $value ) {
			$espresso_notices['errors'][] = 'Column names for both the "key" and "value" need to be provided. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		
		$SQL = 'SELECT '.$key.', '.$value.' FROM '.$em_table_name;
		
		if ( $where ) {
			$prepped = $this->_prepare_where ($where, $where_value, $em_table_data_types, $operator);
			$SQL .= $prepped['where'];
			$VAL = $prepped['value'];
		}
		
		if ( $orderby ) {
			$SQL .= $this->_orderby_n_sort ($orderby, $sort);
		}
		
		global $wpdb;

		if ( $results = $wpdb->get_results( $wpdb->prepare( $SQL, $VAL ), $output ) ) {
		
			$key_value_array = array();
			foreach ( $results as $result ) {
				// create the key => value array
				$key_value_array[$result->$key] = $result->$value;
			}
			
			// it's good to give back
			return $key_value_array;
			
		} else {
			return FALSE;
		}
		
	}
	
	








	/**
	 *		This function inserts data into tables using $wpdb->insert
	 *		
	 *		@access protected
	 *		@param string $em_table_name
	 *		@param array $set_cols_n_values - array of column names and values for the SQL INSERT
	 *		@param array $em_table_data_types - ALL of the columns in the table and their corresponding data types 
	 *		@return array
	 */	
	protected function _insert( $em_table_name=FALSE, $em_table_data_types=array(), $set_cols_n_values=array() ) {

		global $espresso_notices;

		// if any of the supplied data is empty or missing - send them back with an error
		if ( ! $em_table_name or empty($em_table_data_types) or empty($set_cols_n_values) ) {
			$espresso_notices['errors'][] = 'The insert can not be performed because of missing data. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		
		// if any of the supplied data arrays are not arrays - send them back with an error
		if ( ! is_array($em_table_data_types) or ! is_array($set_cols_n_values) ) {
			$espresso_notices['errors'][] = 'The insert can not be performed because the supplied data is of the wrong type. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		
		// array to hold column names and values for the SQL SET clause
		$em_updata = array();
		// array to hold data types for the update columns
		$em_upformat = array();

		foreach ( $set_cols_n_values as $column => $value ) {
			// if the supplied column name is an actual field in the table ( as supplied by $em_table_data_types )
			if ( array_key_exists( $column, $em_table_data_types )) {
				// then add it to $em_updata
				$em_updata[$column] = $value;
				// and set it's data type
				$em_upformat[] = $em_table_data_types[$column];
			} else {
				//return array( 'type' =>  'error', 'msg' => 'The column name '. $column .' does not exist.', 'rows' => FALSE );
				$espresso_notices['errors'][] = 'The column name '. $column .' does not exist. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
				return FALSE;
			}
		}
		
		global $wpdb;
		// use $wpdb->insert because it automagically escapes and sanitizes data for us
		$row_results = $wpdb->insert( $em_table_name, $em_updata, $em_upformat);
		
		// set generic success / error mesasges
		if ( $row_results == 1 ) {
			// one row was successfully updated
			$update_results = array( 'type' =>  'updated', 'msg' => 'The record has been successfully created.', 'rows' => $row_results );
		}
		elseif ( $row_results > 1 ) {
			// multiple rows were successfully updated
			$update_results = array( 'type' =>  'updated', 'msg' => $results.' records have been successfully created.', 'rows' => $row_results );
		} else {
			// no result means an error occured
			$update_results = array( 'type' =>  'error', 'msg' => 'An error occured and the record was not created.', 'rows' => 0 );
		}
		
		return $update_results;

	}







	


	/**
	 *		This function updates tables using $wpdb->update
	 *		
	 *		@access protected
	 *		@param string $em_table_name
	 *		@param array $set_cols_n_values - array of column names and values for the SQL SET clause
	 *		@param array $em_table_data_types - ALL of the columns in the table and their corresponding data types 
	 *		@param array $where_cols_n_values - column names and values for the SQL WHERE clause
	 *		@return array
	 */	
	protected function _update( $em_table_name=FALSE, $em_table_data_types=array(), $set_cols_n_values=array(), $where_cols_n_values=array() ) {

		//$this->display_vars( __FUNCTION__, array( 'set_column_values' => $set_column_values, 'where' => $where ) );

		global $espresso_notices;

		// if any of the supplied data is empty or missing - send them back with an error
		if ( ! $em_table_name or empty($em_table_data_types) or empty($set_cols_n_values) or empty($where_cols_n_values) ) {
			$espresso_notices['errors'][] = 'The update can not be performed because of missing data. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		
		// if any of the supplied data arrays are not arrays - send them back with an error
		if ( ! is_array($em_table_data_types) or ! is_array($set_cols_n_values) or ! is_array($where_cols_n_values) ) {
			$espresso_notices['errors'][] = 'The update can not be performed because the supplied data is of the wrong type. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		
		// array to hold column names and values for the SQL SET clause
		$em_updata = array();
		// array to hold data types for the update columns
		$em_upformat = array();

		// array to hold column names and values for the SQL WHERE clause
		$em_where=array();
		// array to hold data types for the where columns
		$em_where_format = array();

		foreach ( $set_cols_n_values as $column => $value ) {
			// if the supplied column name is an actual field in the table ( as supplied by $em_table_data_types )
			if ( array_key_exists( $column, $em_table_data_types )) {
				// then add it to $em_updata
				$em_updata[$column] = $value;
				// and set it's data type
				$em_upformat[] = $em_table_data_types[$column];
			} else {
				//return array( 'type' =>  'error', 'msg' => 'The column name '. $column .' does not exist.' );
				$espresso_notices['errors'][] = 'The column name '. $column .' does not exist. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
				return FALSE;
			}
		}
		
		foreach ( $where_cols_n_values as $column => $value ) {
			// if the supplied column name is an actuall field in the table ( as supplied by $em_table_data_types )
			if ( array_key_exists( $column, $em_table_data_types )) {
				// then add it to $em_where
				$em_where[$column] = $value;
				// and set it's data type
				$em_where_format[] = $em_table_data_types[$column];
			} else {
				$espresso_notices['errors'][] = 'The column name '. $column .' used in the WHERE clause, does not exist. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
				return FALSE;
			}
		}
		
		global $wpdb;
		// use $wpdb->update because it automagically escapes and sanitizes data for us
		$row_results = $wpdb->update( $em_table_name, $em_updata, $em_where, $em_upformat, $em_where_format);
		
		// set generic success / error mesasges
		if ( $row_results == 1 ) {
			// one row was successfully updated
			$update_results = array( 'type' =>  'updated', 'msg' => 'The record has been successfully updated.', 'rows' => $row_results );
		}
		elseif ( $row_results > 1 ) {
			// multiple rows were successfully updated
			$update_results = array( 'type' =>  'updated', 'msg' => $results.' records have been successfully updated.', 'rows' => $row_results );
		} else {
			// no result means an error occured
			$update_results = array( 'type' =>  'error', 'msg' => 'An error occured and the record was not updated.', 'rows' => 0 );
		}
		
		return $update_results;

	}







	


	/**
	 *		This function will delete a row from a table 
	 *		
	 *		@access protected
	 *		@param string - $em_table_name - 
	 *		@param array - $em_table_data_types
	 *		@param mixed (string, array) - $where - cloumn names to be used for WHERE clause 
	 *		@param mixed (string, array) - $where_value - values to be used for WHERE clause  
	 *		@param mixed (string, array) - $operator -  operator to be used for WHERE clause  > = < 
	 *		@return mixed (object, array)
	 */	
	protected function _delete ( $em_table_name=FALSE, $em_table_data_types=array(), $where=FALSE, $where_value=FALSE, $operator = '=' ) {
	
		global $espresso_notices;

		// what?? no table name ??? Get outta here!!!
		if ( ! $em_table_name ) {
			$espresso_notices['errors'][] = 'No table has been specified. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		
		$SQL = 'DELETE FROM '.$em_table_name;
		
		if ( $where ) {
			$prepped = $this->_prepare_where ($where, $where_value, $em_table_data_types, $operator);
			$SQL .= $prepped['where'];
			$VAL = $prepped['value'];
		} else {
			$espresso_notices['errors'][] = 'At least one column name and value has to be specified in order to delete data. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		
		global $wpdb;
		$results = $wpdb->get_row( $wpdb->prepare( $SQL, $VAL ), $output );
		return $results;
	}
	











	/**
	 *		This function generates SQL WHERE clauses
	 *		
	 *		@access private
	 *		@param mixed (string, array) - $where 
	 *		@param mixed (string, array) - $value
	 *		@param array - $em_table_data_types
	 *		@param mixed (string, array) - $operator
	 *		@return array
	 */	
	private function _prepare_where ( $where=FALSE, $value=FALSE, $em_table_data_types=FALSE, $operator = '=' ) {
	
		global $espresso_notices;

		// what??? no WHERE clause??? get outta here!!
		if ( ! $where ) {
			$espresso_notices['errors'][] = 'No coulmn name was provided for the WHERE clause. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		
		// what??? no values??? get outta here!!
		if ( ! $value ) {
			$espresso_notices['errors'][] = 'No value was provided for the WHERE clause. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		
		// what??? no table data types??? get outta here!!
		if ( ! $em_table_data_types ) {
			$espresso_notices['errors'][] = 'The table data types array is missing. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		} 
		
		// in my book, any good WHERE clause should start with the word "WHERE"
		$WHR = ' WHERE ';
		$value_parameters = array();
		
		// multiple column value pairs
		if ( is_array($where) ) {

			// oops ! number of coulmns and values  don't match !
			if ( count($where) != count($value) ) {
				$espresso_notices['errors'][] = 'The number of coulmn names provided for the WHERE clause does not match the number of values. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
				return FALSE;
			} 
			
			$single_op = is_array($operator) ? FALSE : TRUE;
	
			foreach ( $where as $key => $column_name ) {
				// check to make sure the supplied values are also an array, because count() can return odd results ( like count(false) = 1 )
				if ( is_array($value) ) {
					// change non array operator to array with the correct key
					if ( $single_op ) {
						$operator = array( $key => $operator );
					}
					// build this segment of the WHERE clause
					$WHR .= $column_name . ' ' . $operator[$key] . "'" . $em_table_data_types[$column_name] . "'";
					$value_parameters[ $column_name ] = $value[$key];
				} else {
					// oops! one value but multiple column names
					$espresso_notices['errors'][] = 'The values provided for the WHERE clause need to be an array to match the provided column names. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
					return FALSE;
				}
				// add the AND before adding the next segment of the WHERE clause
				$WHR .= ' AND ';
				// convert single operator back to non-array with default value so that next iteration will assign the correct key
				if ( $single_op ) {
					$operator = '=';
				}

			}
			// remove the last " AND " since there are no more column value pairs
			$WHR = substr( $WHR, 0, -5);
			
		} else {
			// single column value pair 
			$WHR .= $where . $operator . "'" . $em_table_data_types[$column_name] . "'";
			$value_parameters = $value;
		}
		
		$prepped = array();
		$prepped['where'] = $WHR;
		$prepped['value'] = $value_parameters;
		return $prepped;

	}
	









	/**
	 *		This function generates SQL ORDER BY and SORT clauses
	 *		
	 *		@access private
	 *		@param mixed (string, array) - $orderby - 
	 *		@param mixed (string, array) - $sort
	 *		@return string
	 */	
	private function _orderby_n_sort ($orderby=FALSE, $sort=FALSE) {
		if ( $orderby ) {
			$OBS = ' ORDER BY ';
			if ( is_array($orderby) ) {
				foreach ( $orderby as $key => $order ) {
					$OBS .= $order . ' ';
					if ( is_array($sort) ) {
						$OBS .= $sort[$key] . ',';
					} else {
						$OBS .= $sort . ',';
					}
				}
			} else {
				$OBS .= $orderby . ' ' . $sort . ',';
			}
			// delete last comma
			$OBS = substr($OBS, 0, -1);
			return $OBS;
		}
	}
	









	/**
	 *		This function generates a CSV list from an array 
	 *		
	 *		@access protected
	 *		@param array - $array 
	 *		@return string
	 */	
	protected function _array_to_csv ($array=array()) {
	
		global $espresso_notices;

		if ( empty($array)) {
			$espresso_notices['errors'][] = 'The supplied array was empty. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		
		// change array into csv list
		$csv = '';
		foreach ($array as $value) {
			$csv .= $value . ',';
		}

		// delete last comma
		$csv = substr($csv, 0, -1);
		
		return $csv;
		
	}
	




	
	
	
	
	
	
	
	
	
	
	/**
	 *		@ create error code from filepath, function name, 
	 *		@ and line number where exception or error was thrown
	 *		@access protected
	 *		@ param string $file
	 *		@ param string $func
	 *		@ param string $line
	 *		@ return string
	 */	
	protected function _get_error_code (  $file, $func, $line ) {
		
//echo 'file : ' . $file . '<br />';
//echo 'func : ' . $func . '<br />';
//echo 'line : ' . $line . '<br />';

		$error_code = '';
		$code_bits = array( 0 => $file, 1 => $func, 2 => $line );
		
		foreach ( $code_bits as $key => $code_bit ) {
			switch ( $key ) {
			
				case 0:
					// break filepath up by the \ 
					$code_bit = explode ( '\\', $code_bit );
					// filename is the last segment
					$file = $code_bit[ count($code_bit)-1 ];
					// folder is the second to the last segment
					$folder = $code_bit[ count($code_bit)-2 ];
					// remove the mvc- from the folder
					$folder = str_replace ( 'mvc-', '', $folder );
					//change all dashes to underscores
					$folder = str_replace ( '-', '_', $folder );
					// break it up by the _ 
					$folder_bits = explode( '_', $folder);
					$folder = ''; 					
					foreach ( $folder_bits as $folder_bit ) {
						// grab the first 2 characters from each word
						$folder .= substr($folder_bit, 0, 2); 					
					}
					$error_code .= $folder . '-';
					
					// break filename by the dots - to get at the first bit
					$code_bit = explode('.', $file);
					// remove EE_ from the folder name 
					$code_bit = str_replace ( 'EE_', '', $code_bit[0] );
					// remove all non-alpha characters
					$code_bit = preg_replace( '[A-Za-z]', '', $code_bit );
					//change all dashes to underscores
					$file = str_replace ( '-', '_', $code_bit );
					// break it up by the _ 
					$file_bits = explode( '_', $file);
					$file = ''; 					
					foreach ( $file_bits as $file_bit ) {
						// grab the first 2 characters from each word
						$error_code .= substr($file_bit, 0, 2); 					
					}
					$error_code .= '-';
					
				break;
				
				case 1:
					//change all dashes to underscores
					$code_bit = str_replace ( '-', '_', $code_bit );
					// break function name by the underscore if there are any
					$func_bits = explode('_', $code_bit);
					$func = '';
					$x = 0;
					foreach ( $func_bits as $func_bit ) {
						$error_code .= substr($func_bit, 0, 2); 					
					}
					// convert to uppercase
					$error_code = strtoupper( $error_code ) . '-';
				break;
				
				case 2:
					// i can't figure this one out
					$error_code .= $code_bit;
				break;
				
			}
		}
		return '<sup>' . $error_code . '</sup>';
	}

	









	private function display_vars( $method, $vars_array ) {
	
		echo '<h1>Class: '.get_class($this).'</h1>';
		echo '<h2>Method: '.$method.'</h2>';
		echo '<h3>TABLE : ' . self::$table_name . '</h3>';
		
		foreach ( $vars_array as $var => $var_array ) {
			echo '<h4> ' . self::$table_name . ' '.$var.'</h4>';
			echo '<pre>';
			echo print_r($var_array);
			echo '</pre>';
		}
		die();
	}
	
	
	
	/**
	 *		@ override magic methods
	 *		@ return void
	 */	
	public function __get($a) { return FALSE; }
	public function __set($a,$b) { return FALSE; }
	public function __unset($a) { return FALSE; }
	public function __clone() { return FALSE; }
	public function __wakeup() { return FALSE; }	

}
/* End of file Espresso_base.model.php */
/* Location: /ee-mvc/models/Espresso_base.model.php */
?>