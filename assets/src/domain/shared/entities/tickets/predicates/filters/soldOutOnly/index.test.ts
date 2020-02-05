import soldOutOnly from './index';
import { filterFn as percentSoldAtOrAboveFilterFn } from '../percentSoldAtOrAbove';
import { nodes as tickets } from '../../../../../../eventEditor/services/apollo/queries/tickets/test/data';

describe('soldOutOnly', () => {
	it('should return an empty array if tickets are not sold out', () => {
		// Both conditions are met: isSoldOut is set to false and percentSoldAtOrAbove is below 100
		const updatedTickets = tickets.map((ticket) => {
			return { ...ticket, isSoldOut: false, quantity: 100, sold: 90 };
		});
		const filteredTickets = soldOutOnly(updatedTickets);
		expect(filteredTickets).toEqual([]);
	});

	it('should return an array of soldout tickets based on condition that sold prop value is the same as quantity value regardless of the soldOut prop value', () => {
		const updatedTickets = tickets.map((ticket) => {
			return { ...ticket, isSoldOut: false, quantity: 100, sold: 100 };
		});
		const filteredTickets = soldOutOnly(updatedTickets);

		expect(filteredTickets.length).toEqual(tickets.length);
		filteredTickets.forEach((ticket) => {
			expect(percentSoldAtOrAboveFilterFn({ percentage: 100, ticket })).toBe(true);
		});
	});

	it('should return an array of soldout tickets based on the soldOut prop value regardless of sold or quantity value', () => {
		const updatedTickets = tickets.map((ticket) => {
			return { ...ticket, isSoldOut: true, quantity: 100, sold: 0 };
		});
		const filteredTickets = soldOutOnly(updatedTickets);

		expect(filteredTickets.length).toEqual(tickets.length);
		filteredTickets.forEach((ticket) => {
			expect(ticket.isSoldOut).toBe(true);
		});
	});
});
