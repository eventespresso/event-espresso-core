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
 * EE_Status class
 *
 * @package 			Event Espresso
 * @subpackage 	includes/classes/EE_Status.class.php
 * @author 				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Status extends EE_Base_Class {

	/**
	 * @param array $props_n_values
	 * @return EE_Status
	 */
	public static function new_instance( $props_n_values = array() ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__ );
		return $has_object ? $has_object : new self( $props_n_values );
	}



	/**
	 * @param array $props_n_values
	 * @return EE_Status
	 */
	public static function new_instance_from_db( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}



	/**
	 * Gets code
	 * @param bool   $plural
	 * @param string $schema
	 * @return string
	 */
	function code( $plural = FALSE, $schema = 'upper' ) {
		$id = $this->get( 'STS_ID' );
		$code = EEM_Status::instance()->localized_status( array( $id => $this->get( 'STS_code' ) ), $plural, $schema );
		return $code[ $id ];
	}



	/**
	 * Sets code
	 * @param string $code
	 * @return boolean
	 */
	function set_code( $code ) {
		$this->set( 'STS_code', $code );
	}



	/**
	 * Gets desc
	 * @return string
	 */
	function desc() {
		return $this->get( 'STS_desc' );
	}



	/**
	 * Sets desc
	 * @param string $desc
	 * @return boolean
	 */
	function set_desc( $desc ) {
		$this->set( 'STS_desc', $desc );
	}



	/**
	 * Gets type
	 * @return string
	 */
	function type() {
		return $this->get( 'STS_type' );
	}



	/**
	 * Sets type
	 * @param string $type
	 * @return boolean
	 */
	function set_type( $type ) {
		$this->set( 'STS_type', $type );
	}



	/**
	 * Gets can_edit
	 * @return boolean
	 */
	function can_edit() {
		return $this->get( 'STS_can_edit' );
	}



	/**
	 * Sets can_edit
	 * @param boolean $can_edit
	 * @return boolean
	 */
	function set_can_edit( $can_edit ) {
		$this->set( 'STS_can_edit', $can_edit );
	}



	/**
	 * Gets open
	 * @return boolean
	 */
	function open() {
		return $this->get( 'STS_open' );
	}



	/**
	 * Sets open
	 * @param boolean $open
	 * @return boolean
	 */
	function set_open( $open ) {
		$this->set( 'STS_open', $open );
	}
}

/* End of file EE_Answer.class.php */
/* Location: /includes/classes/EE_Answer.class.php */