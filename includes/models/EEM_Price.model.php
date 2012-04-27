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
 * @ version		 	3.2
 *
 * ------------------------------------------------------------------------
 *
 * Price Model
 *
 * @package				Event Espresso
 * @subpackage		includes/models/EEM_Price.model.php
 * @author				Sidney Harrell
 *
 * ------------------------------------------------------------------------
 */
require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Base.model.php' );

class EEM_Price extends EEM_Base {

	// private instance of the EEM_Price object
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
				'PRC_ID' 						=> '%d',
				'PRT_ID' 						=> '%d',
				'EVT_ID' 						=> '%d',
				'PRC_amount' 			=> '%d',
				'PRC_name'					 => '%s',
				'PRC_desc' 					=> '%s',
				'PRC_reg_limit' 			=> '%d',
				'PRC_use_dates'			=> '%d',
				'PRC_start_date'			=> '%d',
				'PRC_end_date'			=> '%d',
				'PRC_disc_code'			=> '%s',
				'PRC_disc_limit_qty'	=> '%d',
				'PRC_disc_qty'				=> '%d',
				'PRC_disc_apply_all'	=> '%d',
				'PRC_disc_wp_user'	=> '%d',
				'PRC_is_active' 			=> '%d',
				'PRC_overrides' 			=> '%d'
		);
		// load Price object class file
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Price.class.php');

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
			self::$_instance = new self();
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

		if (is_object($prices)) {
			$prices = array($prices);
		}

		foreach ($prices as $price) {

			$array_of_objects[$price->PRC_ID] = new EE_Price(

											$price->PRT_ID,
											$price->EVT_ID,
											$price->PRC_amount,
											$price->PRC_name,
											$price->PRC_desc,
											$price->PRC_reg_limit,
											$price->PRC_use_dates,
											$price->PRC_start_date,
											$price->PRC_end_date,
											$price->PRC_disc_code,
											$price->PRC_disc_limit_qty,
											$price->PRC_disc_qty,
											$price->PRC_disc_apply_all,
											$price->PRC_disc_wp_user,
											$price->PRC_is_active,
											$price->PRC_overrides,
											$price->PRC_ID
			);
		}
		return $array_of_objects;
	}





	/**
	 * 		instantiate a new price object with blank/empty properties
	 *
	 * 		@access		public
	 * 		@return		mixed		array on success, FALSE on fail
	 */
	public function get_new_price() {
		return new EE_Price( 0, 0, 0.00, '', '', NULL, FALSE, NULL, NULL, NULL, FALSE, 0, FALSE, 1, FALSE, NULL );
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
	 * 		get all prices from db where...
	 *
	 * 		@access		public
	 * 		@param		array		$where_cols_n_values
	 * 		@return		mixed		array on success, FALSE on fail
	 */
	public function get_all_prices_where( $where_cols_n_values = FALSE ) {

		if (!$where_cols_n_values) {
			return FALSE;
		}

		$orderby = 'PRC_amount';
		// retreive all prices
		if ($prices = $this->select_all_where( $where_cols_n_values, $orderby )) {
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
	 * 		@return		mixed		array on success, FALSE on fail
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
	 * 		retreive a single price from db via it's column values
	 *
	 * 		@access		public
	 * 		@param		array		$where_cols_n_values
	 * 		@return 		mixed		array on success, FALSE on fail
	 */
	public function get_price( $where_cols_n_values = FALSE ) {

		if (!$where_cols_n_values) {
			return FALSE;
		}

		if ($price = $this->select_row_where($where_cols_n_values)) {
			$price_array = $this->_create_objects(array($price));
			return array_shift($price_array);
		} else {
			return FALSE;
		}
	}





	/**
	 * 		retreive all prices that are either member_prices, discounts, taxes, or percentages, or global, or of a particular order #
	 *
	 * 		@access		private
	 * 		@param 		boolean 			$member_prices  	true or false
	 * 		@param 		boolean 			$discounts  			true or false
	 * 		@param 		boolean 			$taxes  					true or false
	 * 		@param 		boolean 			$percentages  		true or false
	 * 		@param 		boolean 			$global  					true or false
	 * 		@param 		int 					$order  					the level or order that the prices are applied
	 * 		@return 		array				on success
	 * 		@return 		boolean			false on fail
	 */
	private function _get_all_prices_that_are( $member_prices = FALSE, $discounts = FALSE, $taxes = FALSE, $percentages = FALSE, $global = FALSE, $order = FALSE, $operator = '=' ) {

		// you gimme nothing??? you get nothing!!!
		if ( ! $member_prices &&  ! $discounts &&  ! $taxes && ! $percentages && ! $global && ! $order ) {
			return FALSE;
		}

		// determine what we will be searching for via trickle down conditionals - it's just like PLINKO only better! and unlike trickle down economics - this WORKS!
		$what = '';
		$value = array();
		if ($member_prices) {
			$what .= 'PRT_is_member '. $operator .' %d';
			$value[] = $member_prices;
		}
		if (!empty($what) && ($discounts || $taxes || $percentages || $global || $order)) {
			$what .= ' AND prt.';
		}
		if ($discounts) {
			$what .= 'PRT_is_discount '. $operator .' %d';
			$value[] = $discounts;
		}
		if (!empty($what) && ($taxes || $percentages || $global || $order)) {
			$what .= ' AND prt.';
		}
		if ($taxes) {
			$what .= 'PRT_is_tax '. $operator .' %d';
			$value[] = $taxes;
		}
		if (!empty($what) && ($percentages || $global || $order)) {
			$what .= ' AND prt.';
		}
		if ($percentages) {
			$what .= 'PRT_is_percent '. $operator .' %d';
			$value[] = $percentages;
		}
		if (!empty($what) && ($global || $order)) {
			$what .= ' AND prt.';
		}
		if ($global) {
			$what .= 'PRT_is_global '. $operator .' %d';
			$value[] = $global;
		}
		if (!empty($what)) {
			$what .= ' AND prt.';
		}
		if ($order !== FALSE) {
			$what .= 'PRT_order '. $operator .' %d';
			$value[] = $order;
		}

		global $wpdb;
		// retreive prices
		$SQL = 'SELECT prc.*, prt.* FROM ' . $wpdb->prefix . 'esp_price_type prt JOIN ' . $this->table_name . ' prc ON prt.PRT_ID = prc.PRT_ID WHERE prt.' . $what . ' ORDER BY PRT_order';

		if ($prices = $wpdb->get_results($wpdb->prepare($SQL, $value))) {
			foreach ($prices as $price) {
				$array_of_prices[] = array_shift($this->_create_objects($price));
			}
			return $array_of_prices;
		} else {
			return FALSE;
		}
	}





	/**
	 * 		retreive all prices that are member prices
	 *
	 * 		@access		public
	 * 		@return 		array				on success
	 * 		@return 		boolean			false on fail
	 */
	public function get_all_prices_that_are_member_prices() {
		return $this->_get_all_prices_that_are( TRUE );
	}

	public function get_all_prices_that_are_not_member_prices() {
		return $this->_get_all_prices_that_are( TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, '!=' );
	}





	/**
	 * 		retreive all prices that are discounts
	 *
	 * 		@access		public
	 * 		@return 		array				on success
	 * 		@return 		boolean			false on fail
	 */
	public function get_all_prices_that_are_discounts() {
		return $this->_get_all_prices_that_are( FALSE, TRUE );
	}

	public function get_all_prices_that_are_not_discounts() {
		return $this->_get_all_prices_that_are( FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, '!=' );
	}





	/**
	 * 		retreive all prices that are taxes
	 *
	 * 		@access		public
	 * 		@return 		array				on success
	 * 		@return 		boolean			false on fail
	 */
	public function get_all_prices_that_are_taxes() {
		return $this->_get_all_prices_that_are( FALSE, FALSE, TRUE );
	}

	public function get_all_prices_that_are_not_taxes() {
		return $this->_get_all_prices_that_are( FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, '!=' );
	}





	/**
	 * 		retreive all prices that are percentages
	 *
	 * 		@access		public
	 * 		@return 		array				on success
	 * 		@return 		boolean			false on fail
	 */
	public function get_all_prices_that_are_percentages() {
		return $this->_get_all_prices_that_are( FALSE, FALSE, FALSE, TRUE );
	}

	public function get_all_prices_that_are_not_percentages() {
		return $this->_get_all_prices_that_are( FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, '!=' );
	}





	/**
	 * 		retreive all prices that are global
	 *
	 * 		@access		public
	 * 		@return 		array				on success
	 * 		@return 		boolean			false on fail
	 */
	public function get_all_prices_that_are_global() {
		return $this->_get_all_prices_that_are( FALSE, FALSE, FALSE, FALSE, TRUE );
	}

	public function get_all_prices_that_are_not_global() {
		return $this->_get_all_prices_that_are( FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, '!=' );
	}





	/**
	 * 		retreive all prices that are of a particular order #
	 *
	 * 		@access		public
	 * 		@param 		int 			$order the level or order that the prices are applied
	 * 		@return 		array				on success
	 * 		@return 		boolean			false on fail
	 */
	public function get_all_prices_that_are_order_nmbr($order) {
		return $this->_get_all_prices_that_are( FALSE, FALSE, FALSE, FALSE, FALSE, $order );
	}

	public function get_all_prices_that_are_not_order_nmbr($order) {
		return $this->_get_all_prices_that_are( FALSE, FALSE, FALSE, FALSE, FALSE, $order, '!=' );
	}





	/**
	 * 		retreive all prices for an event plus default global prices, but not taxes
	 *
	 * 		@access		public
	 * 		@return 		boolean			false on fail
	 */
	public function get_all_event_prices_for_admin( $EVT_ID ) {

		if ( ! $EVT_ID ) {
			$prices = $this->_get_all_prices_that_are( FALSE, FALSE, FALSE, FALSE, TRUE, 0);
			foreach ($prices as $price) {
				if (! $price->is_active()) {
					continue;
				}
				$array_of_is_active_and_price_objects[] = array('active'=>TRUE, 'price'=>$price);
			}
			return $array_of_is_active_and_price_objects;
		}

		global $wpdb;
		// retreive prices
		$SQL = 'SELECT  prc.*, prt.* ';
		$SQL .= 'FROM ' . $this->table_name . ' prc ';
		$SQL .= 'JOIN ' . $wpdb->prefix . 'esp_price_type prt ON prt.PRT_ID = prc.PRT_ID ';
		$SQL .= 'WHERE ( prc.EVT_ID = %d OR ( prt.PRT_is_global = TRUE AND prc.PRC_is_active = TRUE )) ';
		$SQL .= 'AND prt.PRT_is_tax = FALSE ';
		$SQL .= 'ORDER BY PRT_order';


		if ($prices = $wpdb->get_results($wpdb->prepare($SQL, $EVT_ID))) {
//			echo printr( $prices, '$prices' );		
			foreach ($prices as $price) {
				$active = ! empty( $price->PRC_is_active ) ? TRUE : FALSE;
				$array_of_is_active_and_price_objects[ $price->PRT_ID ][] = array( 'active'=>$active, 'price'=>array_shift( $this->_create_objects( $price )));
			}
			return $array_of_is_active_and_price_objects;
		} else {
			return FALSE;
		}
	}





	/**
	 * 		retreive all prices that are global, but not taxes
	 *
	 * 		@access		public
	 * 		@return 		boolean			false on fail
	 */
	public function get_all_prices_for_pricing_admin() {

		global $wpdb;
		// retreive prices
		$SQL = 'SELECT prc.*, prt.* FROM ' . $wpdb->prefix . 'esp_price_type prt JOIN ' . $this->table_name . ' prc ON prt.PRT_ID = prc.PRT_ID WHERE prt.PRT_is_tax = FALSE ORDER BY PRT_order';

		if ($prices = $wpdb->get_results($wpdb->prepare($SQL))) {
			//echo printr($prices, '$prices' );
			return $this->_create_objects($prices);
		} else {
			return FALSE;
		}
	}




	public function delete_all_prices_that_are_type($type = FALSE) {
		if (!$type) {
			return FALSE;
		}
		if ($prices = $this->select_all_where(array('PRT_ID' => $type))) {
			foreach ($prices as $PRC_ID => $price) {
				$this->delete_by_id($PRC_ID);
			}
		}
	}





	public function delete_by_id($ID) {
		if (!$ID) {
			return FALSE;
		}
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Event_Price.model.php');
		$EP = EEM_Event_Price::instance();
		$EP->delete_by_price_id($ID);
		$this->delete(array('PRC_ID' => $ID));
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