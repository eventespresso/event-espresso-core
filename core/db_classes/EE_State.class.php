<?php if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package 		Event Espresso
 * @ author 		Event Espresso
 * @ copyright 	(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license 		{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link 				{@link http://www.eventespresso.com}
 * @ since 			4.0
 *
 */



/**
 * EE_State class
 *
 * @package 			Event Espresso
 * @subpackage 	includes/classes/EE_State.class.php
 * @author 				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EE_State extends EE_Base_Class {

	/**
	 * @param array $props_n_values
	 * @return EE_State|mixed
	 */
	public static function new_instance( $props_n_values = array() ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__ );
		return $has_object ? $has_object : new self( $props_n_values );
	}



	/**
	 * @param array $props_n_values
	 * @return EE_State
	 */
	public static function new_instance_from_db( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}



	/**
	 * @return string
	 */
	public function country_iso() {
		return $this->get( 'CNT_ISO' );
	}



	/**
	 * @return string
	 */
	public function abbrev() {
		return $this->get( 'STA_abbrev' );
	}



	/**
	 * @return bool
	 */
	public function active() {
		return $this->get( 'STA_active' );
	}



	/**
	 * @return string
	 */
	public function name() {
		return $this->get( 'STA_name' );
	}



	/**
	 * @return EE_Country
	 */
	public function country() {
		return $this->get_first_related( 'Country' );
	}



	/**
	 * @param $iso
	 */
	public function set_country_iso( $iso ) {
		$this->set( 'CNT_ISO', $iso );
	}



	/**
	 * @param $abbrev
	 */
	public function set_abbrev( $abbrev ) {
		$this->set( 'STA_abbrev', $abbrev );
	}



	/**
	 * @param $active
	 */
	public function set_active( $active ) {
		$this->set( 'STA_active', $active );
	}



	/**
	 * @param $name
	 */
	public function set_name( $name ) {
		$this->set( 'STA_name', $name );
	}
}

/* End of file EE_State.class.php */
/* Location: /includes/classes/EE_State.class.php */