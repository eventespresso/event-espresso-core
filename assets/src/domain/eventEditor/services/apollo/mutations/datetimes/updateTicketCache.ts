import { CacheUpdaterFnArgs } from '../types';
import { GET_TICKETS, WriteQueryOptions } from '@edtrServices/apollo/queries';
import { TicketsList } from '@edtrServices/apollo/types';
import { sortBy, identity } from 'ramda';
import { ReadQueryOptions } from '@dataServices/apollo/queries';

const updateTicketCache = ({ proxy, datetimeIn, datetimeId, action }: CacheUpdaterFnArgs): void => {
	const queryOptions: ReadQueryOptions = {
		query: GET_TICKETS,
		variables: {
			where: {
				datetimeIn,
			},
		},
	};
	let data: TicketsList;
	// Read the existing data from cache.
	try {
		data = proxy.readQuery<TicketsList>(queryOptions);
	} catch (error) {
		data = null;
	}

	// if there are no tickets
	if (!data) {
		return;
	}

	let newDatetimeIn: typeof datetimeIn;

	switch (action) {
		case 'add':
			newDatetimeIn = [...datetimeIn, datetimeId];
			break;
		case 'remove':
			newDatetimeIn = datetimeIn.filter((id) => id !== datetimeId);
			break;
		default:
			newDatetimeIn = datetimeIn;
			break;
	}

	const writeOptions: WriteQueryOptions = {
		query: GET_TICKETS,
		data,
		variables: {
			where: {
				datetimeIn: sortBy(identity, newDatetimeIn),
			},
		},
	};

	// write the data to cache without
	// mutating the cache directly
	proxy.writeQuery<TicketsList>(writeOptions);
};

export default updateTicketCache;
