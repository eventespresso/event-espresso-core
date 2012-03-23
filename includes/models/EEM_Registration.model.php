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
 * Registration Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EEM_Registration extends EEM_Base {

  	// private instance of the Registration object
	private static $_instance = NULL;
		
	protected $table_name = '';
	
	// holder for the parent class espresso_model
	private $EEDB = NULL;
	

	
	// array representation of the transaction table and the data types for each field 
	protected $table_data_types = array (	
			'REG_ID' 						=> '%d',
			'EVT_ID' 						=> '%d',
			'ATT_ID' 						=> '%d',
			'TXN_ID' 						=> '%d',
			'REG_session' 				=> '%s',
			'REG_code'					=> '%s',
			'REG_is_primary' 		=> '%d',
			'REG_is_group_reg' 	=> '%d',
			'STS_ID' 						=> '%s',
			'REG_date' 					=> '%d',
			'PRC_ID' 						=> '%d',
			'REG_att_is_going' 		=> '%d',
			'REG_att_checked_in' => '%d',
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
		$this->table_name = $wpdb->prefix . 'esp_registration';
		// load Transaction object class file
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Registration.class.php');
	
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
	private function _create_objects( $registrations = FALSE ) {

		if ( ! $registrations ) {
			return FALSE;
		} 		

		foreach ( $registrations as $reg ) {
				$array_of_objects[ $reg->REG_ID ] = new EE_Registration(
						$reg->EVT_ID, 
						$reg->ATT_ID, 
						$reg->TXN_ID, 
						$reg->REG_session, 
						$reg->REG_code,
						$reg->REG_is_primary,
						$reg->REG_is_group_reg, 
						$reg->STS_ID,
						$reg->REG_date,
						$reg->PRC_ID,
						$reg->REG_att_is_going,
						$reg->REG_att_checked_in,
						$reg->REG_ID
				 	);

		}	
		return $array_of_objects;	

	}




	/**
	*		retreive ALL registrations from db
	* 
	* 		@access		public
	* 		@param		array		$where_cols_n_values
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	public function get_all_registrations( $where_cols_n_values = array() ) {
	
		$orderby = 'REG_date';
		// retreive all transactions
		if ( ! empty ( $where_cols_n_values )) {
			$registrations = $this->select_all_where ( $where_cols_n_values ); 
		} else {
			$registrations = $this->select_all ( $orderby );
		}
		
		if ( $registrations ) {
			return $this->_create_objects( $registrations );
		} else {
			return FALSE;
		}		
		
	}




	/**
	*		retreive a single registration from db
	* 
	* 		@access		public
	* 		@param		$REG_ID		
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	public function get_registration( $REG_ID = FALSE ) {

		if ( ! $REG_ID ) {
			return FALSE;
		}
		// retreive a particular registration
		$where_cols_n_values = array( 'REG_ID' => $REG_ID );
		if ( $registration = $this->select_row_where ( $where_cols_n_values )) {
			return $this->_create_objects( array( $registration ));
		} else {
			return FALSE;
		}

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
	public function select_all_where ( $where_cols_n_values=FALSE, $orderby = FALSE, $sort = 'ASC', $operator = '=', $output = 'OBJECT_K' ) {
		$results = $this->EEDB->_select_all_where ( $this->table_name, $this->table_data_types, $where_cols_n_values, $orderby, $sort, $operator, $output );
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
	public function select_row_where ( $where_cols_n_values=FALSE, $operator = '=', $output = 'OBJECT' ) {
		$results = $this->EEDB->_select_row_where ( $this->table_name, $this->table_data_types, $where_cols_n_values, $operator, $output );
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
	public function select_value_where ( $select=FALSE, $where_cols_n_values=FALSE, $operator = '=' ) {
		$results = $this->EEDB->_select_value_where ( $this->table_name, $this->table_data_types, $select, $where_cols_n_values, $operator );
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
	public function get_key_value_array_where( $key=FALSE, $value=FALSE, $where_cols_n_values=FALSE, $orderby=FALSE, $sort='ASC', $operator='=' ) {
		$results = $this->EEDB->_get_key_value_array_where ( $this->table_name, $this->table_data_types, $key, $value, $where_cols_n_values, $orderby, $sort, $operator );
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
	 *		@param array $where_cols_n_values - column names and values for the SQL WHERE clause
	 *		@return array
	 */	
	public function update ($set_column_values, $where_cols_n_values) {
	
		//$this->display_vars( __FUNCTION__, array( 'set_column_values' => $set_column_values, 'where' => $where ) );
			
		global $espresso_notices;

		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		$results = $this->EEDB->_update( $this->table_name, $this->table_data_types, $set_column_values, $where_cols_n_values );
	
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
	 *		@param mixed (string, array) - $where_cols_n_values - cloumn names to be used for WHERE clause 
	 *		@param mixed (string, array) - $operator -  operator to be used for WHERE clause  > = < 
	 *		@return mixed (object, array)
	 */	
	protected function eedb_delete ( $where_cols_n_values=FALSE, $operator = '=' ) {
		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		$results = $this->EEDB->_update( $this->table_name, $this->table_data_types, $where_cols_n_values, $operator );
		return $results;
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



}
// End of file EEM_Registration.model.php
// Location: /includes/models/EEM_Registration.model.php