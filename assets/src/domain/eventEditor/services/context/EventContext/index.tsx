/**
 * External imports
 */
import React, { createContext } from 'react';
import pathOr from 'ramda/src/pathOr';

import notification from '@appServices/notification';
import { ContextProviderProps } from '../types';

const EventEditorEventIdContext = createContext<number | null>(null);

const { Provider } = EventEditorEventIdContext;

const EventEditorEventIdProvider: React.FC<ContextProviderProps> = ({ children }) => {
	const eventId = pathOr<number>(0, ['eeEditorData', 'event', 'dbId'], window);

	if (!eventId) {
		notification({ message: 'Event ID is empty or invalid.', type: 'error' });
	}
	return eventId ? <Provider value={eventId}>{children}</Provider> : null;
};

export { EventEditorEventIdContext, EventEditorEventIdProvider };
