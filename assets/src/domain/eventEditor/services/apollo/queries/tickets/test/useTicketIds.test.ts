import { renderHook } from '@testing-library/react-hooks';

import useTicketIds from '../useTicketIds';
import { ApolloMockedProvider } from '../../../../../services/context/TestContext';
import { nodes } from './data';
import useInitTicketTestCache from './useInitTicketTestCache';
import { getGuids } from '@appServices/predicates';

const timeout = 5000; // milliseconds
describe('useTicketIds()', () => {
	const wrapper = ApolloMockedProvider();
	it('checks for the empty ticket IDs', async () => {
		const { result, waitForValueToChange } = renderHook(() => useTicketIds(), { wrapper });

		await waitForValueToChange(() => result.current, { timeout });
		expect(result.current.length).toBe(0);
	});

	it('checks for ticket IDs after the cache is updated', async () => {
		const { result, waitForValueToChange } = renderHook(
			() => {
				useInitTicketTestCache();
				return useTicketIds();
			},
			{ wrapper }
		);
		await waitForValueToChange(() => result.current, { timeout });

		const { current: cachedTicketIds } = result;
		const passedTicketIds = getGuids(nodes);

		expect(cachedTicketIds.length).toEqual(passedTicketIds.length);

		expect(cachedTicketIds).toEqual(passedTicketIds);

		expect(cachedTicketIds).toEqual(expect.arrayContaining(passedTicketIds));
	});
});
