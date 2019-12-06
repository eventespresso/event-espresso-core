/**
 * External imports
 */
import { createContext } from '@wordpress/element';

const EventContext = createContext();

const EventProvider = ({ children, eventId }) => {
	return <EventContext.Provider value={eventId}>{children}</EventContext.Provider>;
};

export { EventContext, EventProvider };
