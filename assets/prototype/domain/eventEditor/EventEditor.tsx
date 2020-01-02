/**
 * External dependencies
 */
import * as React from 'react';

/**
 * Internal dependencies
 */
import useInitQueries from './data/queries/useInitQueries';
import DatetimesList from './datetimes/datetimesList/DatetimesListData';
import TicketsList from './tickets/ticketsList/TicketsListData';

const EventEditor = () => {
	useInitQueries();

	return (
		<>
			<DatetimesList />
			<TicketsList />
		</>
	);
};

export default EventEditor;
