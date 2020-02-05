import { compareAsc, parseISO } from 'date-fns';

import sorters from './index';
import { SortTicketsBy } from '../../../../../eventEditor/interfaces/ticket/types';
import { nodes as tickets } from '../../../../../../../prototype/domain/eventEditor/data/queries/tickets/test/data';

describe('sorters', () => {
	it('should return tickets sorted in default chronological order if no order prop is provided', () => {
		const sortedTickets = sorters({ tickets });
		sortedTickets.forEach((currentTicket, index) => {
			const nextTicket = index + 1 <= sortedTickets.length ? sortedTickets[index + 1] : null;
			if (nextTicket) {
				const chronologicComparison = compareAsc(
					parseISO(currentTicket.startDate),
					parseISO(nextTicket.startDate)
				);
				expect(chronologicComparison).toBe(-1);
			}
		});
	});

	it('should return tickets sorted in chronological order if sort prop is set to `chronologically`', () => {
		const sortedTickets = sorters({ tickets, order: SortTicketsBy.date });
		sortedTickets.forEach((currentTicket, index) => {
			const nextTicket = sortedTickets.length <= index + 1 ? sortedTickets[index + 1] : null;
			if (nextTicket) {
				const chronologicComparison = compareAsc(
					parseISO(currentTicket.startDate),
					parseISO(nextTicket.startDate)
				);
				expect(chronologicComparison).toBe(-1);
			}
		});
	});

	it('should return tickets sorted by Id if sort prop is set to `byId`', () => {
		const sortedTickets = sorters({ tickets, order: SortTicketsBy.id });
		sortedTickets.forEach((currentTicket, index) => {
			const nextTicket = sortedTickets.length <= index + 1 ? sortedTickets[index + 1] : null;
			if (nextTicket) {
				const result = currentTicket.id < nextTicket.id;
				expect(result).toBe(-1);
			}
		});
	});

	it('should return tickets sorted by name if sort prop is set to `byName`', () => {
		const sortedTickets = sorters({ tickets, order: SortTicketsBy.name });
		sortedTickets.forEach((currentTicket, index) => {
			const nextTicket = sortedTickets.length <= index + 1 ? sortedTickets[index + 1] : null;
			if (nextTicket) {
				const result = currentTicket.name < nextTicket.name;
				expect(result).toBe(true);
			}
		});
	});

	it('should return tickets sorted by order if sort prop is set to `byOrder`', () => {
		const sortedTickets = sorters({ tickets, order: SortTicketsBy.order });
		sortedTickets.forEach((currentTicket, index) => {
			const nextTicket = sortedTickets.length <= index + 1 ? sortedTickets[index + 1] : null;
			if (nextTicket) {
				const result = currentTicket.order < nextTicket.order;
				expect(result).toBe(true);
			}
		});
	});
});
