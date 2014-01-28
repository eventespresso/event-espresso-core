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
 * Taxes class
 *
 * @package		Event Espresso
 * @subpackage	includes/classes/EE_Taxes.class.php
 * @author			Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
EE_Registry::instance()->load_class( 'Cost_Calculator', array(), FALSE, TRUE, TRUE );
class EE_Taxes extends EE_BASE {

	/**
	 * 	EE_Registry Object
	 *	@var 	EE_Registry	$EE	
	 * 	@access 	protected
	 */
	protected $EE = NULL;

	/**
	* total after taxes have been applied
	*
	* @access protected
	* @var float
	*/
	protected $_grand_total = 0.00;

	/**
	* array of applicable taxes
	*
	* @access protected
	* @var array
	*/
	protected $_taxes = array();

	/**
	* array of calculated taxes
	*
	* @access protected
	* @var array
	*/
	protected $_calculated_taxes = array();
	
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
	 * This is used for when EE_Taxes is used statically by the admin
	 * @todo: probably will be obsolete once EE_Cost_Calculator is reworked to use tickets.
	 * @var float
	 */
	private static $_subtotal = 0;




	/**
	 * This holds an array of EE_Price objects that are of PRT_ID == 4 (tax price types)
	 * @todo: will likely become obsolete once EE_Cost Calculator is reworked to use tickets
	 * @var EE_Price[]
	 */
	private static $_default_taxes = NULL; 







	/**
	* 	@Constructor
	* 	@access 		public
	* 	@param		object		$grand_total  
	* 	@return 		void
	*/
	public function __construct( EE_Ticket_Cost $grand_total ) {

		// load registry and models
			
		$this->_PRC_MDL = EE_Registry::instance()->load_model( 'Price' );
		$this->_PRT_MDL = EE_Registry::instance()->load_model( 'Price_Type' );
		EE_Registry::instance()->load_class( 'EE_Cost_Calculator' );
		
		$this->_grand_total = $grand_total;
		$this->_taxes = $this->_PRC_MDL->get_all_prices_that_are_taxes();
		$this->_calculate_taxes();
		add_filter( 'FHEE__EED_Single_Page_Checkout__registration_checkout__grand_total', array( $this, '_grand_total_after_taxes' ), 10, 1 );
		
	}





	/**
	* 	 calculate taxes
	* 	@access 		public
	* 	@param		float		$grand_total  
	* 	@return 		array
	*/
	public static function calculate_taxes( $grand_total = 0 ) {
		// create Ticket Price object from grand total and pass to constructor
		$taxes = new self( new EE_Total( $grand_total, 'Sub Total' ));	
		return $taxes->get_taxes();
	}





	/**
	* 	 get taxes
	* 	@access 		public  
	* 	@return 		array
	*/
	public function get_taxes() {
		return $this->_calculated_taxes;
	}





	/**
	* 	 calculate taxes
	* 	@access 		private
	* 	@return 		array
	*/
	private function _calculate_taxes() {
		
		$tax_totals = array();
		
		foreach( $this->_taxes as $order => $taxes ) {
			foreach( $taxes as $tax ) {
				// create ticket price object from tax data
				$tax_object = new EE_Price_Composite( $tax, $this->_PRT_MDL->get_one_by_ID($tax->type()));
				$this->_grand_total = new EE_Ticket_Price_Modifier( $this->_grand_total, $tax_object );
				// template args
				$this->_calculated_taxes[ $tax->ID() ] = array('name' => $tax->name(), 'percent' => $tax->amount(), 'amount' => $this->_grand_total->mod_amount() );
				$tax_totals[ $tax->ID() ] = $this->_grand_total->mod_amount();
			}
		}
		// add tax data to session
		EE_Registry::instance()->SSN->set_session_data( array(
			'taxes' => $this->_calculated_taxes,
			'tax_totals' => $tax_totals,
			'grand_total_price_object' => $this->_grand_total,
			'_cart_grand_total_amount' => $this->_grand_total->price()
		));
		$session_data = EE_Registry::instance()->SSN->get_session_data();
		
	}





	/**
	* 	 get cart grand total after taxes have been applied
	* 	@access 		public  
	* 	@return 		array
	*/
	public function _grand_total_after_taxes() {	
		return $this->_grand_total->price();		
	}



	/**
	 * This method simply calculates the total taxes for a given ticket (by pulling the prices attached to the ticket and applying default taxes to it).
	 * Note: this is just an intermediary helper method added to facilitate quick calc of taxes for tickets listed in the event editor. Eventually it will be rendered obsolete once EE_Cost_Calculator has been refactored for the tickets (instead of just prices)
	 * @param  EE_Ticket $ticket incoming EE_Ticket
	 * @return float 			 total taxes to apply to ticket.
	 */
	public static function get_total_taxes_for_admin( EE_Ticket $ticket ) {
		$tax = 0;
		$total_tax = 0;

		//This first checks to see if the given ticket is taxable.
		if ( ! $ticket->get('TKT_taxable') )
			return $tax;

		//get subtotal (notice we're only retrieving a subtotal if there isn't one given)
		$subtotal = self::get_subtotal_for_admin($ticket);
		//get taxes
		$taxes = self::get_taxes_for_admin();

		//apply taxes to subtotal
		foreach ( $taxes as $tax ) {
			$total_tax += $subtotal * $tax->get('PRC_amount') / 100; //assuming taxes are not culmative
		}

		return $total_tax;
	}



	/**
	 * get all default prices that are a Tax price type (PRT_ID = 4) and return
	 * @return EE_Price[] EE_Price objects that have PRT_ID == 4
	 */
	public static function get_taxes_for_admin() {
		self::$_default_taxes = !empty( self::$_default_taxes ) ? self::$_default_taxes : EE_Registry::instance()->load_model('Price')->get_all( array( array( 'Price_Type.PBT_ID' => 4 )));
		return self::$_default_taxes;
	}



	public static function get_subtotal_for_admin( EE_Ticket $ticket ) {
		$TKT_ID = $ticket->ID();
		return isset( self::$_subtotal[$TKT_ID] ) ? self::$_subtotal[$TKT_ID] : self::_get_subtotal_for_admin($ticket);
	}


	/**
	 * simply take an incoming ticket and calculate the subtotal for the ticket
	 * @param  EE_Ticket $ticket 
	 * @return float     subtotal calced from all EE_Price[] on Ticket.
	 */
	private static function _get_subtotal_for_admin( EE_Ticket $ticket ) {
		$subtotal = 0;

		//get all prices
		$prices = $ticket->get_many_related( 'Price', array('default_where_conditions' => 'none', 'order_by' => array('PRC_order' => 'ASC')) );

		//let's loop through them (base price is always the first item)
		foreach ( $prices as $price ) {
			switch ( $price->type_obj()->base_type() ) {

				case 1: // base price
				case 3: // surcharges
					$subtotal += $price->is_percent() ? $subtotal * $price->get('PRC_amount') / 100 : $price->get('PRC_amount');
					break;

				case 2: // discounts
					$subtotal -= $price->is_percent() ? $subtotal * $price->get('PRC_amount') / 100 : $price->get('PRC_amount');
					break;
			}
		}
		$TKT_ID = $ticket->ID();
		self::$_subtotal = array( $TKT_ID => $subtotal);
		return $subtotal;
	}



}








		


/*
* ------------------------------------------------------------------------
*
* Total Price class
*
* @package		Event Espresso
* @subpackage	includes/classes/EE_Taxes.class.php
* @author			Brent Christensen
*
* ------------------------------------------------------------------------
*/
class EE_Total extends EE_Ticket_Cost {

	protected $_name;
	
	function __construct( $total, $name ) {
		
		EE_Registry::instance()->load_helper( 'Template' );

		$this->_price = $total;
		$this->_name = $name;
		$this->_ID_list[] = 0;
		$this->_price_history[] = $name . ': ' . EEH_Template::format_currency( $this->_price );
		$this->_order_totals[ 0 ] = $this->price();
		$this->_order_levels[] = 0;
	}



	/**
	* 	get the price for the ticket
	* 
	* 	@access 		public
	* 	@return 		float
	*/
	public function price() {
		return EEH_Template::format_currency( $this->_price, TRUE );
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
	* 	@access 		public
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
//	public function obfuscate() {
//		// use the following to unencode price objects:
//		// unserialize( gzinflate( base64_decode( $obfuscatedString )))
//		// OR call EE_Ticket_Price::unobfuscate( $obfuscatedString );		
//		return base64_encode( serialize( $this ));
//	}
	

	
}




// End of file EE_Taxes.class.php
// Location: /includes/classes/EE_Taxes.class.php