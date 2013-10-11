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
	/** Amount", "event_espresso @var LIN_amount*/ 
	protected $_LIN_amount = NULL;
	/** Quantity", "event_espresso @var LIN_quantity*/ 
	protected $_LIN_quantity = NULL;
	/** Taxable?", "event_espresso @var LIN_taxable*/ 
	protected $_LIN_taxable = NULL;
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
	 * Gets amount
	 * @return float
	 */
	function amount() {
		return $this->get('LIN_amount');
	}

	/**
	 * Sets amount
	 * @param float $amount
	 * @return boolean
	 */
	function set_amount($amount) {
		return $this->set('LIN_amount', $amount);
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
	 * Gets taxable
	 * @return boolean
	 */
	function taxable() {
		return $this->get('LIN_taxable');
	}

	/**
	 * Sets taxable
	 * @param boolean $taxable
	 * @return boolean
	 */
	function set_taxable($taxable) {
		return $this->set('LIN_taxable', $taxable);
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




}