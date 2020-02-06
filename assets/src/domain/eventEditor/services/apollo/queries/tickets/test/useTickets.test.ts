import { renderHook } from '@testing-library/react-hooks';

import useTickets from '../useTickets';
import { ApolloMockedProvider } from '../../../../../services/context/TestContext';
import { nodes } from './data';
import useInitTicketTestCache from './useInitTicketTestCache';

const timeout = 5000; // milliseconds
describe('useTickets()', () => {
	const wrapper = ApolloMockedProvider();
	it('checks for the empty tickets', async () => {
		const { result, waitForNextUpdate } = renderHook(() => useTickets(), { wrapper });

		await waitForNextUpdate({ timeout });
		expect(result.current.length).toBe(0);
	});

	it('checks for the updated tickets cache', async () => {
		const { result, waitForNextUpdate } = renderHook(
			() => {
				useInitTicketTestCache();
				return useTickets();
			},
			{ wrapper }
		);

		await waitForNextUpdate({ timeout });

		const { current: cachedTickets } = result;

		expect(cachedTickets).toEqual(nodes);

		expect(cachedTickets.length).toEqual(nodes.length);

		expect(cachedTickets[0].id).toEqual(nodes[0].id);

		expect(cachedTickets[0].name).toEqual(nodes[0].name);
	});
});
