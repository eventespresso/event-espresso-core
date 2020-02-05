import validFiniteQuantity from './index';
import { nodes as tickets } from '../../../../../../eventEditor/services/apollo/queries/tickets/test/data';

describe('validFiniteQuantity', () => {
	it('should return an empty array when filtering tickets that have quantity prop set to a string, null, undefined, Infinity or a negative number', () => {
		['100', null, undefined, Infinity, -1, -100, -1000].forEach((quantity: any) => {
			const updatedTickets = tickets.map((ticket) => {
				return { ...ticket, quantity };
			});
			const filteredTickets = updatedTickets.filter(validFiniteQuantity);
			expect(filteredTickets).toEqual([]);
		});
	});

	it('should return an array corresponding to positive quantity prop number', () => {
		[1, 2, 200, 1000, 100000].forEach((quantity: any) => {
			const updatedTickets = tickets.map((ticket) => {
				return { ...ticket, quantity };
			});
			const filteredTickets = updatedTickets.filter(validFiniteQuantity);
			expect(filteredTickets.length).toEqual(tickets.length);
			filteredTickets.forEach((ticket) => {
				expect(validFiniteQuantity(ticket)).toBe(true);
			});
		});
	});
});
