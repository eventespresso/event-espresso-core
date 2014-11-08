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
 * @ author		Mike Nelson, Brent Christensen
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
	  * @singleton method used to instantiate class object
	  * @access    public
	  * @param EE_Line_Item $grand_total
	  * @return \EE_Cart
	  */
	public static function instance( EE_Line_Item $grand_total = NULL ) {
		EE_Registry::instance()->load_helper('Line_Item');
		// check if class object is instantiated
		if( ! empty( $grand_total ) ){
			self::$_instance = new self( $grand_total );
		}elseif ( ! self::$_instance instanceof EE_Cart) {
			//try getting the cart out of the session
			$saved_cart = EE_Registry::instance()->SSN->cart();
			self::$_instance = $saved_cart instanceof EE_Cart ? $saved_cart : new self( $grand_total );
			unset( $saved_cart );
		}

		// once everything is all said and done, save the cart to the EE_Session
		add_action( 'shutdown', array( self::$_instance, 'save_cart' ), 90 );
		return self::$_instance;
	}



	 /**
	  *    private constructor to prevent direct creation
	  * @Constructor
	  * @access private
	  * @param EE_Line_Item $grand_total
	  * @return \EE_Cart
	  */
	 private function __construct( EE_Line_Item $grand_total = NULL ) {
		 do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		 if ( ! defined( 'ESPRESSO_CART' )) {
			 define( 'ESPRESSO_CART', TRUE );
		 }
		 if ( $grand_total instanceof EE_Line_Item ) {
			 $this->set_grand_total_line_item( $grand_total );
		 }
		 $this->get_grand_total();
	 }



	/**
	 * Resets the cart completely (whereas empty_cart
	 * @param EE_Line_Item $grand_total
	 * @return EE_Cart
	 */
	public static function reset( EE_Line_Item $grand_total = NULL ){
		remove_action( 'shutdown', array( self::$_instance, 'save_cart'), 90 );
		EE_Registry::instance()->SSN->reset_cart();
		self::$_instance = NULL;
		return self::instance( $grand_total );
	}



	 /**
	  *    get_cart_from_reg_url_link
	  * @access public
	  * @param EE_Transaction $transaction
	  * @return \EE_Cart
	  */
	public static function get_cart_from_txn( EE_Transaction $transaction ) {
		$grand_total = $transaction->total_line_item();
		$grand_total->get_items();
		$grand_total->tax_descendants();
		return EE_Cart::instance( $grand_total );
	}



	/**
	 * Creates the total line item, and ensures it has its 'tickets' and 'taxes' sub-items
	 * @return EE_Line_Item
	 */
	private function _create_grand_total(){
		$this->_grand_total = EEH_Line_Item::create_total_line_item();
		return $this->_grand_total;
	}



	/**
	 *	Gets all the line items of object type Ticket
	 *	@access public
	 *	@return \EE_Line_Item[]
	 */
	public function get_tickets() {
		return EEH_Line_Item::get_ticket_line_items( $this->_grand_total );
	}



	/**
	 * returns the total quantity of tickets in the cart
	 *
	 * @access public
	 * @return int
	 */
	public function all_ticket_quantity_count() {
		$tickets = $this->get_tickets();
		if ( empty( $tickets )) {
			return 0;
		}
		$count = 0;
		foreach ( $tickets as $ticket ) {
			$count = $count + $ticket->get('LIN_quantity');
		}
		return $count;
	}



	/**
	 *  Gets all the tax line items
	 * @return \EE_Line_Item[]
	 */
	public function get_taxes(){
		return EEH_Line_Item::get_taxes_subtotal( $this->_grand_total )->children();
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
		EEH_Line_Item::add_ticket_purchase( $this->get_event_line_item_for_ticket( $ticket ), $ticket, $qty );
		return $this->save_cart() ? TRUE : FALSE;
	}



	 /**
	  *    get_event_line_item_for_ticket
	  *
	  * @access public
	  * @param EE_Ticket $ticket
	  * @throws \EE_Error
	  * @return EE_Line_Item
	  */
	public function get_event_line_item_for_ticket( EE_Ticket $ticket ) {

		$event = $ticket->first_datetime()->event();
		if ( ! $event instanceof EE_Event ) {
			throw new EE_Error( __( 'The supplied ticket has no event data associated with it.','event_espresso' ));
		}
		$event_line_item = NULL;
		foreach ( EEH_Line_Item::get_event_subtotals( $this->get_grand_total() ) as $event_line_item ) {
			// default event subtotal, we should only ever find this the first time this method is called
			if ( $event_line_item->OBJ_ID() === 0 ) {
				// let's use this! but first... set the event details
				EEH_Line_Item::set_event_subtotal_details( $event_line_item, $event );
				break;
			} else if ( $event_line_item->OBJ_ID() === $event->ID() ) {
				// found existing line item for this event in the cart, so break out of loop and use this one
				break;
			}
		}
		// return valid event subtotal... or create one
		return $event_line_item instanceof EE_Line_Item ? $event_line_item : $this->add_subtotal_line_item_for_event( $event );
	}



	 /**
	  *    get_cart_total_before_tax
	  *
	  * @access public
	  * @param \EE_Event $event
	  * @return EE_Line_Item
	  */
	public function add_subtotal_line_item_for_event( EE_Event $event ) {
		// first find the pre-tax subtotal line item
		$pre_tax_subtotal = EEH_Line_Item::get_pre_tax_subtotal( $this->_grand_total );
		// create a new "event" subtotal below that
		$event_line_item = EEH_Line_Item::create_event_subtotal( $pre_tax_subtotal );
		// and set the event details
		EEH_Line_Item::set_event_subtotal_details( $event_line_item, $event );
		return $event_line_item;
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
	 *	gets the total amount of tax paid for items in this cart
	 *	@access public
	 *	@return float
	 */
	public function get_applied_taxes() {
		return EEH_Line_Item::ensure_taxes_applied( $this->_grand_total );
	}



	/**
	 *	Gets the total amount to be paid for the items in the cart, including taxes and other modifiers
	 *	@access public
	 *	@return float
	 */
	public function get_cart_grand_total() {
		EEH_Line_Item::ensure_taxes_applied( $this->_grand_total );
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
		return EEH_Line_Item::delete_items($this->get_grand_total(), $line_item_codes );

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
	 * Sets the cart to match the line item. Especially handy for loading an old cart where you
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
		EEH_Line_Item::ensure_taxes_applied( $this->_grand_total );
		return EE_Registry::instance()->SSN->set_cart( $this );
	}





}
/* End of file EE_Cart.core.php */
/* Location: /includes/core/EE_Cart.core.php */
