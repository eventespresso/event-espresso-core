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



						
	/**
	 *		private constructor to prevent direct creation
	 *		@Constructor
	 *		@access private
	 *		@return void
	 */	
	private function __construct() {	
		global $wpdb;
		// set table name
		$this->table_name = $wpdb->prefix . 'esp_registration';
		// array representation of the transaction table and the data types for each field 
		$this->table_data_types = array (	
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
	
		// uncomment these for example code samples of how to use them
		//			$this->how_to_use_insert();
		//			$this->how_to_use_update();
	}

	/**
	 *		This funtion is a singleton method used to instantiate the Espresso_model object
	 *
	 *		@access public
	 *		@return EEM_Registration instance
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

		// load Registration object class file
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Registration.class.php');

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
	public function get_registration( $where_cols_n_values = array() ) {
		// retreive a particular registration
		if ( $registration = $this->select_row_where ( $where_cols_n_values )) {
			return $this->_create_objects( array( $registration ));
		} else {
			return FALSE;
		}
	}






	/**
	*		Search for an existing registration record in the DB using SQL LIKE clause - so go ahead - get wildcards !
	* 		@access		public
	*/	
	public function find_existing_registrations_LIKE( $REG_code = FALSE ) {

		// no search params means registration object already exists
		if ( ! $REG_code ) {
			$REG_code = $this->_REG_code;  	 
		}
		
		global $wpdb;		
		// we're using LIKE with wildcards so that partial REG_codes can be used
		$SQL = 'SELECT * FROM ' . $this->table_name . ' WHERE REG_code LIKE "'.$REG_code.'" ORDER BY TXN_ID';
	
		if ( $registrations = $wpdb->get_results( $SQL )) {	
			// if there's more than one, then we'll just grab the last one 
			if ( is_array( $registrations )) {
				$registrations = array_pop( $registrations );
			}
			$registration = $this->_create_objects( array( $registrations ));
			return array_shift( $registration );
			
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
	
		// set some table specific success messages
		if ( $results['rows'] == 1 ) {
			// one row was successfully updated
			$espresso_notices['success'][] = 'Registration details have been successfully saved to the database.';
		} elseif ( $results['rows'] > 1 ) {
			// multiple rows were successfully updated
			$espresso_notices['success'][] = 'Details for '.$results.' registrations have been successfully saved to the database.';
		} else {
			// error message 
			$espresso_notices['errors'][] = 'An error occured and the registration has not been saved to the database. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
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
		$results = $this->_update( $this->table_name, $this->table_data_types, $set_column_values, $where_cols_n_values );
	
		// set some table specific success messages
		if ( $results['rows'] == 1 ) {
			// one row was successfully updated
			$espresso_notices['success'][] = 'Registration details have been successfully updated.';
		} elseif ( $results['rows'] > 1 ) {
			// multiple rows were successfully updated
			$espresso_notices['success'][] = 'Details for '.$results.' registrations have been successfully updated.';
		} else {
			// error message 
			$espresso_notices['errors'][] = 'An error occured and the registration has not been updated. ' . $this->_get_error_code (  __FILE__, __FUNCTION__, __LINE__ );
		}
	
		return $results['rows'];
	
	}



}
// End of file EEM_Registration.model.php
// Location: /includes/models/EEM_Registration.model.php