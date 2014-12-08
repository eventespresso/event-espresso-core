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
 * EE_Int_Normalization
 * Casts the string to an int. If the user inputs anything but numbers, we growl at them
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Int_Normalization extends EE_Normalization_Strategy_Base{
	public function normalize($value_to_normalize) {
		if( is_int( $value_to_normalize ) ){
			return $value_to_normalize;
		}
		if( ! is_string( $value_to_normalize )){
			throw new EE_Validation_Error( sprintf( __( 'The value "%s" must be a string submitted for normalization, it was %s', 'event_espresso' ), print_r( $value_to_normalize, TRUE), gettype( $value_to_normalize ) ) );
		}
		$thousands_separator = EE_Config::instance()->currency->thsnds;
		$value_to_normalize = str_replace( $thousands_separator, "", $value_to_normalize );
		$value_to_normalize = str_replace( array(" ","\t"), '', $value_to_normalize );
		if ( preg_match( '/^\d+$/', $value_to_normalize )) {
			return intval( $value_to_normalize );
		} else {
			throw new EE_Validation_Error( sprintf( __( "Only numeric characters, please!", "event_espresso" ) ), 'numeric_only' );
		}
	}

	/**
	 * Converts the int into a string for use in teh html form
	 * @param int $normalized_value
	 * @return string
	 */
	public function unnormalize( $normalized_value ) {
		if( empty( $normalized_value ) ){
			return '0';
		}else{
			return "$normalized_value";
		}
	}
}

// End of file EE_Int_Normalization.strategy.php