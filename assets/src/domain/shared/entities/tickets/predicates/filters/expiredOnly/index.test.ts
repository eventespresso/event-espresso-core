import { addWeeks, differenceInMinutes, formatISO, parseISO } from 'date-fns';

import expiredOnly from './index';
import { nodes as tickets } from '../../../../../../../domain/eventEditor/data/queries/tickets/test/data';

describe('expiredOnly', () => {
	it('should return an empty array if tickets are trashed', () => {
		const updatedTickets = tickets.map((ticket) => ({ ...ticket, isTrashed: true }));
		const filteredTickets = expiredOnly(updatedTickets);
		expect(filteredTickets).toEqual([]);
	});

	it('should return an empty array if tickets are not expired', () => {
		const updatedTickets = tickets.map((ticket) => {
			const endDate = formatISO(addWeeks(new Date(), 1));
			return { ...ticket, endDate };
		});
		const filteredTickets = expiredOnly(updatedTickets);
		expect(filteredTickets).toEqual([]);
	});

	it('should return an array of expired tickets if ticket`s end date is past now', () => {
		const filteredTickets = expiredOnly(tickets);
		filteredTickets.forEach((ticket) => {
			const endDate = parseISO(ticket.endDate);
			const diff = differenceInMinutes(endDate, new Date()) < 0;
			expect(diff).toBe(true);
		});
	});
});
