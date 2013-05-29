<?php

class EE_Venue extends EE_Base_Class{

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
	
	public static function new_instance( $props_n_values = array() ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname );
		return $has_object ? $has_object : new self( $props_n_values);
	}


	public static function new_instance_from_db ( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}
	
}