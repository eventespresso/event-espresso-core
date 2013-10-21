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
	 * The total Line item which comprises all the children line-item subtotals,
	 * which in turn each have their line items.
	 * Typically, the line item structure will look like:
	 * total
	 * -tickets-sub-total
	 * --ticket1
	 * --ticket2
	 * --...
	 * -taxes-sub-total
	 * --tax1
	 * --tax2
	 * @var EE_Line_Item
	 */
	private $_total_line_item;
	
	
	



 
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
//		$this->_items = EE_Registry::instance()->SSN->get_session_data( 'cart' );	
		//d( $this->_items );
//		$this->_items = is_array( $this->_items ) ? $this->_items : array();	
		$this->_create_total_line_item();
		
		// once everything is all said and done, save the cart to the EE_Session
		add_action( 'shutdown', array( $this, 'save_cart' ), 90 );

	}
	
	/**
	 * Creates the total line item, and ensures it has its 'items' and 'taxes' sub-items
	 * @return EE_Line_Item
	 */
	private function _create_total_line_item(){
		$this->_total_line_item = EE_Line_Item::new_instance(array(
			'LIN_code'=>'total',
			'LIN_name'=>  __("Total", "event_espresso"),
			'LIN_type'=>'total',
			'OBJ_type'=>'Transaction'
		));
		$this->_create_items_subtotal_line_item();
		$this->_create_taxes_subtotal_line_item();
		return $this->_total_line_item;
	}
	
	/**
	 * gets the line item which comprises all the items (ie, registrations, producst, etc)
	 * Has a side effect of adding this to the total line item
	 * @return EE_Line_Item
	 */
	private function _create_items_subtotal_line_item(){
		$items_line_item = EE_Line_Item::new_instance(array(
			'LIN_code'=>'items',
			'LIN_name'=>  __("Items", "event_espresso"),
			'LIN_type'=>'sub-total'
		));
		$this->_total_line_item->add_child_line_item($items_line_item);
		return $items_line_item;
	}
	/**
	 * gets the line item which comprises all the transaction-wide taxes.
	 * Has a side effect of adding this to the total line item
	 * @return EE_Line_Item
	 */
	private function _create_taxes_subtotal_line_item(){
		$tax_line_item = EE_Line_Item::new_instance(array(
			'LIN_code'=>'taxes',
			'LIN_name'=>  __("Taxes", "event_espresso"),
			'LIN_type'=>'sub-total'
		));
		$this->_total_line_item->add_child_line_item($tax_line_item);
		return $tax_line_item;
	}




	/**
	 *	Gets all the item line items (ie, all line items for registrations, products, etc. NOT taxes or promotions)
	 *	@access public
	 *	@return EE_Line_Item[]
	 */	
	public function get_items() {
		$items_line_item = $this->get_items_line_item();
		if($items_line_item){
			return $items_line_item->children();
		}else{
			return array();
		}
	}
	
	/**
	 * Gets the line item which comprises all the items as children of it (ie, NOT taxes or promotions)
	 * @return EE_Line_Item
	 */
	public function get_items_line_item(){
		$line_item = $this->_total_line_item->get_child_line_item('items');
		if($line_item){
			return $line_item;
		}else{
			return $this->_create_items_subtotal_line_item();
		}
	}
	
	/**
	 * Gets the line item which comprises all the taxes as children of it (ie, NOT registrations or products)
	 * @return EE_Line_Item
	 */
	public function get_taxes_line_item(){
		$line_item = $this->_total_line_item->get_child_line_item('taxes');
		if($line_item){
			return $line_item;
		}else{
			return $this->_create_taxes_subtotal_line_item();
		}
	}
	
	/**
	 * Gets the total line item (which is a parent of all other line items) on this cart
	 * @return EE_Line_Item
	 */
	public function get_total_line_item(){
		if($this->_total_line_item){
			return $this->_total_line_item;
		}else{
			return $this->_create_total_line_item();
		}
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
		$line_item = EE_Line_Item::new_instance(array(
			'LIN_name'=>$ticket->name(),
			'LIN_desc'=>$ticket->description(),
			'LIN_unit_price'=>$ticket->price(),
			'LIN_quantity'=>$qty,
			'LIN_is_taxable'=>$ticket->taxable(),
			'LIN_order'=>count($this->_total_line_item->children()),
			'LIN_total'=>$ticket->price() * $qty,
			'LIN_type'=>'line-item',
			'OBJ_ID'=>$ticket->ID(),
			'OBJ_type'=>'Ticket'
		));
		$this->_add_item( $line_item);
		return $this->save_cart() ? TRUE : FALSE;
	}		





	/**
	 *	@adds items to cart
	 *	@access private
	 *	@param EE_Line_Item $item
	 *	@return TRUE on success, FALSE on fail
	 */	
	private function _add_item(EE_Line_Item $item ) {			
		// add item to cart
		$items_line_item = $this->get_items_line_item();
		if($items_line_item){
			$items_line_item->add_child_line_item($item);	
		}else{
			return false;
		}
			
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
	 *	@param EE_Line_Item $item
	 *	@return TRUE on success, FALSE on fail
	 */	
	// 
	public function update_item( EE_Line_Item $item ) {
		// check if item exists
		$items_line_item = $this->get_items_line_item();
		if($items_line_item && $items_line_item->get_child_line_item($item->code())){
			$items_line_item->add_child_line_item($item);
			return true;
		}else{
			return false;
		}
	}




	/**
	 *	calculate_cart_total_before_tax
	 *	@access private
	 *	@return float
	 */	
	private function _calculate_cart_total_before_tax() {
		$total = 0;
		$items_line_item = $this->get_items_line_item();
		foreach($items_line_item->children() as $line_item){
			$total += $line_item->total();
		}
		$items_line_item->set_total($total);
		return $total;
	}




	/**
	 *	get_cart_total_before_tax
	 *	@access public
	 *	@return float
	 */	
	public function get_cart_total_before_tax() {
		$items_line_item = $this->get_items_line_item();
		if($items_line_item && $items_line_item->total()){
			return $items_line_item->total();
		}else{
			return $this->_calculate_cart_total_before_tax();
		}
	}





	/**
	 *	apply_taxes
	 *	@access private
	 *	@return void
	 */	
	private function _apply_taxes_to_total() {
		// start with empty array
		$this->_taxes = array();
		// get array of taxes via Price Model
		$ordered_taxes = EE_Registry::instance()->load_model( 'Price' )->get_all_prices_that_are_taxes();	
		ksort( $ordered_taxes );
		
		// set grand total to total cart value before taxes
		$grand_total = $this->_calculate_cart_total_before_tax();
		
		$taxes_line_item = $this->get_taxes_line_item();
		//just to be safe, remove its old tax line items
		$taxes_line_item->delete_children_line_items();
		//loop thru taxes 
		foreach ( $ordered_taxes as $order => $taxes ) {
			foreach ( $taxes as $tax ) {
				if ( $tax instanceof EE_Price ) {
					// track taxes
					$total_for_this_tax = $grand_total * $tax->amount() / 100;
					$taxes_line_item->add_child_line_item(EE_Line_Item::new_instance(array(
						'LIN_name'=>$tax->name(),
						'LIN_desc'=>$tax->desc(),
						'LIN_unit_price'=>$tax->amount(),
						'LIN_is_percent'=>true,
						'LIN_is_taxable'=>false,
						'LIN_order'=>$order,
						'LIN_total'=>$total_for_this_tax,
					)));
					
					$taxes_line_item->set_total($taxes_line_item->total() + $total_for_this_tax);
				}
			}
		}
		$this->_total_line_item->recalculate_total();
		return $taxes_line_item->total();
	}




	/**
	 *	get_applied_taxes
	 *	@access public
	 *	@return float
	 */	
	public function get_applied_taxes() {
		return $this->_apply_taxes_to_total();	
	}





	/**
	 *	get_cart_grand_total
	 *	@access public
	 *	@return float
	 */	
	public function get_cart_grand_total() {
		$this->_apply_taxes_to_total();
		$total_line_item = $this->get_total_line_item();
		if($total_line_item){
			return $total_line_item->total();
		}else{
			return 0;
		}
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
		
		$items_line_item = $this->get_items_line_item();
		if( ! $items_line_item){
			return 0;
		}
		$removals = 0;
		// cycle thru line_item_ids
		foreach ( $line_item_ids as $line_item_id ) {
			$removals += $items_line_item->delete_child_line_item($line_item_id);
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
		$this->_total_line_item = $this->_create_total_line_item();
		$this->save_cart( TRUE );	
	}		
	





	/**
	 *	@save cart to session
	 *	@access public
	 *	@return TRUE on success, FALSE on fail
	 */	
	public function save_cart( $save_empty = FALSE ) {
		
		if (  $this->get_items() || $save_empty ) {
//			$cart_data = array(
//				'cart' => $this->_items,
//				'_cart_grand_total_qty' => count( $this->_items ),
//				'_cart_grand_total_amount' => $this->get_cart_grand_total()
//			);				
			// add cart data to session so it can be saved to the db
			if ( EE_Registry::instance()->SSN->set_session_data( array('cart'=>$this) )) {
				return TRUE;
			} else {
				return FALSE;
			}			
		}

	}

	
	

	/**
	 * 	required by Iterator interface
	 * 	returns the first item in the cart
	 * 	@access 	public
	 *	@return EE_Item
	 */
	public function rewind() {
		return is_array( $this->get_items() ) ? reset( $this->get_items() ) : NULL;
	}

	/**
	 * 	required by Iterator interface
	 * 	returns the current item in the cart
	 * 	@access 	public
	 *	@return boolean
	 */
	public function current() {
		return is_array( $this->get_items() ) ? current( $this->get_items() ) : NULL;
	}

	/**
	 * 	required by Iterator interface
	 * 	returns the next item in the cart
	 * 	@access 	public
	 *	@return boolean
	 */
	public function next() {
		return is_array( $this->get_items() ) ? next( $this->get_items() ) : NULL;
	}

	/**
	 * 	required by Iterator interface
	 * 	returns the key for the current item in the cart
	 * 	@access 	public
	 *	@return boolean
	 */
	public function key() {
		return is_array( $this->get_items() ) ? key( $this->get_items() ) : NULL;
	}

	/**
	 * 	required by Iterator interface
	 * 	whether or not an item is indexed at this position:
	 * 	@access 	public
	 *	@return boolean
	 */
	public function valid() {
		return key( $this->get_items() ) !== NULL ? TRUE : FALSE;
	}
	
	/**
	 * 	required by Countable interface
	 * 	allows cart object to be counted as if it were an array
	 * 	@access 	public
	 *	@return int
	 */
	public function count() {
		return is_array( $this->get_items() ) ? count( $this->get_items() ) : 0;
	}




}
/* End of file EE_Cart.core.php */
/* Location: /includes/core/EE_Cart.core.php */