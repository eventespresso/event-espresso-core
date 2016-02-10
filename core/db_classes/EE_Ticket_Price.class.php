<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
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
 * EE_Ticket_Price class
 *
 * @package 			Event Espresso
 * @subpackage 	includes/classes/EE_Ticket_Price.class.php
 * @author             Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Ticket_Price extends EE_Base_Class {

	/**
	 * @param array  $props_n_values
	 * @param string $timezone
	 * @return EE_Ticket_Price|mixed
	 */
	public static function new_instance( $props_n_values = array(), $timezone = '', $date_formats = array() ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__, $timezone, $date_formats );
		return $has_object ? $has_object : new self( $props_n_values, FALSE, $timezone, $date_formats );
	}



	/**
	 * @param array  $props_n_values
	 * @param string $timezone
	 * @return EE_Ticket_Price
	 */
	public static function new_instance_from_db( $props_n_values = array(), $timezone = '' ) {
		return new self( $props_n_values, TRUE, $timezone );
	}



}