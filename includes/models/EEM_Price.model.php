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
 * @ version		 	3.1.P.7
 *
 * ------------------------------------------------------------------------
 *
 * Attendee Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Sidney Harrell
 *
 * ------------------------------------------------------------------------
 */
class EEM_Price extends EEM_Base {

	// private instance of the Attendee object
	private static $_instance = NULL;

	/**
	 * 		private constructor to prevent direct creation
	 * 		@Constructor
	 * 		@access private
	 * 		@return void
	 */
	private function __construct() {
		global $wpdb;
		// set table name
		$this->table_name = $wpdb->prefix . 'esp_price';
		// array representation of the attendee table and the data types for each field
		$this->table_data_types = array(
				'PRC_id' => '%d',
				'PRT_id' => '%d',
				'PRC_amount' => '%d',
				'PRC_name' => '%s',
				'PRC_desc' => '%s',
				'PRC_is_active' => '%d');
		// load Price object class file
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Price.class.php');

		// uncomment these for example code samples of how to use them
		//			self::how_to_use_insert();
		//			self::how_to_use_update();
	}

	/**
	 * 		This funtion is a singleton method used to instantiate the EEM_Attendee object
	 *
	 * 		@access public
	 * 		@return EEM_Price instance
	 */
	public static function instance() {

		// check if instance of EEM_Price already exists
		if (self::$_instance === NULL) {
			// instantiate Price_model
			self::$_instance = &new self();
		}
		// EEM_Price object
		return self::$_instance;
	}

	/**
	 * 		cycle though array of prices and create objects out of each item
	 *
	 * 		@access		private
	 * 		@param		array		$prices
	 * 			@return 	mixed		array on success, FALSE on fail
	 */
	private function _create_objects($prices = FALSE) {

		if (!$prices) {
			return FALSE;
		}

		foreach ($prices as $price) {
			$array_of_objects[$price->PRC_id] = new EE_Price(
											$price->PRT_id,
											$price->PRC_amount,
											$price->PRC_name,
											$price->PRC_desc,
											$price->PRC_is_active
			);
			return $array_of_objects;
		}
	}

	/**
	 * 		retreive  ALL prices from db
	 *
	 * 		@access		public
	 * 			@return		mixed		array on success, FALSE on fail
	 */
	public function get_all_prices() {

		$orderby = 'PRC_amount';
		// retreive all prices
		if ($prices = $this->select_all($orderby)) {
			return $this->_create_objects($prices);
		} else {
			return FALSE;
		}
	}

	/**
	 * 		retreive  a single price from db via it's id
	 *
	 * 		@access		public
	 * 		@param		$PRC_id
	 * 			@return		mixed		array on success, FALSE on fail
	 */
	public function get_price_by_id($PRC_id = FALSE) {

		if (!$PRC_id) {
			return FALSE;
		}
		// retreive a particular price
		$where_cols_n_values = array('PRC_id' => $PRC_id);
		if ($price = $this->select_row_where($where_cols_n_values)) {
			$price_array = $this->_create_objects(array($price));
			return array_shift($price_array);
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
			$espresso_notices['success'][] = 'Price details have been successfully saved to the database.';
		} elseif ($results['rows'] > 1) {
			// multiple rows were successfully updated
			$espresso_notices['success'][] = 'Details for ' . $results . ' prices have been successfully saved to the database.';
		} else {
			// error message
			$espresso_notices['errors'][] = 'An error occured and the price has not been saved to the database. ' . $this->_get_error_code(__FILE__, __FUNCTION__, __LINE__);
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
			$espresso_notices['success'][] = 'Price details have been successfully updated.';
		} elseif ($results['rows'] > 1) {
			// multiple rows were successfully updated
			$espresso_notices['success'][] = 'Details for ' . $results . ' prices have been successfully updated.';
		} else {
			// error message
			$espresso_notices['errors'][] = 'An error occured and the price has not been updated. ' . $this->_get_error_code(__FILE__, __FUNCTION__, __LINE__);
		}

		return $results['rows'];
	}

}

// End of file EEM_Price.model.php
// Location: /ee-mvc/models/EEM_Price.model.php