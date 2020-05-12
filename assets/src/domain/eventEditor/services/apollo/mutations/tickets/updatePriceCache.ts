import { assocPath, pathOr, uniqBy, sortBy, identity } from 'ramda';

import { CacheUpdaterFnArgs } from '../types';
import { DEFAULT_PRICE_LIST_DATA, GET_PRICES } from '@edtrServices/apollo/queries';
import { Price, PricesList } from '@edtrServices/apollo/types';
import { WriteQueryOptions } from '@edtrServices/apollo/queries/types';
import { entityDbId } from '@sharedServices/predicates/selectionById';
import { ReadQueryOptions } from '@dataServices/apollo/queries';

const updatePriceCache = ({ proxy, prices = null, ticketIn, ticketId, action }: CacheUpdaterFnArgs): void => {
	const queryOptions: ReadQueryOptions = {
		query: GET_PRICES,
		variables: {
			where: {
				ticketIn,
			},
		},
	};
	let data: PricesList;
	// Read the existing data from cache.
	try {
		data = proxy.readQuery<PricesList>(queryOptions);
	} catch (error) {
		data = {
			espressoPrices: DEFAULT_PRICE_LIST_DATA,
		};
	}

	let newTicketIn: typeof ticketIn;

	switch (action) {
		case 'add':
			newTicketIn = [...ticketIn, ticketId];
			break;
		case 'remove':
			newTicketIn = ticketIn.filter((id) => id !== ticketId);
			break;
		default:
			newTicketIn = ticketIn;
			break;
	}

	const priceNodes = prices?.nodes || [];
	const pathToNodes = ['espressoPrices', 'nodes'];

	if (action === 'add' && priceNodes.length) {
		const existingPrices = pathOr<Price[]>([], pathToNodes, data);
		// make sure that default prices are not repeated
		const newPrices = uniqBy(entityDbId, [...existingPrices, ...priceNodes]);
		data = assocPath<Price[], PricesList>(pathToNodes, newPrices, data);
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
				ticketIn: sortBy(identity, newTicketIn),
			},
		},
	};
	proxy.writeQuery<PricesList>(writeOptions);
};

export default updatePriceCache;
