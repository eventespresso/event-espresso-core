<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('NO direct script access allowed'); }

require_once( EE_HELPERS . 'EEH_Base.helper.php' );

/**
 * EE_Array
 *
 * This is a helper utility class that provides different helpers related to array manipulation (that might extend or modify existing PHP core array function).
 *
 * @package		Event Espresso
 * @subpackage	/helpers/EE_Array.helper.php
 * @author		Darren Ethier
 */
class EEH_Array extends EEH_Base {


	/**
	 * This method basically works the same as the PHP core function array_diff except it allows you to compare arrays of EE_Base_Class objects
	 *
	 * NOTE: This will ONLY work on an array of EE_Base_Class objects
	 *
	 * @uses array_udiff core php function for setting up our own array comparison
	 * @uses self::_compare_objects as the custom method for array_udiff
	 * @param  array $array1 an array of objects
	 * @param  array $array2 an array of objects
	 * @return array         an array of objects found in array 1 that aren't found in array 2.
	 */
	public static function object_array_diff( $array1, $array2 ) {
		return array_udiff( $array1, $array2, array('self', '_compare_objects' ));
	}

	/**
	 * Given that $arr is an array, determines if it's associative or numerically-indexed
	 * @param array $arr
	 * @return boolean
	 */
	public static function is_associative_array($arr){
		return  array_keys($arr) !== range(0, count($arr) - 1);
	}

	/**
	 * Gets an item from the array and leave the array intact. Use in place of end()
	 * when you don't want to change the array
	 * @param array $arr
	 * @return mixed what ever is in the array
	 */
	public static function get_one_item_from_array($arr){
		$item = end($arr);
		reset($arr);
		return $item;
	}
	/**
	 * Detects if this is a multi-dimensional array (meaning that the top-level
	 * values are themselves array. Eg array(array(...),...)
	 * @param mixed $arr
	 * @return boolean
	 */
	public static function is_multi_dimensional_array($arr){
		if(is_array($arr)){
			$first_item = reset($arr);
			if(is_array($first_item)){
				return true;//yep, there's at least 2 levels to this array
			}else{
				return false;//nope, only 1 level
			}
		}else{
			return false;//its not an array at all!
		}
	}

	/**
	 * Shorthand for isset( $arr[ $index ] ) ? $arr[ $index ] : $default
	 * @param array $arr
	 * @param mixed $index
	 * @param mixed $default
	 * @return mixed
	 */
	public static function is_set( $arr, $index, $default ) {
		return isset( $arr[ $index ] ) ? $arr[ $index ] : $default;
	}

} //end EEH_Template class