/**
 * External dependencies
 */
import * as React from 'react';

/**
 * Internal dependencies
 */
import useInitQueries from './data/queries/useInitQueries';
import DatesListData from './datetimes/datesList/DatesListData';
import TicketsListData from './tickets/ticketsList/TicketsListData';

const EventEditor = () => {
	useInitQueries();

	return (
		<>
			<DatesListData />
			<TicketsListData />
		</>
	);
};

export default EventEditor;
