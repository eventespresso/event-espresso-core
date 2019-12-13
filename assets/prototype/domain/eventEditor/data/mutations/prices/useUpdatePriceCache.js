import usePriceQueryOptions from './usePriceQueryOptions';

const useUpdatePriceCache = () => {
	const options = usePriceQueryOptions();

	const updatePriceCache = ({ proxy, prices, price, remove = false }) => {
		const { nodes = [] } = prices;
		// remove from or add to the list
		const newNodes = remove ? nodes.filter(({ id }) => id !== price.id) : [...nodes, price];

		// write the data to cache without
		// mutating the cache directly
		proxy.writeQuery({
			...options,
			data: {
				prices: {
					...prices,
					nodes: newNodes,
				},
			},
		});
	};

	return updatePriceCache;
};

export default useUpdatePriceCache;
