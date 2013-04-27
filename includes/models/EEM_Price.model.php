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
require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Soft_Delete_Base.model.php' );

class EEM_Price extends EEM_Soft_Delete_Base {

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
		require_once('EEM_Price_Type.model.php');
		$this->singlular_item = __('Price','event_espresso');
		$this->plural_item = __('Prices','event_espresso');		
		// array representation of the price table and the data types for each field
//		$this->table_data_types = array(
//				'PRC_ID'						=> '%d',
//				'PRT_ID'						=> '%d',
//				'EVT_ID'						=> '%d',
//				'PRC_amount'				=> '%f',
//				'PRC_name'				=> '%s',
//				'PRC_desc'					=> '%s',
//				'PRC_reg_limit'			=> '%d',
//				'PRC_tckts_left'			=> '%d',
//				'PRC_use_dates'			=> '%d',
//				'PRC_start_date'			=> '%d',
//				'PRC_end_date'			=> '%d',
//				'PRC_is_active' 			=> '%d',
//				'PRC_overrides' 			=> '%d',
//				'PRC_order' 				=> '%d',
//				'PRC_deleted' 			=> '%d'
//		);
		// load Price object class file
//		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Price.class.php');
		$this->_tables = array(
			'Price'=>new EE_Primary_Table('esp_price','PRC_ID')
		);
		$this->_fields = array(
			'Price'=> array(
				'PRC_ID'=>new EE_Primary_Key_Int_Field('PRC_ID', 'Price ID', false, 0),
				'PRT_ID'=>new EE_Foreign_Key_Int_Field('PRT_ID', 'Price type Id', false, 1, 'Price_Type'),
				'EVT_ID'=>new EE_Foreign_Key_Int_Field('EVT_ID', 'Event ID', false, 0, 'Event'),
				'PRC_amount'=>new EE_Money_Field('PRC_amount', 'Price Amount', false, 0),
				'PRC_name'=>new EE_Plain_Text_Field('PRC_name', 'Name of Price', false, ''),
				'PRC_desc'=>new EE_Simple_HTML_Field('PRC_desc', 'Price Description', false, ''),
				'PRC_reg_limit'=>new EE_Integer_Field('PRC_reg_limit', 'Limit to how many tickets can be sold at this price', true, 999999),
				'PRC_tckts_left'=>new EE_Integer_Field('PRC_tckts_left', 'Tickets remaining at this price', true, 999999),
				'PRC_use_dates'=>new EE_Boolean_Field('PRC_use_dates', 'Flag indicating whether to use dates for this price', false, false),
				'PRC_start_date'=>new EE_Datetime_Field('PRC_start_date', 'If using dates, when this price becomes available', true, current_time('timestamp')),
				'PRC_end_date'=>new EE_Datetime_Field('PRC_end_date', 'If using dates, when this price is no longer available', true, current_time('timestamp')),
				'PRC_is_active'=>new EE_Boolean_Field('PRC_is_active', 'Flag indicating whether price is active', false, true),
				'PRC_overrides'=>new EE_Integer_Field('PRC_overrides', 'Price ID for a global Price that will be overridden by this Price  ( for replacing default prices )', true, 0),
				'PRC_order'=>new EE_Integer_Field('PRC_order', 'Order of Application of Price (lower numbers apply first?)', false, 1),
				'PRC_deleted'=>new EE_Trashed_Flag_Field('PRC_deleted', 'Flag Indicating if this has been deleted or not', false, false)
			)
		);
		$this->_model_relations = array(
			'Event'=>new EE_Belongs_To_Relation(),
			'Price_Type'=>new EE_Belongs_To_Relation(),
			'Registration'=>new EE_Has_Many_Relation()
		);
		parent::__construct();
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
	 * 		@return		EE_PRice[]
	 */
	public function get_all_prices() {
		// retreive all prices
		return $this->get_all(array('order_by'=>array('PRC_amount'=>'ASC')));
	}



	/**
	 * 		retreive all active prices for a particular event
	 *
	 * 		@access		public
	 * 		@return 		array				on success
	 * 		@return 		boolean			false on fail
	 */
	public function get_all_event_prices( $EVT_ID ) {
		return $this->get_all(array(
			array(
				'EVT_ID'=>$EVT_ID,
				'PRC_is_active'=>true,
				'Price_Type.PBT_ID'=>array('!=',  EEM_Price_Type::base_type_tax)
			),
			'order_by'=>$this->_order_by_array_for_get_all_method()
		));
//		return $this->_select_all_prices_where( 
//				array( 'prc.EVT_ID' =>$EVT_ID, 'prc.PRC_is_active' => TRUE, 'prc.PRC_deleted' => FALSE, 'prt.PBT_ID' => 4 ), 
//				array( 'prt.PRT_order', 'prc.PRC_order', 'prc.PRC_ID' ), 
//				'ASC', 
//				array( 'prc.EVT_ID' =>'=', 'prc.PRC_is_active' => '=', 'prc.PRC_deleted' => '=', 'prt.PBT_ID' => '!=' )
//		);
	}


	/**
	 * 		retreive all active global prices for a particular event
	 *
	 * 		@access		public
	 * 		@return 		array				on success
	 * 		@return 		boolean			false on fail
	 */
	public function get_all_default_prices() {
		return $this->get_all(array(
							array(
								'EVT_ID'=>0,
								'Price_Type.PRT_is_global'=>true,
								'Price_Type.PBT_ID'=>array('!=',4),
								'PRC_is_active'=>true),
							'order_by'=>$this->_order_by_array_for_get_all_method()
						));
	}



	/**
	 * 		retreive all prices that are member prices
	 *
	 * 		@access		public
	 * 		@return 		EE_Price[]
	 */
	public function get_all_prices_that_are_member_prices() {
		return $this->get_all(array(array('Price_Type.PRT_is_member' => TRUE )));
	}

	
	/**
	 * 		retreive all prices that are member prices
	 *
	 * 		@access		public
	 * 		@return 		EE_Price[]
	 */
	public function get_all_prices_that_are_not_member_prices() {
		return $this->get_all(array(array('Price_Type.PRT_is_member' => FALSE )));
	}










	/**
	 * 		retreive all prices that are taxes
	 *
	 * 		@access		public
	 * 		@return 		array				on success
	 * 		@return 		array top-level keys are the price's order and their values are an array,
	 *						next-level keys are the price's ID, and their values are EE_Price objects
	 */
	public function get_all_prices_that_are_taxes() {
		$taxes = array();
		$all_taxes = $this->get_all(array(
			array(
				'Price_Type.PBT_ID'=>  EEM_Price_Type::base_type_tax,
				'PRC_is_active'=> true)
		));
//		$all_taxes = $this->_select_all_prices_where( 
//				array( 'prt.PBT_ID' => 4, 'prc.PRC_is_active' => TRUE, 'prc.PRC_deleted' => FALSE )	
//		);
		foreach ( $all_taxes as $tax ) {
			$taxes[ $tax->order() ][ $tax->ID() ] = $tax;
		}
		return $taxes;
	}





	/**
	 * 		retreive all prices for an event plus default global prices, but not taxes
	 *
	 * 		@access		public
	 * 		@return 		boolean			false on fail
	 */
	public function get_all_event_prices_for_admin( $EVT_ID = FALSE ) {
		//if there is no evt_id, get prices with no event ID, are global, are not a tax, and are active
		//return taht list
		$global_prices =	$this->get_all_default_prices();
		
		if ( ! $EVT_ID ) {
			
//			$this->_select_all_prices_where(
//					array( 'prc.EVT_ID' => 0, 'prt.PRT_is_global' => TRUE, 'prt.PBT_ID' => 4, 'prc.PRC_is_active'=>TRUE ), 
//					array( 'PRC_start_date' ), 
//					array( 'DESC' ),
//					array( 'prc.EVT_ID' =>'=', 'prt.PRT_is_global' => '=', 'prt.PBT_ID' => '!=', 'prc.PRC_is_active'=>'=' )
//			);
			//printr( $prices, '$prices  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			if ( $global_prices ) {
				$array_of_price_objects = array();
				foreach ($global_prices as $price) {
						$array_of_price_objects[ $price->type() ][] = $price;
				}
				return $array_of_price_objects;
			} else {
				return array();
			}
			
		}

		
//		$globals = $this->_select_all_prices_where(
//				array( 'prc.EVT_ID' => 0, 'prt.PRT_is_global' => TRUE, 'prt.PBT_ID' => 4, 'prc.PRC_is_active'=>TRUE, 'prc.PRC_deleted'=>FALSE ), 
//				array( 'PRC_start_date' ), 
//				array( 'DESC' ),
//				array( 'prc.EVT_ID' =>'=', 'prt.PRT_is_global' => '=', 'prt.PBT_ID' => '!=', 'prc.PRC_is_active'=>'=', 'prc.PRC_deleted'=>'=' )
//		);
		
		$event_prices = $this->get_all(array(
			array(
				'EVT_ID'=>$EVT_ID
				),
			'order_by'=>$this->_order_by_array_for_get_all_method()
		));
		
		
		//$this->_select_all_prices_where(array('prc.EVT_ID' => $EVT_ID, 'prc.PRC_deleted'=>FALSE ), array('PRC_start_date'), array('DESC'));
//		echo printr( $event_prices, '$event_prices' ); 
//		echo printr( $globals, '$globals' ); 

		$overrides = array();
		foreach ($event_prices as $event_price) {
			if ($override = $event_price->overrides()) {
				$overrides[] = $override;
			}
		}
		foreach ($overrides as $override) {
			if (array_key_exists($override, $global_prices)) {
				unset( $global_prices[$override] );
			}
		}
		$prices = array_merge( $event_prices, $global_prices);
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
		if ( $price_a->type_obj()->order() == $price_b->type_obj()->order() ) {
			return $this->_sort_event_prices_by_order( $price_a, $price_b );
		}
		return $price_a->type_obj()->order() < $price_b->type_obj()->order() ? -1 : 1;
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
	 * 		get all prices of a specific type
	 *
	 * 		@access		public
	 * 		@param 		int 				$type - PRT_ID
	 * 		@return 		boolean		false on fail
	 */
	public function get_all_prices_that_are_type($type = FALSE) {
		return $this->get_all(array(
			array(
				'PRT_ID'=>$type
			),
			'order_by'=>$this->_order_by_array_for_get_all_method()
		));
	}

	/**
	 * Returns an array of the normal 'order_by' query parameter provided to the get_all query.
	 * Of course you don't have to use it, but this is the order we usually want to sort prices by
	 * @return array which can be used like so: $this->get_all(array(array(...where stuff...),'order_by'=>$this->_order_by_array_for_get_all_method()));
	 */
	public function _order_by_array_for_get_all_method(){
		return array(
				'Price_Type.PRT_order'=>'ASC',
				'PRC_order'=>'ASC',
				'PRC_ID'=>'ASC');
	}
}

// End of file EEM_Price.model.php
// Location: /ee-mvc/models/EEM_Price.model.php