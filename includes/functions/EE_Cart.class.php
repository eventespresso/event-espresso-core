<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/* 
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license				http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link						http://www.eventespresso.com
 * @ version		 	3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * EE_Cart class
 *
 * @package				Event Espresso
 * @subpackage		includes/functions
 * @author					Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
 class EE_Cart { 


  // instance of the EE_Cart object
	private static $_instance = NULL;
	
	// cart contents
	var $cart = array();
	
	// default empty cart
	var $empty_cart = array(

					'REG' => array( 
																	'title' => 'Registrations', 
																	'total_items' => 0, 
																	'sub_total' => 0, 
																	'empty_msg' => 'No Current Registrations'
																),
					'MER' => array( 
																	'title' => 'Additional Options', 
																	'total_items' => 0, 
																	'sub_total' => 0, 
																	'empty_msg' => 'No Additional Options' 
																),
					'CART' => array(
																	'title' => 'Shopping Cart', 
																	'total_items' => 0, 
																	'sub_total' => 0, 
																	'empty_msg' => 'Your Cart is Empty'
																)
				);
	
	// EE_Session object stored by reference
	var $session = NULL; 
	
	// EE_Encryption object stored by reference
	var $encryption = NULL; 
	
	// global error notices
	var $_notices;




 
	/**
	 *		@singleton method used to instantiate class object
	 *		@access public
	 *		@return class instance
	 */	
	public  function &instance ( ) {
		// check if class object is instantiated
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! is_a( self::$_instance, __CLASS__ )) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	

	
	
	
	/**
	 *		private constructor to prevent direct creation
	 *		@Constructor
	 *		@access private
	 *		@return void
	 */	
  private function __construct() {
	
		//echo '<h3>'.__FUNCTION__.'</h3>';
		
		define( 'ESPRESSO_CART', TRUE );
		
		global $notices;
		$this->_notices = $notices;

		// if sessions is not instantiated
		if ( ! defined( ESPRESSO_SESSION )) {
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/functions/EE_Session.class.php');
		}
		$this->session = $EE_Session;
		
		// are we using encryption?
		if ( ! defined( ESPRESSO_ENCRYPT )) {
			require_once( EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/functions/EE_Encryption.class.php' );
			// instantiate the class object making all properties and methods accessible via $this->encryption ex: $this->encryption->encrypt();
			//$this->encryption = EE_Encryption::instance();
			$this->encryption = $EE_Encryption;
		}
		
		// retreive cart options from db
		if ( $cart_settings = get_option( 'espresso_cart_settings' ) !== FALSE ) {
			// cycle though existing cart options
			foreach ( $cart_settings as $var_name => $cart_setting ) {
				// set values for class properties
				$this->_{$var_name} = $cart_setting;
			}
		}
		
		// cycle thru default cart types
		foreach ( array( 'REG', 'MER', 'CART' ) as $cart_type ) {
			// check for existing cart data within the EE_session
			if ( ! empty( $this->session->data[ $cart_type ] )) { 
				// add existing data to cart 
				$this->cart[ $cart_type ] = $this->session->data[ $cart_type ];
			} else {
				// or add default data for empty cart
				$this->cart[ $cart_type ] = $this->empty_cart[ $cart_type ];
			}
			
		}
		
	}




	/**
	 *			@process items for adding to cart
	 *		  @access public
	 *		  @param string - which_cart
	 *			@return TRUE on success, FALSE on fail 
	 */	
	public function add_to_cart( $which_cart = 'CART', $items = FALSE ) {
			
		//echo '<h3>'.__FUNCTION__.'</h3>';
		
		$save_cart = FALSE;
		
		// how am I supposed to add non-arrays or NOTHING to the cart???
		if ( ! is_array( $items ) or empty( $items ) ) {
			$this->_notices['errors'][] = 'An error occured. The data passed to the cart was invalid. No items could be added to the cart.';
			return FALSE;
		}
		
		// check if only a single item was passed by looking for item id
		if ( isset( $items['id'] )) {
			// place single item in an array to appear as multiple items
			$items = array ( $items );			
		}
		
		// cycle thru them multiple items
		foreach ( $items as $item ) {
			// check again for valid array 
			if ( is_array( $item ) && ! empty( $item )) {
			// add item to cart
				if ( $this->_add_item( $which_cart, $item ) ) {
					$save_cart = TRUE;
				}
			}
		}
				
		if ( $save_cart ) {
			$this->_save_cart( $which_cart, $items );
			return TRUE;
		} else {
			return FALSE;
		}

	}		





	/**
	 *			@remove items from cart
	 *		  @access private
	 *			@return TRUE on success, FALSE on fail
	 */	
	private function _add_item( $which_cart = 'CART', $item ) {
		
		//echo '<h3>'.__FUNCTION__.'</h3>';
		
		// check validity of item
		if ( ! $this->_verify_item( $item )) { 
			$this->_clean_cart( $item );
			return FALSE;
		}
			
		foreach ( $item as $key => $value ) {
		
			// process data based on type
			switch ( $key ) {
				
				case 'id' :
						// filter id as alphanumeric with dashes, underscores, and periods allowed
						$item['id'] = trim( preg_replace( '/[^A-Za-z0-9-_.+$]/', '', $item['id']) ); 					
				break;
				
				case 'qty' : 
						// filter qty as numbers only 
						$item['qty'] = trim( preg_replace('/[^0-9+$]/', '', $item['qty']) ); 					
				break;
				
				case 'price' : 
						// filter price as numbers and decimals only 
						$item['price'] = trim( preg_replace('/[^0-9.+$]/', '', $item['price']) ); 			
						$item['price'] = number_format( $item['price'], 2, '.', '' );		
				break;
				
				case 'name' : 
						// only filter out odd characters
						$item['name'] = trim( preg_replace('/[^A-Za-z0-9\s\s+\.\:\-\/%+\(\)\*\&\$\#\!\@\"\']/', '', $item['name'] )); 					
				break;
				
				default : 
						// esc illegal characters for all other entries
						$item[$key] = trim( esc_html( $item[$value] )); 					
				break;
				
			}
		}
			
		// each line item in the cart requires a unique identifier
		if ( isset( $item['options'] ) && ! empty( $item['options'] ) ) { 
			// add item options to accomodate adding multiples of same item to cart that have different options
			$line_item_id = md5( $which_cart . $item['id'] . implode( '', $item['options'] ) );
		} else {
			$line_item_id = md5( $which_cart . $item['id'] );
		}
		
		//$item['line_item_id'] = $line_item_id;
		
		$item = array_merge( array( 'line_item' => $line_item_id ), $item );
		
		// remove previous entries of this item so as not to carry over unwanted options
		$this->remove_from_cart ( $which_cart, $line_item_id );
			
		// then add item to cart - FINALLY!
		$this->cart[ $which_cart ]['items'][ $line_item_id ] = $item;
		
		// recalculate cart totals based on new items
		$this->calculate_cart_totals( $which_cart );
		
		return TRUE;
		
	}		





	/**
	 *			@ recalculate cart totals
	 *		  @access public
	 *			@return TRUE on success, FALSE on fail
	 */	
	public function calculate_cart_totals( $which_cart ) {

		// we'll check for a valid cart on this one
		if ( ! $which_cart or ! isset( $this->cart[ $which_cart ] )) {
			$this->_notices['errors'][] = 'An error occured. No cart or an invalid cart was specified.';
			return FALSE;
		}
		
		// start with nothing
		$total_items = 0;
		$sub_total = 0;
	
		// check for items first
		if ( isset( $this->cart[ $which_cart ]['items'] )) {
			// cycle thru each item
			foreach ( $this->cart[ $which_cart ]['items'] as $item ) {
				// check validity of item to ensure it has required properties
				if ( $this->_verify_item( $item )) { 
					// add qty of this item to total
					$total_items = $total_items + $item['qty'];
					// calculate price of item multiplied by qty 
					$this->cart[ $which_cart ]['items'][ $item['line_item'] ]['line_total'] = $item['qty'] * $item['price'];
					// and add that to subtotal
					$sub_total = $sub_total + $this->cart[ $which_cart ]['items'][ $item['line_item'] ]['line_total'];
				} else {
					// garbage item ! get rid of it !
					$this->_clean_cart( $item );
					return FALSE;
				}
			}			
		} else {
			// cart has no items, but we'll let this run so that the totals get zero'd out
		}
		
		$this->cart[ $which_cart ][ 'total_items' ] = $total_items;
		$this->cart[ $which_cart ][ 'sub_total' ] = $sub_total;
		
		return TRUE;
		
	}
	




	/**
	 *			@remove items from cart
	 *		  @access public
	 *			@return TRUE on success, FALSE on fail
	 */	
	public function remove_from_cart( $which_cart = FALSE, $line_item_ids = FALSE ) {
		
		//echo '<h3>'.__FUNCTION__.'</h3>';
		
		// we'll check for a valid cart on this one
		if ( ! $which_cart or ! isset( $this->cart[ $which_cart ] )) {
			$this->_notices['errors'][] = 'An error occured. No cart or an invalid cart was specified.';
			return FALSE;
		}
		
		// how am I supposed to remove NOTHING from the cart???
		if ( ! $line_item_ids ) {
			$this->_notices['errors'][] = 'An error occured. No items were removed from the cart.';
			return FALSE;
		}
		
		// check if only a single line_item_id was passed
		if ( ! is_array( $line_item_ids )) {
			// place single line_item_id in an array to appear as multiple line_item_ids
			$line_item_ids = array ( $line_item_ids );			
		}
		
		$removals = 0;
		// cycle thru line_item_ids
		foreach ( $line_item_ids as $line_item_id ) {
			// check if line_item_id exists in cart
			if ( isset( $line_item_id )) {
				// remove that item
				unset( $this->cart[ $which_cart ]['items'][ $line_item_id ] );
				$removals++;
			}
		}
		
		return $removals;
		
	}		





	/**
	 *			@remove ALL items from cart and zero ALL totals
	 *		  @access public
	 *			@return TRUE on success, FALSE on fail
	 */	
	public function empty_cart( $which_cart = 'CART' ) {
		
		//echo '<h3>'.__FUNCTION__.'</h3>';
		
		// we'll check for a valid cart on this one
		if ( ! $which_cart or ! isset( $this->cart[ $which_cart ] )) {
			$this->_notices['errors'][] = 'An error occured. No cart or an invalid cart was specified.';
			return FALSE;
		}
		
		if ( isset( $this->cart[ $which_cart ] )) {
			// remove that item
			unset( $this->cart[ $which_cart ] );
			$removals++;
		}
		
		return $removals;
		
	}		





	/**
	 *			@returns contents of the cart
	 *		  @access public
	 *			@return array on success, FALSE on fail
	 */	
	public function whats_in_the_cart( $which_cart = 'CART' ) {
		
		//echo '<h3>'.__FUNCTION__.'</h3>';
		
	}		





	/**
	 *			@save cart to session
	 *		  @access private
	 *			@return string
	 */	
	private function _save_cart( $which_cart = 'CART', $items = FALSE ) {
	

	}
	
	
	
	
	
	/**
	 *			@verify cart item possess required properties
	 *		  @access private
	 *			@return TRUE on success, FALSE on fail
	 */	
	private function _verify_item( $item ) {

		// we will require each item to have values for the following
		$required_keys = array( 'id', 'name', 'price', 'qty' );
		
		foreach ( $required_keys as $required_key ) {
			// check that item has required property
			if ( ! isset ( $item[ $required_key ] )) { 
				$this->_notices['errors'][] = 'An error occured. Items passed to the cart must possess a valid ' . $required_key . '.';
				return FALSE;
			}
		}
		
		return TRUE;	

	}
	
	
	
	
	
	/**
	 *			@clean junk items from cart
	 *		  @access private
	 *			@return TRUE on success, FALSE on fail
	 */	
	private function _clean_cart( $item = FALSE ) {
		
		return TRUE;	

	}








}


// create global var
global $EE_Cart;
// instantiate !!!
$EE_Cart = EE_Cart::instance();


/* End of file EE_Cart.class.php */
/* Location: /includes/functions/EE_Cart.class.php */