<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('AHEE_log', __FILE__, ' FILE LOADED', '' );/**
 *
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package		Event Espresso
 * @ author		Seth Shoultes
 * @ copyright	(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license		http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link			http://www.eventespresso.com
 *
 * ------------------------------------------------------------------------
 * 
 * EE_Cart class
 *
 * @ version		2.0
 * @subpackage	includes/core/EE_Cart.core.php
 * @ author		Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
 class EE_Cart implements Iterator, Countable { 

	/**
	 * 	instance of the EE_Cart object
	 * 	@access 	private
	 *	@var EE_Cart $_instance
	 */
	private static $_instance = NULL;

	/**
	 * 	$_tax_strategy
	 * 	@access 	private
	 *	@var EE_Tax_Strategy $_tax_strategy
	 */
	private $_tax_strategy = NULL;
	
	/**
	 * 	cart contents
	 * 	@access 	private
	 *	@var array $_items
	 */
	private $_items = array();
	
	/**
	 * 	total dollar value of cart items before tax
	 * 	@access 	private
	 *	@var float $_total_before_tax
	 */
	private $_total_before_tax = 0;
	
	/**
	 * 	array of taxes applied to cart $_total_before_tax
	 * 	@access 	private
	 *	@var array $_taxes
	 */
	private $_taxes = array();
	
	/**
	 * 	total dollar value of cart items after all modifiers have been applied
	 * 	@access 	private
	 *	@var float $_grand_total
	 */
	private $_grand_total = 0;



 
	/**
	 *	@singleton method used to instantiate class object
	 *	@access public
	 *	@return class instance
	 */	
	public static function instance() {
		// check if class object is instantiated
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! ( self::$_instance instanceof EE_Cart )) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	

	
	
	
	/**
	 *	private constructor to prevent direct creation
	 *	@Constructor
	 *	@access private
	 *	@return void
	 */	
  	private function __construct() {
 
	do_action('AHEE_log', __FILE__, __FUNCTION__, '');

		if ( ! defined( 'ESPRESSO_CART' )) {
			define( 'ESPRESSO_CART', TRUE );	
		}
		
		// are we using encryption?
//		if ( ! defined( 'ESPRESSO_ENCRYPT' )) {
//			EE_Registry::instance()->load_core( 'Encryption' );
//		}

		// grab any session data carried over from the previous page access
		$this->_items = EE_Registry::instance()->SSN->get_session_data( FALSE, 'cart' );	

		// once everything is all said and done, save the cart to the EE_Session
		add_action( 'shutdown', array( $this, '_save_cart' ), 90 );

	}




	/**
	 *	get_items
	 *	@access public
	 *	@return array
	 */	
	public function get_items() {
		return $this->_items;
	}




	/**
	 *	@process items for adding to cart
	 *	@access public
	 *	@param EE_Ticket $ticket
	 *	@param int $qty
	 *	@return TRUE on success, FALSE on fail 
	 */	
	public function add_ticket_to_cart( EE_Ticket $ticket, $qty = 1 ) {
		// add $ticket to cart
		$this->_add_item( new EE_Ticket_Cart_Item( $ticket, $qty ));
		return $this->_save_cart() ? TRUE : FALSE;
	}		





	/**
	 *	@adds items to cart
	 *	@access private
	 *	@param EE_Cart_Item $item
	 *	@return TRUE on success, FALSE on fail
	 */	
	private function _add_item( EE_Cart_Item $item ) {			
		// add item to cart
		$this->_items[ $item->line_item_ID() ] = $item;		
		// recalculate cart totals based on new items
		if ( $this->_calculate_cart_total_before_tax() ) {
			return TRUE;
		} else {
			return FALSE;
		}		
	}		





	/**
	 *	update_item - change an item already in the cart
	 *	@access public
	 *	@param EE_Cart_Item $item
	 *	@return TRUE on success, FALSE on fail
	 */	
	// 
	public function update_item( EE_Cart_Item $item ) {
		// check if item exists
		if ( isset( $this->_items[ $item->line_item_ID() ] )) {
			$this->_items[ $item->line_item_ID() ] = $item;
		}	
	}




	/**
	 *	calculate_cart_total_before_tax
	 *	@access private
	 *	@return void
	 */	
	private function _calculate_cart_total_before_tax() {
		$this->_total_before_tax = 0;		
		foreach ( $this->_items as $item ) {
            		$this->_total_before_tax += $item->price() * $item->qty();	
		}
		return $this->_total_before_tax;
	}




	/**
	 *	get_cart_total_before_tax
	 *	@access public
	 *	@return float
	 */	
	public function get_cart_total_before_tax() {
		return $this->_total_before_tax == 0 ? $this->_calculate_cart_total_before_tax() : $this->_total_before_tax;
	}





	/**
	 *	apply_taxes
	 *	@access private
	 *	@return void
	 */	
	private function _apply_taxes() {
		// start with empty array
		$this->_taxes = array();
		// get array of taxes via Price Model
		$taxes = EE_Registry::instance()->load_model( 'Price' )->get_all_prices_that_are_taxes();	
		// set grand total to total cart value before taxes
		$this->_grand_total = $this->_calculate_cart_total_before_tax();
		//loop thru taxes 
		foreach ( $taxes as $tax ) {
			// track taxes
			$this->_taxes[ $tax->name() ] = $this->_total_before_tax * $tax->amount() / 100;
			// apply taxes to grand_total
			$this->_grand_total += $this->_total_before_tax * $tax->amount() / 100;
		}
			
//		$taxes = $this->_tax_strategy->get_taxes();
//		foreach ( $this->_items as $item ) {
//			if ( $item->is_taxable() ) {
//	            		$item = 	
//			}
//		}
	}





	/**
	 *	get_cart_grand_total
	 *	@access public
	 *	@return float
	 */	
	public function get_cart_grand_total() {
		$this->_apply_taxes();
		return $this->_grand_total;		
	}	






	/**
	 *	deletes an item from the cart
	 *	@access public
	 *	@param mixed - string or array - line_item_ids
	 *	@return int on success, FALSE on fail
	 */	
	public function delete_items( $line_item_ids = FALSE ) {
		
		do_action('AHEE_log', __FILE__, __FUNCTION__, '');
		
		// check if only a single line_item_id was passed
		if ( ! empty( $line_item_ids ) && ! is_array( $line_item_ids )) {
			// place single line_item_id in an array to appear as multiple line_item_ids
			$line_item_ids = array ( $line_item_ids );			
		}
		
		$removals = 0;
		// cycle thru line_item_ids
		foreach ( $line_item_ids as $line_item_id ) {
			// check if line_item_id exists in cart
			if ( isset( $this->_items[ $line_item_id ] )) {
				// remove that item
				unset( $this->_items[ $line_item_id ] );
				$removals++;
			}
		}
		
		if ( $removals > 0 ) {
			$this->_calculate_cart_total_before_tax();
			return $removals;
		} else {
			return FALSE;
		}
				
	}		



	



	/**
	 *	@remove ALL items from cart and zero ALL totals
	 *	@access public
	 *	@return void
	 */	
	public function empty_cart() {		
		do_action('AHEE_log', __FILE__, __FUNCTION__, '');		
		$this->_items = array();		
	}		
	





	/**
	 *	@save cart to session
	 *	@access private
	 *	@return TRUE on success, FALSE on fail
	 */	
	public function _save_cart() {
		
		$cart_data = array(
			'cart' => $this->_items,
			'_cart_grand_total_qty' => count( $this->_items ),
			'_cart_grand_total_amount' => $this->get_cart_grand_total()
		);
			
		// add cart data to session so it can be saved to the db
		if ( EE_Registry::instance()->SSN->set_session_data( $cart_data, 'session_data' )) {
			return TRUE;
		} else {
			return FALSE;
		}

	}

	
	

	/**
	 * 	required by Iterator interface
	 * 	returns the first item in the cart
	 * 	@access 	public
	 *	@return EE_Item
	 */
	public function rewind() {
		return reset( $this->_items );
	}

	/**
	 * 	required by Iterator interface
	 * 	returns the current item in the cart
	 * 	@access 	public
	 *	@return boolean
	 */
	public function current() {
		return current( $this->_items );
	}

	/**
	 * 	required by Iterator interface
	 * 	returns the next item in the cart
	 * 	@access 	public
	 *	@return boolean
	 */
	public function next() {
		return next( $this->_items );
	}

	/**
	 * 	required by Iterator interface
	 * 	returns the key for the current item in the cart
	 * 	@access 	public
	 *	@return boolean
	 */
	public function key() {
		return key( $this->_items );
	}

	/**
	 * 	required by Iterator interface
	 * 	whether or not an item is indexed at this position:
	 * 	@access 	public
	 *	@return boolean
	 */
	public function valid() {
		return key( $this->_items ) !== NULL ? TRUE : FALSE;
	}
	
	/**
	 * 	required by Countable interface
	 * 	allows cart object to be counted as if it were an array
	 * 	@access 	public
	 *	@return int
	 */
	public function count() {
		return count( $this->_items );
	}




}
/* End of file EE_Cart.core.php */
/* Location: /includes/core/EE_Cart.core.php */