import { renderHook } from '@testing-library/react-hooks';

import useTicketIds from '../useTicketIds';
import { ApolloMockedProvider } from '../../../../context/ContextProviders';
import { setup, cleanup, nodes } from './data';
import useInitTicketStatus from './useInitTicketStatus';
import useInitTicketTestCache from './useInitTicketTestCache';

beforeAll(setup);

afterAll(cleanup);

describe('useTicketIds()', () => {
	const wrapper = ApolloMockedProvider();
	it('checks for the empty ticket IDs', () => {
		const { result } = renderHook(
			() => {
				useInitTicketStatus();
				return useTicketIds();
			},
			{ wrapper }
		);

		expect(result.current.length).toBe(0);
	});

	it('checks for ticket IDs after the cache is updated', async () => {
		const { result } = renderHook(
			() => {
				useInitTicketTestCache();
				return useTicketIds();
			},
			{ wrapper }
		);

		const { current: cachedTicketIds } = result;
		const passedTicketIds = nodes.map(({ id }) => id);

		expect(cachedTicketIds.length).toEqual(passedTicketIds.length);

		expect(cachedTicketIds).toEqual(passedTicketIds);

		expect(cachedTicketIds).toEqual(expect.arrayContaining(passedTicketIds));
	});
});
