import { useApolloClient } from '@apollo/react-hooks';
import { renderHook, act } from '@testing-library/react-hooks';

import useCacheRehydration from '../../initialization/useCacheRehydration';
import useUpdatePriceList from '../useUpdatePriceList';
import usePriceQueryOptions from '../../queries/prices/usePriceQueryOptions';
import usePrices from '../../queries/prices/usePrices';
import { ApolloMockedProvider } from '../../../context';

describe('useUpdatePriceList', () => {
	it('checks for prices cache update', async () => {
		const wrapper = ApolloMockedProvider();
		const { result } = renderHook(
			() => {
				useCacheRehydration();
				return {
					queryOptions: usePriceQueryOptions(),
					pricelist: usePrices(),
					cacheUpdater: useUpdatePriceList(),
					client: useApolloClient(),
				};
			},
			{
				wrapper,
			}
		);

		const pricelist = result.current.pricelist;

		const price = { ...pricelist[0], id: pricelist[0].id + '-alpha' };

		// add price to the list.
		const nodes = [...pricelist, price];

		act(() => {
			result.current.cacheUpdater({
				...result.current.queryOptions,
				data: {
					espressoPrices: {
						__typename: 'EspressoRootQueryPricesConnection',
						nodes,
					},
				},
			});
		});

		const cache = result.current.client.extract();
		const { result: cacheResult } = renderHook(
			() => {
				const client = useApolloClient();
				// restore the cache from previous render
				client.restore(cache);
				return usePrices();
			},
			{
				wrapper,
			}
		);

		const cachedPrices = cacheResult.current;

		expect(cachedPrices.length).toBe(pricelist.length + 1);
	});
});
