<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package		Event Espresso
 * @ author			Seth Shoultes
 * @ copyright	(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version		3.2
 *
 * ------------------------------------------------------------------------
 *
 * Ticket Prices class
 *
 * @package		Event Espresso
 * @subpackage	includes/classes/EE_Ticket_Prices.class.php
 * @author			Brent Christensen
 * @author			Sidney Harell
 *
 * ------------------------------------------------------------------------
 */
class EE_Ticket_Prices extends EE_BASE {

	/**
	* array of all event ticket prices and price modifiers
	*
	* @access protected
	* @var array
	*/
	protected $_all_event_prices = array();
	
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
	* 	@Constructor
	* 	@access 		public
	* 	@param		int 			$EVT_ID  
	* 	@return 		void
	*/
	public function __construct( $EVT_ID = FALSE ) {
	
		if ( ! absint( $EVT_ID )) {
			global $espresso_notices;
			$espresso_notices['errors'][] = 'An Event ID was not supplied.';
			return FALSE;
		}

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
		
		$this->_PRC_MDL = EEM_Price::instance();
		$this->_PRT_MDL = EEM_Price_Type::instance();
		
		$this->_get_all_event_prices_and_modifiers( $EVT_ID );
		$this->_get_final_event_ticket_prices();
		
		return $this->_all_event_prices;

	}




	/**
	* 	Get all event prices and price modifiers for a particular event
	* 	@access 		private
	* 	@param		int 			$EVT_ID  
	* 	@return 		array
	*/
	private function _get_all_event_prices_and_modifiers( $EVT_ID = FALSE ) {
		// get event specific prices and modifiers
		if ( ! $event_prices = $this->_PRC_MDL->get_all_event_prices( $EVT_ID )) {
			$event_prices = array();
		}
		// get default (global)  prices and modifiers
		if ( ! $default_prices = $this->_PRC_MDL->get_all_event_default_prices()) {
			$default_prices = array();
		}
		// merge price lists
		$this->_remove_overridden_defaults( $event_prices, $default_prices );
	}





	/**
	*	remove overridden defaults from list of event prices
	* 	@access 		private
	* 	@param		array 			$event_prices		  
	* 	@param		array 			$default_prices (globals)		  
	* 	@return 		array
	*/
	private function _remove_overridden_defaults( $event_prices, $default_prices ) {
		// grab IDs for default prices (globals))
		$default_price_IDs = array_keys( $default_prices );
		// cycle thru events
		foreach ($event_prices as $event_price) {
			// if the price is overriding a default price
			if ( in_array( $event_price->overrides(), $default_price_IDs )) {
				// then remove that default price ( cuz it's being overridden - duh! )
				unset( $default_prices[$event_price->overrides()] );
			}
		}
		// now merge our remaining prices into one list
		$this->_all_event_prices = array_merge( $event_prices, $default_prices);
	}






	/**
	* 	get all the final computed ticket prices for an event
	* 
	* 	@access 		private
	* 	@return 		array
	*/
	private function _get_final_event_ticket_prices() {
		// start with a few clean slates
		$base_prices = array();
		$price_modifiers = array();
		// grab array of price types
		$types = $this->_PRT_MDL->type;
		// cycle thru events
		foreach ( $this->_all_event_prices as $event_price ) {
			// separate ticket prices ( order = 0 ) from adjuestments ( order > 0 )
			if ( $event_price->order() == 0 ) {
				$base_prices[ $event_price->ID() ] = new EE_Base_Price( new EE_Price_Composite( $event_price, $types[ $event_price->type() ] ));
			} else {
				$price_modifiers[ $event_price->ID() ] = new EE_Price_Composite( $event_price, $types[ $event_price->type() ] );
			}
		}
		
//		printr( $base_prices, '$base_prices  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		printr( $price_modifiers, '$price_modifiers  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		
		$this->_apply_modifiers_to_ticket_prices( $base_prices, $price_modifiers );
		
	}





	/**
	*	apply discounts and surcharges to ticket prices
	* 
	* @param array $price_modifiers
	* @param array $ticket_prices
	* @return array
	*/
	private function _apply_modifiers_to_ticket_prices ( $base_prices=FALSE, $price_modifiers=FALSE ) {
	
		if ( ! $base_prices ) {
			return FALSE;
		}
		
		if ( ! $price_modifiers ) {
			return $base_prices;
		}
		
		// start with a few clean slates
		$ticket_prices = array();
		$key =0;
		// cycle thru ticket prices and apply price modifiers
		foreach( $base_prices as $base_price ) {
//			printr( $base_price, '$base_price  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			foreach( $price_modifiers as $price_modifier ) {
//				printr( $price_modifier, '$price_modifier  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
				$prev_obj = $key == 0 ? $base_price : $ticket_prices[ $key ];
				$key++;
				$ticket_prices[ $key ] = new EE_Ticket_Price_Modifier( $prev_obj, $price_modifier );
			}
		}
		printr( $ticket_prices, '$ticket_prices  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		foreach ( $ticket_prices as $ticket_price ) {
//			echo '<h4>price : ' . $ticket_price->price() . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>'; 
//			printr( $ticket_price->price_history(), 'price_history  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		}
		
//		printr( $ticket_prices, '$ticket_prices  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		$this->_all_event_prices = $ticket_prices;
	}





}





/*
* ------------------------------------------------------------------------
*
* Ticket Price class
*
* @abstract
* @package		Event Espresso
* @subpackage	includes/classes/EE_Ticket_Price.class.php
* @author			Brent Christensen
*
* ------------------------------------------------------------------------
*/
abstract class EE_Ticket_Price extends EE_BASE {

	/**
	* the FINAL Ticket Price after all modifications
	*
	* @access protected
	* @var float
	*/
	protected $_price = 0.00;

	/**
	* an array of ALL Prices and Price Modifiers employed to acheive the final Ticket Price
	*
	* @access protected
	* @var array
	*/
	protected $_price_history = array();

	/**
	* the final calculated price for each order level
	* used for calculating parallel modifications where two modifiers (like surcharges or discounts)
	* need to be applied to the former total without piggy backing off of each other (ie: applied in series)
	* for eaxmple: two 10% surcharges applied in parallel to $100 = $100 + $10 +$10 = $120
	* whereas two  10% surcharges applied in series to $100 = $100 + $10 = $110 + $11 = $121
	*
	* @access protected
	* @var array
	*/
	protected $_order_totals = array();


	
	// public methods
	abstract public function price();
	abstract public function price_history();
	// protected methods
	abstract protected function order_totals();

	
}





/*
* ------------------------------------------------------------------------
*
* Base Price class
*
* @package		Event Espresso
* @subpackage	includes/classes/EE_Ticket_Price.class.php
* @author			Brent Christensen
*
* ------------------------------------------------------------------------
*/
class EE_Base_Price extends EE_Ticket_Price {

	protected $_ticket_price;
	
	function __construct( EE_Price_Composite $base_price ) {
		$this->_ticket_price = $base_price;
		$this->_price = $base_price->amount();
		$this->_price_history = $base_price->name() . '  ' . $base_price->amount();
		$this->_order_totals[ $this->_ticket_price->order() ] = $this->price();
	}

	/**
	* 	get the price for the ticket
	* 
	* 	@access 		public
	* 	@return 		float
	*/
	public function price() {
		return $this->_price;
	}

	/**
	* 	get the price history for the ticket
	* 
	* 	@access 		public
	* 	@return 		array
	*/
	public function price_history() {
		return $this->_price_history;
	}


	/**
	* 	price totals for each order level
	* 
	* 	@access 		protected
	* 	@return 		array
	*/
	protected function order_totals() {
		return $this->_order_totals;
	}


}





/*
* ------------------------------------------------------------------------
*
* 	Ticket Price Modifier class - abstract Decorator
*
*	@abstract
* 	@package		Event Espresso
* 	@subpackage	includes/classes/EE_Ticket_Price.class.php
* 	@author			Brent Christensen
*
* ------------------------------------------------------------------------
*/
abstract class EE_Price_Modifier extends EE_Ticket_Price {

	protected $_ticket_price;
	protected $_price_mod;

	function __construct( EE_Ticket_Price $ticket_price, EE_Price_Composite $price_mod ) {
		$this->_ticket_price = $ticket_price;
		$this->_price_mod = $price_mod;
	}

}





/*
* ------------------------------------------------------------------------
*
* 	Ticket Price Modifier class
*
* 	@package		Event Espresso
* 	@subpackage	includes/classes/EE_Ticket_Price.class.php
* 	@author			Brent Christensen
*
* ------------------------------------------------------------------------
*/
class EE_Ticket_Price_Modifier extends EE_Price_Modifier {


	/**
	* 	get the price for the ticket
	* 
	* 	@access 		public
	* 	@return 		float
	*/
	public function price() {
		$mod_amount = $this->_calculate_mod_amount();	
		return $this->_price +$mod_amount;
	}

	/**
	* 	_calculate_mod_amount
	* 
	* 	@access 		private
	* 	@return 		float
	*/
	private function _calculate_mod_amount() {
//		printr( $this->_price_mod, '$this->_price_mod  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		if ( $this->_price_mod->is_percent() ) {
			$mod_amount = $this->price() * $this->_price_mod->amount() / 100;
		} else {
			$mod_amount = $this->_price_mod->amount();
		}
		// if base type is discount, then multiply $mod_amount by -1 to make it negative, so that it actually gets subtracted
		$mod_amount = ( $this->_price_mod->base_type() == 2 ? -1 : 1 ) * $mod_amount;
		return $mod_amount;
	}

	/**
	* 	get the price history for the ticket
	* 
	* 	@access 		public
	* 	@return 		array
	*/
	public function price_history() {
		// if base type is a surcharge, show a plus sign. Discounts will be negative and will already show 
		$plus_or_minus = $this->_price_mod->base_type() == 3 ? ' +' : ' ';
		$mod_amount = $this->_calculate_mod_amount();	
		$this->_price_history[] = $this->_price_mod->name() . $plus_or_minus . $mod_amount;
		return $this->_price_history;
	}


	/**
	* 	price totals for each order level
	* 
	* 	@access 		protected
	* 	@return 		array
	*/
	protected function order_totals() {
		$this->_order_totals[ $this->_price_mod->order() ] = $this->price();
		return $this->_order_totals;
	}



}








/*
* ------------------------------------------------------------------------
*
* 	EE_Price_Composite class
*
*	simply combines a Price and Price Type object into one
*
* 	@package		Event Espresso
* 	@subpackage	includes/classes/EE_Ticket_Price.class.php
* 	@author			Brent Christensen
*
* ------------------------------------------------------------------------
*/
class EE_Price_Composite {


	/**
	* Price object
	*
	* @access private
	* @var object
	*/
	private $_PRC = NULL;


	/**
	* Price TYPE object
	*
	* @access private
	* @var object
	*/
	private $_PRT = NULL;





	/**
	 *	Price and Price Type objects combined
	 *
	 *	@access 		public
	* 	@param		object 		$price			  	EE_Price object
	* 	@param		object 		$price_type		EE_Price_Type object	  
	* 	@return 		object
	 */
	function __construct( EE_Price $price, EE_Price_Type $price_type ) {		
		$this->_PRC = $price;
		$this->_PRT = $price_type;
	}





	/**
	*	Price object methods
	*/
	public function ID() {
		return $this->_PRC->ID();
	}
	public function event() {
		return $this->_PRC->event();
	}
	public function amount() {
		return $this->_PRC->amount();
	}
	public function name() {
		return $this->_PRC->name();
	}
	public function desc() {
		return $this->_PRC->desc();
	}
	public function reg_limit() {
		return $this->_PRC->reg_limit();
	}
	public function tckts_left() {
		return $this->_PRC->tckts_left();
	}
	public function use_dates() {
		return $this->_PRC->use_dates();
	}
	public function start_date( $format = 'Y-m-d' ) {
		return $this->_PRC->start_date( $format );
	}
	public function end_date( $format = 'Y-m-d' ) {
		return $this->_PRC->end_date( $format );
	}
//		public function disc_limit_qty() {
//			return $this->_PRC->disc_limit_qty();
//		}
//		public function disc_code() {
//			return $this->_PRC->disc_code();
//		}
//		public function disc_qty() {
//			return $this->_PRC->disc_qty();
//		}
//		public function disc_apply_all() {
//			return $this->_PRC->disc_apply_all();
//		}
//		public function disc_wp_user() {
//			return $this->_PRC->disc_wp_user();
//		}
	public function is_active() { 
		return $this->_PRC->is_active(); 
	}
	public function overrides() { 
		return $this->_PRC->overrides(); 
	}
	public function order() { 
		return $this->_PRC->order(); 
	}
	public function deleted() { 
		return $this->_PRC->deleted(); 
	}





	/**
	*	Price Type object methods
	*/
	public function type() {
		return $this->_PRT->ID();
	}
	public function type_name() {
		return $this->_PRT->name();
	}
	public function base_type() {
		return $this->_PRT->base_type();
	}
	public function is_member() {
		return $this->_PRT->is_member();
	}
	public function is_percent() {
		return $this->_PRT->is_percent();
	}
	public function is_global() {
		return $this->_PRT->is_global();
	}
	public function type_order() {
		return $this->_PRT->order();
	}
	public function type_deleted() {
		return $this->_PRT->deleted();
	}


}






// End of file EE_Ticket_Price.class.php
// Location: /includes/classes/EE_Ticket_Price.class.php