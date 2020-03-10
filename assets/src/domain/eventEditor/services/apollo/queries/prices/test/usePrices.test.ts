import { renderHook } from '@testing-library/react-hooks';

import usePrices from '../usePrices';
import { ApolloMockedProvider } from '../../../../../services/context/TestContext';
import { nodes } from './data';
import useInitPriceTestCache from './useInitPriceTestCache';

const timeout = 5000; // milliseconds
describe('usePrices()', () => {
	const wrapper = ApolloMockedProvider();
	it('checks for the empty prices', async () => {
		const { result, waitForNextUpdate } = renderHook(() => usePrices(), { wrapper });

		await waitForNextUpdate({ timeout });
		expect(result.current.length).toBe(0);
	});

	it('checks for the updated prices cache', async () => {
		const { result, waitForNextUpdate } = renderHook(
			() => {
				useInitPriceTestCache();
				return usePrices();
			},
			{ wrapper }
		);

		await waitForNextUpdate({ timeout });

		const { current: cachedPrices } = result;

		expect(cachedPrices).toEqual(nodes);

		expect(cachedPrices.length).toEqual(nodes.length);

		expect(cachedPrices[0].id).toEqual(nodes[0].id);

		expect(cachedPrices[0].name).toEqual(nodes[0].name);
	});
});
