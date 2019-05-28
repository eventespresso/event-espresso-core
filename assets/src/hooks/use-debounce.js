/**
 * External imports
 */
import { useEffect, useState } from '@wordpress/element';

const { setTimeout, clearTimeout } = window;

/**
 * A hook for debouncing any fast changing value.
 *
 * The debounced value will only reflect the latest value when the useDebounce
 * hook has not been called for the specified period (delay).
 *
 * When used along with useEffect, implementing code can ensure that expensive
 * operations are not executed too frequently.
 *
 * @param {*}  value  The value to debounce
 * @param {number} delay  The delay period for the debounce.
 * @return {*}  The latest value considering to the delay.
 */
const useDebounce = ( value, delay ) => {
	const [ debouncedValue, setDebouncedValue ] = useState( value );

	useEffect( () => {
		const timer = setTimeout( () => {
			setDebouncedValue( value );
		}, delay );
		return () => clearTimeout( timer );
	}, [ value, delay ] );

	return debouncedValue;
};

export default useDebounce;
