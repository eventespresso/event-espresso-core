import React, { createContext } from 'react';
import pathOr from 'ramda/src/pathOr';

import useToaster from '../../../../../application/services/toaster/useToaster';
import { ContextProviderProps } from '../types';

const EventEditorEventIdContext = createContext<number | null>(null);

const { Provider } = EventEditorEventIdContext;

const EventEditorEventIdProvider: React.FC<ContextProviderProps> = ({ children }) => {
	const toaster = useToaster();
	const eventId = pathOr<number>(0, ['eeEditorData', 'event', 'dbId'], window);

	if (!eventId) {
		toaster.error({ message: 'Event ID is empty or invalid.' });
	}
	return eventId ? <Provider value={eventId}>{children}</Provider> : null;
};

export { EventEditorEventIdContext, EventEditorEventIdProvider };
