import { useEffect } from 'react';
import { event, currentUser, generalSettings } from './data';
import type { EventEditorDomData } from '../../../interfaces/types';

import { mockEspressoDomData } from '../../../../../application/services/config/test/data';

const useDomTestData = (): void => {
	// Set the DOM data
	const eventEspressoData: EventEditorDomData = {
		...mockEspressoDomData,
		eventEditor: { event },
	};
	eventEspressoData.config.currentUser = currentUser;
	eventEspressoData.config.generalSettings = generalSettings;

	window.eventEspressoData = eventEspressoData;

	// For Housekeeping
	useEffect(() => {
		// Make sure to clean up the set data
		// when the context component is unmounted
		// to avoid any unexpected results.
		return (): void => {
			delete window.eventEspressoData;
		};
	}, []);
};
export default useDomTestData;
