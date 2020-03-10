import { renderHook } from '@testing-library/react-hooks';

import useTicketItem from '../useTicketItem';
import { ApolloMockedProvider } from '../../../../../services/context/TestContext';
import { nodes } from './data';
import useInitTicketTestCache from './useInitTicketTestCache';

describe('useTicketItem', () => {
	const existingTicket = nodes[0];
	const wrapper = ApolloMockedProvider();
	it('checks for non existent ticket when the cache is empty', () => {
		const { result, waitForValueToChange } = renderHook(() => useTicketItem({ id: existingTicket.id }), {
			wrapper,
		});
		waitForValueToChange(() => result.current);

		expect(result.current).toBe(undefined);
	});

	it('checks for non existent ticket when the cache is NOT empty', () => {
		const { result, waitForValueToChange } = renderHook(
			() => {
				useInitTicketTestCache();
				return useTicketItem({ id: 'fake-id' });
			},
			{ wrapper }
		);
		waitForValueToChange(() => result.current);

		expect(result.current).toBe(undefined);
	});

	it('checks for an existent ticket', () => {
		const { result, waitForValueToChange } = renderHook(
			() => {
				useInitTicketTestCache();
				return useTicketItem({ id: existingTicket.id });
			},
			{ wrapper }
		);
		waitForValueToChange(() => result.current);

		const { current: ticketItem } = result;

		expect(ticketItem).toBeDefined();

		expect(ticketItem.id).toEqual(existingTicket.id);

		expect(ticketItem.dbId).toEqual(existingTicket.dbId);

		expect(ticketItem).toEqual(existingTicket);
	});
});
