import { useState, useEffect } from '@wordpress/element';
import { TIME_FORMAT_SITE } from '@eventespresso/helpers';

const useIs12HourTime = () => {
	const [ is12HourTime, setIs12HourTime ] = useState( true );

	useEffect( () => {
		// To know if the current timezone is a 12 hour time
		// we look for "a" in the time format
		// We also make sure this a is not escaped by a "/"
		const _is12HourTime = /a(?!\\)/i.test(
			TIME_FORMAT_SITE
			// Test only the lower case a
				.toLowerCase()
				// Replace "//" with empty strings
				.replace( /\\\\/g, '' )
				// Reverse the string and test for "a" not followed by a slash
				.split( '' ).reverse().join( '' )
		);
		setIs12HourTime( _is12HourTime );
	}, [] );

	return is12HourTime;
};

export default useIs12HourTime;
