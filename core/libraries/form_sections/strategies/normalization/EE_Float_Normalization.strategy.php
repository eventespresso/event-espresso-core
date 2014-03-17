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
 * EE_Float_Normalization
 * Casts to float, and allows spaces, commas, and periods in the inputted string
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Float_Normalization extends EE_Normalization_Strategy_Base{
	public function normalize($value_to_normalize) {
		if($value_to_normalize === NULL){
			return 0.00;
		}
		if(is_string($value_to_normalize)){
			$normalized_value = str_replace(array(" ",EE_Config::instance()->currency->thsnds),"",$value_to_normalize);
			//normalize it so periods are decimal marks (we don't care where you're from: we're talking PHP now)
			$normalized_value = str_replace( EE_Config::instance()->currency->dec_mrk, ".", $normalized_value) ;
			//double-check there's absolutely nothing left on this string besides numbers
			$normalized_value = preg_replace( "/[^0-9,. ]/", "", $normalized_value);
		}
		if(strlen($value_to_normalize) > strlen($normalized_value)){
			$this->_input->add_validation_error(sprintf(__("Only numeric characters, commas, periods, and spaces, please!", "event_espresso")), 'float_only');
		}else{
			return floatval($normalized_value);
		}
	}
}

// End of file EE_Float_Normalization.strategy.php