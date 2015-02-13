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



	/**
	 * For comparing floats. Default operator is '=', but see the $operator below for all options.
	 * This should be used to compare floats instead of normal '==' because floats
	 * are inherently imprecise, and so you can sometimes have two floats that appear to be identical
	 * but actually differ by 0.00000001.
	 *
	 * @see http://biostall.com/php-function-to-compare-floating-point-numbers
	 * @param float  $float1
	 * @param float  $float2
	 * @param string $operator  The operator. Valid options are =, <=, <, >=, >, <>, eq, lt, lte, gt, gte, ne
	 * @return bool whether the equation is true or false
	 * @throws \EE_Error
	 */

	public static function compare_floats( $float1, $float2, $operator='=' ) {
		// Check numbers to 5 digits of precision
		$epsilon = 0.00001;

		$float1 = (float)$float1;
		$float2 = (float)$float2;

		switch ($operator) {
			// equal
			case "=":
			case "eq":
				if (abs($float1 - $float2) < $epsilon) {
					return true;
				}
				break;
			// less than
			case "<":
			case "lt":
				if (abs($float1 - $float2) < $epsilon) {
					return false;
				} else {
					if ($float1 < $float2) {
						return true;
					}
				}
				break;
			// less than or equal
			case "<=":
			case "lte":
				if (self::compare_floats($float1, $float2, '<') || self::compare_floats($float1, $float2, '=')) {
					return true;
				}
				break;
			// greater than
			case ">":
			case "gt":
				if (abs($float1 - $float2) < $epsilon) {
					return false;
				} else {
					if ($float1 > $float2) {
						return true;
					}
				}
				break;
			// greater than or equal
			case ">=":
			case "gte":
				if (self::compare_floats($float1, $float2, '>') || self::compare_floats($float1, $float2, '=')) {
					return true;
				}
				break;
			case "<>":
			case "!=":
			case "ne":
				if (abs($float1 - $float2) > $epsilon) {
					return true;
				}
				break;
			default:
				throw new EE_Error(__( "Unknown operator '" . $operator . "' in EEH_Money::compare_floats()", 'event_espresso' ) );
		}

		return false;
	}

} //end class EEH_Money
