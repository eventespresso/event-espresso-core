import { useEffect } from 'react';
import { eventId } from './data';

const useDomTestData = () => {
	// Set the DOM data
	window.eeEditorEventData = { eventId };

	// For Housekeeping
	useEffect(() => {
		// Make sure to clean up the set data
		// when the context component is unmounted
		// to avoid any unexpected results.
		return () => {
			delete window.eeEditorEventData;
		};
	}, []);
};
export default useDomTestData;
