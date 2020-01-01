import { useEffect } from 'react';
import { eventId, relationalData } from './data';

import { mockEeJsData } from '../../../../application/services/config/test/data';

const useDomTestData = () => {
	// Set the DOM data
	window.eeEditorEventData = { eventId };
	window.eeEditorGQLData = { relations: relationalData };
	window.eejsdata = { data: mockEeJsData };

	// For Housekeeping
	useEffect(() => {
		// Make sure to clean up the set data
		// when the context component is unmounted
		// to avoid any unexpected results.
		return () => {
			delete window.eeEditorEventData;
			delete window.eeEditorGQLData;
			delete window.eejsdata;
		};
	}, []);
};
export default useDomTestData;
