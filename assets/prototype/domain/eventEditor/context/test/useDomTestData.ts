import { useEffect } from 'react';
import { eventId } from './data';

const useDomTestData = () => {
	// Set the DOM data
	window.eeEditorEventData = { eventId };

	// For Housekeeping
	useEffect(() => {
		return () => {
			delete window.eeEditorEventData;
		};
	}, []);
};
export default useDomTestData;
