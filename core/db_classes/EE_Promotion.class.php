<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
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
 * EE_Promotion class
 *
 * @package			Event Espresso
 * @subpackage		includes/classes/EE_Answer.class.php
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Promotion extends EE_Base_Class{
	
	
	/** ID", "event_espresso @var PRO_ID*/ 
	protected $_PRO_ID = NULL;
	
				/** Price ID", "event_espresso @var PRC_ID*/ 
	protected $_PRC_ID = NULL;
				
				/** Scope", "event_espresso @var PRO_scope*/ 
	protected $_PRO_scope = NULL;
				
				/** Start Date/Time", "event_espresso @var PRO_start*/ 
	protected $_PRO_start = NULL;
				
				/** End Date/Time", "event_espresso @var PRO_end*/ 
	protected $_PRO_end = NULL;
				
				/** Code", "event_espresso @var PRO_code*/ 
	protected $_PRO_code = NULL;
				
				/** Times used within a given scope", "event_espresso @var PRO_uses*/ 
	protected $_PRO_uses = NULL;
				
				/** Usable Globally?", "event_espresso @var PRO_global*/ 
	protected $_PRO_global = NULL;
				
				/** Times used Globally", "event_espresso @var PRO_global_uses*/ 
	protected $_PRO_global_uses = NULL;
				
				/** Exlusive? (ie, can't be used with other promotions)", "event_espresso @var PRO_exclusive*/ 
	protected $_PRO_exclusive = NULL;
				
				/** Accepted", "event_espresso @var PRO_accept_msg*/ 
	protected $_PRO_accept_msg = NULL;
				
				/** Declined", "event_espresso @var PRO_decline_msg*/ 
	protected $_PRO_decline_msg = NULL;
				
				/** Usable by default on all new items within promotion's scope", "event_espresso @var PRO_default*/ 
	protected $_PRO_default = NULL;
				
				/** Order", "event_espresso @var PRO_order*/ 
	protected $_PRO_order = NULL;
				
	/**
	 *
	 * @var EE_Promotion_Rule[]
	 */
	protected $_Promotion_Rule = NULL;
	
	/**
	 *
	 * @var EE_Rule[]
	 */
	protected $_Rule = NULL;
				
	/**
	 *
	 * @var EE_Price
	 */
	protected $_Price = NULL;
	
	/**
	 * 
	 * @var EE_Promotion_Object[] relation to join-model between promotions and whatevers
	 */
	protected $_Promotion_Object = NULL;
	/**
	 * 
	 * @param type $props_n_values
	 * @return self
	 */
	public static function new_instance( $props_n_values = array() ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname );
		return $has_object ? $has_object : new self( $props_n_values);
	}

	/**
	 * 
	 * @param type $props_n_values
	 * @return self
	 */
	public static function new_instance_from_db ( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}
/**
 * 
 * @return int
 */
	public function price_ID(){
		return $this->get('PRC_ID');
	}
	/**
	 * 
	 * @return string
	 */
	public function accept_message(){
		return $this->get('PRO_accept_msg');
	}
	/**
	 * 
	 * @return string
	 */
	public function code(){
		return $this->get('PRO_code');
	}
	/**
	 * 
	 * @return string
	 */
	public function decline_message(){
		return $this->get('PRO_decline_msg');
	}
	/**
	 * returns whether or not this promotion should be added by default to all items in its scope
	 * @return boolean
	 */
	public function is_default(){
		return $this->get('PRO_default');
	}
	/**
	 * Gets the date this promotion is no longer valid
	 * @return string
	 */
	public function end($date_format=null,$time_format=null){
		return $this->_get_datetime('PRO_end',$date_format,$time_format);
	}
	/**
	 * If this returns true, this promotion cannot be combined with other promotions.
	 * If false, it can be
	 * @return boolean
	 */
	public function is_exclusive(){
		return $this->get('PRO_exlusive');
	}
	/**
	 * Return whether or not this promotion can be used globally or not
	 * @return boolean
	 */
	public function is_global(){
		return $this->get('PRO_global');
	}
	/**
	 * The number of times thsi promotion has been used globally
	 * @return int
	 */
	public function global_uses(){
		return $this->get('PRO_global_uses');
	}
	/**
	 * the order in which this promotion should be applied
	 * @return int
	 */
	public function order(){
		return $this->get('PRO_order');
	}
	/**
	 * The model this promotion should be applied to. Eg, Registration, Transaction, etc.
	 * @return string
	 */
	public function scope(){
		return $this->get('PRO_scope');
	}
	/**
	 * Returns the date/time this promotion becomes available
	 * @param type $date_format
	 * @param type $time_format
	 * @return string
	 */
	public function start($date_format=null,$time_format=null){
		return $this->get_datetime('PRO_start', $date_format, $time_format);
	}
	/**
	 * Gets the number of times this promotion has been used in its particular scope
	 * @return int
	 */
	public function uses(){
		return $this->get('PRO_uses');
	}
	
	/**
	 * 
	 * @param type $price_id
	 * @return boolean
	 */
	public function set_price_ID($price_id){
		return $this->set('PRC_ID',$price_id);
	}
	
	public function set_scope($scope){
		return $this->set('PRO_scope',$scope);
	}
	/**
	 *
	 * @param string $start
	 * @returns boolean
	 */
	public function set_start($start) {
		return $this->set('PRO_start', $start);
	}
	/**
	 *
	 * @param string $end
	 * @returns boolean
	 */
	public function set_end($end) {
		return $this->set('PRO_end', $end);
	}
	/**
	 *
	 * @param string $code
	 * @returns boolean
	 */
	public function set_code($code) {
		return $this->set('PRO_code', $code);
	}
	/**
	 * Sets how many times this promotion has been used in the given scope
	 * @param int $uses
	 * @returns boolean
	 */
	public function set_uses($uses) {
		return $this->set('PRO_uses', $uses);
	}
	/**
	 * Sets whether or not this promotion is global
	 * @param boolean $global
	 * @returns boolean
	 */
	public function set_global($global) {
		return $this->set('PRO_global', $global);
	}
	/**
	 * Sets the number of times this promotion hsa been used globally
	 * @param string $global_uses
	 * @returns boolean
	 */
	public function set_global_uses($global_uses) {
		return $this->set('PRO_global_uses', $global_uses);
	}
	/**
	 * Sets whether or not this promotion is exlusive (ie, cant be combiend with others)
	 * @param boolean $exclusive
	 * @returns boolean
	 */
	public function set_exclusive($exclusive) {
		return $this->set('PRO_exclusive', $exclusive);
	}
	/**
	 * sets the acceptance message
	 * @param string $accept_msg
	 * @returns boolean
	 */
	public function set_accept_msg($accept_msg) {
		return $this->set('PRO_accept_msg', $accept_msg);
	}
	/**
	 * sets the declined message
	 * @param string $decline_msg
	 * @returns boolean
	 */
	public function set_decline_msg($decline_msg) {
		return $this->set('PRO_decline_msg', $decline_msg);
	}
	/**
	 * Sets whether or not this promotion should be usable by DEFAULT on all new items in its scope
	 * @param boolean $default
	 * @returns boolean
	 */
	public function set_default($default) {
		return $this->set('PRO_default', $default);
	}
	/**
	 * sets the order of application on this promotion
	 * @param int $order
	 * @returns boolean
	 */
	public function set_order($order) {
		return $this->set('PRO_order', $order);
	}
	
}

/* End of file EE_Answer.class.php */
/* Location: /includes/classes/EE_Answer.class.php */