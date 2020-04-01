import { useApolloClient } from '@apollo/react-hooks';
import { renderHook, act } from '@testing-library/react-hooks';

import { useCacheRehydration } from '@edtrServices/apollo/initialization';
import useUpdatePriceTypeList from '../useUpdatePriceTypeList';
import { usePriceTypeQueryOptions, usePriceTypes } from '@edtrServices/apollo/queries';
import { ApolloMockedProvider } from '@edtrServices/context/TestContext';
import { getGuids } from '@appServices/predicates';

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

		const cachedPriceTypeIds = getGuids(cacheResult.current);

		expect(cachedPriceTypeIds.length).toBe(priceTypelist.length + 1);

		expect(cachedPriceTypeIds).toContain(priceType.id);
	});
});
