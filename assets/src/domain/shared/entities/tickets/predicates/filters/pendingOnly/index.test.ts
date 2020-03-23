import { addWeeks, formatISO } from 'date-fns/fp';
import { pipe } from 'ramda';

import pendingOnly from './index';
import isPending from '../../isPending';
import { nodes as tickets } from '../../../../../../eventEditor/services/apollo/queries/tickets/test/data';
import { now } from '@sharedServices/utils/dateAndTime';

describe('pendingOnly', () => {
	it('should return an empty array if tickets started in the past', () => {
		const updatedTickets = tickets.map((ticket) => {
			const startDate = formatISO(new Date(2008, 8, 18, 19, 0, 52));
			return { ...ticket, startDate, isPending: false };
		});
		const filteredTickets = pendingOnly(updatedTickets);
		expect(filteredTickets).toEqual([]);
	});

	it('should return an array of tickets which starts in the future', () => {
		const updatedTickets = tickets.map((ticket) => {
			const startDate = pipe(addWeeks(1), formatISO)(now);
			return { ...ticket, startDate };
		});
		const filteredTickets = pendingOnly(updatedTickets);

		expect(filteredTickets.length).toEqual(tickets.length);
		filteredTickets.forEach((ticket) => {
			expect(isPending(ticket)).toBe(true);
		});
	});
});
