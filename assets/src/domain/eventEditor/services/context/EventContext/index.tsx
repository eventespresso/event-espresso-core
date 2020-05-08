import React, { createContext } from 'react';
import pathOr from 'ramda/src/pathOr';

import { useSystemNotifications } from '@appServices/toaster';

const EventIdContext = createContext<number | null>(null);

const { Provider } = EventIdContext;

const EventIdProvider: React.FC = ({ children }) => {
	const toaster = useSystemNotifications();
	const eventId = pathOr<number>(0, ['eeEditorData', 'event', 'dbId'], window);

	if (!eventId) {
		toaster.error({ message: 'Event ID is empty or invalid.' });
	}
	return eventId ? <Provider value={eventId}>{children}</Provider> : null;
};

export { EventIdContext, EventIdProvider };
