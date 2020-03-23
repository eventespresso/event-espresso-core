import { addWeeks, formatISO, subWeeks } from 'date-fns/fp';
import { pipe } from 'ramda';

import allOnSaleAndPending from './index';
import isOnSale from '../../isOnSale';
import isPending from '../../isPending';
import { nodes as tickets } from '../../../../../../eventEditor/services/apollo/queries/tickets/test/data';
import { now } from '@sharedServices/utils/dateAndTime';

describe('allOnSaleAndPending', () => {
	it('should return an empty array if tickets are not on sale and not pending', () => {
		const updatedTickets = tickets.map((ticket) => {
			const startDate = formatISO(new Date(2008, 8, 18, 19, 0, 52));
			const endDate = formatISO(new Date(2009, 8, 18, 19, 0, 52));
			return { ...ticket, endDate, startDate, isOnSale: false, isPending: false };
		});
		const filteredTickets = allOnSaleAndPending(updatedTickets);
		expect(filteredTickets).toEqual([]);
	});

	it('should return an array of tickets on sale if start date is past now and end date is in future', () => {
		const updatedTickets = tickets.map((ticket) => {
			const startDate = pipe(subWeeks(1), formatISO)(now);
			const endDate = pipe(addWeeks(1), formatISO)(now);
			return { ...ticket, endDate, startDate, isOnSale: true, isPending: false };
		});
		const filteredTickets = allOnSaleAndPending(updatedTickets);

		expect(filteredTickets.length).toEqual(tickets.length);
		filteredTickets.forEach((ticket) => {
			expect(isOnSale(ticket)).toBe(true);
			expect(isPending(ticket)).toBe(false);
		});
	});

	it('should return an array of pending tickets if start date is in the future', () => {
		const updatedTickets = tickets.map((ticket) => {
			const startDate = pipe(addWeeks(1), formatISO)(now);
			return { ...ticket, startDate, isOnSale: false, isPending: true };
		});
		const filteredTickets = allOnSaleAndPending(updatedTickets);

		expect(filteredTickets.length).toEqual(tickets.length);
		filteredTickets.forEach((ticket) => {
			expect(isOnSale(ticket)).toBe(false);
			expect(isPending(ticket)).toBe(true);
		});
	});
});
