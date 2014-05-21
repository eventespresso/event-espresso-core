<?php
/**
 * Contains definition for EE_Event_Message_Template model object
 * @package 		Event Espresso
 * @subpackage 	models
 * @since 			4.3.0
 */
 if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

/**
 * EE_Event_Message_Template
 * This is the model object for EEM_Event_Message_Template
 *
 * @package 		Event Espresso
 * @subpackage 	models
 * @author 			Darren Ethier
 * @since 			4.3.0
 */
class EE_Event_Message_Template extends EE_Base_Class {

	public static function new_instance( $props_n_values = array(), $timezone = NULL ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname, $timezone );
		return $has_object ? $has_object : new self( $props_n_values, FALSE, $timezone );
	}


	public static function new_instance_from_db ( $props_n_values = array(), $timezone = NULL ) {
		return new self( $props_n_values, TRUE, $timezone );
	}

} //end class EE_Event_Message_Template
