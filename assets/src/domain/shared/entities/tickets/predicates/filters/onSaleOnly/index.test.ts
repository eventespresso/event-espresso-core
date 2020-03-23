import { addMinutes, addWeeks, formatISO, subMinutes, subWeeks } from 'date-fns/fp';
import { pipe } from 'ramda';

import onSaleOnly from './index';
import isOnSale from '../../isOnSale';
import { nodes as tickets } from '../../../../../../eventEditor/services/apollo/queries/tickets/test/data';
import { now } from '@sharedServices/utils/dateAndTime';

describe('onSaleOnly', () => {
	it('should return an empty array if tickets are not on sale', () => {
		const updatedTickets = tickets.map((ticket) => {
			const startDate = formatISO(new Date(2008, 8, 18, 19, 0, 52));
			const endDate = formatISO(new Date(2009, 8, 18, 19, 0, 52));
			return { ...ticket, endDate, startDate, isOnSale: false };
		});
		const filteredTickets = onSaleOnly(updatedTickets);
		expect(filteredTickets).toEqual([]);
	});

	it('should return an empty array if tickets start date is in the future', () => {
		const updatedTickets = tickets.map((ticket) => {
			const startDate = pipe(addMinutes(1), formatISO)(now);
			return { ...ticket, startDate, isOnSale: false };
		});
		const filteredTickets = onSaleOnly(updatedTickets);
		expect(filteredTickets).toEqual([]);
	});

	it('should return an empty array if tickets sale has just finished', () => {
		const updatedTickets = tickets.map((ticket) => {
			const startDate = pipe(subWeeks(1), formatISO)(now);
			const endDate = pipe(subMinutes(1), formatISO)(now);
			return { ...ticket, endDate, startDate, isOnSale: false };
		});
		const filteredTickets = onSaleOnly(updatedTickets);
		expect(filteredTickets).toEqual([]);
	});

	it('should return an array of tickets on sale if start date is in the past and end date is in the future', () => {
		const updatedTickets = tickets.map((ticket) => {
			const startDate = pipe(subWeeks(1), formatISO)(now);
			const endDate = pipe(addWeeks(1), formatISO)(now);
			return { ...ticket, endDate, startDate };
		});
		const filteredTickets = onSaleOnly(updatedTickets);

		expect(filteredTickets.length).toEqual(tickets.length);
		filteredTickets.forEach((ticket) => {
			expect(isOnSale(ticket)).toBe(true);
		});
	});
});
