/**
 * External imports
 */
import { createContext } from '@wordpress/element';
import useEventId from '../../../domain/eventEditor/containers/queries/useEventId';

const EventEditorEventIdContext = createContext();

const EventEditorEventIdProvider = ({ children }) => {
	const eventId = useEventId();

	return <EventEditorEventIdContext.Provider value={eventId}>{children}</EventEditorEventIdContext.Provider>;
};

export { EventEditorEventIdContext, EventEditorEventIdProvider };
