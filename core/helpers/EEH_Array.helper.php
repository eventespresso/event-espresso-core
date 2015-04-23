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



	/**
	 * insert_into_array
	 *
	 * @param array $target_array 		the array to insert new data into
	 * @param array $array_to_insert 	the new data to be inserted
	 * @param int | string $offset 			a known key within $target_array where new data will be inserted
	 * @param bool $add_before			whether to add new data before or after the offset key
	 * @param bool $preserve_keys 		whether or not to reset numerically indexed arrays
	 * @return array
	 */
	public static function insert_into_array( $target_array = array(), $array_to_insert = array(), $offset = null, $add_before = true, $preserve_keys = true ) {
		// ensure incoming arrays are actually arrays
		$target_array 		= (array)$target_array;
		$array_to_insert	= (array)$array_to_insert;
		// if no offset key was supplied
		if ( empty( $offset )) {
			// use start or end of $target_array based on whether we are adding before or not
			$offset = $add_before ? 0 : count( $target_array );
		}
		// if offset key is a string, then find the corresponding numeric location for that element
		$offset = is_int( $offset ) ? $offset : array_search( $offset, array_keys( $target_array ) );
		// add one to the offset if adding after
		$offset = $add_before ? $offset : $offset + 1;
		// but ensure offset does not exceed the length of the array
		$offset = $offset > count( $target_array ) ? count( $target_array ) : $offset;
		// reindex array ???
		if ( $preserve_keys ) {
			// take a slice of the target array from the beginning till the offset,
			// then add the new data
			// then add another slice that starts at the offset and goes till the end
			return array_slice( $target_array, 0, $offset, true ) + $array_to_insert + array_slice( $target_array, $offset, null, true );
		} else {
			// since we don't want to preserve keys, we can use array_splice
			array_splice( $target_array, $offset, 0, $array_to_insert );
			return $target_array;
		}
	}




} //end EEH_Template class