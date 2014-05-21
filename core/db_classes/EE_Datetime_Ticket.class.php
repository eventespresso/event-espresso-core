<?php if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package        Event Espresso
 * @ author        Event Espresso
 * @ copyright    (c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license        {@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link                {@link http://www.eventespresso.com}
 * @ since            4.0
 *
 */



/**
 * EE_Datetime_Ticket class
 *
 * @package 			Event Espresso
 * @subpackage 	includes/classes/EE_Datetime_Ticket.class.php
 * @author 				Darren Ethier
 */
class EE_Datetime_Ticket extends EE_Base_Class {

	/**
	 * @param array $props_n_values
	 * @param null  $timezone
	 * @return EE_Datetime_Ticket|mixed
	 */
	public static function new_instance( $props_n_values = array(), $timezone = NULL ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__, $timezone );
		return $has_object ? $has_object : new self( $props_n_values, FALSE, $timezone );
	}



	/**
	 * @param array $props_n_values
	 * @param null  $timezone
	 * @return EE_Datetime_Ticket
	 */
	public static function new_instance_from_db( $props_n_values = array(), $timezone = NULL ) {
		return new self( $props_n_values, TRUE, $timezone );
	}
} //end EE_Datetime_Ticket class