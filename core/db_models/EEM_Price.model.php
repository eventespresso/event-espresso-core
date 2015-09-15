<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
require_once ( EE_MODELS . 'EEM_Soft_Delete_Base.model.php' );
require_once ( EE_CLASSES . 'EE_Price.class.php' );
/**
 * Price Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/EEM_Price.model.php
 * @author				Mike Nelson
 */
class EEM_Price extends EEM_Soft_Delete_Base {

	// private instance of the EEM_Price object
	protected static $_instance = NULL;



	/**
	 * 		private constructor to prevent direct creation
	 * 		@Constructor
	 * 		@access protected
	 * 		@param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any incoming timezone data that gets saved).  Note this just sends the timezone info to the date time model field objects.  Default is NULL (and will be assumed using the set timezone in the 'timezone_string' wp option)
	 * 		@return EEM_Price
	 */
	protected function __construct( $timezone ) {
		require_once( EE_MODELS . 'EEM_Price_Type.model.php');
		$this->singular_item = __('Price','event_espresso');
		$this->plural_item = __('Prices','event_espresso');

		$this->_tables = array(
			'Price'=>new EE_Primary_Table('esp_price','PRC_ID')
		);
		$this->_fields = array(
			'Price'=> array(
				'PRC_ID'=>new EE_Primary_Key_Int_Field('PRC_ID', 'Price ID'),
				'PRT_ID'=>new EE_Foreign_Key_Int_Field('PRT_ID', 'Price type Id', false,  NULL, 'Price_Type'),
				'PRC_amount'=>new EE_Money_Field('PRC_amount', 'Price Amount', false, 0),
				'PRC_name'=>new EE_Plain_Text_Field('PRC_name', 'Name of Price', false, ''),
				'PRC_desc'=>new EE_Post_Content_Field('PRC_desc', 'Price Description', false, ''),
				'PRC_is_default'=>new EE_Boolean_Field('PRC_is_default', 'Flag indicating whether price is a default price', false, false),
				'PRC_overrides'=>new EE_Integer_Field('PRC_overrides', 'Price ID for a global Price that will be overridden by this Price  ( for replacing default prices )', true, 0),
				'PRC_order'=>new EE_Integer_Field('PRC_order', 'Order of Application of Price (lower numbers apply first?)', false, 1),
				'PRC_deleted'=>new EE_Trashed_Flag_Field('PRC_deleted', 'Flag Indicating if this has been deleted or not', false, false),
				'PRC_parent' => new EE_Integer_Field('PRC_parent', __('Indicates what PRC_ID is the parent of this PRC_ID'), true, 0 ),
				'PRC_wp_user' => new EE_WP_User_Field('PRC_wp_user', __('Price Creator ID', 'event_espresso'), FALSE ),
			)
		);
		$this->_model_relations = array(
			'Ticket'=>new EE_HABTM_Relation('Ticket_Price'),
			'Price_Type'=>new EE_Belongs_To_Relation(),
			'WP_User' => new EE_Belongs_To_Relation(),
		);
		//this model is generally available for reading
		$this->_cap_restriction_generators[ EEM_Base::caps_read ] = new EE_Restriction_Generator_Default_Public('PRC_is_default', 'Ticket.Datetime.Event' );
		//account for default tickets in the caps
		$this->_cap_restriction_generators[ EEM_Base::caps_read_admin ] = new EE_Restriction_Generator_Default_Protected( 'PRC_is_default', 'Ticket.Datetime.Event');
		$this->_cap_restriction_generators[ EEM_Base::caps_edit ] = new EE_Restriction_Generator_Default_Protected( 'PRC_is_default', 'Ticket.Datetime.Event');
		$this->_cap_restriction_generators[ EEM_Base::caps_delete ] = new EE_Restriction_Generator_Default_Protected( 'PRC_is_default', 'Ticket.Datetime.Event');
		parent::__construct( $timezone );
	}



	/**
	 * 		instantiate a new price object with blank/empty properties
	 *
	 * 		@access		public
	 * 		@return		mixed		array on success, FALSE on fail
	 */
	public function get_new_price() {
		return $this->create_default_object();
	}





	/**
	 * 		retrieve  ALL prices from db
	 *
	 * 		@access		public
	 * 		@return		EE_PRice[]
	 */
	public function get_all_prices() {
		// retrieve all prices
		return $this->get_all(array('order_by'=>array('PRC_amount'=>'ASC')));
	}



	/**
	 *        retrieve all active prices for a particular event
	 *
	 * @access        public
	 * @param int $EVT_ID
	 * @return array on success
	 */
	public function get_all_event_prices( $EVT_ID = 0 ) {
		return $this->get_all(array(
			array(
				'EVT_ID'=>$EVT_ID,
				'Price_Type.PBT_ID'=>array('!=',  EEM_Price_Type::base_type_tax)
			),
			'order_by'=>$this->_order_by_array_for_get_all_method()
		));
	}


	/**
	 * 		retrieve all active global prices (that are not taxes (PBT_ID=4)) for a particular event
	 *
	 * 		@access		public
	 * 		@param 		boolean 		$count  return count
	 * 		@return 		array			on success
	 * 		@return 		boolean		false on fail
	 */
	public function get_all_default_prices( $count = FALSE ) {
		$_where = array(
			'Price_Type.PBT_ID'=>array('!=',4),
			'PRC_deleted' => 0,
			'PRC_is_default' => 1
		);
		$_query_params = array(
			$_where,
			'order_by'=>$this->_order_by_array_for_get_all_method()
		);
		return $count ? $this->count(array($_where)) : $this->get_all($_query_params);
	}










	/**
	 * 		retrieve all prices that are taxes
	 *
	 * 		@access		public
	 * 		@return 		array				on success
	 * 		@return 		array top-level keys are the price's order and their values are an array,
	 *						next-level keys are the price's ID, and their values are EE_Price objects
	 */
	public function get_all_prices_that_are_taxes() {
		$taxes = array();
		$all_taxes = $this->get_all(array(
			array( 'Price_Type.PBT_ID'=>  EEM_Price_Type::base_type_tax ),
			'order_by' => array( 'Price_Type.PRT_order' => 'ASC', 'PRC_order' => 'ASC' )
		));
		foreach ( $all_taxes as $tax ) {
			if ( $tax instanceof EE_Price ) {
				$taxes[ $tax->order() ][ $tax->ID() ] = $tax;
			}
		}
		return $taxes;
	}





	/**
	 * 		retrieve all prices for an ticket plus default global prices, but not taxes
	 *
	 * 		@access		public
	 * 		@param int $TKT_ID          the id of the event.  If not included then we assume that this is a new ticket.
	 * 		@return 		boolean			false on fail
	 */
	public function get_all_ticket_prices_for_admin( $TKT_ID = 0 ) {
		$array_of_price_objects = array();
		if ( empty( $TKT_ID )) {

			//if there is no tkt, get prices with no tkt ID, are global, are not a tax, and are active
			//return that list
			$default_prices = $this->get_all_default_prices();

			if ( $default_prices ) {
				foreach ($default_prices as $price) {
					if ( $price instanceof EE_Price ) {
						$array_of_price_objects[ $price->type() ][] = $price;
					}
				}
				return $array_of_price_objects;
			} else {
				return array();
			}

		} else {

			$ticket_prices = $this->get_all(array(
				array(
					'TKT_ID'=>$TKT_ID,
					'PRC_deleted' => 0
					),
				'order_by'=> array('PRC_order' => 'ASC')
			));
		}

		if ( !empty( $ticket_prices ) ) {
			foreach ( $ticket_prices as $price ) {
				if ( $price instanceof EE_Price ) {
					$array_of_price_objects[ $price->type() ][] = $price;
				}
			}
			return $array_of_price_objects;

		 } else {
		 	return FALSE;
		 }
	}



	/**
	 *        _sort_event_prices_by_type
	 *
	 * @access public
	 * @param \EE_Price $price_a
	 * @param \EE_Price $price_b
	 * @return bool false on fail
	 */
	public function _sort_event_prices_by_type( EE_Price $price_a, EE_Price $price_b ) {
		if ( $price_a->type_obj()->order() == $price_b->type_obj()->order() ) {
			return $this->_sort_event_prices_by_order( $price_a, $price_b );
		}
		return $price_a->type_obj()->order() < $price_b->type_obj()->order() ? -1 : 1;
	}



	/**
	 *        _sort_event_prices_by_order
	 *
	 * @access public
	 * @param \EE_Price $price_a
	 * @param \EE_Price $price_b
	 * @return bool false on fail
	 */
	public function _sort_event_prices_by_order( EE_Price $price_a, EE_Price $price_b) {
		if ( $price_a->order() == $price_b->order() ) {
			return 0;
		}
		return $price_a->order() < $price_b->order() ? -1 : 1;
	}



	/**
	 * 		get all prices of a specific type
	 *
	 * 		@access		public
	 * 		@param 		int 				$type - PRT_ID
	 * 		@return 		boolean		false on fail
	 */
	public function get_all_prices_that_are_type( $type = 0 ) {
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
				'PRC_order'=>'ASC',
				'Price_Type.PRT_order'=>'ASC',
				'PRC_ID'=>'ASC'
		);
	}



}
// End of file EEM_Price.model.php
// Location: /ee-mvc/models/EEM_Price.model.php
