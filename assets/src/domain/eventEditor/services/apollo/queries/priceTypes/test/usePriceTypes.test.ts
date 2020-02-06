import { renderHook } from '@testing-library/react-hooks';

import usePriceTypes from '../usePriceTypes';
import { ApolloMockedProvider } from '../../../../../services/context/TestContext';
import { nodes } from './data';
import useInitPriceTypeTestCache from './useInitPriceTypeTestCache';

const timeout = 5000; // milliseconds
describe('usePriceTypes()', () => {
	const wrapper = ApolloMockedProvider();
	it('checks for the empty price types', async () => {
		const { result, waitForNextUpdate } = renderHook(() => usePriceTypes(), { wrapper });

		await waitForNextUpdate({ timeout });
		expect(result.current.length).toBe(0);
	});

	it('checks for the updated price types cache', async () => {
		const { result, waitForNextUpdate } = renderHook(
			() => {
				useInitPriceTypeTestCache();
				return usePriceTypes();
			},
			{ wrapper }
		);

		await waitForNextUpdate({ timeout });
		const { current: cachedPriceTypes } = result;

		expect(cachedPriceTypes).toEqual(nodes);

		expect(cachedPriceTypes.length).toEqual(nodes.length);

		expect(cachedPriceTypes[0].id).toEqual(nodes[0].id);

		expect(cachedPriceTypes[0].baseType).toEqual(nodes[0].baseType);
	});
});
