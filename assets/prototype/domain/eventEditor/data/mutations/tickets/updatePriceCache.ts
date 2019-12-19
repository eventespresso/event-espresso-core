import { assocPath, pathOr } from 'ramda';
import { queries } from '../../queries';
import { CacheUpdaterFnArgs } from '../types';
import { ReadQueryOptions, WriteQueryOptions } from '../../queries/types';
import { Price } from '../../types';
const { GET_PRICES } = queries;

const updatePriceCache = ({ proxy, prices = {}, ticketIn, ticketId, remove = false }: CacheUpdaterFnArgs): void => {
	const queryOptions: ReadQueryOptions = {
		query: GET_PRICES,
		variables: {
			where: {
				ticketIn,
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

	const newTicketIn: string[] = remove ? ticketIn.filter((id) => id !== ticketId) : [...ticketIn, ticketId];
	const priceNodes = pathOr([], ['nodes'], prices);

	let newData: any;
	if (!remove && priceNodes.length) {
		const pathToNodes = ['prices', 'nodes'];
		const existingPrices: Price[] = pathOr([], pathToNodes, data);
		newData = assocPath(pathToNodes, [...existingPrices, ...priceNodes], data);
	}

	// write the data to cache without
	// mutating the cache directly
	const writeOptions: WriteQueryOptions = {
		query: GET_PRICES,
		data: newData || data,
		variables: {
			where: {
				ticketIn: newTicketIn,
			},
		},
	};
	proxy.writeQuery(writeOptions);
};

export default updatePriceCache;
