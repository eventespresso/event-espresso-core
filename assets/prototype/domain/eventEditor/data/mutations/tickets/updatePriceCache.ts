import { assocPath, pathOr } from 'ramda';
import { queries, DEFAULT_ENTITY_LIST_DATA } from '../../queries';
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
		data = {
			espressoPrices: DEFAULT_ENTITY_LIST_DATA('Prices'),
		};
	}

	const newTicketIn: string[] = remove ? ticketIn.filter((id) => id !== ticketId) : [...ticketIn, ticketId];
	const priceNodes = pathOr<Price[]>([], ['nodes'], prices);
	const pathToNodes = ['espressoPrices', 'nodes'];

	if (!remove && priceNodes.length) {
		const existingPrices: Price[] = pathOr<Price[]>([], pathToNodes, data);
		data = assocPath(pathToNodes, [...existingPrices, ...priceNodes], data);
	}
	const nodes = pathOr<Price[]>([], pathToNodes, data);
	// if there are no prices
	if (!nodes.length) {
		return;
	}

	// write the data to cache without
	// mutating the cache directly
	const writeOptions: WriteQueryOptions = {
		query: GET_PRICES,
		data,
		variables: {
			where: {
				ticketIn: newTicketIn,
			},
		},
	};
	proxy.writeQuery(writeOptions);
};

export default updatePriceCache;
