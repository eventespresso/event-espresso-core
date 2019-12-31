import { renderHook } from '@testing-library/react-hooks';

import useTickets from '../useTickets';
import { ApolloMockedProvider } from '../../../../context';
import { nodes } from './data';
import useInitTicketStatus from './useInitTicketStatus';
import useInitTicketTestCache from './useInitTicketTestCache';

describe('useTickets()', () => {
	const wrapper = ApolloMockedProvider();
	it('checks for the empty tickets', () => {
		const { result } = renderHook(
			() => {
				useInitTicketStatus();
				return useTickets();
			},
			{ wrapper }
		);

		expect(result.current.length).toBe(0);
	});

	it('checks for the updated tickets cache', () => {
		const { result } = renderHook(
			() => {
				useInitTicketTestCache();
				return useTickets();
			},
			{ wrapper }
		);

		const { current: cachedTickets } = result;

		expect(cachedTickets).toEqual(nodes);

		expect(cachedTickets.length).toEqual(nodes.length);

		expect(cachedTickets[0].id).toEqual(nodes[0].id);

		expect(cachedTickets[0].name).toEqual(nodes[0].name);
	});
});
