<?php
/**
 * This file contains a helper class for money type actions.
 *
 * @since %VER%
 * @package  Event Espresso
 * @subpackage helper
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
 /**
 *
 * Money helper class.
 * This class has helper methods that help with money related conversions and calculations.
 *
 * @since %VER%
 *
 * @package		Event Espresso
 * @subpackage	helpers
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EEH_Money extends EEH_Base  {


	/**
	 * This converts an incoming localized money value into a standard float item (to three decimal places)
	 *
	 * @param int|string $incoming_value
	 *
	 * @return float
	 */
	public static function convert_to_float_from_localized_money( $incoming_value ) {
		//remove thousands separator
		$money_value = str_replace( EE_Registry::instance()->CFG->currency->thsnds, '', $incoming_value );

		//replace decimal place with standard decimal.
		$money_value = str_replace( EE_Registry::instance()->CFG->currency->dec_mrk, '.', $money_value );

		//float it! and round to three decimal places
		$money_value = round ( (float) $money_value, 3 );
		return $money_value;
	}

} //end class EEH_Money
