/**
 * External imports
 */
import React, { createContext } from 'react';
import pathOr from 'ramda/src/pathOr';

import { errorNotification } from '../../../../../application/services/notification';
import { ContextProviderProps } from '../types';

const EventEditorEventIdContext = createContext<number | null>(null);

const { Provider } = EventEditorEventIdContext;

const EventEditorEventIdProvider: React.FC<ContextProviderProps> = ({ children }) => {
	const eventId = pathOr<number>(0, ['eeEditorData', 'event', 'dbId'], window);

	if (!eventId) {
		errorNotification({ message: 'Event ID is empty or invalid.' });
	}
	return eventId ? <Provider value={eventId}>{children}</Provider> : null;
};

export { EventEditorEventIdContext, EventEditorEventIdProvider };
