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
	var $cart = array(

					'REG' => array( 
																	'title' => 'Single Registrations', 
																	'total_items' => 0, 
																	'sub_total' => 0, 
																	'empty_msg' => 'No Current Registrations'
																),
					'MER' => array( 
																	'title' => 'Multi Registrations', 
																	'total_items' => 0, 
																	'sub_total' => 0, 
																	'empty_msg' => 'No Current Registrations' 
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

		global $EE_Session;
		// if sessions is not instantiated
		if ( ! defined( ESPRESSO_SESSION )) {
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/functions/EE_Session.class.php');
			$EE_Session = EE_Session::instance();
		}
		$this->session = $EE_Session;
		
		// are we using encryption?
		if ( ! defined( ESPRESSO_ENCRYPT )) {
			require_once( EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/functions/EE_Encryption.class.php' );
			// instantiate the class object making all properties and methods accessible via $this->encryption ex: $this->encryption->encrypt();
			$this->encryption = EE_Encryption::instance();
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
				// add it to default empty cart 
				$this->cart[ $cart_type ] = $this->session->data[ $cart_type ];
			} 
		}
		
		$line_item = $this->session->encryption->encrypt( 'Kr4z33D4dd33' );


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
			$this->_notices['errors'][] = 'An error occured. The data passed to the cart was invalid and could not be added.';
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
				if ( $this->_add_item( $item ) ) {
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
	 *		  @access public
	 *			@return TRUE on success, FALSE on fail
	 */	
	public function _add_item( $which_cart = 'CART', $item ) {
		
		//echo '<h3>'.__FUNCTION__.'</h3>';
		
		// we will require each item to have values for the following
		$required_keys = array( 'id', 'name', 'price', 'qty' );
		
		foreach ( $required_keys as $required_key ) {
		
			if ( ! isset ( $item[ $required_key ] )) { 
				$this->_notices['errors'][] = 'An error occured. Items passed to the cart must possess a valid ' . $required_key . '.';
				return FALSE;
			}
		}
			
		foreach ( $item as $key => $value ) {
		
			// process data based on type
			switch ( $key ) {
				
				case 'id' :
						// filter id as alphanumeric with dashes, underscores, and periods allowed
						$item['id'] = trim( preg_replace('/^[:word:]\_\.+$/', '', $item['id']) ); 					
				break;
				
				case 'qty' : 
						// filter qty as numbers only 
						$item['qty'] = trim( preg_replace('/^[:digit:]+$/', '', $item['qty']) ); 					
				break;
				
				case 'price' : 
						// filter price as numbers and decimals only 
						$item['price'] = trim( preg_replace('[^[:digit:]\.]', '', $item['price']) ); 			
						$item['price'] = number_format( $item['price'], 2, '.', '' );		
				break;
				
				case 'name' : 
						// only filter out odd characters
						$item['name'] = trim( preg_replace('/[^A-Za-z0-9\s\s+\.\:\-\/%+\(\)\*\&\$\#\!\@\"\']/', '', $item['name'] )); 					
				break;
				
				default : 
						// esc illegal characters for all other entries
						$item['name'] = trim( esc_html( $item[$key] )); 					
				break;
				
			}
			
			if ( isset( $item['options'] ) && ! empty( $item['options'] ) ) { 
				// each line item in the cart requires a unique identifier
				$line_item = $this->session->encryption->encrypt( $which_cart . '-' . $item['id'] );
			}
			
		}
		
		
		
	}		





	/**
	 *			@remove items from cart
	 *		  @access public
	 *			@return TRUE on success, FALSE on fail
	 */	
	public function remove_from_cart( $which_cart = 'CART', $items = FALSE ) {
		
		//echo '<h3>'.__FUNCTION__.'</h3>';
		
	}		





	/**
	 *			@remove ALL items from cart and zero ALL totals
	 *		  @access public
	 *			@return TRUE on success, FALSE on fail
	 */	
	public function empty_cart( $which_cart = 'CART' ) {
		
		//echo '<h3>'.__FUNCTION__.'</h3>';
		// opps! that session var does not exist!
		$this->_notices['errors'][] = 'No session item provided is invalid or does not exist.';
		return FALSE;
		
	}		





	/**
	 *			@returns contents of the cart
	 *		  @access public
	 *			@return array on success, FALSE on fail
	 */	
	public function cart_contents( $which_cart = 'CART' ) {
		
		//echo '<h3>'.__FUNCTION__.'</h3>';
		
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









}

/* End of file EE_Cart.class.php */
/* Location: /includes/functions/EE_Cart.class.php */