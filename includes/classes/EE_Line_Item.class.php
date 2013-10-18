<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('AHEE_log', __FILE__, ' FILE LOADED', '' );
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link					{@link http://www.eventespresso.com}
 * @ since		 		4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Line_Item class
 *
 * @package			Event Espresso
 * @subpackage		includes/classes/EE_Checkin.class.php
 * @author			Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Line_Item extends EE_Base_Class{
	
	
	/** ID", "event_espresso @var LIN_ID*/ 
	protected $_LIN_ID = NULL;
	/** Transaction ID", "event_espresso @var TXN_ID*/ 
	protected $_TXN_ID = NULL;
	/** Line Item Name", "event_espresso @var LIN_name*/ 
	protected $_LIN_name = NULL;
	/** Line Item Description", "event_espresso @var LIN_desc*/ 
	protected $_LIN_desc = NULL;
	/**
	 * Line Item Unit Price
	 */
	protected $_LIN_unit_price = NULL;
	/**
	 *
	 * @var $_LIN_is_percent whether or not the unit price is a percent
	 */
	protected $_LIN_is_percent = NULL;
	/** Quantity", "event_espresso @var LIN_quantity*/ 
	protected $_LIN_quantity = NULL;
	/**
	 *
	 * @var $_LIN_total total percent ? (previous-total * unit_price) : (unit_price * quantity); (where previous-total is the total of all previous line items in this group)
	 */
	protected $_LIN_total = NULL;
	/**
	 *
	 * @var $_LIN_order order of application in producing the parent (this only makes a different when the items are a mix of percent VS flat-rate items)
	 */
	protected $_LIN_order = NULL;
	/**
	 *
	 * @var $_LIN_type one of line-item, sub-item, sub-total, tax, total. mostly handy for display
	 */
	protected $_LIN_type = NULL;
	/** ID of Item purchased. NOT for querying", "event_espresso @var LIN_item_id*/ 
	protected $_LIN_item_id = NULL;
	/** Type of Line Item purchased. NOT for querying", "event_espresso @var LIN_item_type*/ 
	protected $_LIN_item_type = NULL;
		




	/**
	 * Registration the Checkin references
	 * @var EE_Registration
	 */
	protected $_Transaction;





	public static function new_instance( $props_n_values = array(), $timezone = NULL ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname, $timezone );
		return $has_object ? $has_object : new self( $props_n_values, FALSE, $timezone );
	}


	public static function new_instance_from_db ( $props_n_values = array(), $timezone = NULL ) {
		return new self( $props_n_values, TRUE, $timezone );
	}
	
	/**
	 * Gets TXN_ID
	 * @return int
	 */
	function TXN_ID() {
		return $this->get('TXN_ID');
	}

	/**
	 * Sets TXN_ID
	 * @param int $TXN_ID
	 * @return boolean
	 */
	function set_TXN_ID($TXN_ID) {
		return $this->set('TXN_ID', $TXN_ID);
	}
	
	/**
	 * Gets name
	 * @return string
	 */
	function name() {
		return $this->get('LIN_name');
	}

	/**
	 * Sets name
	 * @param string $name
	 * @return boolean
	 */
	function set_name($name) {
		return $this->set('LIN_name', $name);
	}
	/**
	 * Gets desc
	 * @return string
	 */
	function desc() {
		return $this->get('LIN_desc');
	}

	/**
	 * Sets desc
	 * @param string $desc
	 * @return boolean
	 */
	function set_desc($desc) {
		return $this->set('LIN_desc', $desc);
	}
	/**
	 * Gets quantity
	 * @return int
	 */
	function quantity() {
		return $this->get('LIN_quantity');
	}

	/**
	 * Sets quantity
	 * @param int $quantity
	 * @return boolean
	 */
	function set_quantity($quantity) {
		return $this->set('LIN_quantity', $quantity);
	}
	
	/**
	 * Gets item_id
	 * @return string
	 */
	function item_id() {
		return $this->get('LIN_item_id');
	}

	/**
	 * Sets item_id
	 * @param string $item_id
	 * @return boolean
	 */
	function set_item_id($item_id) {
		return $this->set('LIN_item_id', $item_id);
	}
	/**
	 * Gets item_type
	 * @return string
	 */
	function item_type() {
		return $this->get('LIN_item_type');
	}

	/**
	 * Sets item_type
	 * @param string $item_type
	 * @return boolean
	 */
	function set_item_type($item_type) {
		return $this->set('LIN_item_type', $item_type);
	}
	
	/**
	 * Gets unit_price
	 * @return float
	 */
	function unit_price() {
		return $this->get('LIN_unit_price');
	}

	/**
	 * Sets unit_price
	 * @param float $unit_price
	 * @return boolean
	 */
	function set_unit_price($unit_price) {
		return $this->set('LIN_unit_price', $unit_price);
	}
	/**
	 * Gets is_percent
	 * @return boolean
	 */
	function is_percent() {
		return $this->get('LIN_is_percent');
	}

	/**
	 * Sets is_percent
	 * @param boolean $is_percent
	 * @return boolean
	 */
	function set_is_percent($is_percent) {
		return $this->set('LIN_is_percent', $is_percent);
	}
	/**
	 * Gets total
	 * @return float
	 */
	function total() {
		return $this->get('LIN_total');
	}

	/**
	 * Sets total
	 * @param float $total
	 * @return boolean
	 */
	function set_total($total) {
		return $this->set('LIN_total', $total);
	}
	/**
	 * Gets parent
	 * @return int
	 */
	function parent_ID() {
		return $this->get('LIN_parent');
	}

	/**
	 * Sets parent
	 * @param int $parent
	 * @return boolean
	 */
	function set_parent_ID($parent) {
		return $this->set('LIN_parent', $parent);
	}
	
	/**
	 * Gets type
	 * @return string
	 */
	function type() {
		return $this->get('LIN_type');
	}

	/**
	 * Sets type
	 * @param string $type
	 * @return boolean
	 */
	function set_type($type) {
		return $this->set('LIN_type', $type);
	}

	/**
	 * Gets the line item of which this item is a compoiste. Eg, if this is a subtotal, the parent might be a total\
	 * @return EE_Line_Item
	 */
	public function parent(){
		return $this->get_model()->get_one_by_ID($this->parent_ID());
	}

	/**
	 * Gets ALL the children of this line item (ie, all the parts that contribute towards this total).
	 * @return EE_Line_Item[]
	 */
	public function children(){
		return $this->get_modeel()->get_all(array(array('LIN_parent'=>$this->ID())));
	}



}