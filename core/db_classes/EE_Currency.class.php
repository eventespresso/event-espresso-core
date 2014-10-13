<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.3
 *
 * ------------------------------------------------------------------------
 *
 * EE_Currency
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Currency extends EE_Base_Class{
	
		/** Currency COde @var CUR_code*/ protected $_CUR_code = NULL;
		/** Currency Name Singular @var CUR_single*/ protected $_CUR_single = NULL;
		/** Currency Name Plural @var CUR_plural*/ protected $_CUR_plural = NULL;
		/** Currency Sign @var CUR_sign*/ protected $_CUR_sign = NULL;
		/** Currency Decimal Places @var CUR_dec_plc*/ protected $_CUR_dec_plc = NULL;
		/** Active? @var CUR_active*/ protected $_CUR_active = NULL;
		protected $_Payment_Method;
	/**
	 * 
	 * @param type $props_n_values
	 * @return EE_Answer
	 */
	public static function new_instance( $props_n_values = array() ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname );
//		d( $has_object );
		return $has_object ? $has_object : new self( $props_n_values);
	}

	/**
	 * 
	 * @param type $props_n_values
	 * @return EE_Answer
	 */
	public static function new_instance_from_db ( $props_n_values = array() ) {
		$classname = __CLASS__;
//		$mapped_object = parent::_get_object_from_entity_mapper($props_n_values, $classname);
//		d( $mapped_object );
//		return $mapped_object ? $mapped_object : new self( $props_n_values, TRUE );
		return new self( $props_n_values, TRUE );
	}
	/**
	 * Gets code
	 * @return string
	 */
	function code() {
		return $this->get('CUR_code');
	}

	/**
	 * Sets code
	 * @param string $code
	 * @return boolean
	 */
	function set_code($code) {
		return $this->set('CUR_code', $code);
	}
	/**
	 * Gets active
	 * @return boolean
	 */
	function active() {
		return $this->get('CUR_active');
	}

	/**
	 * Sets active
	 * @param boolean $active
	 * @return boolean
	 */
	function set_active($active) {
		return $this->set('CUR_active', $active);
	}
	/**
	 * Gets dec_plc
	 * @return int
	 */
	function dec_plc() {
		return $this->get('CUR_dec_plc');
	}

	/**
	 * Sets dec_plc
	 * @param int $dec_plc
	 * @return boolean
	 */
	function set_dec_plc($dec_plc) {
		return $this->set('CUR_dec_plc', $dec_plc);
	}
	/**
	 * Gets plural
	 * @return string
	 */
	function plural_name() {
		return $this->get('CUR_plural');
	}

	/**
	 * Sets plural
	 * @param string $plural
	 * @return boolean
	 */
	function set_plural_name($plural) {
		return $this->set('CUR_plural', $plural);
	}
	/**
	 * Gets sign
	 * @return string
	 */
	function sign() {
		return $this->get('CUR_sign');
	}

	/**
	 * Sets sign
	 * @param string $sign
	 * @return boolean
	 */
	function set_sign($sign) {
		return $this->set('CUR_sign', $sign);
	}
	/**
	 * Gets single
	 * @return string
	 */
	function singular_name() {
		return $this->get('CUR_single');
	}

	/**
	 * Sets single
	 * @param string $single
	 * @return boolean
	 */
	function set_singular_name($single) {
		return $this->set('CUR_single', $single);
	}
	/**
	 * Gets a prettier name
	 * @return string
	 */
	function name(){
		return sprintf(__("%s (%s)", "event_espresso"),$this->code(),$this->plural_name());
	}

}

// End of file EE_Currency.class.php