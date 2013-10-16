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
 * EE_Cart_Item class
 *
 * @ version		2.0
 * @subpackage	includes/classes/EE_Cart_Item.class.php
 * @author		Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
abstract class EE_Cart_Item {

	/**
	 * 	a unique identifier generated upon item creation that will be used as the key for this item in the cart
	 * 	@access 	protected
	 *	@param string
	 */
	protected $_line_item_ID;

	/**
	 * 	the number of items of this type
	 * 	@access 	protected
	 *	@param int
	 */
	protected $_qty;

	/**
	 * 	returns the ID
	 * 	@access 	public
	 *	@return string
	 */
	abstract public function ID();

	/**
	 * 	returns the name
	 * 	@access 	public
	 *	@return string
	 */
	abstract public function name();

	/**
	 * 	returns the price
	 * 	@access 	public
	 *	@return float
	 */
	abstract public function price();

	/**
	 * 	whether or not taxes should be applied to this item
	 * 	@access 	public
	 *	@return boolean
	 */
	abstract public function is_taxable();

	/**
	 * 	sets the unique identifier for this item
	 * 	@access 	public
	 * 	@param string 	$classname
	 * 	@param int 		$ID
	 */
	public function set_line_item_ID( $classname, $ID ) {
		// only allow _line_item_ID to be set if it has not been set already
		if ( $this->_line_item_ID == NULL ) {
			// each line item in the cart requires a unique identifier
			$this->_line_item_ID = md5( $classname . $ID . time() );
		}
	}

	/**
	 * 	get the number of items of this type
	 * 	@access 	public
	 *	@return string
	 */
	public function line_item_ID() {
		return $this->_line_item_ID;
	}
	
	/**
	 * 	sets the number of items of this type
	 * 	@access 	public
	 *	@param int $qty
	 */
	public function set_qty( $qty ) {
		$this->_qty = $qty;
	}

	/**
	 * 	get the number of items of this type
	 * 	@access 	public
	 *	@return int
	 */
	public function qty() {
		return $this->_qty;
	}
	/**
	 * 	get the result of the price multiplied by the qty 
	 * 	@access 	public
	 *	@return float
	 */
	public function line_total() {
		return $this->price() * $this->_qty;
	}

} 
/* End of file EE_Cart_Item.class.php */
/* Location: /includes/classes/EE_Cart_Item.class.php */