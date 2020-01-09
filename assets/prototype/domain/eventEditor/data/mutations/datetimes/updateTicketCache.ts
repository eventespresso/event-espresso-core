import { queries } from '../../queries';
const { GET_TICKETS } = queries;
import { CacheUpdaterFnArgs } from '../types';
import { ReadQueryOptions, WriteQueryOptions } from '../../queries/types';
import { TicketsList } from '../../types';

const updateTicketCache = ({ proxy, datetimeIn, datetimeId, remove = false }: CacheUpdaterFnArgs): void => {
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

	const newDatetimeIn: string[] = remove
		? datetimeIn.filter((id: string) => id !== datetimeId)
		: [...datetimeIn, datetimeId];

	const writeOptions: WriteQueryOptions = {
		query: GET_TICKETS,
		data,
		variables: {
			where: {
				datetimeIn: newDatetimeIn,
			},
		},
	};

	// write the data to cache without
	// mutating the cache directly
	proxy.writeQuery<TicketsList>(writeOptions);
};

export default updateTicketCache;
