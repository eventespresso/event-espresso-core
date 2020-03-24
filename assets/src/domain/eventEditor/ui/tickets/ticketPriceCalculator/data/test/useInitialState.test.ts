import { renderHook } from '@testing-library/react-hooks';

import { useCacheRehydration } from '@edtrServices/apollo';
import useInitialState from '../useInitialState';
import { ApolloMockedProvider } from '@edtrServices/context/TestContext';
import { nodes as tickets } from '@edtrServices/apollo/queries/tickets/test/data';

const mockTicket = tickets[0];

const timeout = 5000; // milliseconds
describe('TPC:useInitialState', () => {
	it('throws an error when a non-existent ticket id is passed', () => {
		const wrapper = ApolloMockedProvider();
		const { result } = renderHook(
			() => {
				useCacheRehydration();
				return useInitialState({ ticketId: 'fake-id' });
			},
			{
				wrapper,
			}
		);

		expect(() => result.current(null)).toThrow();
	});

	it('returns the computed initial state for the passed ticketId', async () => {
		const wrapper = ApolloMockedProvider();
		const { result, waitForNextUpdate } = renderHook(
			() => {
				useCacheRehydration();
				return useInitialState({ ticketId: mockTicket.id });
			},
			{
				wrapper,
			}
		);

		await waitForNextUpdate({ timeout });

		const initialState = result.current(null);

		expect(initialState).toHaveProperty('ticket');
		expect(initialState).toHaveProperty('prices');

		expect(initialState.ticket.id).toBe(mockTicket.id);
		expect(initialState.ticket.reverseCalculate).toBe(mockTicket.reverseCalculate);

		expect(Array.isArray(initialState.prices)).toBe(true);
	});
});
