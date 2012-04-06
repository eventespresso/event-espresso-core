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
 * Price Model
 *
 * @package				Event Espresso
 * @subpackage		includes/models/
 * @author				Sidney Harrell
 *
 * ------------------------------------------------------------------------
 */
class EEM_Price extends EEM_Base {

	// private instance of the Price object
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
		// array representation of the price table and the data types for each field
		$this->table_data_types = array(
				'PRC_ID' => '%d',
				'PRT_ID' => '%d',
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
	 * 		@return 	mixed		array on success, FALSE on fail
	 */
	private function _create_objects($prices = FALSE) {

		if (!$prices) {
			return FALSE;
		}

		foreach ($prices as $price) {
			$array_of_objects[$price->PRC_ID] = new EE_Price(
											$price->PRT_ID,
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
	 * 		@return		mixed		array on success, FALSE on fail
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
	 * 		retreive  a single price from db via it's ID
	 *
	 * 		@access		public
	 * 		@param		int 			$PRC_ID
	 *		@return		mixed		array on success, FALSE on fail
	 */
	public function get_price_by_ID($PRC_ID = FALSE) {

		if (!$PRC_ID) {
			return FALSE;
		}
		// retreive a particular price
		$where_cols_n_values = array('PRC_ID' => $PRC_ID);
		if ($price = $this->select_row_where($where_cols_n_values)) {
			$price_array = $this->_create_objects(array($price));
			return array_shift($price_array);
		} else {
			return FALSE;
		}
	}

	/**
	*		retreive a single price from db via it's column values
	*
	* 		@access		public
	* 		@param		array		$where_cols_n_values
	*		@return 		mixed		array on success, FALSE on fail
	*/
	public function get_price( $where_cols_n_values = FALSE ) {

		if ( ! $where_cols_n_values ) {
			return FALSE;
		}

		if ( $price = $this->select_row_where ( $where_cols_n_values )) {
			$price_array = $this->_create_objects( array( $price ));
			return array_shift( $price_array );
		} else {
			return FALSE;
		}

	}





	/**
	*		retreive all prices that are either taxes, or percentages, or global, or of a particular order #
	*
	* 		@access		private
	* 		@param 		boolean 			$taxes  				true or false
	* 		@param 		boolean 			$percentages  	true or false
	* 		@param 		boolean 			$global  				true or false
	* 		@param 		int 					$order  				the level or order that the prices are applied
	* 		@return 		array				on success
	* 		@return 		boolean			false on fail
	*/
	private function _get_all_prices_that_are( $taxes = FALSE, $percentages = FALSE, $global = FALSE, $order = FALSE ) {

		// you gimme nothing??? you get nothing!!!
		if ( ! $taxes &&  ! $percentages &&  ! $global &&  ! $order ) {
			return FALSE;
		}

		// determine what we will be searching for via trickle down conditionals - it's just like PLINKO only better!
		$what = $taxes ? 'PRT_is_tax' : ( $percentages ? 'PRT_is_percent' : ( $global ? 'PRT_is_global' : 'PRT_order' ) );
		$value = $taxes ? $taxes : ( $percentages ? $percentages : ( $global ? $global : $order ) );

		global $wpdb;
		// retreive prices
		$SQL = 'SELECT prc.* FROM ' . $wpdb->prefix . 'esp_price_type prt JOIN ' . $this->table_name . ' prc ON prc.PRT_ID = prc.PRT_ID WHERE prt.'. $what .' = %d';
		if ( $prices = $wpdb->get_results( $wpdb->prepare( $SQL, $value ))) {
			return $this->_create_objects( $prices );
		} else {
			return FALSE;
		}

	}





	/**
	*		retreive all prices that are taxes
	*
	* 		@access		public
	* 		@return 		array				on success
	* 		@return 		boolean			false on fail
	*/
	public function get_all_prices_that_are_taxes() {
		return $this->_get_all_prices_that_are( TRUE );
	}





	/**
	*		retreive all prices that are percentages
	*
	* 		@access		public
	* 		@return 		array				on success
	* 		@return 		boolean			false on fail
	*/
	public function get_all_prices_that_are_percentages() {
		return $this->_get_all_prices_that_are( FALSE, TRUE );
	}





	/**
	*		retreive all prices that are global
	*
	* 		@access		public
	* 		@return 		array				on success
	* 		@return 		boolean			false on fail
	*/
	public function get_all_prices_that_are_global() {
		return $this->_get_all_prices_that_are( FALSE, FALSE, TRUE );
	}





	/**
	*		retreive all prices that are of a particular order #
	*
	* 		@access		public
	* 		@param 		int 			$order the level or order that the prices are applied
	* 		@return 		array				on success
	* 		@return 		boolean			false on fail
	*/
	public function get_all_prices_that_are_order_nmbr( $order ) {
		return $this->_get_all_prices_that_are( FALSE, FALSE, FALSE, $order );
	}

	/**
	 *	get all the final computed prices for an event
	 *
	 *	@access public
	 *	@param int $event_id
	 *	@return array of price objects
	 */
	public function get_prices_by_event_id( $event_id = FALSE ) {
		if (!$event_id) {
			return FALSE;
		}
		$SQL = "SELECT * FROM " . $wpdb->prefix . 'esp_price_type prt JOIN ' . $this->table_name . ' prc ON prc.PRT_ID = prc.PRT_ID JOIN ' . $wpdb->prefix . 'esp_event_price ev_pr  ON ev_pr.PRC_id=prc.PRC_id WHERE ev_pr.EVT_id = %d';
		if ( $prices = $wpdb->get_results( $wpdb->prepare( $SQL, $event_id ))) {

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