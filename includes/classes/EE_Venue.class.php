<?php

class EE_Venue extends EE_Base_Class {

	/**
	 * Related events
	 * @var EE_Event[]
	 */
	protected $_Event;

	/**
	 * related state
	 * @var EE_State
	 */
	protected $_State;

	/**
	 * related country
	 * @var EE_COuntry
	 */
	protected $_Country;
	protected $_VNU_ID;
	protected $_VNU_name;
	protected $_VNU_desc;
	protected $_VNU_identifier;
	protected $_VNU_created;
	protected $_VNU_short_desc;
	protected $_STS_ID;
	protected $_VNU_modified;
	protected $_VNU_wp_user;
	protected $_VNU_parent;
	protected $_VNU_order;
	protected $_VNU_address;
	protected $_VNU_address2;
	protected $_VNU_city;
	protected $_STA_ID;
	protected $_CNT_ISO;
	protected $_VNU_zip;
	protected $_VNU_phone;
	protected $_VNU_capacity;

	/**
	 * 
	 * @param type $props_n_values
	 * @return EE_Venue
	 */
	public static function new_instance($props_n_values = array()) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object($props_n_values, $classname);
		return $has_object ? $has_object : new self($props_n_values);
	}

	/**
	 * 
	 * @param type $props_n_values
	 * @return EE_Venue
	 */
	public static function new_instance_from_db($props_n_values = array()) {
		return new self($props_n_values, TRUE);
	}

	function status_ID() {
		return $this->get('STA_ID');
	}

	function set_status_ID($status_ID) {
		return $this->set('STA_ID', $status_ID);
	}

	/**
	 * Gets address
	 */
	function address() {
		return $this->get('VNU_address');
	}

	/**
	 * Sets address
	 */
	function set_address($address) {
		return $this->set('VNU_address', $address);
	}

	/**
	 * Gets state
	 */
	function state_ID() {
		return $this->get('STA_ID');
	}

	/**
	 * Sets state
	 */
	function set_state_ID($state) {
		return $this->set('STA_ID', $state);
	}

	/**
	 * Gets address2
	 */
	function address2() {
		return $this->get('VNU_address2');
	}

	/**
	 * Sets address2
	 */
	function set_address2($address2) {
		return $this->set('VNU_address2', $address2);
	}

	/**
	 * Gets capacity
	 */
	function capacity() {
		return $this->get('VNU_capacity');
	}

	/**
	 * Sets capacity
	 */
	function set_capacity($capacity) {
		return $this->set('VNU_capacity', $capacity);
	}

	/**
	 * Gets city
	 */
	function city() {
		return $this->get('VNU_city');
	}

	/**
	 * Sets city
	 */
	function set_city($city) {
		return $this->set('VNU_city', $city);
	}

	/**
	 * Gets created
	 */
	function created() {
		return $this->get('VNU_created');
	}

	/**
	 * Sets created
	 */
	function set_created($created) {
		return $this->set('VNU_created', $created);
	}

	/**
	 * Gets desc
	 */
	function description() {
		return $this->get('VNU_desc');
	}

	/**
	 * Sets desc
	 */
	function set_description($desc) {
		return $this->set('VNU_desc', $desc);
	}

	/**
	 * Gets identifier
	 */
	function identifier() {
		return $this->get('VNU_identifier');
	}

	/**
	 * Sets identifier
	 */
	function set_identifier($identifier) {
		return $this->set('VNU_identifier', $identifier);
	}

	/**
	 * Gets modified
	 */
	function modified() {
		return $this->get('VNU_modified');
	}

	/**
	 * Sets modified
	 */
	function set_modified($modified) {
		return $this->set('VNU_modified', $modified);
	}
	
	/**
	 * Gets name
	 */
	function name() {
		return $this->get('VNU_name');
	}

	/**
	 * Sets name
	 */
	function set_name($name) {
		return $this->set('VNU_name', $name);
	}

	/**
	 * Gets order
	 */
	function order() {
		return $this->get('VNU_order');
	}

	/**
	 * Sets order
	 */
	function set_order($order) {
		return $this->set('VNU_order', $order);
	}

	/**
	 * Gets parent
	 */
	function parent() {
		return $this->get('VNU_parent');
	}

	/**
	 * Sets parent
	 */
	function set_parent($parent) {
		return $this->set('VNU_parent', $parent);
	}

	/**
	 * Gets phone
	 */
	function phone() {
		return $this->get('VNU_phone');
	}

	/**
	 * Sets phone
	 */
	function set_phone($phone) {
		return $this->set('VNU_phone', $phone);
	}

	
	/**
	 * Gets wp_user
	 */
	function wp_user() {
		return $this->get('VNU_wp_user');
	}

	/**
	 * Sets wp_user
	 */
	function set_wp_user($wp_user) {
		return $this->set('VNU_wp_user', $wp_user);
	}

	
	/**
	 * Gets zip
	 */
	function zip() {
		return $this->get('VNU_zip');
	}

	/**
	 * Sets zip
	 */
	function set_zip($zip) {
		return $this->set('VNU_zip', $zip);
	}

	/**
	 * Gets all events happening at this venue. QUery parameters can be added to 
	 * fetcha subset of those events.
	 * @param array $query_params like EEM_Base::get_all's $query_params
	 * @return EE_Event[]
	 */
	function events($query_params = array()){
		return $this->get_many_related('Event', $query_params);
	}
}