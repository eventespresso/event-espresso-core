import { queries } from '../../queries';
const { GET_TICKETS } = queries;
import { CacheUpdaterFnArgs } from '../types';
import { ReadQueryOptions, WriteQueryOptions } from '../../queries/types';

const updateTicketCache = ({ proxy, datetimeIn, datetimeId, remove = false }: CacheUpdaterFnArgs): void => {
	const queryOptions: ReadQueryOptions = {
		query: GET_TICKETS,
		variables: {
			where: {
				datetimeIn,
			},
		},
	};
	let data: any;
	// Read the existing data from cache.
	try {
		data = proxy.readQuery(queryOptions);
	} catch (error) {
		data = {};
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
	proxy.writeQuery(writeOptions);
};

export default updateTicketCache;
