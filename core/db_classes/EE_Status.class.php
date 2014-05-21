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
 * EE_Status class
 *
 * @package			Event Espresso
 * @subpackage		includes/classes/EE_Answer.class.php
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Status extends EE_Base_Class{

	public static function new_instance( $props_n_values = array() ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname );
		return $has_object ? $has_object : new self( $props_n_values);
	}


	public static function new_instance_from_db ( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}
	
	/**
	 * Gets code
	 * @return string
	 */
	function code( $plural = FALSE, $schema = 'upper' ) {
		$id = $this->get('STS_ID');
		$code = EEM_Status::instance()->localized_status( array( $id => $this->get('STS_code') ), $plural, $schema );
		return $code[$id];
	}

	/**
	 * Sets code
	 * @param string $code
	 * @return boolean
	 */
	function set_code($code) {
		return $this->set('STS_code', $code);
	}
	/**
	 * Gets desc
	 * @return string
	 */
	function desc() {
		return $this->get('STS_desc');
	}

	/**
	 * Sets desc
	 * @param string $desc
	 * @return boolean
	 */
	function set_desc($desc) {
		return $this->set('STS_desc', $desc);
	}
	/**
	 * Gets type
	 * @return string
	 */
	function type() {
		return $this->get('STS_type');
	}

	/**
	 * Sets type
	 * @param string $type
	 * @return boolean
	 */
	function set_type($type) {
		return $this->set('STS_type', $type);
	}
	/**
	 * Gets can_edit
	 * @return boolean
	 */
	function can_edit() {
		return $this->get('STS_can_edit');
	}

	/**
	 * Sets can_edit
	 * @param boolean $can_edit
	 * @return boolean
	 */
	function set_can_edit($can_edit) {
		return $this->set('STS_can_edit', $can_edit);
	}
	/**
	 * Gets open
	 * @return boolean
	 */
	function open() {
		return $this->get('STS_open');
	}

	/**
	 * Sets open
	 * @param boolean $open
	 * @return boolean
	 */
	function set_open($open) {
		return $this->set('STS_open', $open);
	}


}

/* End of file EE_Answer.class.php */
/* Location: /includes/classes/EE_Answer.class.php */