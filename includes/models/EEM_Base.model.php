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
abstract class EEM_Base extends EE_Base {

  	// private instance of the Espresso_model object
	//private static $_instance = NULL;

	protected $table_name = FALSE;
	// array representation of a table and the data types for each field
	protected $table_data_types = array();

	protected $singlular_item = 'Item';
	protected $plual_item = 'Items';

	/**
	 *		private constructor to prevent direct creation
	 *		@Constructor
	 *		@access private
	 *		@return void
	 */
	private function __construct() {
	}

	function get_table_data_types() {
		return $this->table_data_types;
	}




	/**
	 *		This function returns multiple rows from a table
	 * 		SELECT * FROM table_name ORDER BY column_name(s) ASC|DESC
	 *
	 *		@access protected
	 *		@param mixed (string, array) - $orderby - cloumn names to be used for sorting
	 *		@param mixed (string, array) - $sort - ASC or DESC
	 *		@param array $limit send along limit offset for paging purposes
	 *		@param string - $output - WP output types - OBJECT, OBJECT_K, ARRAY_A, ARRAY_N, COUNT ( = count of rows)
	 *		@return mixed (object, array)
	 */
	protected function select_all ( $orderby=FALSE, $sort=FALSE, $limit = FALSE, $output='OBJECT_K' ) {

		$results = $this->_select_all ( $this->table_name, $orderby, $sort, $limit, $output );
		return $results;
	}





	/**
	 *		This function returns multiple rows from a table
	 * 		SELECT * FROM table_name WHERE column_name operator value ORDER BY column_name(s) ASC|DESC
	 *
	 *		@access protected
	 *		@param mixed (string, array) 		$where_cols_n_values - array of key => value pairings with the db cloumn name as the key, to be used for WHERE clause
	 *		@param mixed (string, array)		$orderby - cloumn names to be used for sorting
	 *		@param string								$sort - ASC or DESC
	 *		@param array $limit send along limit offset for paging purposes
	 *		@param mixed (string, array)		$operator -  operator to be used for WHERE clause  > = <
	 *		@param string								$output - WP output types && count - OBJECT, OBJECT_K, ARRAY_A, ARRAY_N, COUNT (=count of rows);
	 *		@return mixed (object, array)
	 */
	protected function select_all_where ( $where_cols_n_values=FALSE, $orderby = FALSE, $sort = 'ASC', $operator = '=', $limit = FALSE, $output = 'OBJECT_K' ) {
		$results = $this->_select_all_where ( $this->table_name, $this->table_data_types, $where_cols_n_values, $orderby, $sort, $operator, $limit, $output );
		return $results;
	}
	
	/**
	 *		Function for running a join query
	 *		@param string $joinStatement eg "tablex innner join tably on tablex.x=tabley.y"
	 *		@param mixed (string, array) 		$where_cols_n_values - array of key => value pairings with the db cloumn name as the key, to be used for WHERE clause
	 *		@param mixed (string, array)		$orderby - cloumn names to be used for sorting
	 *		@param string								$sort - ASC or DESC
	 *		@param array $limit send along limit offset for paging purposes
	 *		@param mixed (string, array)		$operator -  operator to be used for WHERE clause  > = <
	 *		@param string								$output - WP output types && count - OBJECT, OBJECT_K, ARRAY_A, ARRAY_N, COUNT (=count of rows);
	 *		@return mixed (object, array)
	 * @return type
	 */
	protected function select_all_join_where($joinStatement,$where_cols_n_values=FALSE,$orderby=FALSE,$sort='ASC',$operator='=',$limit=FALSE,$output='OBJECT_K'){
		return $this->_select_all_where($joinStatement, $this->table_data_types, $where_cols_n_values, $orderby, $sort, $operator, $limit, $output);
	}





	/**
	 *		This function returns one row from from a table
	 * 		SELECT * FROM table_name WHERE column_name operator value
	 *
	 *		@access protected
	 *		@param mixed (string, array) 		$where_cols_n_values - array of key => value pairings with the db cloumn name as the key, to be used for WHERE clause
	 *		@param mixed (string, array) 		$operator -  operator to be used for WHERE clause  > = <
	 *		@param string 								$output - WP output types - OBJECT,  ARRAY_A, ARRAY_N
	 *		@return mixed (object, array)
	 */
	protected function select_row_where ( $where_cols_n_values=FALSE, $operator = '=', $output = 'OBJECT' ) {
		$results = $this->_select_row_where ( $this->table_name, $this->table_data_types, $where_cols_n_values, $operator, $output );
		return $results;
	}





	/**
	 *		This function returns one value from from a table
	 * 		SELECT column_name(s) FROM table_name WHERE column_name = value
	 *
	 *		@access protected
	 *		@param string - $select - column name to be used for SELECT clause
	 *		@param mixed (string, array) 		$where_cols_n_values - array of key => value pairings with the db cloumn name as the key, to be used for WHERE clause
	 *		@param mixed (string, array)		$operator -  operator to be used for WHERE clause  > = <
	 *		@return mixed (object, array)
	 */
	protected function select_value_where ( $select=FALSE, $where_cols_n_values=FALSE, $operator = '=' ) {
		$results = $this->_select_value_where ( $this->table_name, $this->table_data_types, $select, $where_cols_n_values, $operator );
		return $results;
	}





	/**
	 *		This function returns an array of key => value pairs from from a table
	 * 		SELECT * FROM table_name ORDER BY column_name(s) ASC|DESC
	 *
	 *		@access protected
	 *		@param string - $key - column name to be used as the key for the returned array
	 *		@param string - $value - column name to be used as the value for the returned array
	 *		@param mixed (string, array) - $orderby - cloumn names to be used for sorting
	 *		@param string - $sort - ASC or DESC
	 *		@return array - key => value
	 */
	protected function get_key_value_array ( $key=FALSE, $value=FALSE, $orderby = FALSE, $sort = 'ASC', $output = 'ARRAY_A' ) {
		$results = $this->_get_key_value_array ( $this->table_name, $this->table_data_types, $key, $value, $orderby, $sort, $output );
		return $results;
	}





	/**
	 *		This function returns an array of key => value pairs from from a table
	 * 		SELECT * FROM table_name WHERE column_name operator value ORDER BY column_name(s) ASC|DESC
	 *
	 *		@access protected
	 *		@param string 								$key - column name to be used as the key for the returned array
	 *		@param string 								$value - column name to be used as the value for the returned array
	 *		@param mixed (string, array) 		$where_cols_n_values - array of key => value pairings with the db cloumn name as the key, to be used for WHERE clause
	 *		@param mixed (string, array) 		$orderby - cloumn names to be used for sorting
	 *		@param string								$sort - ASC or DESC
	 *		@param mixed (string, array) 		$operator -  operator to be used for WHERE clause  > = <
	 *		@return array - key => value
	 */
	protected function get_key_value_array_where( $key=FALSE, $value=FALSE, $where_cols_n_values=FALSE, $orderby=FALSE, $sort='ASC', $operator='=' ) {
		$results = $this->_get_key_value_array_where ( $this->table_name, $this->table_data_types, $key, $value, $where_cols_n_values, $orderby, $sort, $operator );
		return $results;
	}




	abstract function insert ($set_column_values);
	abstract function update ($set_column_values, $where_cols_n_values);




	/**
	 *		This function will delete a row from a table
	 *
	 *		@access protected
	 *		@param string - $table_name -
	 *		@param array - $em_table_data_types
	 *		@param mixed (string, array) - $where_cols_n_values - cloumn names to be used for WHERE clause
	 *		@param mixed (string, array) - $operator -  operator to be used for WHERE clause  > = <
	 *		@return mixed (object, array)
	 */
	public function delete ( $where_cols_n_values=FALSE, $operator = '=' ) {
		// grab data types from above and pass everything to _delete to perform the update
		$results = $this->_delete ( $this->table_name, $this->table_data_types, $where_cols_n_values, $operator );
		return $results;
	}








	/**
	 *		This function returns multiple rows from a table
	 * 		ie: SELECT * FROM table_name ORDER BY column_name(s) ASC|DESC
	 *
	 *		@access private
	 *		@param string - $em_table_name -
	 *		@param mixed (string, array) - $orderby - cloumn names to be used for sorting
	 *		@param string - $sort - ASC or DESC
	 *		@param array $limit send along limit offset for paging purposes
	 *		@param string - $output - WP output types - OBJECT, OBJECT_K, ARRAY_A, ARRAY_N, COUNT ( - count of rows )
	 *		@return mixed (object, array)
	 */
	private function _select_all (  $em_table_name=FALSE, $orderby = FALSE, $sort = 'ASC', $limit = FALSE, $output = 'OBJECT_K' )	{

		// what?? no table name ??? Get outta here!!!
		if ( ! $em_table_name ) {
			$msg = __( 'No table has been specified.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}

		$SQL = $output == 'COUNT' ? 'SELECT COUNT(*) FROM ' : 'SELECT * FROM ';
		$SQL .= $em_table_name;

		if ( $orderby && $output != 'COUNT' ) {
			$SQL .= $this->_orderby_n_sort ($orderby, $sort);
		}

		if ( $limit && is_array($limit) && $output != 'COUNT' ) {
			$SQL .=	' LIMIT ' . $limit[0] . ',' . $limit[1];
		}

		global $wpdb;
		$results = $output == 'COUNT' ? $wpdb->get_var( $SQL ) : $wpdb->get_results( $SQL, $output );
		return $results;
	}










	/**
	 *		This function returns multiple rows from a table
	 * 		ie: SELECT * FROM table_name WHERE column_name operator value ORDER BY column_name(s) ASC|DESC
	 *
	 *		@access private
	 *		@param string - $em_table_name -
	 *		@param array - $em_table_data_types
	 *		@param mixed (string, array) - $where_cols_n_values - array of key => value pairings with the db cloumn name as the key, to be used for WHERE clause
	 *		@param mixed (string, array) - $orderby - cloumn names to be used for sorting
	 *		@param string - $sort - ASC or DESC
	 *		@param mixed (string, array) - $operator -  operator to be used for WHERE clause  > = <
	 *		@param array $limit send along limit offset for paging purposes
	 *		@param string - $output - WP output types - OBJECT, OBJECT_K, ARRAY_A, ARRAY_N, COUNT = count of rows
	 *		@return mixed (object, array)
	 */
	private function _select_all_where ( $em_table_name=FALSE, $em_table_data_types=array(), $where_cols_n_values=FALSE, $orderby = FALSE, $sort = 'ASC', $operator = '=', $limit = FALSE, $output = 'OBJECT_K' ) {
	
		// what?? no table name ??? Get outta here!!!
		if ( ! $em_table_name ) {
			$msg = __( 'No table has been specified.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}


		$SQL = $output == 'COUNT' ? 'SELECT COUNT(*) FROM ' : 'SELECT * FROM ';
		$SQL .= $em_table_name;

		if ( $where_cols_n_values ) {
			$prepped = $this->_prepare_where ($where_cols_n_values, $em_table_data_types, $operator);
			$SQL .= $prepped['where'];
			$VAL = $prepped['value'];
		} else {
			$VAL = '';
		}

		if ( $orderby && $output != 'COUNT' ) {
			$SQL .= $this->_orderby_n_sort ($orderby, $sort);
		}

		if ( $limit && is_array($limit) && $output != 'COUNT' ) {
			$SQL .=	' LIMIT ' . $limit[0] . ',' . $limit[1];
		}
		
		global $wpdb;
		$wpdb->show_errors();
		echo "QUERY:".$wpdb->prepare( $SQL, $VAL );
		$results = $output == 'COUNT' ? $wpdb->get_var( $wpdb->prepare( $SQL, $VAL ) ) : $wpdb->get_results( $wpdb->prepare( $SQL, $VAL ), $output );
		//VAR_DUMP($results);
		return $results;
	}










	/**
	 *		This function returns one row from from a table
	 * 		ie: SELECT * FROM table_name WHERE column_name operator value
	 *
	 *		@access private
	 *		@param string - $em_table_name -
	 *		@param array - $em_table_data_types
	 *		@param mixed (string, array) - $where_cols_n_values - array of key => value pairings with the db cloumn name as the key, to be used for WHERE clause
	 *		@param mixed (string, array) - $operator -  operator to be used for WHERE clause  > = <
	 *		@param string - $output - WP output types - OBJECT, OBJECT_K, ARRAY_A, ARRAY_N
	 *		@return mixed (object, array)
	 */
	private function _select_row_where ( $em_table_name=FALSE, $em_table_data_types=array(), $where_cols_n_values=FALSE, $operator = '=', $output = 'OBJECT_K' ) {

		// what?? no table name ??? Get outta here!!!
		if ( ! $em_table_name ) {
			$msg = __( 'No table has been specified.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}

		$SQL = 'SELECT * FROM '.$em_table_name;

		if ( $where_cols_n_values ) {
			$prepped = $this->_prepare_where ($where_cols_n_values, $em_table_data_types, $operator);
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
	 *		@access private
	 *		@param string - $em_table_name -
	 *		@param array - $em_table_data_types
	 *		@param mixed (string, array) - $select - column name to be used for SELECT clause
	 *		@param mixed (string, array) - $where_cols_n_values - array of key => value pairings with the db cloumn name as the key, to be used for WHERE clause
	 *		@param mixed (string, array) - $operator -  operator to be used for WHERE clause  > = <
	 *		@return mixed (object, array)
	 */
	private function _select_value_where ( $em_table_name=FALSE, $em_table_data_types=array(), $select=FALSE, $where_cols_n_values=FALSE, $operator = '=' ) {

		// what?? no table name ??? Get outta here!!!
		if ( ! $em_table_name ) {
			$msg = __( 'No table has been specified.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}

		// ya gotta let us know what you want!!!
		if ( ! $select ) {
			$msg = __( 'No column name has been specified for the SELECT clause.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
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

		if ( $where_cols_n_values ) {
			$prepped = $this->_prepare_where ($where_cols_n_values, $em_table_data_types, $operator);
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
	 *		@access private
	 *		@param string - $em_table_name -
	 *		@param array - $em_table_data_types
	 *		@param string - $key - column name to be used as the key for the returned array
	 *		@param string - $value - column name to be used as the value for the returned array
	 *		@param mixed (string, array) - $operator -  operator to be used for WHERE clause  > = <
	 *		@return array - key => value
	 */
	private function _get_key_value_array ( $em_table_name=FALSE, $em_table_data_types=array(), $key=FALSE, $value=FALSE, $orderby = FALSE, $sort = 'ASC', $output = 'OBJECT_K' ) {

		// what?? no table name ??? Get outta here!!!
		if ( ! $em_table_name ) {
			$msg = __( 'No table has been specified.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}

		// ya gotta let us know what you want!!!
		if ( ! $key or ! $value ) {
			$msg = __( 'Column names for both the "key" and "value" need to be provided.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
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
	 *		@access private
	 *		@param string - $em_table_name -
	 *		@param array - $em_table_data_types
	 *		@param string - $key - column name to be used as the key for the returned array
	 *		@param string - $value - column name to be used as the value for the returned array
	 *		@param mixed (string, array) - $where_cols_n_values - array of key => value pairings with the db cloumn name as the key, to be used for WHERE clause
	 *		@param mixed (string, array) - $operator -  operator to be used for WHERE clause  > = <
	 *		@return array - key => value
	 */
	private function _get_key_value_array_where( $em_table_name=FALSE, $em_table_data_types=array(), $key=FALSE, $value=FALSE, $where_cols_n_values=FALSE, $orderby = FALSE, $sort = 'ASC', $operator = '=', $output = 'OBJECT_K' ) {

		// what?? no table name ??? Get outta here!!!
		if ( ! $em_table_name ) {
			$msg = __( 'No table has been specified.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}

		// ya gotta let us know what you want!!!
		if ( ! $key or ! $value ) {
			$msg = __( 'Column names for both the "key" and "value" need to be provided.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}

		$SQL = 'SELECT '.$key.', '.$value.' FROM '.$em_table_name;

		if ( $where_cols_n_values ) {
			$prepped = $this->_prepare_where ($where_cols_n_values, $em_table_data_types, $operator);
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
	 *		@access private
	 *		@param string $em_table_name
	 *		@param array $set_cols_n_values - array of column names and values for the SQL INSERT
	 *		@param array $em_table_data_types - ALL of the columns in the table and their corresponding data types
	 *		@return array
	 */
	protected function _insert( $em_table_name=FALSE, $em_table_data_types=array(), $set_cols_n_values=array() ) {

		// if any of the supplied data is empty or missing - send them back with an error
		if ( ! $em_table_name or empty($em_table_data_types) or empty($set_cols_n_values) ) {
			$msg = __( 'The insert can not be performed because of missing data.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}

		// if any of the supplied data arrays are not arrays - send them back with an error
		if ( ! is_array($em_table_data_types) or ! is_array($set_cols_n_values) ) {
			$msg = __( 'The insert can not be performed because the supplied data is of the wrong type.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
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
				$msg = sprintf( __( 'The table column %s does not exist.', 'event_espresso' ), $column );
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
				return FALSE;
			}
		}

		//echo printr( $em_updata, $em_table_name );

		global $wpdb;
		// use $wpdb->insert because it automagically escapes and sanitizes data for us
		$row_results = $wpdb->insert( $em_table_name, $em_updata, $em_upformat);
		
		$update_results['new-ID'] = array();
//		echo $wpdb->last_query;

		// set generic success / error mesasges
		if ( $row_results == 1 ) {
			// one row was successfully updated
			$msg = sprintf( __( '%s  details have been successfully saved to the database.', 'event_espresso' ), $this->singlular_item );
			EE_Error::add_success( $msg, __FILE__, __FUNCTION__, __LINE__ );
			$update_results['new-ID'] = $wpdb->insert_id;
		}
		elseif ( $row_results > 1 ) {
			// multiple rows were successfully updated
			$msg = sprintf( __( 'Details for %d %s have been successfully saved to the database.', 'event_espresso' ), $results, $this->plual_item );
			EE_Error::add_success( $msg, __FILE__, __FUNCTION__, __LINE__ );
			$update_results = TRUE;
		} else {
			// no result means an error occured
			$msg = sprintf( __( 'An error occured and the %s has not been saved to the database.', 'event_espresso' ), $this->singlular_item );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			$update_results = FALSE;
		}

		return $update_results;

	}










	/**
	 *		This function updates tables using $wpdb->update
	 *
	 *		@access private
	 *		@param string 	$em_table_name
	 *		@param array 	$em_table_data_types  	ALL of the columns in the table and their corresponding data types
	 *		@param array 	$set_cols_n_values 		array of column names and values for the SQL SET clause
	 *		@param array 	$where_cols_n_values 	column names and values for the SQL WHERE clause
	 *		@return array
	 */
	protected function _update( $em_table_name=FALSE, $em_table_data_types=array(), $set_cols_n_values=array(), $where_cols_n_values=array() ) {

		//$this->display_vars( __FUNCTION__, array( 'em_table_data_types' => $em_table_data_types, '$set_cols_n_values' => $set_cols_n_values, '$where_cols_n_values' => $where_cols_n_values ) );

		// if any of the supplied data is empty or missing - send them back with an error
		if ( ! $em_table_name or empty($em_table_data_types) or empty($set_cols_n_values) or empty($where_cols_n_values) ) {
			$msg = __( 'The update can not be performed because of missing data.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}

		// if any of the supplied data arrays are not arrays - send them back with an error
		if ( ! is_array($em_table_data_types) or ! is_array($set_cols_n_values) or ! is_array($where_cols_n_values) ) {
			$msg = __( 'The update can not be performed because the supplied data is of the wrong type.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
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
				$msg = sprintf( __( 'The table column %s does not exist.', 'event_espresso' ), $column );
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
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
				$msg = sprintf( __( 'The table column %s used in the WHERE clause, does not exist.', 'event_espresso' ), $column );
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
				return FALSE;
			}
		}

		global $wpdb;
		//printr($em_updata, 'updata');
		//printr($em_upformat, 'upformat');
		// use $wpdb->update because it automagically escapes and sanitizes data for us

		$row_results = $wpdb->update( $em_table_name, $em_updata, $em_where, $em_upformat, $em_where_format);

		// set generic success / error mesasges
		if ( $row_results === 1 ) {
			// multiple rows were successfully updated
			$msg = sprintf( __( '%s details have been successfully updated.', 'event_espresso' ), $this->singlular_item );
			EE_Error::add_success( $msg, __FILE__, __FUNCTION__, __LINE__ );
			
		} elseif ( $row_results > 1 ) {
			// one row was successfully updated
			$msg = sprintf( __( 'Details for %d %s have been successfully updated.', 'event_espresso' ), $results, $this->plual_item );
			EE_Error::add_success( $msg, __FILE__, __FUNCTION__, __LINE__ );
			
		} elseif ( $row_results === 0 ) {
			// zero rows updated means that the data was identical to the existing record so no update occured
			//changing this to return 1 becuz returning zero appears as an error, but no notifications will be shown
			$row_results = 1;

		} else {
			// an actual error occured!
			// so let's capture that from WP via the output buffer *cough*hack*cough* since $wpdb can't return those errors as a string
			ob_start();
			$wpdb->print_error();
			$db_error = ob_get_clean();			
			
			$db_error = str_replace( "<div id='error'>
			<p class='wpdberror'><strong>WordPress database error:</strong> [", '', $db_error );
			
			$db_error = str_replace( "</code></p>
			</div>", '', $db_error );
			
			$db_error = explode( ']<br />
			<code>', $db_error );	
			
			$error = $db_error[0];	
			
			$msg = __( 'The following error occured and the record was not updated : ', 'event_espresso' ) . "\n" . $error;;
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
				
		}

		return $row_results;

	}









	/**
	 *		This function will delete a row from a table
	 *
	 *		@access private --set to protected whiel EEM_TempBase is seperate from EEM_Base
	 *		@param string - $em_table_name -
	 *		@param array - $em_table_data_types
	 *		@param mixed (string, array) - $where_cols_n_values - array of key => value pairings with the db cloumn name as the key, to be used for WHERE clause
	 *		@param mixed (string, array) - $operator -  operator to be used for WHERE clause  > = <
	 *		@return mixed (object, array)
	 */
	protected function _delete ( $em_table_name=FALSE, $em_table_data_types=array(), $where_cols_n_values=FALSE, $operator = '=' ) {

		// what?? no table name ??? Get outta here!!!
		if ( ! $em_table_name ) {
			$msg = __( 'No table has been specified.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}

		$SQL = 'DELETE FROM '.$em_table_name;

		if ( $where_cols_n_values ) {
			$prepped = $this->_prepare_where ($where_cols_n_values, $em_table_data_types, $operator);
			$SQL .= $prepped['where'];
			$VAL = $prepped['value'];
		} else {
			$msg = __( 'At least one column name and value has to be specified in order to delete data.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}

		global $wpdb;
		$results = $wpdb->query( $wpdb->prepare( $SQL, $VAL ));
		return $results;
		
	}












	/**
	 *		This function generates SQL WHERE clauses
	 *
	 *		@access protected
	 *		@param mixed (string, array) - $where_cols_n_values
	 *		@param mixed (string, array) - $value
	 *		@param array - $em_table_data_types
	 *		@param mixed (string, array) - $operator
	 *		@return array
	 */
	protected function _prepare_where ( $where_cols_n_values=FALSE, $em_table_data_types=FALSE, $operator = '=' ) {

//		echo printr( $where_cols_n_values, '$where_cols_n_values' );
//		echo printr( $em_table_data_types, '$em_table_data_types' );

		// what??? no WHERE clause??? get outta here!!
		if ( ! $where_cols_n_values ) {
			$msg = __( 'No coulmn name was provided for the WHERE clause.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}

		// what??? no table data types??? get outta here!!
		if ( ! $em_table_data_types ) {
			$msg = __( 'The table data types array is missing.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}

		// in my book, any good WHERE clause should start with the word "WHERE"
		$WHR = ' WHERE ';
		$value_parameters = array();

		$single_op = ! is_array($operator) ? TRUE : FALSE;

		foreach ( $where_cols_n_values as $column_name => $value ) {

			// change non array operator to array with the correct key
			if ( $single_op ) {
				$operator = array( $column_name => $operator );
			}
			// build this segment of the WHERE clause
			$WHR .= $column_name . ' ' . $operator[$column_name] .  $em_table_data_types[$column_name] ;
			$value_parameters[ $column_name ] = $value;

			// add the AND before adding the next segment of the WHERE clause
			$WHR .= ' AND ';
			// convert single operator back to non-array with default value so that next iteration will assign the correct key
			if ( $single_op ) {
				$operator = '=';
			}

		}
		// remove the last " AND " since there are no more column value pairs
		$WHR = substr( $WHR, 0, -5);


		$prepped = array();
		$prepped['where'] = $WHR;
		$prepped['value'] = $value_parameters;
		return $prepped;

	}










	/**
	 *		This function generates SQL ORDER BY and SORT clauses
	 *
	 *		@access protected
	 *		@param mixed (string, array) - $orderby -
	 *		@param mixed (string, array) - $sort
	 *		@return string
	 */
	protected function _orderby_n_sort ($orderby=FALSE, $sort='=') {
		if ( $orderby ) {
			$OBS = ' ORDER BY ';
			if ( is_array($orderby) ) {
				foreach ( $orderby as $key => $order ) {
					$OBS .= ' ' . $order . ' ';
					$OBS .=  is_array($sort) ? $sort[$key] . ',' : $sort . ',';
				}
				// delete last comma
				$OBS = substr($OBS, 0, -1);
			} else {
				$OBS .= $orderby . ' ' . $sort;
			}
			return $OBS;
		}
	}




}
/* End of file EEM_Base.model.php */
/* Location: /includes/models/EEM_Base.model.php */
