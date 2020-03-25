import { renderHook } from '@testing-library/react-hooks';

import useInitialState from '../useInitialState';
import { nodes as tickets } from '@edtrServices/apollo/queries/tickets/test/data';
import TestWrapper from './TestWrapper';

const mockTicket = tickets[0];

const timeout = 5000; // milliseconds
describe('TPC:useInitialState', () => {
	it('throws an error when a non-existent ticket id is passed', () => {
		const { result } = renderHook(
			() => {
				return useInitialState({ ticketId: 'fake-id' });
			},
			{
				wrapper: TestWrapper,
			}
		);

		expect(() => result.current(null)).toThrow();
	});

	it('returns the computed initial state for the passed ticketId', async () => {
		const { result, waitForNextUpdate } = renderHook(
			() => {
				return useInitialState({ ticketId: mockTicket.id });
			},
			{
				wrapper: TestWrapper,
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
