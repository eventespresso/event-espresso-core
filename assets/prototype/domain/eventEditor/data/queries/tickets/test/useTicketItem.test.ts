import { renderHook } from '@testing-library/react-hooks';

import useTicketItem from '../useTicketItem';
import { ApolloMockedProvider } from '../../../../context';
import { nodes } from './data';
import useInitTicketTestCache from './useInitTicketTestCache';

describe('useTicketItem()', () => {
	const existingTicket = nodes[0];
	const wrapper = ApolloMockedProvider();
	it('checks for non existent ticket when the cache is empty', () => {
		const { result } = renderHook(() => useTicketItem({ id: existingTicket.id }), { wrapper });

		expect(result.current).toBeUndefined();
	});

	it('checks for non existent ticket when the cache is NOT empty', () => {
		const { result } = renderHook(
			() => {
				useInitTicketTestCache();
				return useTicketItem({ id: 'fake-id' });
			},
			{ wrapper }
		);

		expect(result.current).toBeUndefined();
	});

	it('checks for an existent ticket', () => {
		const { result } = renderHook(
			() => {
				useInitTicketTestCache();
				return useTicketItem({ id: existingTicket.id });
			},
			{ wrapper }
		);

		const { current: ticketItem } = result;

		expect(ticketItem).toBeDefined();

		expect(ticketItem.id).toEqual(existingTicket.id);

		expect(ticketItem.dbId).toEqual(existingTicket.dbId);

		expect(ticketItem).toEqual(existingTicket);
	});
});
