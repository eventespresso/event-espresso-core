<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );/**
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
 * Used to keep track of which tickets the user has specified they want to purchase.
 * This data is used for generating the Transaction and Registrations, and the
 * Line Items on cart are themselves saved for creating a persistent snapshot of
 * what was purchased and for how much.
 *
 *
 * @ version		2.0
 * @subpackage	includes/core/EE_Cart.core.php
 * @ author		Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
 class EE_Cart {

	/**
	 * 	instance of the EE_Cart object
	 * 	@access 	private
	 *	@var EE_Cart $_instance
	 */
	private static $_instance = NULL;

	/**
	 * The total Line item which comprises all the children line-item subtotals,
	 * which in turn each have their line items.
	 * Typically, the line item structure will look like:
	 * grand total
	 * -tickets-sub-total
	 * --ticket1
	 * --ticket2
	 * --...
	 * -taxes-sub-total
	 * --tax1
	 * --tax2
	 * @var EE_Line_Item
	 */
	private $_grand_total = NULL;





	/**
	 *	@singleton method used to instantiate class object
	 *	@access public
	 *	@return class instance
	 */
	public static function instance( EE_Line_Item $grand_total = NULL ) {

		// check if class object is instantiated
		if( ! empty( $grand_total ) ){
			self::$_instance = new self( $grand_total );
		}elseif ( ! self::$_instance instanceof EE_Cart) {
			//try getting the cart out of the session
			$saved_cart = EE_Registry::instance()->SSN->get_session_data( 'cart' );
			self::$_instance = $saved_cart instanceof EE_Cart ? $saved_cart : new self( $grand_total );
			unset( $saved_cart );
		}

		// once everything is all said and done, save the cart to the EE_Session
		add_action( 'shutdown', array( self::$_instance, 'save_cart' ), 90 );
		return self::$_instance;
	}

/**
	 * Resets the cart completely (whereas empty_cart
	 * @param EE_Line_Item $grand_total
	 * @return EE_Cart
	 */
	public static function reset( EE_Line_Item $grand_total = NULL ){
		remove_action( 'shutdown', array( self::$_instance, 'save_cart'), 90 );
		EE_Registry::instance()->SSN->reset_data( array('cart') );
		self::$_instance = NULL;
		return self::instance( $grand_total );
	}


	/**
	 *	get_cart_from_reg_url_link
	 *	@access public
	 *	@return class instance
	 */
	public static function get_cart_from_txn( EE_Transaction $transaction ) {
		$grand_total = $transaction->total_line_item();
		$grand_total->get_items();
		$grand_total->tax_descendants();
		return EE_Cart::instance( $grand_total );
	}



	/**
	 *	private constructor to prevent direct creation
	 *	@Constructor
	 *	@access private
	 *	@return void
	 */
  	private function __construct( EE_Line_Item $grand_total = NULL ) {

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		EE_Registry::instance()->load_helper('Line_Item');
		if ( ! defined( 'ESPRESSO_CART' )) {
			define( 'ESPRESSO_CART', TRUE );
		}
		if ( $grand_total instanceof EE_Line_Item ) {
			$this->set_grand_total_line_item( $grand_total );
		}
		$this->get_grand_total();

	}



	/**
	 * Creates the total line item, and ensures it has its 'tickets' and 'taxes' sub-items
	 * @return EE_Line_Item
	 */
	private function _create_grand_total(){
		$this->_grand_total = EEH_Line_Item::create_default_total_line_item();
		return $this->_grand_total;
	}






	/**
	 *	Gets all the item line items (ie, all line items for registrations, products, etc. NOT taxes or promotions)
	 *	@access public
	 *	@return EE_Line_Item[]
	 */
	public function get_tickets() {
		return EEH_Line_Item::get_items_subtotal( $this->_grand_total )->children();
	}



	/**
	 * returns the total quantity of tickets in the cart
	 *
	 * @access public
	 * @return int
	 */
	public function all_ticket_quantity_count() {
		$tickets = $this->get_tickets();
		if ( empty( $tickets ) )
			return 0;
		$count = 0;
		foreach ( $tickets as $ticket ) {
			$count = $count + $ticket->get('LIN_quantity');
		}
		return $count;
	}




	/**
	 * Gets the line item which comprises all the taxes as children of it (ie, NOT registrations or products)
	 * @return EE_Line_Item
	 */
	public function get_taxes_line_item(){
		return EEH_Line_Item::get_taxes_subtotal( $this->_grand_total );
	}



	/**
	 * Gets the total line item (which is a parent of all other line items) on this cart
	 * @return EE_Line_Item
	 */
	public function get_grand_total(){
		return $this->_grand_total instanceof EE_Line_Item ? $this->_grand_total : $this->_create_grand_total();
	}



	/**
	 *	@process items for adding to cart
	 *	@access public
	 *	@param EE_Ticket $ticket
	 *	@param int $qty
	 *	@return TRUE on success, FALSE on fail
	 */
	public function add_ticket_to_cart( EE_Ticket $ticket, $qty = 1 ) {
		EEH_Line_Item::add_ticket_purchase( $this->_grand_total, $ticket, $qty );
		return $this->save_cart() ? TRUE : FALSE;
	}

	/**
	 *	get_cart_total_before_tax
	 *	@access public
	 *	@return float
	 */
	public function get_cart_total_before_tax() {
		return $this->get_grand_total()->recalculate_pre_tax_total();
	}



	/**
	 * Simply adds global taxes to the cart's taxes (if they were already in there, updates them).
	 * Doesn't calculate the totals for each tax or add the tax totals to the total line item
	 * @return void
	 */
	private function _add_taxes_to_cart(){
		// start with empty array
		$this->_taxes = array();
		// get array of taxes via Price Model
		$ordered_taxes = EE_Registry::instance()->load_model( 'Price' )->get_all_prices_that_are_taxes();
		ksort( $ordered_taxes );
		$taxes_line_item = $this->get_taxes_line_item();
		//just to be safe, remove its old tax line items
		$taxes_line_item->delete_children_line_items();
		//loop thru taxes
		foreach ( $ordered_taxes as $order => $taxes ) {
			foreach ( $taxes as $tax ) {
				if ( $tax instanceof EE_Price ) {
					$taxes_line_item->add_child_line_item(EE_Line_Item::new_instance(array(
						'LIN_name'=>$tax->name(),
						'LIN_desc'=>$tax->desc(),
						'LIN_percent'=>$tax->amount(),
						'LIN_is_taxable'=>false,
						'LIN_order'=>$order,
						'LIN_total'=>0,
						'LIN_type'=>  EEM_Line_Item::type_tax,
						'OBJ_type'=>'Price',
						'OBJ_ID'=>$tax->ID()
					)));
				}
			}
		}
	}



	/**
	 *	Applies taxes to the grand total line itemand recalculates it, and returns the grant total
	 *	@access private
	 *	@return float
	 */
	private function _apply_taxes_to_total() {

		if( ! $this->get_taxes_line_item()->children()){
			$this->_add_taxes_to_cart();
		}
		$this->get_grand_total()->recalculate_total_including_taxes();
		return $this->get_taxes_line_item()->total();
	}



	/**
	 *	gets the total amoutn of tax paid for items in this cart
	 *	@access public
	 *	@return float
	 */
	public function get_applied_taxes() {
		return $this->_apply_taxes_to_total();
	}



	/**
	 *	Gets the total amount to be paid for the items in the cart, including taxes and other modifiers
	 *	@access public
	 *	@return float
	 */
	public function get_cart_grand_total() {
		$this->_apply_taxes_to_total();
		return $this->get_grand_total()->total();
	}



	/**
	 *	deletes an item from the cart
	 *	@access public
	 *	@param mixed - string or array - line_item_ids
	 *	@return int on success, FALSE on fail
	 */
	public function delete_items( $line_item_codes = FALSE ) {

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		// check if only a single line_item_id was passed
		if ( ! empty( $line_item_codes ) && ! is_array( $line_item_codes )) {
			// place single line_item_id in an array to appear as multiple line_item_ids
			$line_item_codes = array ( $line_item_codes );
		}

		$items_line_item = EEH_Line_Item::get_items_subtotal( $this->_grand_total );
		if( ! $items_line_item){
			return 0;
		}
		$removals = 0;
		// cycle thru line_item_ids
		foreach ( $line_item_codes as $line_item_id ) {
			$removals += $items_line_item->delete_child_line_item($line_item_id);
		}

		if ( $removals > 0 ) {
			$this->get_grand_total()->recalculate_taxes_and_total();
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
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$this->_grand_total = $this->_create_grand_total();
		$this->save_cart( TRUE );
	}



	/**
	 * Sets the cart to match the line item. Especialy handy for loading an old cart where you
	 *  know the grand total line item on it
	 * @param EE_Line_Item $line_item
	 */
	public function set_grand_total_line_item( EE_Line_Item $line_item ) {
		$this->_grand_total = $line_item;
	}



	/**
	 *	@save cart to session
	 *	@access public
	 *	@return TRUE on success, FALSE on fail
	 */
	public function save_cart() {
		self::$_instance->_apply_taxes_to_total();
		return EE_Registry::instance()->SSN->set_session_data( array( 'cart'=> self::$_instance ));
	}





}
/* End of file EE_Cart.core.php */
/* Location: /includes/core/EE_Cart.core.php */