import React, { createContext } from 'react';

import { useSystemNotifications } from '@appServices/toaster';

const EventIdContext = createContext<number>(null);

const { Provider } = EventIdContext;

const EventIdProvider: React.FC = ({ children }) => {
	const toaster = useSystemNotifications();
	const eventId = window?.eeEditorData?.event?.dbId || 0;

	if (!eventId) {
		toaster.error({ message: 'Event ID is empty or invalid.' });
	}
	return eventId ? <Provider value={eventId}>{children}</Provider> : null;
};

export { EventIdContext, EventIdProvider };
