import { useApolloClient } from '@apollo/react-hooks';
import { renderHook, act } from '@testing-library/react-hooks';

import useCacheRehydration from '../../initialization/useCacheRehydration';
import useUpdatePriceTypeList from '../useUpdatePriceTypeList';
import usePriceTypeQueryOptions from '../../queries/priceTypes/usePriceTypeQueryOptions';
import usePriceTypes from '../../queries/priceTypes/usePriceTypes';
import { ApolloMockedProvider } from '../../../context';

describe('useUpdatePriceTypeList', () => {
	it('checks for priceTypes cache update', async () => {
		const wrapper = ApolloMockedProvider();
		const { result } = renderHook(
			() => {
				useCacheRehydration();
				return {
					queryOptions: usePriceTypeQueryOptions(),
					priceTypelist: usePriceTypes(),
					cacheUpdater: useUpdatePriceTypeList(),
					client: useApolloClient(),
				};
			},
			{
				wrapper,
			}
		);

		const priceTypelist = result.current.priceTypelist;

		const priceType = { ...priceTypelist[0], id: priceTypelist[0].id + '-alpha' };

		// add priceType to the list.
		const nodes = [...priceTypelist, priceType];

		act(() => {
			result.current.cacheUpdater({
				...result.current.queryOptions,
				data: {
					espressoPriceTypes: {
						__typename: 'EspressoRootQueryPriceTypesConnection',
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
				return usePriceTypes();
			},
			{
				wrapper,
			}
		);

		const cachedPriceTypes = cacheResult.current;

		expect(cachedPriceTypes.length).toBe(priceTypelist.length + 1);
	});
});
