<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EE_Mock
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 */
class EE_Mock extends EE_Base_Class{
	protected $_MCK_ID;
	/**
	 * 
	 * @param type $props_n_values
	 * @return EE_Attendee
	 */
	public static function new_instance( $props_n_values = array() ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname );
		return $has_object ? $has_object : new self( $props_n_values );
	}


	public static function new_instance_from_db ( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}
}

// End of file EE_Base_Class_Mock.class.php