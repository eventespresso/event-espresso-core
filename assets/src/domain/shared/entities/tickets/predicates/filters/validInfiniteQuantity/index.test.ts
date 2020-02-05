import validInfiniteQuantity from './index';
import { nodes as tickets } from '../../../../../../eventEditor/services/apollo/queries/tickets/test/data';

describe('validInfiniteQuantity', () => {
	it('should return an empty array when filtering tickets that have quantity prop set to a string, null or undefined ', () => {
		['100', null, undefined].forEach((quantity: any) => {
			const updatedTickets = tickets.map((ticket) => {
				return { ...ticket, quantity };
			});
			const filteredTickets = updatedTickets.filter(validInfiniteQuantity);
			expect(filteredTickets).toEqual([]);
		});
	});

	it('should return an empty array when filtering tickets that have quantity prop set to a negative or positive number', () => {
		[-100, -10, 0, 10, 100, 1000].forEach((quantity: any) => {
			const updatedTickets = tickets.map((ticket) => {
				return { ...ticket, quantity };
			});
			const filteredTickets = updatedTickets.filter(validInfiniteQuantity);
			expect(filteredTickets).toEqual([]);
		});
	});

	it('should return an array corresponding to tickets with quantity prop set to Infinity', () => {
		const updatedTickets = tickets.map((ticket) => {
			const quantity = Infinity;
			return { ...ticket, quantity };
		});
		const filteredTickets = updatedTickets.filter(validInfiniteQuantity);

		expect(filteredTickets.length).toEqual(tickets.length);
		filteredTickets.forEach((ticket) => {
			expect(validInfiniteQuantity(ticket)).toBe(true);
		});
	});
});
