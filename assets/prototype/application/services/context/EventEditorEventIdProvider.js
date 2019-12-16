/**
 * External imports
 */
import { createContext } from '@wordpress/element';
import useToaster from '../toaster/useToaster';

const EventEditorEventIdContext = createContext();

const EventEditorEventIdProvider = ({ children }) => {
	const toaster = useToaster();
	const { eeEditorEventData: { eventId = 0 } = {} } = window;

	if (eventId == 0 || eventId == null) {
		toaster.error('Event ID is empty or not valid.');
	}

	return <EventEditorEventIdContext.Provider value={eventId}>{children}</EventEditorEventIdContext.Provider>;
};

export { EventEditorEventIdContext, EventEditorEventIdProvider };
