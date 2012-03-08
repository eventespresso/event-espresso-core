<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/** 
 * EE_Cart class
 *
 * @package				Event Espresso
 * @subpackage			includes/functions
 * @author					Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
 class EE_Cart { 


  // instance of the EE_Cart object
	private static $_instance = NULL;
	
	// cart contents
	private $cart = array();
	
	// default empty cart
	private $_default_empty_cart = array(

					'REG' => array( 
																	'title' => 'Registrations', 
																	'total_items' => 0, 
																	'sub_total' => 0, 
																	'empty_msg' => 'No Current Registrations',
																	'event_id_list' => array()

																),
//					'OPT' => array( 
//																	'title' => 'Additional Options', 
//																	'total_items' => 0, 
//																	'sub_total' => 0, 
//																	'empty_msg' => 'No Additional Options',
//																	'option_id_list' => array()
//																),
//					'CART' => array(
//																	'title' => 'Shopping Cart', 
//																	'total_items' => 0, 
//																	'sub_total' => 0, 
//																	'empty_msg' => 'Your Cart is Empty',
//																	'item_id_list' => array()
//																)
				);
				
	// array of event IDs
	private $_events_in_cart = array();
	
	// totals
	private $_cart_grand_total_qty = 0;
	private $_cart_grand_total_amount = 0;	
				
	// EE_Session object stored by reference
	private $session;
	private $_session_data = array();



 
	/**
	 *		@singleton method used to instantiate class object
	 *		@access public
	 *		@return class instance
	 */	
	public  function &instance ( ) {
		// check if class object is instantiated
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! is_a( self::$_instance, __CLASS__ )) {
			self::$_instance = new self();
//			echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';	
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
 
//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';		

		if ( ! defined( 'EVENT_ESPRESSO_VERSION' )) {
			define( 'ESPRESSO_CART', TRUE );	
		}
		
//		global $notices;
//		$this->_notices = $notices;

		// if sessions is not instantiated
//		if ( ! defined( 'ESPRESSO_SESSION' )) {
//			require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/classes/EE_Session.class.php');
//			$EE_Session = EE_Session::instance();
//		}
		global $EE_Session;
		$this->session = $EE_Session;

//		
//		// are we using encryption?
//		if ( ! defined( 'ESPRESSO_ENCRYPT' )) {
//			require_once( EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/classes/EE_Encryption.class.php' );
//		}
//		// instantiate the class object making all properties and methods accessible via $this->encryption ex: $this->encryption->encrypt();
//		$this->encryption = EE_Encryption::instance();

		// retreive cart options from db
		if ( $cart_settings = get_option( 'espresso_cart_settings' ) !== FALSE ) {
			// cycle though existing cart options
			foreach ( $cart_settings as $var_name => $cart_setting ) {
				// set values for class properties
				$this->_{$var_name} = $cart_setting;
			}
		}

		$this->default_cart();
		$this->initialize_cart();

		// check for existing event id list, which is a list of any events that are currently in the cart
		if ( isset( $this->cart['REG']['event_id_list'] )) {
			$this->_events_in_cart = $this->cart['REG']['event_id_list'];
		} /*else {
			$this->_events_in_cart = array();
		}*/
	


		// once everything is all said and done, save the cart to the EE_Session
		add_action( 'shutdown', array( &$this, '_save_cart' ), 90);


	}





	/**
	 *			apply default values to the cart
	 * 
	 *		  	@access private
	 *			@return void
	 */	
	private function default_cart() {
		
		$extra_default_empty_cart_vars = array();
		// filter hook allows outside functions/classes/plugins to change default empty cart
		$extra_default_empty_cart_vars = apply_filters( 'filter_hook_espresso_default_empty_cart', $extra_default_empty_cart_vars );		
		$this->_default_empty_cart = array_merge( $this->_default_empty_cart, $extra_default_empty_cart_vars );
		
	}





	/**
	 *			initialize the cart
	 * 
	 *		  	@access private
	 *			@return void
	 */	
	private function initialize_cart() {
		
//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';	
		
		// grab any session data carried over from the previous page access
		$this->_session_data = $this->session->get_session_data( FALSE, FALSE );

		// cycle thru default cart types
		$default_cart_types = array_keys( $this->_default_empty_cart );
		foreach ( $default_cart_types as $cart_type ) {

			// check if cart has been initialized
			if ( isset( $this->_session_data['cart'][ $cart_type ] )) { 
			
				// now check for any cart data within the current EE_session
				if ( ! empty( $this->_session_data['cart'][ $cart_type ] )) { 
					//add existing data to cart 
					$this->cart[ $cart_type ] = $this->_session_data['cart'][ $cart_type ];
				}
				
				//unset( $this->session_data['cart'][ $cart_type ] );
			
			} else {
				// or add default data for empty cart
				$this->cart[ $cart_type ] = $this->_default_empty_cart[ $cart_type ];
			}
				
		}
	
	}




	/**
	 *			@process items for adding to cart
	 *		  	@access public
	 *		  	@param string - which_cart
	 *		  	@param array - items
	 *			@return TRUE on success, FALSE on fail 
	 */	
	public function add_to_cart( $which_cart = 'REG', $items = FALSE ) {
			
//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';
		$save_cart = FALSE;

		// check that the passed properties are valid
		$this->_verify_cart_properties ( array( 'which_cart' => $which_cart, 'items' => $items )); 

		// check if only a single item was passed by looking for item id
		if ( isset( $items['id'] )) {
			// place single item in an array to appear as multiple items
			$items = array ( $items );			
		}
		
//		echo '<h1>items</h1>';
//		echo pre_arr($items);
		
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
			$this->_save_cart();		// $which_cart, $items 
			return TRUE;
		} else {
			return FALSE;
		}

	}		





	/**
	 *			@remove items from cart
	 *		  @access private
	 *		  @param string - which_cart
	 *		  @param array - item
	 *			@return TRUE on success, FALSE on fail
	 */	
	private function _add_item( $which_cart = 'REG', $item ) {
		
//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';
		// check that the passed properties are valid
		$this->_verify_cart_properties ( array( 'which_cart' => $which_cart, 'item' => $item )); 
			
		foreach ( $item as $key => $value ) {
		
		//echo  '$key : ' . $key . '   $value : ' . $value . '<br />';
		
			// process data based on type
			switch ( $key ) {
				
				case 'id' :
						// filter id as alphanumeric with dashes, underscores, and periods allowed
						$item['id'] = trim( preg_replace( '/[^A-Za-z0-9-_.+$]/', '', $item['id']) ); 					
				break;
				
				case 'qty' : 
						// filter qty as numbers only 
						$item['qty'] = (int) trim( preg_replace('/[^0-9+$]/', '', $item['qty']) ); 					
				break;
				
				case 'price' : 
						// filter price as numbers and decimals only 
						$item['price'] = trim( preg_replace('/[^0-9.+$]/', '', $item['price']) ); 			
						$item['price'] = number_format( (float)$item['price'], 2, '.', '' );								
				break;
				
				case 'name' : 
						// only filter out odd characters
						$item['name'] = trim( esc_html( preg_replace('/[^A-Za-z0-9\s\s+\.\:\-\/%+\(\)\*\&\$\#\!\@\"\']/', '', $item['name'] ))); 					
				break;
				
				default : 
						// esc illegal characters for all other entries
						if ( is_array( $value ) or is_object( $value )) {
							foreach( $value as $k => $v ) {
								$item[$key][$k] = trim( esc_attr( $v )); 	
							}	
						} else {
							$item['options'][$key] = trim( esc_attr( $value )); 		
						}			
				break;
				
			}
		}
		
//		echo '<h1>$item</h1>';
//		echo pre_arr( $item );
			
		// each line item in the cart requires a unique identifier
		if ( isset( $item['options'] ) && ! empty( $item['options'] ) ) { 
			// add item options to accomodate adding multiples of same item to cart that have different options
			$line_item_id = md5( $which_cart . $item['id'] . $item['price'] . implode( '', $item['options'] ) );
		} else {
			$line_item_id = md5( $which_cart . $item['id'] . $item['price'] );
		}
		
		//$item['line_item_id'] = $line_item_id;
		
		$item = array_merge( array( 'line_item' => $line_item_id ), $item );
		
		// remove previous entries of this item so as not to carry over unwanted options
		$this->remove_from_cart ( $which_cart, $line_item_id );

		// then add item to cart - FINALLY!
		$this->cart[ $which_cart ]['items'][ $line_item_id ] = $item;
		
		// recalculate cart totals based on new items
		if ( $this->calculate_cart_totals( $which_cart ) ) {
			return TRUE;
		} else {
			return FALSE;
		}
		
		
	}		





	/**
	 *			@ recalculate cart totals
	 *		  @access public
	 *		  @param string - which_cart
	 *			@return TRUE on success, FALSE on fail
	 */	
	public function calculate_cart_totals( $which_cart ) {

		// check that the passed properties are valid
		$this->_verify_cart_properties ( array( 'which_cart' => $which_cart )); 
		
		// start with nothing
		$total_items = 0;
		$sub_total = 0;
	
		// check for items first
		if ( isset( $this->cart[ $which_cart ]['items'] )) {
			// cycle thru each item
			foreach ( $this->cart[ $which_cart ]['items'] as $item ) {
				
				// check validity of item to ensure it has required properties
				if ( $this->_verify_cart_properties ( array( 'item' => $item ))) {
				
					// add qty of this item to total
					$total_items = $total_items + $item['qty'];
					// calculate price of item multiplied by qty 
					$this->cart[ $which_cart ]['items'][ $item['line_item'] ]['line_total'] = $item['qty'] * $item['price'];
					// and add that to subtotal
					$sub_total = $sub_total + $this->cart[ $which_cart ]['items'][ $item['line_item'] ]['line_total'];
					
				} else {
					// garbage item ! get rid of it !
					$this->_clean_cart(  );
					// run it again
					$this->calculate_cart_totals( $which_cart );
				}
				
			}			
		} else {
			// cart has no items, but we'll let this run so that the totals get zero'd out
		}
		
		$this->cart[ $which_cart ][ 'total_items' ] = $total_items;
		$this->cart[ $which_cart ][ 'sub_total' ] = $sub_total;
		
		$this->calculate_cart_grand_total();
		
		return TRUE;
		
	}





	/**
	 *			@ recalculate cart grand totals
	 *		  	@access public
	 *		  	@param string - which_cart
	 *			@return void
	 */	
	public function calculate_cart_grand_total( ) {
	
		$this->_cart_grand_total_qty = 0;
		$this->_cart_grand_total_amount = 0;
		
		// cycle thru each cart
		foreach ( $this->cart as $which_cart => $cart ) {
		
			if ( isset ( $cart[ 'total_items' ] )) {
				$this->_cart_grand_total_qty = $this->_cart_grand_total_qty + $cart[ 'total_items' ];
			}		
			
			if ( isset ( $cart[ 'sub_total' ] )) {
				$this->_cart_grand_total_amount = $this->_cart_grand_total_amount + $cart[ 'sub_total' ];
			}
					
		}
	}





	/**
	 *			@ recalculate cart grand totals
	 *		  	@access public
	 *		  	@param string - which_cart
	 *			@return void
	 */	
	public function get_cart_grand_totals() {
	
		$cart_grand_totals = array();
		$cart_grand_totals['grand_total_qty'] = $this->_cart_grand_total_qty;
		$cart_grand_totals['grand_total_amount'] = $this->_cart_grand_total_amount;
		
		return $cart_grand_totals;
		
	}	




	/**
	 *			@change the quantity of an item in the cart
	 *		  @access public
	 *		  @param string - which_cart
	 *		  @param mixed - string or array - line_item_ids
	 *		  @param int - new_qty
	 *			@return int on success, FALSE on fail
	 */	
	public function edit_qty( $which_cart = FALSE, $line_item_id = FALSE, $new_qty = FALSE ) {

		$updates = 0;

		// check for a valid cart properties
		$this->_verify_cart_properties ( array( 'which_cart' => $which_cart, 'line_item_ids' => $line_item_id, 'new_qty' => $new_qty )); 

		// check if only a single line_item_id was passed
		if ( ! is_array( $line_item_id )) {
			// place single line_item_id in an array to appear as multiple line_item_ids
			$line_item_id = array ( $line_item_id );			
		}
		
		foreach ( $line_item_id as $line_item ) {
			// force quantity into an int
			$new_qty = (int)($new_qty);
			// check if line_item_id exists in cart
			if ( isset( $this->cart[ $which_cart ]['items'][ $line_item ] )) {
				// has the quantity been set to zero?
				if ( $new_qty == 0 ) {
					// delete
					if ( $this->remove_from_cart( $which_cart, $line_item )) {
						$updates++;
					}
				} else {
					// check if quantity has actually changed
					if ( $this->cart[ $which_cart ]['items'][ $line_item ]['qty'] != $new_qty ) { 
						// change the quantity for that item
						$this->cart[ $which_cart ]['items'][ $line_item ]['qty'] = $new_qty;
						$updates++;
					}
				}
			}
		}
		
		if ( $updates > 0 ) {
			// recalculate cart totals based on new qtys
			if ( $this->calculate_cart_totals( $which_cart ) ) {
				return TRUE;
			}
		}
		
		return FALSE;
		
	}
	




	/**
	 *			@remove items from cart
	 *		  @access public
	 *		  @param string - which_cart
	 *		  @param mixed - string or array - line_item_ids
	 *			@return int on success, FALSE on fail
	 */	
	public function remove_from_cart( $which_cart = FALSE, $line_item_ids = FALSE ) {
		
//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';
		// check that the passed properties are valid
		$this->_verify_cart_properties ( array( 'which_cart' => $which_cart, 'line_item_ids' => $line_item_ids )); 
		
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
		
		if ( $removals > 0 ) {
			$this->calculate_cart_totals( $which_cart );
			return $removals;
		} else {
			return FALSE;
		}
				
	}		
	




	/**
	 *			@remove events from cart
	 *		  	@access public
	 *		  	@param string - which_cart
	 *		  	@param mixed - string or array - line_item_ids
	 *			@return int on success, FALSE on fail
	 */	
	public function remove_event_from_cart( $which_cart = FALSE, $line_item_ids = FALSE ) {
	
		// check that the passed properties are valid
		$this->_verify_cart_properties ( array( 'which_cart' => $which_cart, 'line_item_ids' => $line_item_ids )); 	
	
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
				
				// now check for an event id
				if ( isset( $this->cart[ $which_cart ]['items'][ $line_item_id ]['id'] )) {
					// grab event id
					$event_id = $this->cart[ $which_cart ]['items'][ $line_item_id ]['id'];
					// first remove item from cart
					if ( $this->remove_from_cart( $which_cart, $line_item_id )) {
					
						// remove event id from event id lists
						unset( $this->cart[ $which_cart ]['event_id_list'][ $event_id ] );
						unset( $this->_events_in_cart[ $event_id ] );
						unset( $this->_data[ 'events_in_cart' ][ $event_id ] );
						$removals++;
					}
				}

			}
		}
		
		if ( $removals > 0 ) {
			return $removals;
		} else {
			return FALSE;
		}
						

	}


	



	/**
	 *		@remove ALL items from cart and zero ALL totals
	 *		@access public
	 *		@param string - which_cart
	 *		@return int on success, FALSE on fail
	 */	
	public function empty_cart( $return_url = FALSE, $which_cart = 'REG' ) {
		
		//echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';
		// check that the passed properties are valid
		$this->_verify_cart_properties ( array( 'which_cart' => $which_cart )); 
		
		//echo pre_arr( $this->cart[ $which_cart ] );

		// does this make me a pessimist?
		$success = FALSE;
		
		if ( isset( $this->cart[ $which_cart ] )) {
			// obliterate the cart
			unset( $this->cart[ $which_cart ] );
			// add the default empty cart settings back in 
			// cycle thru default cart types
			$default_cart_types = array_keys( $this->_default_empty_cart );
			foreach ( $default_cart_types as $cart_type ) {
				// or add default data for empty cart
				$this->cart[ $cart_type ] = $this->_default_empty_cart[ $cart_type ];
				$success = TRUE;
			}
		}
		
		if ( $success ) {
		
			$this->_events_in_cart = array();
			$this->_cart_grand_total_qty = 0;
			$this->_cart_grand_total_amount = 0;
			$this->_save_cart();
			
			// no return url ?
			if ( ! $return_url ) {
				// then let's find out what page the event listings are on 
				global $org_options;
				$event_page_id = $org_options['event_page_id'];
				$permalink = get_permalink( $event_page_id );
				// and send them to the event queue
				$return_url = $permalink . '?regevent_action=event_queue';					
			}		
			
			//echo '<h1 style="font-size:24px;">Return URL : ' . $return_url .'</h1>';	
			if ( $return_url == 'AJAX' ) {
				return __('All events have been successfully removed from the Event Queue.', 'espresso');
			} else {
				wp_redirect( $return_url );
				exit();
			}
							
		} else {
			return __('An error occured! No Events could be removd from the Queue!', 'espresso');
		}
		
	}		





	/**
	 *			@check if item is in cart
	 *		  @access public
	 *		  @param string - which_cart
	 *			@return array on success, FALSE on fail
	 */	
	public function is_event_in_cart( $event_id, $which_cart = 'REG', $section = 'espresso' ) {
		
//		$session_data =  $this->get_session_data($which_cart);
//		$events_in_cart = $session_data['event_id_list'];
		
//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';
		
		// if there are actually some event_ids to look through
		if ( is_array( $this->_events_in_cart ) && ! empty( $this->_events_in_cart ) ) {
				// if the event we are looking for is in there
			if ( in_array( $event_id, $this->_events_in_cart  )) {
				return TRUE;
			} else {
				return FALSE;
			}
		}
		
	}





	/**
	 *			@check if item is in cart
	 *		  @access public
	 *		  @param string - which_cart
	 *			@return array on success, FALSE on fail
	 */	
	public function is_in_cart( $item_id, $which_cart = 'REG', $section = 'espresso'  ) {
	
		// check that the passed properties are valid
		$this->_verify_cart_properties ( array( 'which_cart' => $which_cart )); 
		
		// haven't found it yet... of course, we haven't looked yet either
		$found_it = FALSE;
		
		// the list of items we will be looking through
		$items = $this->get_session_data[$section][$which_cart];

		// if there are actually some items to look through
		if ( is_array( $items ) && ! empty( $items ) ) {
			// cycle thru items
			foreach ( $items as $item ) {
				// if the item we are looking for is in there
				if ( in_array( $item_id, $item )) {
					$found_it = TRUE;
				}		
		
			}
		} 

		// did we found it?
		if ( $found_it ) {
			return TRUE;
		} else {
			return FALSE;
		}
		
		
	}





	/**
	 *		returns key values from $this->cart - ie: list of $which_cart values
	* 
	 *		@access public
	 *		@return array 
	 */	
	public function get_cart_types() {
		return array_keys($this->cart);
	}





	/**
	 *			@returns contents of the cart
	 *		  @access public
	 *		  @param string - which_cart
	 *			@return array on success, FALSE on fail
	 */	
	public function whats_in_the_cart( $which_cart = 'REG', $line_item_id = FALSE ) {
		
//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';
		// check that the passed properties are valid
		$this->_verify_cart_properties ( array( 'which_cart' => $which_cart, 'line_item_id' => $line_item_id )); 

		if ( $line_item_id ) {
			return $this->cart[ $which_cart ]['items'][ $line_item_id ];					
		} else {
			return $this->cart[ $which_cart ];		
		}

	}		





	/**
	 *			@save cart to session
	 *		  @access private
	 *			@return TRUE on success, FALSE on fail
	 */	
	public function _save_cart() {
	
//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';		
		//echo $this->session->pre_r($this->cart);

		// take out the trash
		$this->_clean_cart();
		
		$cart_data = array(
											'cart' => $this->cart,
											'_events_in_cart' => $this->_events_in_cart,
											'_cart_grand_total_qty' => $this->_cart_grand_total_qty,
											'_cart_grand_total_amount' => $this->_cart_grand_total_amount
										);
			
		// add cart data to session so it can be saved to the db
		if ( $this->session->set_session_data( $cart_data, 'session_data' )) {
			return TRUE;
		} else {
			return FALSE;
		}

	}
	
	
	
	
	
	/**
 *			@clean junk items from cart
	 *		  @access private
	 *			@return void
	 */	
	private function _clean_cart() {
		
		foreach ( $this->cart as $which_cart => $cart ) {
		if ( isset( $cart['items'] ) && ! empty( $cart['items'] ) ) {
				foreach ( $cart['items'] as $items ) {
					foreach ( $items as $line_item_id => $item ) {
					
						// do both instances of the line item id match ???
						if ( $line_item_id != $item['line_item'] ) {
							// delete
							$this->remove_from_cart( $which_cart, $line_item_id );
							break;
						} elseif ( $line_item_id != md5( $which_cart . $item['id'] ) ) {
							// does the line item id match the md5 of the values it was created from ??? - for items with NO options
							// delete
							$this->remove_from_cart( $which_cart, $line_item_id );
							break;
						} elseif ( isset( $item['options'] )) {
							// if this item has options, then does the line item id match the md5 of the values it was created from ???
							if ( $line_item_id != ( md5( $which_cart . $item['id'] . implode( '', $item['options'] )))) {
								// delete
								$this->remove_from_cart( $which_cart, $line_item_id );
							}
						} 
					}
				}
			}
		}
	}
	
	
	
	
	
	/**
 	*		@clean junk items from cart
	*		@access private
	*		@param array - properties
	*		@return TRUE on success, FALSE on fail
	*/	
	private function _verify_cart_properties ( $properties = array() ) {
		
		// WHAT?!?!! check the validity of properties before you validate them ?!?!? geez... my head hurts
		if ( ! isset( $properties ) or ! is_array( $properties ) or empty( $properties )) {
			$this->_notices['errors'][] = 'An error occured. No cart properties were submitted for verification .';
			return FALSE;
		}
		
		foreach ( $properties as  $what_property => $property ) {
			switch ( $what_property ) {
			
				case 'which_cart' :
						// check for a valid cart
						if ( ! $property or ! isset( $this->cart[ $property ] )) {
							$this->_notices['errors'][] = 'An error occured. No cart or an invalid cart was specified.';
							return FALSE;
						}
				break;
				
				case 'line_item_ids' :
						//check for a line item id(s)
						if ( ! $property ) {
							$this->_notices['errors'][] = 'An error occured. No item was specified.';
							return FALSE;
						}
				break;
				
				case 'line_item_id' :
						// check for a line item id(s)
						if ( ! $property or ! isset( $this->cart[ $properties['which_cart'] ]['items'][ $property ] )) {
							$this->_notices['errors'][] = 'An error occured. No item was specified.';
							return FALSE;
						}						
				break;
				
				case 'new_qty' :
						//check for a new_qty
						if ( ! $property or ! is_int( $property )) {
							$this->_notices['errors'][] = 'An error occured. Either no item quantity, or an invalid item quantity was specified.';
							return FALSE;
						}
				break;
				
				case 'item' :
						// we will require each item to have values for the following
						$required_keys = array( 'id', 'name', 'price', 'qty' );
						
						foreach ( $required_keys as $required_key ) {
							// check that item has required property
							if ( ! isset ( $property[ $required_key ] )) { 
								$this->_notices['errors'][] = 'An error occured. Items passed to the cart must possess a valid ' . $required_key . '.';
								return FALSE;
							}
						}
				break;
				
				case 'items' :
						if ( ! is_array( $property ) or empty( $property ) ) {
							$this->_notices['errors'][] = 'An error occured. The data passed to the cart was invalid. No items could be added to the cart.';
							return FALSE;
						}
				break;
				
				case 'event_id' :
						// check $event_id 
						if ( ! $property or ! is_int( $property )) {
							$this->_notices['errors'][] = 'An error occured. An invalid or missing event id was submitted and therefore could not be added to the events in cart list.';
							return FALSE;
						}						
				break;
				
			}
		}
		
		// if you made it this far... you must be good kid
		return TRUE;	

	}






	/**
 	*		get_item_id
	* 
	*		@access public
	*		@return array
	*/	
	public function get_item_id( $line_item_id = FALSE, $which_cart = 'REG' ) {
	
		if ( ! $this->_verify_cart_properties ( array( 'line_item_id' => $line_item_id , 'which_cart' => 'REG' ))) {
			return FALSE;
		}

		return $this->cart[$which_cart]['items'][$line_item_id]['id'];			
		
	}




	/**
 	*		get_cart_event_id_list
	* 
	*		@access public
	*		@return array
	*/	
	public function get_cart_event_id_list( $which_cart = 'REG' ) {
	
		if ( ! $this->_verify_cart_properties ( array( 'which_cart' => 'REG' ))) {
			return FALSE;
		}
		
		return $this->cart[$which_cart]['event_id_list'];
		
	}




	/**
 	*		add an event id to an individual cart's event_id_list array
	* 
	*		@access public
	*		@return array
	*/	
	public function add_to_cart_event_id_list( $which_cart = 'REG', $event_id = FALSE ) {
		
		if ( ! $this->_verify_cart_properties ( array( 'which_cart' => 'REG', 'event_id' => $event_id ))) {
			return FALSE;
		}
		
		$this->cart[$which_cart]['event_id_list'][ $event_id ] = absint( $event_id );
		return TRUE;
		
	}



	/**
 	*		remove an event id from an individual cart's event_id_list array
	* 
	*		@access public
	*		@return array
	*/	
	public function remove_from_cart_event_id_list( $which_cart = 'REG', $event_id = FALSE ) {
		
		if ( ! $this->_verify_cart_properties ( array( 'which_cart' => 'REG', 'event_id' => $event_id ))) {
			return FALSE;
		}
		
		// first check that the event id exists
		if ( isset( $this->cart[$which_cart]['event_id_list'][ $event_id ] )) {
			// found it? now kill it!
			unset( $this->cart[$which_cart]['event_id_list'][ $event_id ] );
			return TRUE;
		} else {
			$this->_notices['errors'][] = 'An error occured. The submitted event id was not found in the events in cart list.';
			return FALSE;
		}		
				
	}





	/**
 	*		get_events_in_cart
	* 
	*		@access public
	*		@return array
	*/	
	public function get_events_in_cart_list() {
		return $this->_events_in_cart;
	}





	/**
 	*		add an event id to the _events_in_cart array
	* 
	*		@access	public
	*		@param 	int 	$event_id 
	*		@return 	TRUE on success
	* 		@return 	FALSE on fail
	*/	
	public function set_events_in_cart_list( $event_id = FALSE ) {

		// check $event_id 
		if ( ! $this->_verify_cart_properties ( array( 'event_id' => $event_id ))) {
			return FALSE;
		}
				
		$this->_events_in_cart[ $event_id ] = absint( $event_id );	
		return TRUE;
	
	}





	/**
 	*		remove an event id from the _events_in_cart array
	* 
	*		@access	public
	*		@param 	int 	$event_id 
	*		@return 	TRUE on success
	* 		@return 	FALSE on fail
	*/	
	public function unset_events_in_cart_list( $event_id = FALSE ) {

		// check $event_id 
		if ( ! $event_id or ! is_int( $event_id )) {
			$this->_notices['errors'][] = 'An error occured. An invalid or missing event id was submitted and therefore could not be removed from the events in cart list.';
			return FALSE;
		}
		
		// first check that the event id exists
		if ( isset( $this->_events_in_cart[ $event_id ] )) {
			// found it? now kill it!
			unset( $this->_events_in_cart[ $event_id ]);
			return TRUE;
		} else {
			$this->_notices['errors'][] = 'An error occured. The submitted event id was not found in the events in cart list.';
			return FALSE;
		}		
	
	}





	/**
 	*		get_cart_grand_total_qty
	* 
	*		@access public
	*		@return int
	*/	
	public function get_cart_grand_total_qty() {
		return $this->_cart_grand_total_qty;
	}




	/**
 	*		get_cart_grand_total_amount
	* 
	*		@access public
	*		@return float
	*/	
	public function get_cart_grand_total_amount() {
		return $this->_cart_grand_total_amount;
	}





	/**
 	*		add additional details to an item in the cart 
	* 
	*		@access	public
	*		@param 	int 	$event_id 
	*		@return 	TRUE on success
	* 		@return 	FALSE on fail
	*/	
	public function set_line_item_details( $extra_details = FALSE, $line_item_id = FALSE, $which_cart = 'REG'  ) {

		// check $extra_details 
		if ( ! $extra_details or ! is_array( $extra_details ) or empty( $extra_details )) {
			$this->_notices['errors'][] = 'An error occured. An invalid or missing set of details was submitted and therefore could not be added to the cart item.';
			return FALSE;
		}
		
		if ( ! $this->_verify_cart_properties ( array( 'line_item_id' => $line_item_id , 'which_cart' => 'REG' ))) {
			return FALSE;
		}
				
		foreach ( $extra_details as $key => $extra_detail ) {
			$this->cart[$which_cart]['items'][ $line_item_id ][ $key ] = $extra_detail;
		}
			
			
	}
	





}





/**
*		register Minicart Widget
*		@access public
*		@return void
*/	
function register_ee_minicart_widget() {
	
//	echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';		
	
	require_once( EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/classes/EE_Minicart_widget.class.php');
	//register widget
	register_widget( 'EE_Minicart' );
	
}
// use widgets_init action hook to execute register function
add_action( 'widgets_init', 'register_ee_minicart_widget' );		


// create global var
//global $EE_Cart;
// instantiate !!!
//$EE_Cart = EE_Cart::instance();


/* End of file EE_Cart.class.php */
/* Location: /includes/classes/EE_Cart.class.php */