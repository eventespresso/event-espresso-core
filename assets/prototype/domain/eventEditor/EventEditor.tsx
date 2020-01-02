/**
 * External dependencies
 */
import * as React from 'react';

/**
 * Internal dependencies
 */
import useInitQueries from './data/queries/useInitQueries';
import DatesList from './datetimes/DatesList';
import TicketsList from './tickets/TicketsList';

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
