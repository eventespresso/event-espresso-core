<?php

/**
 * EE_Array
 * This is a helper utility class that provides different helpers related to array manipulation (that might extend or
 * modify existing PHP core array function).
 *
 * @package        Event Espresso
 * @subpackage     /helpers/EE_Array.helper.php
 * @author         Darren Ethier
 */
class EEH_Array extends EEH_Base
{
    /**
     * This method basically works the same as the PHP core function array_diff except it allows you to compare arrays
     * of EE_Base_Class objects NOTE: This will ONLY work on an array of EE_Base_Class objects
     *
     * @uses array_udiff core php function for setting up our own array comparison
     * @uses self::_compare_objects as the custom method for array_udiff
     * @param  array $array1 an array of objects
     * @param  array $array2 an array of objects
     * @return array         an array of objects found in array 1 that aren't found in array 2.
     */
    public static function object_array_diff($array1, $array2)
    {
        return array_udiff($array1, $array2, array('self', '_compare_objects'));
    }

    /**
     * Given that $arr is an array, determines if it's associative or numerically AND sequentially indexed
     *
     * @param array $array
     * @return boolean
     */
    public static function is_associative_array(array $array): bool
    {
        return ! empty($array) && array_keys($array) !== range(0, count($array) - 1);
    }

    /**
     * Gets an item from the array and leave the array intact. Use in place of end()
     * when you don't want to change the array
     *
     * @param array $arr
     * @return mixed what ever is in the array
     */
    public static function get_one_item_from_array($arr)
    {
        $item = end($arr);
        reset($arr);
        return $item;
    }

    /**
     * Detects if this is a multi-dimensional array
     * meaning that at least one top-level value is an array. Eg [ [], ...]
     *
     * @param mixed $arr
     * @return boolean
     */
    public static function is_multi_dimensional_array($arr)
    {
        if (is_array($arr)) {
            foreach ($arr as $item) {
                if (is_array($item)) {
                    return true; // yep, there's at least 2 levels to this array
                }
            }
        }
        return false; // there's only 1 level, or it's not an array at all!
    }

    /**
     * Shorthand for isset( $arr[ $index ] ) ? $arr[ $index ] : $default
     *
     * @param array $arr
     * @param mixed $index
     * @param mixed $default
     * @return mixed
     */
    public static function is_set($arr, $index, $default)
    {
        return isset($arr[ $index ]) ? $arr[ $index ] : $default;
    }

    /**
     * Exactly like `maybe_unserialize`, but also accounts for a WP bug: http://core.trac.wordpress.org/ticket/26118
     *
     * @param mixed $value usually a string, but could be an array or object
     * @return mixed the UN-serialized data
     */
    public static function maybe_unserialize($value)
    {
        $data = maybe_unserialize($value);
        // it's possible that this still has serialized data if it's the session.
        //  WP has a bug, http://core.trac.wordpress.org/ticket/26118 that doesn't unserialize this automatically.
        $token = 'C';
        $data = is_string($data) ? trim($data) : $data;
        if (is_string($data) && strlen($data) > 1 && $data[0] == $token && preg_match("/^{$token}:[0-9]+:/s", $data)) {
            return unserialize($data);
        } else {
            return $data;
        }
    }


    /**
     * insert_into_array
     *
     * @param array        $target_array the array to insert new data into
     * @param array        $array_to_insert the new data to be inserted
     * @param int|string|null $offset a known key within $target_array where new data will be inserted
     * @param bool         $add_before whether to add new data before or after the offset key
     * @param bool         $preserve_keys whether or not to reset numerically indexed arrays
     * @return array
     */
    public static function insert_into_array(
        array $target_array = array(),
        array $array_to_insert = array(),
        $offset = null,
        bool $add_before = true,
        bool $preserve_keys = true
    ) {
        $target_array_keys = array_keys($target_array);
        // if no offset key was supplied
        if (empty($offset)) {
            // use start or end of $target_array based on whether we are adding before or not
            $offset = $add_before ? 0 : count($target_array);
        }
        // if offset key is a string, then find the corresponding numeric location for that element
        $offset = is_int($offset) ? $offset : array_search($offset, $target_array_keys, true);
        // add one to the offset if adding after
        $offset = $add_before ? $offset : $offset + 1;
        // but ensure offset does not exceed the length of the array
        $offset = $offset > count($target_array) ? count($target_array) : $offset;
        // reindex array ???
        if ($preserve_keys) {
            // take a slice of the target array from the beginning till the offset,
            // then add the new data
            // then add another slice that starts at the offset and goes till the end
            return array_slice($target_array, 0, $offset, true) + $array_to_insert + array_slice(
                $target_array,
                $offset,
                null,
                true
            );
        } else {
            // since we don't want to preserve keys, we can use array_splice
            array_splice($target_array, $offset, 0, $array_to_insert);
            return $target_array;
        }
    }


    /**
     * array_merge() is slow and should never be used while looping over data
     * if you don't need to preserve keys from all arrays, then using a foreach loop is much faster
     * so really this acts more like array_replace( $array1, $array2 )
     * or a union with the arrays flipped ( $array2 + $array1 )
     * this saves a few lines of code and improves readability
     *
     * @param array $array1
     * @param array $array2
     * @return array
     */
    public static function merge_arrays_and_overwrite_keys(array $array1, array $array2)
    {
        foreach ($array2 as $key => $value) {
            $array1[ $key ] = $value;
        }
        return $array1;
    }


    /**
     * given a flat array like $array = array('A', 'B', 'C')
     * will convert into a multidimensional array like $array[A][B][C]
     * if $final_value is provided and is anything other than null,
     * then that will be set as the value for the innermost array key
     * like so: $array[A][B][C] = $final_value
     *
     * @param array $flat_array
     * @param mixed $final_value
     * @return array
     */
    public static function convert_array_values_to_keys(array $flat_array, $final_value = null)
    {
        $multidimensional = array();
        $reference = &$multidimensional;
        foreach ($flat_array as $key) {
            $reference[ $key ] = array();
            $reference = &$reference[ $key ];
        }
        if ($final_value !== null) {
            $reference = $final_value;
        }
        return $multidimensional;
    }


    /**
     * @see http://stackoverflow.com/questions/173400/how-to-check-if-php-array-is-associative-or-sequential
     * @param array $array
     * @return bool
     */
    public static function is_array_numerically_and_sequentially_indexed(array $array)
    {
        return empty($array) || array_keys($array) === range(0, count($array) - 1);
    }


    /**
     * recursively walks through an array and adds slashes to all no array elements
     *
     * @param mixed $element
     * @return array|string
     * @since   4.10.29.p
     */
    public static function addSlashesRecursively($element)
    {
        if (is_array($element)) {
            foreach ($element as $key => $value) {
                $element[ $key ] = EEH_Array::addSlashesRecursively($value);
            }
            return $element;
        }
        return is_string($element) ? addslashes($element) : $element;
    }


	/**
	 * link https://stackoverflow.com/a/3877494
	 *
	 * @param array $array_1
	 * @param array $array_2
	 * @return array
	 * @since   $VID:$
	 */
	public static function array_diff_recursive(array $array_1, array $array_2): array
	{
		$diff = [];
		foreach ($array_1 as $key => $value) {
			if (array_key_exists($key, $array_2)) {
				if (is_array($value)) {
					$inner_diff = EEH_Array::array_diff_recursive($value, $array_2[ $key ]);
					if (count($inner_diff)) {
						$diff[ $key ] = $inner_diff;
					}
				} else {
					if ($value != $array_2[ $key ]) {
						$diff[ $key ] = $value;
					}
				}
			} else {
				$diff[ $key ] = $value;
			}
		}
		return $diff;
	}


	/**
	 * converts multidimensional arrays into a single depth associative array
	 * or converts arrays of any depth into a readable string representation
	 *
	 * 	$example = [
	 * 		'a' => 'A',
	 * 		'b' => 'B',
	 * 		'c' => [
	 * 			'd' => 'D',
	 * 			'e' => 'E',
	 * 			'f' => [ 'G', 'H', 'I' ],
	 * 		],
	 * 		[ 'J', 'K' ],
	 *		'L',
	 * 		'M',
	 * 		'n' => [
	 * 			'o' => 'P'
	 * 		],
	 * 	];
	 *
	 *	print_r( EEH_Array::flattenArray($example) );
	 *
	 * 	Array (
	 * 		[a] => A
	 * 		[b] => B
	 * 		[c] => [ d:D, e:E, f:[ G, H, I ] ]
	 * 		[0] => [ J, K ]
	 * 		[1] => L
	 * 		[2] => M
	 * 		[n] => [ o:P ]
	 * 	)
	 *
	 *	print_r( EEH_Array::flattenArray($example, true) );
	 *
	 * 	"a:A, b:B, c:[ d:D, e:E, f:[ G, H, I ] ], [ J, K ], L, M, n:[ o:P ]"
 	 *
	 * @param array $array		the array to be flattened
	 * @param bool  $to_string	[true] will flatten the entire array down into a string
	 *                         	[false] will only flatten sub-arrays down into strings and return a array
	 * @param bool  $top_level	used for formatting purposes only, best to leave this alone as it's set internally
	 * @return array|false|string
	 * @since $VID:$
	 */
	public static function flattenArray(array $array, bool $to_string = false, bool $top_level = true)
	{
		$flat_array = [];
		foreach ($array as $key => $value) {
			$flat_array[ $key ] = is_array($value)
				? EEH_Array::flattenArray($value, true, false)
				: $value;
		}
		if (! $to_string) {
			return $flat_array;
		}
		$flat = '';
		foreach ($flat_array as $key => $value) {
			$flat .= is_int($key) ? "$value, " : "$key:$value, ";
		}
		$flat = substr($flat, 0, -2);
		return $top_level ? $flat : "[ $flat ]";
	}
}
