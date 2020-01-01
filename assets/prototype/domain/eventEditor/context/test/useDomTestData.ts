import { useEffect } from 'react';
import { eventId, relationalData } from './data';

const useDomTestData = () => {
	// Set the DOM data
	window.eeEditorEventData = { eventId };
	window.eeEditorGQLData = { relations: relationalData };

	// For Housekeeping
	useEffect(() => {
		// Make sure to clean up the set data
		// when the context component is unmounted
		// to avoid any unexpected results.
		return () => {
			delete window.eeEditorEventData;
			delete window.eeEditorGQLData;
		};
	}, []);
};
export default useDomTestData;
