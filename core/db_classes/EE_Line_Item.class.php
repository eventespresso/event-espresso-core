<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
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
 * see EEM_Line_Item for description
 *
 * @package			Event Espresso
 * @subpackage		includes/classes/EE_Checkin.class.php
 * @author			Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Line_Item extends EE_Base_Class implements EEI_Line_Item{
	
	
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
	 * Line Item Unit Price (0 if its a percent)
	 */
	protected $_LIN_unit_price = NULL;
	/**
	 *
	 * @var $_LIN_percent if its a percent line item, then this is a number betweeen 100-1
	 */
	protected $_LIN_percent = NULL;
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
	 * The parent line item's ID. (By "parent", we mean that THIS line item contributes towards
	 * the total on the "parent's" total)
	 * @var int
	 */
	protected $_LIN_parent = NULL;
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
	 * Registration the Check-in references
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
		
		parent::__construct($fieldValues, $bydb, $timezone);
		
		if( ! $this->get('LIN_code')){
			$this->set_code($this->generate_code());
		}
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
	 * Checks if this item is a percentage modifier or not
	 * @return boolean
	 */
	function is_percent() {
		$unit_price_is_not_0 =  $this->get('LIN_unit_price') >= .001; 
		$percent = $this->get('LIN_percent');
		if( ! $unit_price_is_not_0 && $percent){
			return true;
		}elseif($unit_price_is_not_0 && ! $percent){
			return false;
		}elseif($unit_price_is_not_0 && $percent){
			throw new EE_Error(sprintf(__("A Line Item can not have a unit price of (%s) AND a percent (%s)!", "event_espresso"),$unit_price,$percent));
		}else{//if they're both 0, assume its not a percent item
			return false;
		}
	}
	/**
	 * Gets percent (between 100-.001)
	 * @return float
	 */
	function percent() {
		return $this->get('LIN_percent');
	}

	/**
	 * Sets percent (bewteen 100-0.01)
	 * @param float $percent
	 * @return boolean
	 */
	function set_percent($percent) {
		return $this->set('LIN_percent', $percent);
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
	function get_object(){
		$model_name_of_related_obj = $this->OBJ_type();
		$is_model_name = EE_Registry::instance()->is_model_name($model_name_of_related_obj);
		if( ! $is_model_name ){
			return null;
		}else{
			return $this->get_first_related($model_name_of_related_obj);
		}
	}
	
	/**
	 * Like EE_Line_Item::get_object(), but can only ever actually return an EE_Ticket.
	 * (IE, if this line item is for a price or something else, will return NULL)
	 * @return EE_Ticket
	 */
	function ticket( $query_params = array() ){
		//we're going to assume that when this method is called we always want to receive the attached ticket EVEN if that ticket is archived.  This can be overridden via the incoming $query_params argument
		$remove_defaults = array('default_where_conditions' => 'none');
		$query_params = array_merge($remove_defaults, $query_params);
		return $this->get_first_related('Ticket', $query_params);
	}
	
	/**
	 * Gets the event's name that's related to the ticket, if this is for
	 * a ticket
	 * @return string
	 */
	function ticket_event_name(){
		$event_name = __("Unknown", "event_espresso");
		$ticket = $this->ticket();
		if($ticket){
			$datetime = $ticket->first_datetime();
			if($datetime){
				$event = $datetime->event();
				if($event){
					$event_name = $event->name();
				}
			}
		}
		return $event_name;
	}
	
	/**
	 * Gets the first datetime for this lien item, assuming it's for a ticket
	 * @param type $date_format
	 * @param type $time_format
	 * @return string
	 */
	function ticket_datetime_start($date_format,$time_format){
		$first_datetime_string = __("Unknown", "event_espresso");
		$ticket = $this->ticket();
		if($ticket){
			$first_datetime = $ticket->first_datetime();
			if($first_datetime){
				$first_datetime_string = $first_datetime->start_date_and_time($date_format,$time_format);
			}
		}
		return $first_datetime_string;
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
			return $this->get_model()->get_one(array(array( 
				'LIN_parent'=>$this->ID(),
				'LIN_code'=>$code 
			)));
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
			return $this->get_model()->delete(array(array(
				'LIN_parent'=>$this->ID()
			)));
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
			return $this->get_model()->delete(array(array(
				'LIN_code'=>$code,
				'LIN_parent'=>$this->ID()
			)));
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
	
	function is_tax(){
		return EEM_Line_Item::type_tax == $this->type();
	}
	function is_tax_sub_total(){
		return EEM_Line_Item::type_tax_sub_total == $this->type();
	}
	function is_line_item(){
		return EEM_Line_Item::type_line_item == $this->type();
	}
	function is_sub_line_item(){
		return EEM_Line_Item::type_sub_line_item == $this->type();
	}
	function is_sub_total(){
		return EEM_Line_Item::type_sub_total == $this->type();
	}
	function is_total(){
		return EEM_Line_Item::type_total == $this->type();
	}
	
	/**
	 * 
	 * @return string like '2, 004.00', formatted according to the localized currency
	 */
	function unit_price_no_code(){
		return $this->get_pretty('LIN_unit_price','no_currency_code');
	}
	/**
	 * 
	 * @return string like '2, 004.00', formatted according to the localized currency
	 */
	function total_no_code(){
		return $this->get_pretty('LIN_total','no_currency_code');
	}

	/**
	 * Gets the final total on this item, taking taxes into account.
	 * Has the side-effect of saving the total as it was just calculated
	 * @return float
	 */
	function recalculate_total_including_taxes(){
		$pre_tax_total = $this->recalculate_pre_tax_total();
		$tax_total = $this->recalculate_taxes_and_total();
		$total = $pre_tax_total + $tax_total;
		$this->set_total($total);
		return $total;
	}
	/**
	 * Recursively goes through all the children and recalculates sub-totals EXCEPT for
	 * tax-sub-totals (they're a an odd beast). Updates the 'total' on each line item according to either its
	 * unit price * quantity or the total of all its children.
	 * @return float
	 */
	function recalculate_pre_tax_total($include_taxable_items_only = false){
		//completely ignore tax sub-totals when calculating the pre-tax-total
		if($this->is_tax_sub_total()){
			return 0;
		}elseif($this->is_sub_line_item()){
			throw new EE_Error(sprintf(__("Calculating the pretax-total on subline items doesnt make sense right now. You were trying to calculate it on %s", "event_espresso"),d($this)));
		}elseif($this->is_line_item()){
			//we'll want to attach promotions here too. So maybe, if the line item has children, we'll need to take them into account too
			if( $include_taxable_items_only && ! $this->is_taxable() ){//if the item isn't taxable and we care, then don't include it
				return 0;
			}else{
				$total = $this->unit_price() * $this->quantity();
			}
		}elseif($this->is_sub_total() || $this->is_total()){
			//get the total of all its children
			$total = 0;
			foreach($this->children() as $child_line_item){
				//only recalculate sub-totals for NON-taxes
				if($child_line_item->is_percent()){
					$total += $total * $child_line_item->percent() / 100;
				}else{
					$total += $child_line_item->recalculate_pre_tax_total($include_taxable_items_only);
				}
			}
		}
		$this->set_total($total);
		return $total;
	}
	
	/**
	 * Recalculates the total on each individual tax (based on a recalculation of the pre-tax total), sets
	 * the totals on each tax calculated, and returns the final tax total
	 * @return float
	 */
	function recalculate_taxes_and_total(){
		//get all taxes
		$taxes = $this->tax_descendants();
		//calculate the pretax total
		$taxable_total = $this->recalculate_pre_tax_total(true);
		$tax_total = 0;
		foreach($taxes as $tax){
			$total_on_this_tax = $taxable_total*$tax->percent()/100;
			//remember the total on this line item
			$tax->set_total($total_on_this_tax);
			$tax_total += $tax->total();
		}
		$this->_recalculate_tax_sub_total();
		return $tax_total;
		
	}
	
	/**
	 * Simply forces all the tax-sub-totals to recalculate. Assumes the taxes have been calculated
	 * @return void
	 */
	private function _recalculate_tax_sub_total(){
		if($this->is_tax_sub_total()){
			$total = 0;
			//simply loop through all its children (which should be taxes) and sum their total
			foreach($this->children() as $child_tax){
				$total += $child_tax->total();
			}
			$this->set_total($total);
		}elseif($this->is_total()){
			foreach($this->children() as $maybe_tax_subtotal){
				$maybe_tax_subtotal->_recalculate_tax_sub_total();
			}
		}
	}
	
	/**
	 * Gets the total tax on this line item. Assumes taxes have already been calculated using recalculate_taxes_and_total
	 * @return float
	 */
	public function get_total_tax(){
		$this->_recalculate_tax_sub_total();
		$total = 0;
		foreach($this->tax_descendants() as $tax_line_item){
			$total +=$tax_line_item->total();
		}
		return $total;
	}
	
	/**
	 * Gets the total for all the items purchaed only
	 * @return float
	 */
	public function get_items_total(){
		$total = 0;
		foreach($this->_get_descendants_of_type(EEM_Line_Item::type_line_item) as $item){
			$total += $item->total();
		}
		return $total;
	}
	
	/**
	 * Gets all the descendants (ie, children or children of children etc) that 
	 * are of the type 'tax'
	 * @return EE_Line_Item[]
	 */
	function tax_descendants(){
		return $this->_get_descendants_of_type(EEM_Line_Item::type_tax);
	}
	
	/**
	 * Gets all the real items purchaed whcih are children of this item
	 * @return EE_Line_Item[]
	 */
	function get_items(){
		return $this->_get_descendants_of_type(EEM_Line_Item::type_line_item);
	}
	
	/**
	 * Gets all descendants of the specified type
	 * @param string $type one of teh constants on EEM_Line_Item
	 * @return EE_Line_Item
	 */
	protected function _get_descendants_of_type($type){
		$line_items_of_type = array();
		foreach($this->children() as $child_line_item){
			if($child_line_item->type() == $type){
				$line_items_of_type[] = $child_line_item;
			}else{
				//go-through-all-its children looking for taxes
				$line_items_of_type = array_merge($line_items_of_type,$child_line_item->_get_descendants_of_type($type));
			}
		}
		return $line_items_of_type;
	}

	/**
	 * Returns the amount taxable among this line item's children (or if it has no children,
	 * how much of it is taxable)
	 * @return float
	 */
	function taxable_total(){
		if($this->children()){
			$total = 0;
			foreach($this->children() as $child_line_item){
				if($child_line_item->is_percent() && $this->is_taxable()){
					$total += $total * $child_line_item->percent() / 100;
				}elseif($child_line_item->is_taxable()){
					$total += $child_line_item->recalculate_pre_tax_total();
				}
			}
		}else{
			if($this->is_taxable()){
				if($this->is_percent()){
					$total = $this->total();
				}else{
					$total = $this->unit_price() * $this->quantity();
				}
			}else{
				$total = 0;
			}
		}
		return $total;
	}
	
	/**
	 * Gets the transaction for this line item
	 * @return EE_Transaction
	 */
	public function transaction(){
		return $this->get_first_related('Transaction');
	}
	
	/**
	 * Saves this line item to the DB, and recurisvely saves its descendants.
	 * Because there currently is no proper parent-child relation on the model,
	 * save_this_and_cached() will NOT save the descendants. 
	 * Also sets the transaction on this line item and all its descendants before saving
	 * @param int $txn_id if none is provided, assumes $this->TXN_ID()
	 * @return int count of items saved
	 */
	public function save_this_and_descendants_to_txn($txn_id = NULL ){
		if( ! $txn_id ){
			$txn_id = $this->TXN_ID();
		}
		$this->set_TXN_ID($txn_id);
		$children = $this->children();
		$this->save();
		foreach($children as $child_line_item){
			$child_line_item->set_parent_ID($this->ID());
			$child_line_item->save_this_and_descendants_to_txn($txn_id);
		}
	}

}