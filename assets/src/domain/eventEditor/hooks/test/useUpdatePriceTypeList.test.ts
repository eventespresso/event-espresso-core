import { useApolloClient } from '@apollo/react-hooks';
import { renderHook, act } from '@testing-library/react-hooks';

import useCacheRehydration from '../../services/apollo/initialization/useCacheRehydration';
import useUpdatePriceTypeList from '../useUpdatePriceTypeList';
import usePriceTypeQueryOptions from '../../services/apollo/queries/priceTypes/usePriceTypeQueryOptions';
import usePriceTypes from '../../services/apollo/queries/priceTypes/usePriceTypes';
import { ApolloMockedProvider } from '../../services/context/TestContext';

const timeout = 5000; // milliseconds
describe('useUpdatePriceTypeList', () => {
	it('checks for priceTypes cache update', async () => {
		const wrapper = ApolloMockedProvider();
		const { result, waitForNextUpdate } = renderHook(
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
		await waitForNextUpdate({ timeout });

		const cache = result.current.client.extract();
		const { result: cacheResult, waitForNextUpdate: waitForUpdate } = renderHook(
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
		await waitForUpdate({ timeout });

		const cachedPriceTypeIds = cacheResult.current.map(({ id }) => id);

		expect(cachedPriceTypeIds.length).toBe(priceTypelist.length + 1);

		expect(cachedPriceTypeIds).toContain(priceType.id);
	});
});
