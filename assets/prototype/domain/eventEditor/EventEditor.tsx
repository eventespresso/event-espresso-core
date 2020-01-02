/**
 * External dependencies
 */
import * as React from 'react';

/**
 * Internal dependencies
 */
import useInitQueries from './data/queries/useInitQueries';
import DatetimesList from './datetimes/DatetimesList';
import TicketsList from './tickets/TicketsList';

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
