<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/*
Plugin Name: 	Event Espresso 
Plugin URI: 		http://eventespresso.com/
Description: 	Out-of-the-box Events Registration integrated with PayPal IPN for your Wordpress blog/website. <a href="admin.php?page=support" >Support</a> 
Version: 			3.2.P
Author: 			Seth Shoultes
Author URI:		http://eventespresso.com
License: 			GPLv2

  Copyright (c) 2011 Event Espresso  All Rights Reserved.

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation; either version 2 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
*/ 
/** 
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright			(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	3.2.P
 *
 * ------------------------------------------------------------------------
 *
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
	var $cart = array();
	
	// default empty cart
	var $_empty_cart = array(

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
	var $_events_in_cart = array();
	
	// totals
	var $_cart_grand_total_qty = 0;
	var $_cart_grand_total_amount = 0;	
				
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
		if ( ! defined( 'ESPRESSO_SESSION' )) {
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/classes/EE_Session.class.php');
		}
		// instantiate the class object making all properties and methods accessible via $this->session ex: $this->session->data();
		$this->session = EE_Session::instance();
		
		// are we using encryption?
		if ( ! defined( 'ESPRESSO_ENCRYPT' )) {
			require_once( EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/classes/EE_Encryption.class.php' );
		}
		// instantiate the class object making all properties and methods accessible via $this->encryption ex: $this->encryption->encrypt();
		$this->encryption = EE_Encryption::instance();

		// retreive cart options from db
		if ( $cart_settings = get_option( 'espresso_cart_settings' ) !== FALSE ) {
			// cycle though existing cart options
			foreach ( $cart_settings as $var_name => $cart_setting ) {
				// set values for class properties
				$this->_{$var_name} = $cart_setting;
			}
		}

		// grab any session data carried over from the previous page access
		$session_data = $this->session->data( FALSE, FALSE );
//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'->$session_data</h3>';
//		echo $this->session->pre_r($session_data, TRUE);
		
		// allow outside functions to change default empty cart
		apply_filters_ref_array( 'espresso_default_empty_cart', array( &$this, '_empty_cart' ) );
		
		// cycle thru default cart types
		$default_cart_types = array_keys( $this->_empty_cart );
		foreach ( $default_cart_types as $cart_type ) {

			// check if cart has been initialized
			if ( isset( $session_data['espresso'][ $cart_type ] )) { 
			
				// now check for any cart data within the current EE_session
				if ( ! empty( $session_data['espresso'][ $cart_type ] )) { 
					//add existing data to cart 
					$this->cart[ $cart_type ] = $session_data['espresso'][ $cart_type ];
				}
			
			} else {
				// or add default data for empty cart
				$this->cart[ $cart_type ] = $this->_empty_cart[ $cart_type ];
			}
				
		}

		// check for existing event id list, which is a list of any events that are currently in the cart
		if ( isset( $session_data['REG']['event_id_list'] )) {
			$this->_events_in_cart = $this->cart['REG']['event_id_list'];
		} /*else {
			$this->_events_in_cart = array();
		}*/
		
		

		


		// once everything is all said and done, save the cart to the EE_Session
		add_action( 'shutdown', array( &$this, '_save_cart' ), 90);


	}





	/**
	 *			@intermediate step for adding an event to cart
	 *		  @access public
	 *		  @param string - which_cart
	 *		  @param array - items
	 *			@return TRUE on success, FALSE on fail 
	 */	
	public function add_event_to_cart( $event = FALSE, $qty = 1, $which_cart = 'REG' ) {

		// check that an event has been passed
		if ( ! $event or ! is_array( $event ) or empty( $event )) {
			$this->_notices['errors'][] = 'An error occured. No event details were submitted. Could not add to cart';
			return FALSE;
		}
		
		$event['desc'] = isset( $event['desc'] ) ? $event['desc'] : '';

		$add_to_cart_args = array( 
														'id' 			=> $event['id'],
														'name' 	=> $event['name'],
														'price' 		=> $event['price'],
														'qty' 		=> $event['qty'],
														'details' 	=> $event['desc']											
													);

		// add event to cart
		if ( $this->add_to_cart( $which_cart, $add_to_cart_args ) ) {
		
			// retreive event id list
			//$events_in_cart = $this->session->data('events_in_cart');
			// add this event to list
			$this->_events_in_cart[ $event['id'] ] = absint( $event['id'] ); 
			// send event id list back to session
			$this->session->set_data( $this->_events_in_cart, 'events_in_cart' );

			// add event id to list of events in cart within individual cart
			$this->cart[$which_cart]['event_id_list'][ $event['id'] ] = absint( $event['id'] );

			return TRUE;
			
		} else {
			return FALSE;
		}
		
	}





	/**
	 *			@process items for adding to cart
	 *		  @access public
	 *		  @param string - which_cart
	 *		  @param array - items
	 *			@return TRUE on success, FALSE on fail 
	 */	
	public function add_to_cart( $which_cart = 'CART', $items = FALSE ) {
			
		//echo '<h3>'.__FUNCTION__.'</h3>';
		
		$save_cart = FALSE;

		// check that the passed properties are valid
		$this->_verify_cart_properties ( array( 'which_cart' => $which_cart, 'items' => $items )); 

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
	private function _add_item( $which_cart = 'CART', $item ) {
		
		//echo '<h3>'.__FUNCTION__.'</h3>';
		
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
						if ( ! is_array( $value ) &&  ! is_object( $value )) {
							$item[$key] = trim( esc_attr( $value )); 		
						}			
				break;
				
			}
		}
			
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
		
		//echo '<h3>'.__FUNCTION__.'</h3>';
		
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
						unset( $this->session->_data[ 'events_in_cart' ][ $event_id ] );
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
	 *			@remove ALL items from cart and zero ALL totals
	 *		  @access public
	 *		  @param string - which_cart
	 *			@return int on success, FALSE on fail
	 */	
	public function empty_cart( $which_cart = 'CART' ) {
		
		//echo '<h3>'.__FUNCTION__.'</h3>';
		
		// check that the passed properties are valid
		$this->_verify_cart_properties ( array( 'which_cart' => $which_cart )); 
		
		if ( isset( $this->cart[ $which_cart ] )) {
			// obliterate the cart
			unset( $this->cart[ $which_cart ] );
			// add the default empty cart settings back in 
			$this->cart[ $which_cart ] = $this->_empty_cart[ $which_cart ];
			$removals++;
		}
		
		if ( $removals > 0 ) {
			return $removals;
		} else {
			return FALSE;
		}
		
	}		





	/**
	 *			@check if item is in cart
	 *		  @access public
	 *		  @param string - which_cart
	 *			@return array on success, FALSE on fail
	 */	
	public function is_event_in_cart( $event_id, $which_cart = 'REG', $section = 'espresso' ) {
		
//		$session_data =  $this->session->data($which_cart);
//		$events_in_cart = $session_data['event_id_list'];
		
//		echo '<h3>'.__FUNCTION__.'</h3>';
//		echo $this->session->pre_r($events_in_cart, TRUE);
		
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
	public function is_in_cart( $item_id, $which_cart = 'CART', $section = 'espresso'  ) {
	
		// check that the passed properties are valid
		$this->_verify_cart_properties ( array( 'which_cart' => $which_cart )); 
		
		// haven't found it yet... of course, we haven't looked yet either
		$found_it = FALSE;
		
		// the list of items we will be looking through
		$items = $this->session->data[$section][$which_cart];

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
	 *			@returns contents of the cart
	 *		  @access public
	 *		  @param string - which_cart
	 *			@return array on success, FALSE on fail
	 */	
	public function whats_in_the_cart( $which_cart = 'CART', $line_item_id = FALSE ) {
		
		//echo '<h3>'.__FUNCTION__.'</h3>';

		// check that the passed properties are valid
		$this->_verify_cart_properties ( array( 'which_cart' => $which_cart, 'line_item_id' => $line_item_id )); 

		if ( $line_item_id ) {
			return $this->cart[ $which_cart ][ $line_item_id ];					
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
	
		// take out the trash
		$this->_clean_cart();
		
		// add cart data to session so it can be saved to the db
		if ( $this->session->set_data( $this->cart )) {
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
				
//				case 'line_item_id' :
//						check for a line item id(s)
//						if ( ! $property or ! isset( $this->cart[ $properties['which_cart'] ]['items'][ $property ] )) {
//							$this->_notices['errors'][] = 'An error occured. No item was specified.';
//							return FALSE;
//						}
//				break;
				
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
				
			}
		}
		
		// if you made it this far... you must be good kid
		return TRUE;	

	}







}


// create global var
//global $EE_Cart;
// instantiate !!!
//$EE_Cart = EE_Cart::instance();


/* End of file EE_Cart.class.php */
/* Location: /includes/classes/EE_Cart.class.php */