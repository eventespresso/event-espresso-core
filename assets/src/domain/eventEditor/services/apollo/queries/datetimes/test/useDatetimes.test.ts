import { renderHook } from '@testing-library/react-hooks';

import useDatetimes from '../useDatetimes';
import { ApolloMockedProvider } from '../../../../../services/context/TestContext';
import { nodes } from './data';
import useInitDatetimeTestCache from './useInitDatetimeTestCache';

const timeout = 5000; // milliseconds
describe('useDatetimes()', () => {
	const wrapper = ApolloMockedProvider();
	it('checks for the empty datetimes', async () => {
		const { result, waitForNextUpdate } = renderHook(() => useDatetimes(), { wrapper });

		await waitForNextUpdate({ timeout });

		expect(result.current.length).toBe(0);
	});

	it('checks for the updated datetimes cache', async () => {
		const { result, waitForNextUpdate } = renderHook(
			() => {
				useInitDatetimeTestCache();
				return useDatetimes();
			},
			{ wrapper }
		);
		await waitForNextUpdate({ timeout });

		const { current: cachedDatetimes } = result;

		expect(cachedDatetimes).toEqual(nodes);

		expect(cachedDatetimes.length).toEqual(nodes.length);

		expect(cachedDatetimes[0].id).toEqual(nodes[0].id);

		expect(cachedDatetimes[0].capacity).toEqual(nodes[0].capacity);
	});
});
