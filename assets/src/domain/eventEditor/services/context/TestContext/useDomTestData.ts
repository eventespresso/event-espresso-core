import { useEffect } from 'react';
import { event, currentUser, generalSettings } from './data';

import { mockEeJsData } from '../../../../../application/services/config/test/data';

const useDomTestData = (): void => {
	// Set the DOM data
	window.eventEspressoData.eventEditor.event = event;
	window.eventEspressoData.config.currentUser = currentUser;
	window.eventEspressoData.config.generalSettings = generalSettings;
	window.eejsdata = { data: mockEeJsData };

	// For Housekeeping
	useEffect(() => {
		// Make sure to clean up the set data
		// when the context component is unmounted
		// to avoid any unexpected results.
		return (): void => {
			delete window.eventEspressoData;
			delete window.eejsdata;
		};
	}, []);
};
export default useDomTestData;
