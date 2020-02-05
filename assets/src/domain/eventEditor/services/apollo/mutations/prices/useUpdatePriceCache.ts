import usePriceQueryOptions from '../../queries/prices/usePriceQueryOptions';
import { CacheUpdaterFn, CacheUpdaterFnArgs } from '../types';
import { WriteQueryOptions } from '../../queries/types';
import { Price, PricesList } from '../../types';

const useUpdatePriceCache = (): CacheUpdaterFn => {
	const queryOptions = usePriceQueryOptions();

	const updatePriceCache = ({ proxy, prices, price, remove = false }: CacheUpdaterFnArgs): void => {
		const { nodes = [] } = prices;
		// remove from or add to the list
		const newNodes: Price[] = remove ? nodes.filter(({ id }: Price) => id !== price.id) : [...nodes, price];

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
