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
	/**
	 * Index in cart
	 * @var string 
	 */
	protected $_LIN_code = NULL;
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
	/**
	 * Indicating whether or not this item should be taxed
	 * @var boolean
	 */
	protected $_LIN_is_taxable = NULL;
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
	/** ID of Item purchased.", "event_espresso @var OBJ_ID*/ 
	protected $_OBJ_ID = NULL;
	/** Type of Line Item purchased.", "event_espresso @var LIN_item_type*/ 
	protected $_OBJ_type = NULL;
		



	/**
	 * Registration the Checkin references
	 * @var EE_Registration
	 */
	protected $_Transaction;
	
	/**
	 * The ticket this line item MAY refer to
	 * @var EE_Ticket
	 */
	protected $_Ticket;

	/**
	 *The Price (usually a tax) this item MAY refer to
	 * @var EE_Price
	 */
	protected $_Price;
	
	/**
	 * All children line items
	 * @var EE_Line_Item[]
	 */
	protected $_Line_Item;



/**
 * 
 * @param type $props_n_values
 * @param type $timezone
 * @return EE_Line_Item
 */
	public static function new_instance( $props_n_values = array(), $timezone = NULL ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname, $timezone );
		return $has_object ? $has_object : new self( $props_n_values, FALSE, $timezone );
	}


	public static function new_instance_from_db ( $props_n_values = array(), $timezone = NULL ) {
		return new self( $props_n_values, TRUE, $timezone );
	}
	
	/**
	 * Adds some defaults if they're not specified
	 * @param type $fieldValues
	 * @param type $bydb
	 * @param type $timezone
	 */
	protected function __construct($fieldValues = null, $bydb = FALSE, $timezone = NULL) {
		if(! isset($fieldValues['LIN_code'])){
			$fieldValues['LIN_code'] = $this->generate_code();
		}
		parent::__construct($fieldValues, $bydb, $timezone);
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
	function OBJ_ID() {
		return $this->get('OBJ_ID');
	}

	/**
	 * Sets item_id
	 * @param string $item_id
	 * @return boolean
	 */
	function set_OBJ_ID($item_id) {
		return $this->set('OBJ_ID', $item_id);
	}
	
	/**
	 * Gets item_type
	 * @return string
	 */
	function OBJ_type() {
		return $this->get('OBJ_type');
	}

	/**
	 * Sets item_type
	 * @param string $OBJ_type
	 * @return boolean
	 */
	function set_OBJ_type($OBJ_type) {
		return $this->set('OBJ_type', $OBJ_type);
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
		if($this->ID()){
			return $this->get_model()->get_all(array(array('LIN_parent'=>$this->ID())));
		}else{
			if( ! is_array($this->_Line_Item)){
				$this->_Line_Item = array();
			}
			return $this->_Line_Item;
			
		}
	}
	
	/**
	 * Gets code
	 * @return string
	 */
	function code() {
		return $this->get('LIN_code');
	}

	/**
	 * Sets code
	 * @param string $code
	 * @return boolean
	 */
	function set_code($code) {
		return $this->set('LIN_code', $code);
	}
	/**
	 * Gets is_taxable
	 * @return boolean
	 */
	function is_taxable() {
		return $this->get('LIN_is_taxable');
	}

	/**
	 * Sets is_taxable
	 * @param boolean $is_taxable
	 * @return boolean
	 */
	function set_is_taxable($is_taxable) {
		return $this->set('LIN_is_taxable', $is_taxable);
	}

	/**
	 * Gets the object that this model-joins-to. Eg, if this line item join model object
	 * is for a ticket, this will return teh ticket object
	 * @return EE_Base_Class (one of the model objects that the field OBJ_ID can point to... see the 'OBJ_ID' field on EEM_Promotion_Object)
	 */
	function object(){
		$model_name_of_related_obj = $this->OBJ_type();
		$is_model_name = EE_Registry::instance()->is_model_name($model_name_of_related_obj);
		if( ! $is_model_name ){
			return null;
		}else{
			return $this->get_first_related($model_name_of_related_obj);
		}
	}

	/**
	 * Adds the line item as a child to this line item
	 * @param EE_Line_Item $line_item
	 * @return void
	 */
	function add_child_line_item(EE_Line_Item $line_item){
		if($this->ID()){
			$line_item->set_parent_ID($this->ID());
			$line_item->save();
		}else{
			$this->_Line_Item[$line_item->code()] = $line_item;
		}
	}
	/**
	 * Gets teh child line item as specified by its code. Because this returns an object (by reference)
	 * you can modify this child line item and the parent (this object) can know about them
	 * because it also has a reference to that line item
	 * @param string $code
	 * @return EE_Line_Item
	 */
	function get_child_line_item($code){
		if($this->ID()){
			return $this->get_model()->get_one(array(array('LIN_code'=>$code)));
		}else{
			return $this->_Line_Item[$code];
		}
	}
	/**
	 * Returns how many items are deleted (or, if this item hasn' tbeen saved ot teh DB yet, just how many it HAD cached on it)
	 * @return int
	 */
	function delete_children_line_items(){
		if($this->ID()){
			return $this->get_model()->delete(array(array('LIN_parent'=>$this->ID())));
		}else{
			$count = count($this->_Line_Item);
			$this->_Line_Item = array();
			return $count;
		}
	}
	
	/**
	 * If this line item has been saved to the DB, deletes its child with LIN_code == $code. If this line 
	 * HASN'T been saved to the DB, removes the child line item with index $code
	 * @param string $code
	 * @return int count of items deleted (or simply removed from the line item's cache, if not hasn' tbeen saved to teh DB yet)
	 */
	function delete_child_line_item($code){
		if($this->ID()){
			return $this->get_model()->delete(array(array('LIN_code'=>$code,'LIN_parent'=>$this->ID())));
		}else{
			unset($this->_Line_Item[$code]);
			return 1;
		}
	}
	
	/**
	 * Creates a code and returns a string. doesn't assign the code to this model object
	 * @return string
	 */
	function generate_code(){
		// each line item in the cart requires a unique identifier
		return md5( $this->_OBJ_type . $this->_OBJ_ID . time() );
	}

	/**
	 * Recalculates the total of this line item based on its children, or based on its changed quantity. If this item 
	 * has NO children, then just returns: is_percent ? (total) : (unit price * quantity)
	 * @return float
	 */
	function recalculate_total(){
		if($this->children()){
			$total = 0;
			foreach($this->children() as $child_line_item){
				if($child_line_item->is_percent()){
					$total += $total * $child_line_item->total() / 100;
				}else{
					$total += $child_line_item->recalculate_total();
				}
			}
		}else{
			if($this->is_percent()){
				$total = $this->total();
			}else{
				$total = $this->unit_price() * $this->quantity();
			}
		}
		$this->set_total($total);
		return $total;
	}


}