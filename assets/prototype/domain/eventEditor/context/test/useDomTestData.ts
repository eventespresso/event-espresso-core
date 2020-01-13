import { useEffect } from 'react';
import { event } from './data';
import { currentUser } from '../../../../domain/shared/data/queries/currentUser/test/data';
import { generalSettings } from '../../../../domain/shared/data/queries/generalSettings/test/data';

import { mockEeJsData } from '../../../../application/services/config/test/data';

const useDomTestData = (): void => {
	// Set the DOM data
	window.eeEditorData = { event, currentUser, generalSettings };
	window.eejsdata = { data: mockEeJsData };

	// For Housekeeping
	useEffect(() => {
		// Make sure to clean up the set data
		// when the context component is unmounted
		// to avoid any unexpected results.
		return (): void => {
			delete window.eeEditorData;
			delete window.eejsdata;
		};
	}, []);
};
export default useDomTestData;
