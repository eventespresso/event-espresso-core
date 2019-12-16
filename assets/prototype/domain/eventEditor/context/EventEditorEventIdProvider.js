/**
 * External imports
 */
import { createContext } from '@wordpress/element';
import useToaster from '../../../application/services/toaster/useToaster';

const EventEditorEventIdContext = createContext();

const EventEditorEventIdProvider = ({ children }) => {
	const toaster = useToaster();
	const { eeEditorEventData: { eventId = 0 } = {} } = window;
	if (!eventId) {
		toaster.error('Event ID is empty or invalid.');
	}
	return eventId && (
		<EventEditorEventIdContext.Provider value={eventId}>
			{children}
		</EventEditorEventIdContext.Provider>
	);
};

export { EventEditorEventIdContext, EventEditorEventIdProvider };
