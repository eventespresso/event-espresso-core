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
 * @ version		4.0
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
		
	}




	/**
	* 	Get all final event prices
	* 	@access 		public
	* 	@return 		array
	*/
	public function get_all_final_event_prices() {
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		//printr( $this->_all_event_prices, '$this->_all_event_prices  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		return $this->_all_event_prices;				
	}




	/**
	* 	Get all event prices and price modifiers for a particular event
	* 	@access 		private
	* 	@param		int 			$EVT_ID  
	* 	@return 		array
	*/
	private function _get_all_event_prices_and_modifiers( $EVT_ID = FALSE ) {
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
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
		$this->_get_final_event_ticket_prices();
	}





	/**
	*	remove overridden defaults from list of event prices
	* 	@access 		private
	* 	@param		array 			$event_prices		  
	* 	@param		array 			$default_prices (globals)		  
	* 	@return 		array
	*/
	private function _remove_overridden_defaults( $event_prices, $default_prices ) {
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
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
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		// start with a few clean slates
		$base_prices = array();
		$price_modifiers = array();
		$today = time();
		// grab array of price types
		$types = $this->_PRT_MDL->type;
		
		// cycle thru events
		foreach ( $this->_all_event_prices as $event_price ) {
			// if members only, then check for login, OR let anybody in for non-member pricing
			if (( $types[ $event_price->type() ]->is_member() && is_user_logged_in() ) || ! $types[ $event_price->type() ]->is_member() ) {
				// if calendar controlled pricing, then check date, OR let anybody in for regular pricing ( setting FALSE in start_date and end_date methods returns timestamps )
				if (( $event_price->use_dates() && ( $event_price->start_date( FALSE ) <= $today && $event_price->end_date( FALSE ) >= $today )) || ! $event_price->use_dates() ) {
					// separate ticket prices ( order = 0 ) from adjuestments ( order > 0 )
					if ( $types[ $event_price->type() ]->order() == 0 ) {
						$base_prices[ $event_price->ID() ] = new EE_Ticket_Price_Base( new EE_Price_Composite( $event_price, $types[ $event_price->type() ] ));					
					} else {
						$price_modifiers[ $event_price->order() ][ $event_price->ID() ] = new EE_Price_Composite( $event_price, $types[ $event_price->type() ] );
					}
				}
			}
		}
		
		//printr( $base_prices, '$base_prices  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		//printr( $price_modifiers, '$price_modifiers  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		
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
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
	
		if ( ! $base_prices ) {
			return FALSE;
		}
		
		if ( ! $price_modifiers || empty( $price_modifiers )) {
			$this->_all_event_prices = $base_prices;
			return;
		}

		// start with a few clean slates
		$ticket_prices = array();
		$counter =0;
		// cycle thru ticket prices and apply price modifiers
		foreach( $base_prices as $ticket_price ) {
//			printr( $ticket_price, '$ticket_price  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			foreach( $price_modifiers as $order => $modifiers ) {
				foreach( $modifiers as $price_modifier ) {
//					printr( $price_modifier, '$price_modifier  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
					$ticket_price = new EE_Ticket_Price_Modifier( $ticket_price, $price_modifier );
				}
			}
			$ticket_prices[] = $ticket_price;
		}
		
//		foreach ( $ticket_prices as $ticket_price ) {
//			printr( $ticket_price, '$ticket_price  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		}
		
		$this->_all_event_prices = $ticket_prices;
	}





	/**
	* 	serialize and encode object for use in forms, etc.
	* 	usage EE_Ticket_Prices::obfuscate( $thing_to_obfuscate );
	* 
	* 	@access 		public
	* 	@param 		string $thing_to_obfuscate
	* 	@return 		string
	*/
	public static function obfuscate( $thing_to_obfuscate = '' ) {
		// use the following to unencode price objects:
		// unserialize( gzinflate( base64_decode( $obfuscatedThing )))
		// OR call EE_Ticket_Prices::unobfuscate( $obfuscatedThing );		
		return base64_encode( serialize( $thing_to_obfuscate ));
//		return gzdeflate( base64_encode( serialize( $thing_to_obfuscate )));
	}




	/**
	*	undo obfuscation of price object
	* 	usage EE_Ticket_Prices::unobfuscate( $obfuscatedThing );	
	* 
	* @access 		public
	* @param 		string $obfuscatedThing
	* @return 		string
	*/
	public static function unobfuscate ( $obfuscatedThing = '' ) {
		return unserialize( base64_decode( $obfuscatedThing ));
//		return unserialize( base64_decode( gzinflate( $obfuscatedThing )));
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
	* the name for the FINAL Ticket Price
	*
	* @access protected
	* @var string
	*/
	protected $_name = '';

	/**
	* list of price IDs
	*
	* @access protected
	* @var array
	*/
	protected $_ID_list = array();

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
	protected $_order_levels = array();


	
	// public methods
	abstract public function price();
	abstract public function name();
	abstract public function ID_list();
	abstract public function price_history();
	abstract public function order_totals();
	abstract public function order_levels();
	abstract public function obfuscate();
	// protected methods


}





/*
* ------------------------------------------------------------------------
*
* Ticket Price Base class
*
* @package		Event Espresso
* @subpackage	includes/classes/EE_Ticket_Price.class.php
* @author			Brent Christensen
*
* ------------------------------------------------------------------------
*/
class EE_Ticket_Price_Base extends EE_Ticket_Price {

	protected $_ticket_price;
	protected $_name;
	
	function __construct( EE_Price_Composite $base_price ) {
		global $org_options;
		$this->_ticket_price = $base_price;
		$this->_price = $base_price->amount();
		$this->_name = $base_price->name();
		$this->_ID_list[] = $base_price->ID();
		$this->_price_history[] = $base_price->name() . ': ' . $org_options['currency_symbol'] . number_format( max( $base_price->amount(), 0 ), 2, '.', ',' );
		$this->_order_totals[ $this->_ticket_price->order() ] = $this->price();
		if ( ! in_array( $this->_ticket_price->order(), $this->_order_levels )) {
			$this->_order_levels[] = $this->_ticket_price->order();
		}		
	}


	
	/**
	* 	get the price for the ticket
	* 
	* 	@access 		public
	* 	@return 		float
	*/
	public function price() {
		//return $this->_price;
		return number_format( max( $this->_price, 0 ), 2, '.', ',' );
	}


	/**
	* 	get the name for the ticket price
	* 
	* 	@access 		public
	* 	@return 		array
	*/
	public function name() {
		return $this->_name;
	}


	/**
	* 	get the list of price IDs
	* 
	* 	@access 		public
	* 	@return 		array
	*/
	public function ID_list() {
		return $this->_ID_list;
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
	public function order_totals() {
		return $this->_order_totals;
	}	


	/**
	* 	order levels
	* 
	* 	@access 		public
	* 	@return 		array
	*/
	public function order_levels() {
		return $this->_order_levels;
	}


	/**
	* 	serialize and encode object for use in forms, etc.
	* 
	* 	@access 		public
	* 	@return 		string
	*/
	public function obfuscate() {
		// use the following to unencode price objects:
		// unserialize( gzinflate( base64_decode( $obfuscatedString )))
		// OR call EE_Ticket_Prices::unobfuscate( $obfuscatedString );		
		return base64_encode( serialize( $this ));
//		return gzdeflate( base64_encode( serialize( $this )));
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
	protected $_price = 0.00;
	protected $_name = '';	
	protected $_ID_list = array();
	protected $_mod_amount = 0.00;
	protected $_price_history = array();
	protected $_order_totals = array();
	protected $_order_levels = array();

	
	function __construct( EE_Ticket_Price $ticket_price, EE_Price_Composite $price_mod ) {
		$this->_ticket_price = $ticket_price;
		$this->_price_mod = $price_mod;
		// copy elements
		$this->_price = $this->_ticket_price->price();
		$this->_name = $this->_ticket_price->name();
		$this->_ID_list = $this->_ticket_price->ID_list();
		$this->_ID_list[] = $price_mod->ID();
		$this->_price_history = $this->_ticket_price->price_history();
		$this->_order_totals = $this->_ticket_price->order_totals();
		$this->_order_levels = $this->_ticket_price->order_levels();
		// if order equals zero, then we'll use the order from the price type (which will still be zero for base ticket prices)
		$mod_order = $this->_price_mod->order() == 0 ? $this->_price_mod->type_order() : $this->_price_mod->order();
		if ( ! in_array( $mod_order, $this->_order_levels )) {
			$this->_order_levels[] = $mod_order;
		}
		$this->_calculate_mod_amount();
		$this->_set_price();
		$this->_set_price_history();
		$this->_set_order_totals();
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
	* 	set get the price for the ticket
	* 
	* 	@access 		protected
	* 	@return 		float
	*/
	protected function _set_price() {
		$this->_price = $this->_price + $this->_mod_amount;
		$this->_price = number_format( max( $this->_price, 0 ), 2, '.', ',' );
	}


	/**
	* 	_calculate_mod_amount
	* 
	* 	@access 		protected
	* 	@return 		float
	*/
	protected function _calculate_mod_amount() {
		
//		echo '<h4>base_price : ' . $this->_ticket_price->name() . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>price_mod : ' . $this->_price_mod->name() . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>price : ' . $this->_price . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		printr( $this->_order_levels, '_order_levels  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		printr( $this->_order_totals, '_order_totals  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		
		$price_mod_order = $this->_price_mod->order();
//		echo '<h4>$price_mod_order : ' . $price_mod_order . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';

		$last_order = end( $this->_order_levels );
//		echo '<h4>$last_order : ' . $last_order . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
		$last_order_level_key = key( $this->_order_levels );
//		echo '<h4>$last_order : ' . $last_order . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';

		$price_mod_order_key = array_search( $this->_price_mod->order(), $this->_order_levels );
//		echo '<h4>$price_mod_order_key : ' . $price_mod_order_key . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
		$prev_price_mod_order = $price_mod_order_key != 0 ? $price_mod_order_key - 1 : $last_order_level_key;
//		echo '<h4>$prev_price_mod_order : ' . $prev_price_mod_order . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';

		$price = isset( $this->_order_totals[ $prev_price_mod_order ] ) ? $this->_order_totals[ $prev_price_mod_order ] : $this->_price ;
//		echo '<h4>calculate_mod_from : ' . $price . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';

		$mod_amount = $this->_price_mod->is_percent() ? ( $price * $this->_price_mod->amount() / 100 ) : $this->_price_mod->amount();

		// if base type is discount, then multiply $mod_amount by -1 to make it negative, so that it actually gets subtracted when it's added
		$mod_amount = ( $this->_price_mod->base_type() == 2 ? -1 : 1 ) * $mod_amount;
		$mod_amount = number_format( $mod_amount, 2, '.', ',' );
//		echo '<h4>$mod_amount : ' . $mod_amount . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4><br/><br/>';
		$this->_mod_amount = $mod_amount;
	}


	/**
	* 	set get the price history for the ticket
	* 
	* 	@access 		protected
	* 	@return 		array
	*/
	protected function _set_price_history() {
		global $org_options;
		$plus_or_minus = $this->_price_mod->base_type() == 3 ? ' +' : ' ';
		$this->_price_history[] = $this->_price_mod->name() . ':' . $plus_or_minus . $this->_mod_amount . ' = ' . $org_options['currency_symbol'] . $this->price();
	}


	/**
	* 	set price totals for each order level
	* 
	* 	@access 		protected
	* 	@return 		array
	*/
	protected function _set_order_totals() {
		$this->_order_totals[ $this->_price_mod->order() ] = $this->price();
	}	


	/**
	* 	get the mod_amount for the ticket
	* 
	* 	@access 		public
	* 	@return 		float
	*/
	public function mod_amount() {
		return $this->_mod_amount;
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
	* 	get the name for the ticket price
	* 
	* 	@access 		public
	* 	@return 		array
	*/
	public function name() {
		return $this->_ticket_price->name();
	}


	/**
	* 	get the list of price IDs
	* 
	* 	@access 		public
	* 	@return 		array
	*/
	public function ID_list() {
		return $this->_ID_list;
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
	public function order_totals() {
		return $this->_order_totals;
	}	


	/**
	* 	order levels
	* 
	* 	@access 		public
	* 	@return 		array
	*/
	public function order_levels() {
		return $this->_order_levels;
	}


	/**
	* 	serialize and encode object for use in forms, etc.
	* 
	* 	@access 		public
	* 	@return 		string
	*/
	public function obfuscate() {
		// use the following to unencode price objects:
		// unserialize( gzinflate( base64_decode( $obfuscatedString )))
		// OR call EE_Ticket_Prices::unobfuscate( $obfuscatedString );		
		return base64_encode( serialize( $this ));
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
		$order = $this->_PRC->order() == 0 ? $this->_PRT->order() : $this->_PRC->order();
		return $order; 
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