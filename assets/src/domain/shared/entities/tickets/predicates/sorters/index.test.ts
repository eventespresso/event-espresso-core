import { compareAsc, parseISO } from 'date-fns';

import sorters from './index';
import { nodes as tickets } from '@edtrServices/apollo/queries/tickets/test/data';

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

	it('should return tickets sorted in chronological order if sort prop is set to `date`', () => {
		const sortedTickets = sorters({ tickets, sortBy: 'date' });
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

	it('should return tickets sorted by Id if sort prop is set to `id`', () => {
		const sortedTickets = sorters({ tickets, sortBy: 'id' });
		sortedTickets.forEach((currentTicket, index) => {
			const nextTicket = sortedTickets.length <= index + 1 ? sortedTickets[index + 1] : null;
			if (nextTicket) {
				const result = currentTicket.id < nextTicket.id;
				expect(result).toBe(-1);
			}
		});
	});

	it('should return tickets sorted by name if sort prop is set to `name`', () => {
		const sortedTickets = sorters({ tickets, sortBy: 'name' });
		sortedTickets.forEach((currentTicket, index) => {
			const nextTicket = sortedTickets.length <= index + 1 ? sortedTickets[index + 1] : null;
			if (nextTicket) {
				const result = currentTicket.name < nextTicket.name;
				expect(result).toBe(true);
			}
		});
	});

	it('should return tickets sorted by order if sort prop is set to `order`', () => {
		const sortedTickets = sorters({ tickets, sortBy: 'order' });
		sortedTickets.forEach((currentTicket, index) => {
			const nextTicket = sortedTickets.length <= index + 1 ? sortedTickets[index + 1] : null;
			if (nextTicket) {
				const result = currentTicket.order < nextTicket.order;
				expect(result).toBe(true);
			}
		});
	});
});
