<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link					{@link http://www.eventespresso.com}
 * @ since		 		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * EE_State class
 *
 * @package			Event Espresso
 * @subpackage	includes/classes/EE_State.class.php
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
require_once ( EE_CLASSES . 'EE_Base_Class.class.php' );
class EE_State extends EE_Base_Class{

	protected $_STA_ID;
	protected $_CNT_ISO;
	protected $_STA_abbrev;
	protected $_STA_name;
	protected $_STA_active;
	
	/**
	 * All the attendees in this state
	 * @var EE_Attendee[]
	 */
	protected $_Attendee;
	/**
	 * Related Country, lazy-loaded
	 * @access protected
	 * @var EE_Country 
	 */
	protected $_Country;
	
	/**
	 * Venues in this state
	 * @var EE_Venue[]
	 */
	protected $_Venue;



	public static function new_instance( $props_n_values = array() ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname );
		return $has_object ? $has_object : new self( $props_n_values );
	}



	public static function new_instance_from_db ( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}



	public function country_iso(){
		return $this->get('CNT_ISO');
	}
	public function abbrev(){
		return $this->get('STA_abbrev');
	}
	public function active(){
		return $this->get('STA_active');
	}
	public function name(){
		return $this->get('STA_name');
	}
	public function country(){
		return $this->get_first_related('Country');
	}
	public function set_country_iso($iso){
		$this->set('CNT_ISO',$iso);
	}
	public function set_abbrev($abbrev){
		$this->set('STA_abbrev',$abbrev);
	}
	public function set_active($active){
		$this->set('STA_active',$active);
	}
	public function set_name($name){
		$this->set('STA_name',$name);
	}



}

/* End of file EE_State.class.php */
/* Location: /includes/classes/EE_State.class.php */