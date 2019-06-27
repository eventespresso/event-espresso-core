/**
 * External imports
 */
import { useState, useEffect } from '@wordpress/element';

const useLocalStorage = ( key ) => {
	const [ value, setValue ] = useState(
		window.localStorage.getItem( key ) || null
	);
	useEffect( () => {
		window.localStorage.setItem( key, value );
	}, [ value ] );
	return [ value, setValue ];
};

export default useLocalStorage;
