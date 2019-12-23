/**
 * External imports
 */
import React from 'react';
import { createContext } from 'react';
import useToaster from '../../../application/services/toaster/useToaster';

const EventEditorEventIdContext = createContext<number | null>(null);

const { Provider } = EventEditorEventIdContext;

const EventEditorEventIdProvider = ({ children }) => {
	const toaster = useToaster();
	const { eeEditorEventData: { eventId = 0 } = {} } = window;

	if (!eventId) {
		toaster.error('Event ID is empty or invalid.');
	}
	return eventId ? <Provider value={eventId}>{children}</Provider> : null;
};

export { EventEditorEventIdContext, EventEditorEventIdProvider };
