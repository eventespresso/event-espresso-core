<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

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
 * @ version		 	3.2
 *
 * ------------------------------------------------------------------------
 *
 * Price Type Model
 *
 * @package				Event Espresso
 * @subpackage		includes/models/
 * @author				Sidney Harrell
 *
 * ------------------------------------------------------------------------
 */
require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Base.model.php' );
class EEM_Price_Type extends EEM_Base {

	// private instance of the Price Type object
	private static $_instance = NULL;

	// An array of the price type objects
	public $type = NULL;

	/**
	 * 		private constructor to prevent direct creation
	 * 		@Constructor
	 * 		@access private
	 * 		@return void
	 */
	private function __construct() {
		global $wpdb;
		// set table name
		$this->table_name = $wpdb->prefix . 'esp_price_type';
		// array representation of the price type table and the data types for each field
		$this->table_data_types = array(
				'PRT_ID' => '%d',
				'PRT_name' => '%s',
				'PRT_is_tax' => '%d',
				'PRT_is_percent' => '%d',
				'PRT_is_global' => '%d',
				'PRT_order' => '%d');
		// load Price_Type object class file
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Price_Type.class.php');

		$this->type = $this->get_all_price_types();


		// uncomment these for example code samples of how to use them
		//			self::how_to_use_insert();
		//			self::how_to_use_update();
	}

	/**
	 * 		This funtion is a singleton method used to instantiate the EEM_Attendee object
	 *
	 * 		@access public
	 * 		@return EEM_Price_Type instance
	 */
	public static function instance() {

		// check if instance of EEM_Price_Type already exists
		if (self::$_instance === NULL) {
			// instantiate Price_Type model
			self::$_instance = &new self();
		}
		// EEM_Price_Type object
		return self::$_instance;
	}

	/**
	 * 		cycle though array of price types and create objects out of each item
	 *
	 * 		@access		private
	 * 		@param		array		$price_types
	 * 		@return 	mixed		array on success, FALSE on fail
	 */
	private function _create_objects($price_types = FALSE) {

		if (!$price_types) {
			return FALSE;
		}

		foreach ($price_types as $price_type) {
			$array_of_objects[$price_type->PRT_ID] = new EE_Price_Type(
							$price_type->PRT_name,
							$price_type->PRT_is_tax,
							$price_type->PRT_is_percent,
							$price_type->PRT_is_global,
							$price_type->PRT_order,
							$price_type->PRT_ID
			);
		}
		return $array_of_objects;
	}

	/**
	 * 		retreive  ALL price types from db
	 *
	 * 		@access		public
	 * 		@return		mixed		array on success, FALSE on fail
	 */
	public function get_all_price_types() {

		$orderby = 'PRT_order';
		// retreive all price types
		if ($price_types = $this->select_all($orderby)) {
			return $this->_create_objects($price_types);
		} else {
			return FALSE;
		}
	}

	/**
	 * 		retreive  a single price type from db via it's ID
	 *
	 * 		@access		public
	 * 		@param		$PRT_ID
	 *		@return		mixed		array on success, FALSE on fail
	 */
	public function get_price_type_by_ID($PRT_ID = FALSE) {

		if (!$PRT_ID) {
			return FALSE;
		}
		// retreive a particular price
		$where_cols_n_values = array('PRT_ID' => $PRC_ID);
		if ($price_type = $this->select_row_where($where_cols_n_values)) {
			$price_type_array = $this->_create_objects(array($price_type));
			return array_shift($price_type_array);
		} else {
			return FALSE;
		}
	}

	/**
	*		retreive a single price type from db via it's column values
	*
	* 	@access		public
	* 	@param		array
	*		@return 	mixed		array on success, FALSE on fail
	*/
	public function get_price_type( $where_cols_n_values = FALSE ) {

		if ( ! $where_cols_n_values ) {
			return FALSE;
		}

		if ( $price_type = $this->select_row_where ( $where_cols_n_values )) {
			$price_type_array = $this->_create_objects( array( $price_type ));
			return array_shift( $price_type_array );
		} else {
			return FALSE;
		}

	}

	/**
	 * 		This function inserts table data
	 *
	 * 		@access public
	 * 		@param array $set_column_values - array of column names and values for the SQL INSERT
	 * 		@return array
	 */
	public function insert($set_column_values) {

		//$this->display_vars( __FUNCTION__, array( 'set_column_values' => $set_column_values ) );

		global $espresso_notices;

		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		$results = $this->_insert($this->table_name, $this->table_data_types, $set_column_values);

		// set some table specific success messages
		if ($results['rows'] == 1) {
			// one row was successfully updated
			$espresso_notices['success'][] = 'Price Type details have been successfully saved to the database.';
		} elseif ($results['rows'] > 1) {
			// multiple rows were successfully updated
			$espresso_notices['success'][] = 'Details for ' . $results . ' price types have been successfully saved to the database.';
		} else {
			// error message
			$espresso_notices['errors'][] = 'An error occured and the price type has not been saved to the database. ' . $this->_get_error_code(__FILE__, __FUNCTION__, __LINE__);
		}

		$rows_n_ID = array('rows' => $results['rows'], 'new-ID' => $results['new-ID']);
		return $rows_n_ID;
	}

	/**
	 * 		This function updates table data
	 *
	 * 		@access public
	 * 		@param array $set_column_values - array of column names and values for the SQL SET clause
	 * 		@param array $where_cols_n_values - column names and values for the SQL WHERE clause
	 * 		@return array
	 */
	public function update($set_column_values, $where_cols_n_values) {

		//$this->display_vars( __FUNCTION__, array( 'set_column_values' => $set_column_values, 'where' => $where ) );

		global $espresso_notices;

		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		$results = $this->_update($this->table_name, $this->table_data_types, $set_column_values, $where_cols_n_values);

		// set some table specific success messages
		if ($results['rows'] == 1) {
			// one row was successfully updated
			$espresso_notices['success'][] = 'Price Type details have been successfully updated.';
		} elseif ($results['rows'] > 1) {
			// multiple rows were successfully updated
			$espresso_notices['success'][] = 'Details for ' . $results . ' price typess have been successfully updated.';
		} else {
			// error message
			$espresso_notices['errors'][] = 'An error occured and the price type has not been updated. ' . $this->_get_error_code(__FILE__, __FUNCTION__, __LINE__);
		}

		return $results['rows'];
	}

}

// End of file EEM_Price_Type.model.php
// Location: /ee-mvc/models/EEM_Price_Type.model.php