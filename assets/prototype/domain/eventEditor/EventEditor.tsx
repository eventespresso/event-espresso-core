/**
 * External dependencies
 */
import * as React from 'react';

/**
 * Internal dependencies
 */
import useInitQueries from './data/initialization/useInitQueries';
import DatesList from './datetimes/datesList';
import TicketsList from './tickets/ticketsList';

const EventEditor = () => {
	useInitQueries();

	return (
		<>
			<DatesList />
			<TicketsList />
		</>
	);
};

export default EventEditor;
