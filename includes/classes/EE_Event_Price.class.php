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
	 * Price object
	 *
	 * @access private
	 * @var object
	 */
	private $_EVP_price = NULL;


	/**
	 * Price Types
	 *
	 * @access private
	 * @var object
	 */
	private static $_EVP_price_type = NULL;


    /**
	 *	Final Event Price 
	 *
	 *	@access	private
	 *	@var array
	 */
	private $_EVP_final_price = NULL;


    /**
	 *	Event-Price adjustments
	 *
	 *	@access	private
	 *	@var array
	 */
	private $_EVP_adjustments = NULL;





	/**
	 * @param  object 	$price
	 * @param  object		$price_type
	 */
	public function __construct( EE_Price $price ) {
		
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
		$PRT_MDL = EEM_Price_Type::instance();

		$this->_EVP_price = $price;
		self::$_EVP_price_type = $PRT_MDL->type[ $price->type() ];
		$this->_EVP_final_price = $price->amount();
		$this->_EVP_adjustments = array();
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
		$PRT_MDL = EEM_Price_Type::instance();

		if ( $PRT_MDL->type[ $price_modifier->type() ]->is_percent() ) {
		
			$percent_adj = $mod_amount;
			$mod_amount = $this->_EVP_final_price * $mod_amount / 100;
			$this->_EVP_adjustments[] = array( 
																		'PRC_ID'=>$price_modifier->ID(),
																		'name'=>wp_strip_all_tags( $price_modifier->name() ),
																		'is_percent'=>true,
																		'percent_adjustment'=>"$percent_adj %",
																		'adjustment'=>$mod_amount
																	);
		} else {
		
			$this->_EVP_adjustments[] = array(
																		'PRC_ID'=>$price_modifier->ID(),
																		'name'=>wp_strip_all_tags( $price_modifier->name() ),
																		'is_percent'=>false,
																		'adjustment'=>$mod_amount
																	);
		}
		
		$discount_or_surcharge = $PRT_MDL->type[ $price_modifier->type() ]->is_discount() ? 'discount' : 'surcharge';
		// instead of using an IF statement to do either addition or subtraction, we simply add everything, but first multiply discounts by -1 to make them negative
		$this->_EVP_final_price += (( $discount_or_surcharge == 'discount' ) ? -1 : 1) * $mod_amount;
		
		$this->_EVP_final_price = number_format( max( $this->_EVP_final_price, 0 ), 2 );

	}





	/**
	 * return array of adjustments done to arrive at the final price
	 * @return type array
	 */
	public function adjustments() {
		return $this->_EVP_adjustments;
	}






	/**
	 * return final price
	 * @return type float
	 */
	public function final_price() {
		return $this->_EVP_final_price;
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