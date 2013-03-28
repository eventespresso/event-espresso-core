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
 * Taxes class
 *
 * @package		Event Espresso
 * @subpackage	includes/classes/EE_Taxes.class.php
 * @author			Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EE_Taxes extends EE_BASE {

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
	* 	@Constructor
	* 	@access 		public
	* 	@param		object		$grand_total  
	* 	@return 		void
	*/
	public function __construct( EE_Ticket_Price $grand_total ) {

		$this->_grand_total = $grand_total;

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
		
		$this->_PRC_MDL = EEM_Price::instance();
		$this->_PRT_MDL = EEM_Price_Type::instance();
		
		$this->_taxes = $this->_PRC_MDL->get_all_prices_that_are_taxes();
		$this->_calculate_taxes();
		add_filter( 'espresso_filter_hook_grand_total_after_taxes', array( $this, '_grand_total_after_taxes' ), 10, 1 );
		
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
				$tax_object = new EE_Price_Composite( $tax, $this->_PRT_MDL->type[ $tax->type() ] );
				$this->_grand_total = new EE_Ticket_Price_Modifier( $this->_grand_total, $tax_object );
				// template args
				$this->_calculated_taxes[ $tax->ID() ] = array('name' => $tax->name(), 'percent' => $tax->amount(), 'amount' => $this->_grand_total->mod_amount() );
				$tax_totals[ $tax->ID() ] = $this->_grand_total->mod_amount();
			}
		}
		// add tax data to session
		global $EE_Session;
		$EE_Session->set_session_data( 
				array(
						'taxes' 										=> $this->_calculated_taxes,
						'tax_totals' 								=> $tax_totals,
						'grand_total_price_object' 	=> $this->_grand_total,
						'_cart_grand_total_amount' 	=> $this->_grand_total->price()
				),
				'session_data'
		);
		$session_data = $EE_Session->get_session_data();
		
	}





	/**
	* 	 get cart grand total after taxes have been applied
	* 	@access 		public  
	* 	@return 		array
	*/
	public function _grand_total_after_taxes() {	
		return $this->_grand_total->price();		
	}



}





if ( ! class_exists( 'EE_Ticket_Price' )) {
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Ticket_Prices.class.php');
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
class EE_Total extends EE_Ticket_Price {

	protected $_name;
	
	function __construct( $total, $name ) {
		global $org_options;
		$this->_price = $total;
		$this->_name = $name;
		$this->_ID_list[] = 0;
		$this->_price_history[] = $name . ': ' . $org_options['currency_symbol'] . $this->price();
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
	public function obfuscate() {
		// use the following to unencode price objects:
		// unserialize( gzinflate( base64_decode( $obfuscatedString )))
		// OR call EE_Ticket_Price::unobfuscate( $obfuscatedString );		
		return base64_encode( serialize( $this ));
	}
	

	
}




// End of file EE_Taxes.class.php
// Location: /includes/classes/EE_Taxes.class.php