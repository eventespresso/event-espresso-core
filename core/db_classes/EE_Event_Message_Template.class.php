<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Contains definition for EE_Event_Message_Template model object
 * @package 		Event Espresso
 * @subpackage 	models
 * @since 			4.3.0
 */

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

	/**
	 * @param array $props_n_values
	 * @param null  $timezone
	 * @return EE_Event_Message_Template|mixed
	 */
	public static function new_instance( $props_n_values = array(), $timezone = NULL ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__, $timezone );
		return $has_object ? $has_object : new self( $props_n_values, FALSE, $timezone );
	}



	/**
	 * @param array $props_n_values
	 * @param null  $timezone
	 * @return EE_Event_Message_Template
	 */
	public static function new_instance_from_db ( $props_n_values = array(), $timezone = NULL ) {
		return new self( $props_n_values, TRUE, $timezone );
	}

}
//end class EE_Event_Message_Template
