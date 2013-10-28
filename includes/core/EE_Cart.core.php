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
	 * Really only used for implementing iterator interface. Otherwise  unused
	 * @var EE_Line_Item[]
	 */
	private $_iterable_line_items = array();
	
	



 
	/**
	 *	@singleton method used to instantiate class object
	 *	@access public
	 *	@return class instance
	 */	
	public static function instance() {
		// check if class object is instantiated
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! ( self::$_instance instanceof EE_Cart )) {
			//try getting the cart out of the session
			$saved_cart = EE_Registry::instance()->SSN->get_session_data( 'cart' );
			if( ! empty( $saved_cart ) && is_object( $saved_cart ) && ( $saved_cart instanceof EE_Cart )) {
				self::$_instance = $saved_cart;
				self::$_instance->_tax_strategy = $saved_cart->_tax_strategy;
				self::$_instance->_grand_total = $saved_cart->_grand_total;
				self::$_instance->_iterable_line_items = $saved_cart->_iterable_line_items;
//				if ( EE_Registry::instance()->REQ->get( 'ee' ) != 'process_ticket_selections' ) { d( self::$_instance ); }
			} else {
				self::$_instance = new self();
			}
			unset( $saved_cart );
		}
		// once everything is all said and done, save the cart to the EE_Session
		add_action( 'shutdown', array( self::$_instance, 'save_cart' ), 90 );
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
		if ( empty( $this->_grand_total )) {
			$this->_create_grand_total();
		}
		
	}
	
	/**
	 * Creates the total line item, and ensures it has its 'tickets' and 'taxes' sub-items
	 * @return EE_Line_Item
	 */
	private function _create_grand_total(){
//		if ( EE_Registry::instance()->REQ->get( 'ee' ) != 'process_ticket_selections' ) {
//			echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
//		}
		$this->_grand_total = EE_Line_Item::new_instance(array(
			'LIN_code'=>'total',
			'LIN_name'=>  __('Grand Total', 'event_espresso'),
			'LIN_type'=>  EEM_Line_Item::type_total,
			'OBJ_type'=>'Transaction'
		));
		$this->_get_subtotal_for_tickets();
		$this->_get_subtotal_for_taxes();
		return $this->_grand_total;
	}
	
	/**
	 * gets the line item which comprises all the items (ie, registrations, producst, etc)
	 * Has a side effect of adding this to the total line item
	 * @return EE_Line_Item
	 */
	private function _get_subtotal_for_tickets(){
		$items_line_item = EE_Line_Item::new_instance(array(
			'LIN_code'=>'tickets',
			'LIN_name'=>  __('Tickets', 'event_espresso'),
			'LIN_type'=>  EEM_Line_Item::type_sub_total
		));
		$this->_grand_total->add_child_line_item($items_line_item);
		return $items_line_item;
	}
	/**
	 * gets the line item which comprises all the transaction-wide taxes.
	 * Has a side effect of adding this to the total line item
	 * @return EE_Line_Item
	 */
	private function _get_subtotal_for_taxes(){
		$tax_line_item = EE_Line_Item::new_instance(array(
			'LIN_code'=>'taxes',
			'LIN_name'=> __('Taxes', 'event_espresso'),
			'LIN_type'=>  EEM_Line_Item::type_tax_sub_total
		));
		$this->_grand_total->add_child_line_item($tax_line_item);
		return $tax_line_item;
	}




	/**
	 *	Gets all the item line items (ie, all line items for registrations, products, etc. NOT taxes or promotions)
	 *	@access public
	 *	@return EE_Line_Item[]
	 */	
	public function get_tickets() {
		return $this->get_ticket_items()->children();
	}
	
	
	
	/**
	 * Gets the line item which comprises all the items as children of it (ie, NOT taxes or promotions)
	 * @return EE_Line_Item
	 */
	public function get_ticket_items(){
		$tickets = $this->_grand_total->get_child_line_item('tickets');
		return $tickets ? $tickets : $this->_get_subtotal_for_tickets();
	}
	
	/**
	 * Gets the line item which comprises all the taxes as children of it (ie, NOT registrations or products)
	 * @return EE_Line_Item
	 */
	public function get_taxes_line_item(){
		$taxes = $this->_grand_total->get_child_line_item('taxes');
		return $taxes ? $taxes : $this->_get_subtotal_for_taxes();
	}
	
	/**
	 * Gets the total line item (which is a parent of all other line items) on this cart
	 * @return EE_Line_Item
	 */
	public function get_grand_total(){
		return $this->_grand_total ? $this->_grand_total : $this->_create_grand_total();
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
			'LIN_order'=>count($this->_grand_total->children()),
			'LIN_total'=>$ticket->price() * $qty,
			'LIN_type'=>  EEM_Line_Item::type_line_item,
			'OBJ_ID'=>$ticket->ID(),
			'OBJ_type'=>'Ticket'
		));
		//now add the sub-line items
		$running_total_for_ticket = 0;
		foreach($ticket->prices(array('order_by'=>array('PRC_order'=>'ASC'))) as $price){
			$price_total = $price->is_percent() ? $running_total_for_ticket * $price->amount() / 100 : $price->amount();
			
			$sub_line_item = EE_Line_Item::new_instance(array(
				'LIN_name'=>$price->name(),
				'LIN_desc'=>$price->desc(),
				'LIN_quantity'=>$price->is_percent() ? null : 1,
				'LIN_is_taxable'=> false,
				'LIN_order'=>$price->order(),
				'LIN_total'=>$price_total,
				'LIN_type'=>  EEM_Line_Item::type_sub_line_item,
				'OBJ_ID'=>$price->ID(),
				'OBJ_type'=>'Price'
			));
			if($price->is_percent()){
				$sub_line_item->set_percent($price->amount());
			}else{
				$sub_line_item->set_unit_price($price->amount());
			}
			$running_total_for_ticket += $price_total;
			$line_item->add_child_line_item($sub_line_item);
		}

		$this->_add_item( $line_item );
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
		$ticket_items = $this->get_ticket_items();
		if($ticket_items){
			$ticket_items->add_child_line_item($item);	
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
		$ticket_items = $this->get_ticket_items();
		if($ticket_items && $ticket_items->get_child_line_item($item->code())){
			$ticket_items->add_child_line_item($item);
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
		return $this->get_ticket_items()->recalculate_pre_tax_total();
	}
	
	/**
	 * Gets the total amoutn taxable amongst the line 
	 * @return float
	 */
	private function _calculate_cart_taxable_total(){
		return $this->get_grand_total()->recalculate_pre_tax_total(true);
	}




	/**
	 *	get_cart_total_before_tax
	 *	@access public
	 *	@return float
	 */	
	public function get_cart_total_before_tax() {
		return $this->_calculate_cart_total_before_tax();
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
	 *	Applies taxes to teh grand total line itemand recalculates it, and returns the grant total
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
	public function delete_items( $line_item_ids = FALSE ) {
		
		do_action('AHEE_log', __FILE__, __FUNCTION__, '');
		
		// check if only a single line_item_id was passed
		if ( ! empty( $line_item_ids ) && ! is_array( $line_item_ids )) {
			// place single line_item_id in an array to appear as multiple line_item_ids
			$line_item_ids = array ( $line_item_ids );			
		}
		
		$items_line_item = $this->get_ticket_items();
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
//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action('AHEE_log', __FILE__, __FUNCTION__, '');		
		$this->_grand_total = $this->_create_grand_total();
		$this->save_cart( TRUE );	
	}		
	





	/**
	 *	@save cart to session
	 *	@access public
	 *	@return TRUE on success, FALSE on fail
	 */	
	public function save_cart() {
//		if ( EE_Registry::instance()->REQ->get( 'ee' ) != 'process_ticket_selections' ) {
//			echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
//		}
		return EE_Registry::instance()->SSN->set_session_data( array( 'cart'=> $this ));
	}

	
	

	/**
	 * 	required by Iterator interface
	 * 	returns the first item in the cart
	 * 	@access 	public
	 *	@return EE_Item
	 */
	public function rewind() {
		$this->_iterable_line_items = $this->get_tickets();
		return is_array( $this->_iterable_line_items ) ? reset( $this->_iterable_line_items ) : NULL;
	}

	/**
	 * 	required by Iterator interface
	 * 	returns the current item in the cart
	 * 	@access 	public
	 *	@return boolean
	 */
	public function current() {
		return is_array( $this->_iterable_line_items ) ? current( $this->_iterable_line_items ) : NULL;
	}

	/**
	 * 	required by Iterator interface
	 * 	returns the next item in the cart
	 * 	@access 	public
	 *	@return boolean
	 */
	public function next() {
		return is_array( $this->_iterable_line_items ) ? next( $this->_iterable_line_items ) : NULL;
	}

	/**
	 * 	required by Iterator interface
	 * 	returns the key for the current item in the cart
	 * 	@access 	public
	 *	@return boolean
	 */
	public function key() {
		return is_array( $this->_iterable_line_items ) ? key( $this->_iterable_line_items ) : NULL;
	}

	/**
	 * 	required by Iterator interface
	 * 	whether or not an item is indexed at this position:
	 * 	@access 	public
	 *	@return boolean
	 */
	public function valid() {
		return key( $this->_iterable_line_items ) !== NULL ? TRUE : FALSE;
	}
	
	/**
	 * 	required by Countable interface
	 * 	allows cart object to be counted as if it were an array
	 * 	@access 	public
	 *	@return int
	 */
	public function count() {
		return is_array( $this->get_tickets() ) ? count( $this->get_tickets() ) : 0;
	}




}
/* End of file EE_Cart.core.php */
/* Location: /includes/core/EE_Cart.core.php */