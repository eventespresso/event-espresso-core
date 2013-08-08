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
require_once ( EE_MODELS . 'EEM_Soft_Delete_Base.model.php' );
require_once ( EE_CLASSES . 'EE_Price.class.php' );


class EEM_Price extends EEM_Soft_Delete_Base {

	// private instance of the EEM_Price object
	private static $_instance = NULL;



	/**
	 * 		This funtion is a singleton method used to instantiate the EEM_Attendee object
	 *
	 * 		@access public
	 * 		@param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any incoming timezone data that gets saved).  Note this just sends the timezone info to the date time model field objects.  Default is NULL (and will be assumed using the set timezone in the 'timezone_string' wp option)
	 * 		@return EEM_Price instance
	 */
	public static function instance( $timezone = NULL ) {

		// check if instance of EEM_Price already exists
		if (self::$_instance === NULL) {
			// instantiate Price_model
			self::$_instance = new self( $timezone );
		}

		//set timezone if we have in incoming string
		if ( !empty( $timezone ) )
			self::$_instance->set_timezone( $timezone );
		
		// EEM_Price object
		return self::$_instance;
	}



	/**
	 * 		private constructor to prevent direct creation
	 * 		@Constructor
	 * 		@access protected
	 * 		@param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any incoming timezone data that gets saved).  Note this just sends the timezone info to the date time model field objects.  Default is NULL (and will be assumed using the set timezone in the 'timezone_string' wp option)
	 * 		@return void
	 */
	protected function __construct( $timezone ) {
		require_once( EE_MODELS . 'EEM_Price_Type.model.php');
		$this->singlular_item = __('Price','event_espresso');
		$this->plural_item = __('Prices','event_espresso');		

		$this->_tables = array(
			'Price'=>new EE_Primary_Table('esp_price','PRC_ID')
		);
		$this->_fields = array(
			'Price'=> array(
				'PRC_ID'=>new EE_Primary_Key_Int_Field('PRC_ID', 'Price ID', false, 0),
				'PRT_ID'=>new EE_Foreign_Key_Int_Field('PRT_ID', 'Price type Id', false, 1, 'Price_Type'),
				'PRC_amount'=>new EE_Money_Field('PRC_amount', 'Price Amount', false, 0),
				'PRC_name'=>new EE_Plain_Text_Field('PRC_name', 'Name of Price', false, ''),
				'PRC_desc'=>new EE_Simple_HTML_Field('PRC_desc', 'Price Description', false, ''),
				'PRC_is_active'=>new EE_Boolean_Field('PRC_is_active', 'Flag indicating whether price is active', false, true),
				'PRC_is_default'=>new EE_Boolean_Field('PRC_is_default', 'Flag indicating whether price is a default price', false, true),
				'PRC_overrides'=>new EE_Integer_Field('PRC_overrides', 'Price ID for a global Price that will be overridden by this Price  ( for replacing default prices )', true, 0),
				'PRC_order'=>new EE_Integer_Field('PRC_order', 'Order of Application of Price (lower numbers apply first?)', false, 1),
				'PRC_deleted'=>new EE_Trashed_Flag_Field('PRC_deleted', 'Flag Indicating if this has been deleted or not', false, false),
				'PRC_display_order' => new EE_Integer_Field('PRC_display_order', 'Order of how prices are displayed', false, 1 ),
				'PRC_parent' => new EE_Integer_Field('PRC_parent', __('Indicates what PRC_ID is the parent of this PRC_ID'), true, 0 )
			)
		);
		$this->_model_relations = array(
			'Ticket'=>new EE_HABTM_Relation('Ticket_Price'),
			'Price_Type'=>new EE_Belongs_To_Relation()
		);
		parent::__construct( $timezone );
		
		require_once ( EE_CLASSES . 'EE_Price.class.php' );

	}



	/**
	 * defines  table name as a constant
	 * @access public
	 */
	public static function define_table_name() {
		global $wpdb;
		define( 'ESP_PRICE_TABLE', $wpdb->prefix . 'esp_price' );
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
				'TKT_ID'=>0,
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
	 * 		retreive all prices for an ticket plus default global prices, but not taxes
	 *
	 * 		@access		public
	 * 		@param int     $TKT          the id of the event.  If not included then we assume that this is a new ticket.
	 * 		@return 		boolean			false on fail
	 */
	public function get_all_ticket_prices_for_admin( $TKT_ID = FALSE ) {
		$ticket_prices = array();
		if ( empty($TKT_ID) ) {

			//if there is no tkt, get prices with no tkt ID, are global, are not a tax, and are active
			//return that list
			$ticket_prices = $this->get_all_default_prices();

			if ( $global_prices ) {
				$array_of_price_objects = array();
				foreach ($global_prices as $price) {
						$array_of_price_objects[ $price->type() ][] = $price;
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



	/**
	 * This is injecting into the parent update() method to do a check first to see if the price being updated is ALREADY in use (i.e. has tickets sold).  If it does, then we're going to just make sure we insert a NEW price instead with all the same details (and we'll mark the given price as "archived") and of course we'll return what normally gets returned from an update so that any add_relation_to() run after the update will attach to the right object.
	 *
	 * So to summarize:
	 * - if tickets have been sold for this price
	 * - and we have a change in amount
	 * - or we have a change in price type
	 * ...then we create a new price and mark the incoming one as trashed.
	 *
	 * Another thing we have to check for is IF the reg_limit is changed, then we need to make sure its NOT set less than the tickets sold.  It can be EQUAL to or greater than but not less than. If reg limit is not correct then let's set an EE_Error msg and return false.
	 *
	 * @see parent method for param details.
	 */
	public function update($fields_n_values, $query_params){
		//let's get the PRC_ID if present.
		$PRC_ID = isset( $query_params[0] ) && isset( $query_params[0]['PRC_ID'] ) ? $query_params[0]['PRC_ID'] : NULL;		

		//get EXISTING prc in db for checks
		if ( !empty( $PRC_ID ) ) {
			$existing_prc = $this->get_one_by_ID( $PRC_ID );


			//first we need to detect if there are any changes from the incoming price... IF there are then we go to the next step... otherwise we just leave things as is and pass off to parent.
			$changed = FALSE;
			foreach ( $fields_n_values as $field => $value ) {
				if ( $value != $existing_prc->get($field) )
					$changed = TRUE;
			}

			//nothings changed so just return
			if ( !$changed ) 
				return $existing_prc;

			//if tickets sold then we create a new price NOT update an existing one.  The existing one becomes archived.  We ALSO need to archive the existing ticket, clone a new ticket from the existing one and add all the prices except the changed one to the cloned ticket and add the new price to the new ticket.
			if ( $existing_prc->get_first_related('Ticket')->tickets_sold() > 0 ) {
				//get all prices and datetimes on the existing ticket
				$existing_ticket = $existing_prc->get_first_related('Ticket');
				$existing_ticket_prices = $existing_ticket->get_all_related('Price');
				$existing_datetimes = $existing_ticket->get_all_related('Datetime');

				//now let's copy the existing ticket
				$new_ticket = $existing_ticket;

				//archive the existing ticket;
				$existing_ticket->set('TKT_deleted', 1);
				$existing_ticket->save();

				//set new ticket ID to null and save to create new ticket.
				$new_ticket->set('ID', NULL);
				$new_ticket->save();

				//loop through existing prices and replace the existing price with a new one and attach to new ticket
				$new_price = FALSE;
				foreach ( $existing_ticket_prices as $price ) {
					//is this the existing price?
					if ( $existing_prc->ID() == $price->ID() ) {
						//create new price, but make sure that we 'reset' any necessary columns/fields.
						if ( isset( $fields_n_values['PRC_ID'] ) )
							$fields_n_values['PRC_ID'] = NULL; //make sure if PRC_ID is set that we null it to force insert
						$new_id = $this->insert($fields_n_values);
						$new_price = $new_ticket->_add_relation_to($new_id, 'Price');
						continue;
					}

					//not the existing price so make sure this price is added to the new ticket.
					$new_ticket->_add_relation_to($price, 'Price');
				}

				//now we also need to make sure we add the datetimes to the new ticket
				foreach ( $existing_datetimes as $datetime ) {
					$new_ticket->_add_relation_to( $datetime, 'Datetime' );
				}

				//now let's just return the new price object.  Client code will have to take care of retrieving the new ticket attached to this price object if needed.
				return $new_price;
			}
			
		}

		//nothing needs handling so let's just run regular update
		parent::update( $fields_n_values, $query_params );
	}
}

// End of file EEM_Price.model.php
// Location: /ee-mvc/models/EEM_Price.model.php
