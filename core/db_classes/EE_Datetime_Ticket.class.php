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
	 *
	 * @param array $props_n_values  incoming values
	 * @param string $timezone  incoming timezone (if not set the timezone set for the website will be
	 *                          		used.)
	 * @param array $date_formats  incoming date_formats in an array where the first value is the
	 *                             		    date_format and the second value is the time format
	 * @return EE_Attendee
	 */
	public static function new_instance( $props_n_values = array(), $timezone = null, $date_formats = array() ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__, $timezone, $date_formats );
		return $has_object ? $has_object : new self( $props_n_values, false, $timezone, $date_formats );
	}



	/**
	 * @param array $props_n_values  incoming values from the database
	 * @param string $timezone  incoming timezone as set by the model.  If not set the timezone for
	 *                          		the website will be used.
	 * @return EE_Attendee
	 */
	public static function new_instance_from_db( $props_n_values = array(), $timezone = null ) {
		return new self( $props_n_values, TRUE, $timezone );
	}
} //end EE_Datetime_Ticket class
