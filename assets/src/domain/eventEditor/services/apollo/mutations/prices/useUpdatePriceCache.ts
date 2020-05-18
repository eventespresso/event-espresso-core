import { findIndex, update } from 'ramda';

import { CacheUpdaterFn, CacheUpdaterFnArgs } from '../types';
import { Price, PricesList } from '@edtrServices/apollo/types';
import { WriteQueryOptions } from '@dataServices/apollo/queries/types';
import { entityHasGuid } from '@sharedServices/predicates/selectionById';
import { usePriceQueryOptions } from '@edtrServices/apollo/queries/prices';

const useUpdatePriceCache = (): CacheUpdaterFn => {
	const queryOptions = usePriceQueryOptions();

	const updatePriceCache = ({ proxy, prices, price, action }: CacheUpdaterFnArgs): void => {
		const { nodes = [] } = prices;
		let newNodes: Array<Price>, priceIndex: number;
		switch (action) {
			case 'add':
				newNodes = [...nodes, price];
				break;
			case 'update':
				// find the index of the price to update
				priceIndex = findIndex(entityHasGuid(price.id), nodes);
				// if price exists
				if (priceIndex >= 0) {
					newNodes = update(priceIndex, price, nodes);
				}
				break;
			case 'remove':
				newNodes = nodes.filter(({ id }) => id !== price.id);
				break;
			default:
				newNodes = nodes;
				break;
		}

		// write the data to cache without
		// mutating the cache directly
		const writeOptions: WriteQueryOptions = {
			...queryOptions,
			data: {
				espressoPrices: {
					...prices,
					nodes: newNodes,
				},
			},
		};
		proxy.writeQuery<PricesList>(writeOptions);
	};

	return updatePriceCache;
};

export default useUpdatePriceCache;
