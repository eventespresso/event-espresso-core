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
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * Price Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/EEM_Price.model.php
 * @author				Sidney Harrell
 *
 * ------------------------------------------------------------------------
 */
require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Custom_Table_Base.model.php' );

class EEM_Price extends EEM_Custom_Table_Base {

	// private instance of the EEM_Price object
	private static $_instance = NULL;



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
	 * 		private constructor to prevent direct creation
	 * 		@Constructor
	 * 		@access protected
	 * 		@return void
	 */
	protected function __construct() {
		global $wpdb;
		// set table name
		$this->table_name = $wpdb->prefix . 'esp_price';
		// set item names
		$this->singlular_item = __('Price','event_espresso');
		$this->plural_item = __('Prices','event_espresso');		
		// array representation of the price table and the data types for each field
		$this->table_data_types = array(
				'PRC_ID'						=> '%d',
				'PRT_ID'						=> '%d',
				'EVT_ID'						=> '%d',
				'PRC_amount'				=> '%f',
				'PRC_name'				=> '%s',
				'PRC_desc'					=> '%s',
				'PRC_reg_limit'			=> '%d',
				'PRC_tckts_left'			=> '%d',
				'PRC_use_dates'			=> '%d',
				'PRC_start_date'			=> '%d',
				'PRC_end_date'			=> '%d',
				'PRC_is_active' 			=> '%d',
				'PRC_overrides' 			=> '%d',
				'PRC_order' 				=> '%d',
				'PRC_deleted' 			=> '%d'
		);
		// load Price object class file
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Price.class.php');

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
											$price->PRC_tckts_left,
											$price->PRC_use_dates,
											$price->PRC_start_date,
											$price->PRC_end_date,
											$price->PRC_is_active,
											$price->PRC_overrides,
											$price->PRC_order,
											$price->PRC_deleted,
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
		return new EE_Price( 1, 0, 0.00, '', '', NULL, NULL, FALSE, NULL, NULL, TRUE, NULL, NULL, NULL );
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
	 * 		retreive prices from db 
	 *
	 * 		@access		public
	 * 		@param		array							$where_cols_n_values
	 * 		@param		mixed 	string|array		$orderby
	 * 		@param		mixed 	string|array		$order
	 * 		@param		mixed  string|array		$operator
	 * 		@return 		mixed array on success, FALSE on fail
	 */
	private function _select_all_prices_where ( 
			$where_cols_n_values=FALSE, $orderby=array( 'prt.PRT_order', 'prc.PRC_order', 'prc.PRC_ID' ), $order='ASC', $operator = '=', $limit = NULL, $count = FALSE ) {
	
		$em_table_data_types = array(
				'prt.PRT_ID'						=> '%d',
				'prt.PRT_name'				=> '%s',
				'prt.PRT_is_member'		=> '%d',
				'prt.PBT_ID'						=> '%d',
				'prt.PRT_is_percent'		=> '%d',
				'prt.PRT_is_global'			=> '%d',
				'prt.PRT_order'				=> '%d',
				'prc.PRC_ID'					=> '%d',
				'prc.PRT_ID'					=> '%d',
				'prc.EVT_ID'					=> '%d',
				'prc.PRC_amount'			=> '%f',
				'prc.PRC_name'				=> '%s',
				'prc.PRC_desc'				=> '%s',
				'prc.PRC_reg_limit' 		=> '%d',
				'prc.PRC_tckts_left' 		=> '%d',
				'prc.PRC_use_dates'		=> '%d',
				'prc.PRC_start_date'		=> '%d',
				'prc.PRC_end_date'		=> '%d',
				'prc.PRC_is_active' 			=> '%d',
				'prc.PRC_overrides' 		=> '%d',
				'prc.PRC_order' 				=> '%d',
				'prc.PRC_deleted' 			=> '%d'
		);

		global $wpdb;
		
		$SQL = $count ? 'SELECT COUNT(prc.PRC_ID) ' : 'SELECT * ';
		$SQL .= 'FROM '. $wpdb->prefix . 'esp_price_type prt JOIN ' . $this->table_name . ' prc ON prt.PRT_ID = prc.PRT_ID';

		if ( $where_cols_n_values ) {
			$prepped = $this->_prepare_where ($where_cols_n_values, $em_table_data_types, $operator);
			$SQL .= $prepped['where'];
			$VAL = $prepped['value'];
		}

		$SQL .= $this->_orderby_n_sort ( $orderby, $order );

		if ( $limit && is_array($limit) && ! $count ) {
			$SQL .=	' LIMIT ' . $limit[0] . ',' . $limit[1];
		}
		// get count ? or get data?
		$results = $count ? $wpdb->get_var( $wpdb->prepare( $SQL, $VAL )) : $wpdb->get_results( $wpdb->prepare( $SQL, $VAL ), 'OBJECT' );
		//echo '<h4>' . $wpdb->last_query . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
		// bad results
		if ( empty( $results ) || $results === FALSE || is_wp_error( $results )) {
			return FALSE;
		}			
		//  return the count OR create objects out of data
		$results = $count ? $results : $this->_create_objects($results);
		return $results;

	}



	/**
	 * 		retreive all active prices for a particular event
	 *
	 * 		@access		public
	 * 		@return 		array				on success
	 * 		@return 		boolean			false on fail
	 */
	public function get_all_event_prices( $EVT_ID ) {
		return $this->_select_all_prices_where( 
				array( 'prc.EVT_ID' =>$EVT_ID, 'prc.PRC_is_active' => TRUE, 'prc.PRC_deleted' => FALSE, 'prt.PBT_ID' => 4 ), 
				array( 'prt.PRT_order', 'prc.PRC_order', 'prc.PRC_ID' ), 
				'ASC', 
				array( 'prc.EVT_ID' =>'=', 'prc.PRC_is_active' => '=', 'prc.PRC_deleted' => '=', 'prt.PBT_ID' => '!=' )
		);
	}


	/**
	 * 		retreive all active global prices for a particular event
	 *
	 * 		@access		public
	 * 		@return 		array				on success
	 * 		@return 		boolean			false on fail
	 */
	public function get_all_event_default_prices() {
		return $this->_select_all_prices_where( 
				array( 'prc.EVT_ID' =>0, 'prc.PRC_is_active' => TRUE, 'prc.PRC_deleted' => FALSE, 'prt.PBT_ID' => 4 ), 
				array( 'prt.PRT_order', 'prc.PRC_order', 'prc.PRC_ID' ), 
				'ASC', 
				array( 'prc.EVT_ID' =>'=', 'prc.PRC_is_active' => '=', 'prc.PRC_deleted' => '=', 'prt.PBT_ID' => '!=' )
		);
	}



	/**
	 * 		retreive all prices that are member prices
	 *
	 * 		@access		public
	 * 		@return 		array				on success
	 * 		@return 		boolean			false on fail
	 */
	public function get_all_prices_that_are_member_prices() {
		return $this->_select_all_prices_where(array('prt.PRT_is_member' => TRUE ));
	}

	public function get_all_prices_that_are_not_member_prices() {
		return $this->_select_all_prices_where(array('prt.PRT_is_member' => FALSE ));
	}





	/**
	 * 		retreive all prices that are discounts
	 *
	 * 		@access		public
	 * 		@return 		array				on success
	 * 		@return 		boolean			false on fail
	 */
	public function get_all_prices_that_are_discounts() {
		return $this->_select_all_prices_where(array('prt.PBT_ID' => 2 ));
	}

	public function get_all_prices_that_are_not_discounts() {
		return $this->_select_all_prices_where(
				array( 'prt.PBT_ID' => 2 ), 
				array( 'prt.PRT_order', 'prc.PRC_order', 'prc.PRC_ID' ), 
				'ASC', 
				array( 'prt.PBT_ID' => '!=' )
		);
	}





	/**
	 * 		retreive all prices that are taxes
	 *
	 * 		@access		public
	 * 		@return 		array				on success
	 * 		@return 		boolean			false on fail
	 */
	public function get_all_prices_that_are_taxes() {
		$taxes = array();
		$all_taxes = $this->_select_all_prices_where( 
				array( 'prt.PBT_ID' => 4, 'prc.PRC_is_active' => TRUE, 'prc.PRC_deleted' => FALSE )	
		);
		$all_taxes = ! empty( $all_taxes ) ? $all_taxes : array();
		foreach ( $all_taxes as $tax ) {
			$taxes[ $tax->order() ][ $tax->ID() ] = $tax;
		}
		return $taxes;
	}

	public function get_all_prices_that_are_not_taxes() {
		return $this->_select_all_prices_where(
				array( 'prt.PBT_ID' => 4, 'prc.PRC_is_active' => TRUE, 'prc.PRC_deleted' => FALSE ), 
				array( 'prt.PRT_order', 'prc.PRC_order', 'prc.PRC_ID' ), 
				'ASC', 
				array( 'prt.PBT_ID' => '!=', 'prc.PRC_is_active' => '=', 'prc.PRC_deleted' => '=' )
		);
	}





	/**
	 * 		retreive all prices that are percentages
	 *
	 * 		@access		public
	 * 		@return 		array				on success
	 * 		@return 		boolean			false on fail
	 */
	public function get_all_prices_that_are_percentages() {
		return $this->_select_all_prices_where(array('prt.PRT_is_percent' => TRUE ));
	}

	public function get_all_prices_that_are_not_percentages() {
		return $this->_select_all_prices_where(array('prt.PRT_is_percent' => FALSE ));
	}





	/**
	 * 	retreive all prices that are global
	 *
	 * 	@access		public
	 * 	@return 		boolean	$trashed				return deleted records or just active non-deleted ones ?
	 * 	@return 		string		$orderby				sorting column
	 * 	@return 		string		$order					sort ASC or DESC ?
	 * 	@return 		array		$limit					query limit and offset
	 * 	@return 		boolean	$count					return count or results ?
	 * 	@return 		array		on success
	 * 	@return 		boolean	false on fail
	 */
	public function get_all_prices_that_are_global( $trashed = FALSE, $orderby=array( 'prt.PRT_order', 'prc.PRC_order', 'prc.PRC_ID' ), $order='ASC', $limit = NULL, $count = FALSE ) {
		
		return $this->_select_all_prices_where( 
				array( 'prt.PRT_is_global' => TRUE, 'prc.PRC_deleted' => $trashed ),
				$orderby,
				$order,
				'=',
				$limit, 
				$count 
			);

	}

	public function get_all_prices_that_are_not_global() {
		return $this->_select_all_prices_where(array('prt.PRT_is_global' => FALSE ));
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
		return $this->_select_all_prices_where(array('prt.PRT_order' => $order ));
	}

	public function get_all_prices_that_are_not_order_nmbr($order) {
		return $this->_select_all_prices_where(array('prt.PRT_order' => $order ), '!=' );
	}





	/**
	 * 		retreive all prices for an event plus default global prices, but not taxes
	 *
	 * 		@access		public
	 * 		@return 		boolean			false on fail
	 */
	public function get_all_event_prices_for_admin( $EVT_ID = FALSE ) {

		if ( ! $EVT_ID ) {
			 $prices = $this->_select_all_prices_where(
					array( 'prc.EVT_ID' => 0, 'prt.PRT_is_global' => TRUE, 'prt.PBT_ID' => 4, 'prc.PRC_is_active'=>TRUE ), 
					array( 'PRC_start_date' ), 
					array( 'DESC' ),
					array( 'prc.EVT_ID' =>'=', 'prt.PRT_is_global' => '=', 'prt.PBT_ID' => '!=', 'prc.PRC_is_active'=>'=' )
			);
			//printr( $prices, '$prices  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			if ( $prices ) {
				$array_of_is_active_and_price_objects = array();
				foreach ($prices as $price) {
						$array_of_price_objects[ $price->type() ][] = $price;
				}
				return $array_of_price_objects;
			} else {
				return array();
			}
			
		}
		
		$globals = $this->_select_all_prices_where(
				array( 'prc.EVT_ID' => 0, 'prt.PRT_is_global' => TRUE, 'prt.PBT_ID' => 4, 'prc.PRC_is_active'=>TRUE, 'prc.PRC_deleted'=>FALSE ), 
				array( 'PRC_start_date' ), 
				array( 'DESC' ),
				array( 'prc.EVT_ID' =>'=', 'prt.PRT_is_global' => '=', 'prt.PBT_ID' => '!=', 'prc.PRC_is_active'=>'=', 'prc.PRC_deleted'=>'=' )
		);
		if ( ! $globals ) {
			$globals = array();
		}
		
		$event_prices = $this->_select_all_prices_where(array('prc.EVT_ID' => $EVT_ID, 'prc.PRC_deleted'=>FALSE ), array('PRC_start_date'), array('DESC'));
		if ( ! $event_prices ) {
			$event_prices = array();
		}
//		echo printr( $event_prices, '$event_prices' ); 
//		echo printr( $globals, '$globals' ); 

		$overrides = array();
		foreach ($event_prices as $event_price) {
			if ($override = $event_price->overrides()) {
				$overrides[] = $override;
			}
		}
		foreach ($overrides as $override) {
			if (array_key_exists($override, $globals)) {
				unset( $globals[$override] );
			}
		}
		$prices = array_merge( $event_prices, $globals);
		//echo printr( $prices, 'prices');
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
		
		uasort( $prices, array( $this, '_sort_event_prices_by_type' ));
		
		if ( ! empty( $prices )) {
			foreach ( $prices as $price ) {
				$array_of_price_objects[ $price->type() ][] = $price;
			}
			return $array_of_price_objects;
		} else {
			return FALSE;
		}
	}





	/**
	 * 		_sort_event_prices_by_type
	 *
	 * 		@access		private
	 * 		@return 		boolean			false on fail
	 */
	private function _sort_event_prices_by_type( $price_a, $price_b ) {
		$PRT = EEM_Price_Type::instance();
		if ( $PRT->type[ $price_a->type() ]->order() == $PRT->type[ $price_b->type() ]->order() ) {
			return $this->_sort_event_prices_by_order( $price_a, $price_b );
		}
		return $PRT->type[ $price_a->type() ]->order() < $PRT->type[ $price_b->type() ]->order() ? -1 : 1;
	}





	/**
	 * 		_sort_event_prices_by_order
	 *
	 * 		@access		private
	 * 		@return 		boolean			false on fail
	 */
	private function _sort_event_prices_by_order($price_a, $price_b) {
		if ( $price_a->order() == $price_b->order() ) {
			return $this->_sort_event_prices_by_start_date( $price_a, $price_b );
		}
		return $price_a->order() < $price_b->order() ? -1 : 1;
	}





	/**
	 * 		sort_event_prices_by_start_date
	 *
	 * 		@access		private
	 * 		@return 		boolean			false on fail
	 */
	private function _sort_event_prices_by_start_date($price_a, $price_b) {
		if ( $price_a->start_date( FALSE ) == $price_b->start_date( FALSE )) {
			return 0;
		}
		return $price_a->start_date( FALSE ) < $price_b->start_date( FALSE ) ? -1 : 1;
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
		$SQL = 'SELECT prc.*, prt.* FROM ' . $wpdb->prefix . 'esp_price_type prt JOIN ' . $this->table_name . ' prc ON prt.PRT_ID = prc.PRT_ID WHERE prt.PBT_ID != 4 ORDER BY PRT_order';

		if ($prices = $wpdb->get_results($wpdb->prepare($SQL))) {
			//echo printr($prices, '$prices' );
			return $this->_create_objects($prices);
		} else {
			return FALSE;
		}
	}





	/**
	 * 		get all prices of a specific type
	 *
	 * 		@access		public
	 * 		@param 		int 				$type - PRT_ID
	 * 		@return 		boolean		false on fail
	 */
	public function get_all_prices_that_are_type($type = FALSE) {
		if ( ! $type || ! is_int( $type )) {
			return FALSE;
		}
		if ( $prices = $this->select_all_where(array('PRT_ID' => $type))) {
			return $prices;
		} else {
			return FALSE;
		}
	}





	/**
	 * 		delete price by ID
	 *
	 * 		@access		public
	 * 		@param 		int 				$PRC_ID - price ID
	 * 		@return 		boolean		false on fail
	 */
	public function delete_by_id($PRC_ID) {
		if ( ! $PRC_ID || ! is_int( $PRC_ID )) {
			return FALSE;
		}
		if ( $this->delete(array('PRC_ID' => $PRC_ID))) {
			return TRUE;
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
		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		return $this->_insert($this->table_name, $this->table_data_types, $set_column_values);
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
		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		return $this->_update($this->table_name, $this->table_data_types, $set_column_values, $where_cols_n_values);
	}

}

// End of file EEM_Price.model.php
// Location: /ee-mvc/models/EEM_Price.model.php