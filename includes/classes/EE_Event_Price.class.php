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
 * Event Price Class
 *
 * @package				Event Espresso
 * @subpackage			includes/classes/EE_Event_Price.class.php
 * @author					Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EE_Event_Price {





	/**
	 * Properties copied from Price object
	 * @access private
	 * @var object
	 */
		private $_ID = NULL;
		private $_event	= NULL;
		private $_orig_price = NULL;
		private $_final_price = NULL;
		private $_name = NULL;
		private $_desc	 = NULL;
		private $_reg_limit = NULL;
		private $_use_dates = NULL;
		private $_start_date = NULL;
		private $_end_date = NULL;
		private $_is_active = NULL;
		private $_overrides	 = NULL;
		private $_deleted = NULL;
		private $_order = NULL;


	/**
	 * Properties copied from Price Type object
	 * @access private
	 * @var object
	 */
		private $_price_type_ID = NULL;
		private $_price_type = NULL;
		private $_is_member = NULL;
		private $_is_discount = NULL;
		private $_is_tax = NULL;
		private $_is_percent = NULL;
		private $_is_global = NULL;


    /**
	 *	Event-Price adjustments
	 *
	 *	@access	private
	 *	@var array
	 */
	private $_adjustments = array();


    /**
	 *	Price Type Model
	 *
	 *	@access	private
	 *	@var array
	 */
	private $_PRT_MDL = NULL;





	/**
	 * @param  object 	$price
	 * @param  object		$price_type
	 */
	public function __construct( EE_Price $price ) {
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
		$this->_PRT_MDL = EEM_Price_Type::instance();
		$this->copy_object_properties( $price );	
	}





	/**
	 *	grab all properties from child object
	 *
	 *	@access 		public
	* 	@return 		float
	 */
	public function copy_object_properties( $price ) {

		$this->_ID						= $price->ID();
		$this->_event					= $price->event();
		$this->_orig_price			= $price->amount();
		$this->_final_price			= $price->amount(); // duplicated so we can have both original AND final price
		$this->_name					= $price->name();
		$this->_desc					= $price->desc();
		$this->_reg_limit			= $price->reg_limit();
		$this->_use_dates			= $price->use_dates();
		$this->_start_date			= $price->start_date();
		$this->_end_date			= $price->end_date();
		$this->_is_active			= $price->is_active();
		$this->_overrides			= $price->overrides();
		$this->_deleted				= $price->deleted();
		$this->_order					= $price->order();

		$this->_price_type_ID = $price->type();
		$this->_price_type = $this->_PRT_MDL->type[ $price->type() ]->name();
		$this->_is_member = $this->_PRT_MDL->type[ $price->type() ]->is_member();
		$this->_is_discount = $this->_PRT_MDL->type[ $price->type() ]->is_discount();
		$this->_is_tax = $this->_PRT_MDL->type[ $price->type() ]->is_tax();
		$this->_is_percent = $this->_PRT_MDL->type[ $price->type() ]->is_percent();
		$this->_is_global = $this->_PRT_MDL->type[ $price->type() ]->is_global();
		
	}




	/**
	 *	apply modifiers to an Event Price to acheive the Final Event Price
	 *
	 *	@access 		public
	 *	@param 		object		$price_modifier
	* 	@return 		float
	 */
	public function apply_price_modifier( $price_modifier ) {
		global $espresso_notices;
		
		if ( ! is_object( $price_modifier )) {
			$espresso_notices['errors'][] = 'A valid price modifier was not supplied.';
			return FALSE;
		}
		//echo printr( $price_modifier, '$price_modifier <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span>', 'auto' );
		
		$mod_amount = $price_modifier->amount();

		if ( $this->_PRT_MDL->type[ $price_modifier->type() ]->is_percent() ) {
		
			$percent_adj = $mod_amount;
			$mod_amount = $this->_orig_price * $mod_amount / 100;
			$this->_adjustments[] = array( 
																		'PRC_ID'=>$price_modifier->ID(),
																		'name'=>wp_strip_all_tags( $price_modifier->name() ),
																		'is_percent'=>true,
																		'percent_adjustment'=>"$percent_adj %",
																		'adjustment'=>$mod_amount
																	);
		} else {
		
			$this->_adjustments[] = array(
																		'PRC_ID'=>$price_modifier->ID(),
																		'name'=>wp_strip_all_tags( $price_modifier->name() ),
																		'is_percent'=>false,
																		'adjustment'=>$mod_amount
																	);
		}
		
		// instead of using an IF statement to perform either addition or subtraction, we just use addition, but first multiply discounts by -1 to make them negative
		$this->_final_price += (( $this->_is_discount ) ? -1 : 1) * $mod_amount;
		
		$this->_final_price = number_format( max( $this->_final_price, 0 ), 2 );

	}







	/**
	 * get original Price Object ID
	 * @return int
	 */
	public function ID() {
		return $this->_ID;
	}


	/**
	 * get original Price Object event ID
	 * @return int
	 */
	public function event() {
		return $this->_event;
	}


	/**
	 * get original price before modifiers 
	 * @return float
	 */
	public function orig_price() {
		return $this->_amount;
	}


	/**
	 * get final price
	 * @return float
	 */
	public function final_price() {
		return $this->_final_price;
	}


	/**
	 * get original Price Object name
	 * @return string
	 */
	public function name() {
		return $this->_name;
	}


	/**
	 * get original Price Object desc
	 * @return string
	 */
	public function desc() {
		return $this->_desc;
	}


	/**
	 * get original Price Object reg_limit
	 * @return int
	 */
	public function reg_limit() {
		return $this->_reg_limit;
	}


	/**
	 * get original Price Object use_dates flag
	 * @return boolean
	 */
	public function use_dates() {
		return $this->_use_dates;
	}


	/**
	 * get original Price Object start_date
	 * @return int
	 */
	public function start_date() {
		return $this->_start_date;
	}


	/**
	 * get original Price Object end_date
	 * @return int
	 */
	public function end_date() {
		return $this->_end_date;
	}


	/**
	 * get original Price Object is_active flag
	 * @return boolean
	 */
	public function is_active() {
		return $this->_is_active;
	}


	/**
	 * get original Price Object overrides ID
	 * @return int
	 */
	public function overrides() {
		return $this->_overrides;
	}


	/**
	 * get original Price Object deleted flag
	 * @return boolean
	 */
	public function deleted() {
		return $this->_deleted;
	}


	/**
	 * get original Price Object order
	 * @return int
	 */
	public function order() {
		return $this->_order;
	}


	/**
	 * get original Price Object Price Type ID
	 * @return int
	 */
	public function price_type_ID() {
		return $this->_price_type_ID;
	}





	/**
	 * get price type
	 * @return string
	 */
	public function price_type() {		
		return $this->_price_type;
	}


	/**
	 * get price is_member from price type
	 * @return boolean
	 */
	public function is_member() {		
		return $this->_is_member;
	}


	/**
	 * get price is_discount from price type
	 * @return boolean
	 */
	public function is_discount() {		
		return $this->_is_discount;
	}


	/**
	 * get price is_tax from price type
	 * @return boolean
	 */
	public function is_tax() {		
		return $this->_is_tax;
	}


	/**
	 * get price _is_percent from price type
	 * @return boolean
	 */
	public function _is_percent() {		
		return $this->_is_percent;
	}


	/**
	 * get price is_global from price type
	 * @return boolean
	 */
	public function is_global() {		
		return $this->_is_global;
	}


	/**
	 * get array of adjustments done to arrive at the final price
	 * @return array
	 */
	public function adjustments() {
		return $this->_adjustments;
	}





}

/****************   END of EVENT PRICE class   ****************/









/**
 * ------------------------------------------------------------------------
 * 
 * Event Prices Class
 *
 * @package				Event Espresso
 * @subpackage			includes/classes/EE_Event_Price.class.php
 * @author					Brent Christensen
 *
 * ------------------------------------------------------------------------
 */

class EE_Event_Prices {


	/**
	 * Price Model
	 *
	 * @access private
	 * @var object
	 */
	private $_PRC_MDL = NULL;


	/**
	 * Price TYPE Model
	 *
	 * @access private
	 * @var object
	 */
	private $_PRT_MDL = NULL;


	/**
	 * All Event Prices
	 *
	 * @access private
	 * @var array
	 */
	private $_all_event_prices = NULL;
	
	
	
	
	

	/**
	 * 	@Constructor
	 * 	@access 		public
	 * 	@param		int 			$EVT_ID  
	 * 	@return 		void
	 */
	public function __construct( $EVT_ID = FALSE ) {
	
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
		
		$this->_PRC_MDL = EEM_Price::instance();
		$this->_PRT_MDL = EEM_Price_Type::instance();
		
		$this->_all_event_prices = $this->_get_all_event_prices( $EVT_ID );
		//echo printr( $this->_all_event_prices, 'all_event_prices <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span>', 'auto' );

	}
	
	
	
	
	
	/**
	 * 	Get all event prices for a particular event
	 * 	@access 		private
	 * 	@param		int 			$EVT_ID  
	 * 	@return 		array
	 */
	private function _get_all_event_prices( $EVT_ID = FALSE ) {
	
		if ( ! absint( $EVT_ID )) {
			global $espresso_notices;
			$espresso_notices['errors'][] = 'An Event ID was not supplied.';
			return FALSE;
		}
		
		if ( ! $event_prices = $this->_PRC_MDL->get_all_event_prices( $EVT_ID )) {
			$event_prices = array();
		}

		if ( ! $default_prices = $this->_PRC_MDL->get_all_event_default_prices()) {
			$default_prices = array();
		}
			
		return $this->_remove_overridden_defaults_and_deleted_prices( $event_prices, $default_prices );
	}
	
	
	
	
	
	/**
	 * remove overridden defaults and deleted prices from list of event prices
	 * 	@access 		private
	 * 	@param		array 			$event_prices		  
	 * 	@param		array 			$default_prices (globals)		  
	 * 	@return 		array
	 */
	private function _remove_overridden_defaults_and_deleted_prices( $event_prices, $default_prices ) {
		// grab IDs for default prices (globals))
		$default_price_IDs = array_keys( $default_prices );
		// cycle thru events
		foreach ($event_prices as $event_price) {
			// if the price is overriding a default price
			if ( in_array( $event_price->overrides(), $default_price_IDs )) {
				// then remove that default price ( cuz it's being overridden - duh! )
				unset( $default_prices[$event_price->overrides()] );
			}
			// also remove any prices marked as deleted
			if ( $event_price->deleted()) {
				unset( $event_prices[$event_price->ID()] );
			}
		}
		// now merge our remaining prices into one list
		$prices = array_merge( $event_prices, $default_prices);
		
		return $prices;
	}
	
	
	

	/**
	 *	get all the final computed prices for an event
	 *
	 *	@access 		public
	 *	@return 		array 		price objects
	 */
	public function get_final_event_prices() {

		$ticket_prices = array();
		$price_modifiers = array();
		// cycle thru events
		foreach ( $this->_all_event_prices as $event_price ) {
			// separate ticket prices ( order = 0 ) from adjuestments ( order > 0 )
			if ( $event_price->order() == 0 ) {
				$ticket_prices[] = new EE_Event_Price( $event_price );
			} else {
				$price_modifiers[] = $event_price;
			}
		}
		
		$computed_prices = $this->_apply_modifiers_to_ticket_prices( $price_modifiers, $ticket_prices );
//		echo printr( $computed_prices, 'EVENT PRICES <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span>', 'auto' );
		
		return $computed_prices;
	}



	/**
	 *
	 * @param array $price_modifiers
	 * @param array $ticket_prices
	 * @return array
	 */
	private function _apply_modifiers_to_ticket_prices ( $price_modifiers=FALSE, $ticket_prices=FALSE ) {
	
		if ( ! $ticket_prices ) {
			global $espresso_notices;
			$espresso_notices['errors'][] = 'No Ticket Prices were supplied.';
			return FALSE;
		}
		
		if ( ! $price_modifiers ) {
			return $ticket_prices;
		}

		// cycle thru ticket prices and apply price modifiers
		foreach( $ticket_prices as $ticket_price ) {
			foreach( $price_modifiers as $price_modifier ) {
				$ticket_price->apply_price_modifier( $price_modifier );
			}
		}
		
		return $ticket_prices;
	}



/****************   END of EVENT PRICES class   ****************/

	
	
}

// End of file EE_Event_Price.class.php
// Location: /includes/classes/EE_Event_Price.class.php