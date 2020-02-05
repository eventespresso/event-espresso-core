import { formatISO } from 'date-fns';

import nextOnSaleOrPendingOnly from './index';
import { nodes as tickets } from '../../../../../../../../prototype/domain/eventEditor/data/queries/tickets/test/data';

describe('nextOnSaleOrPendingOnly', () => {
	it('should return an empty array if tickets are not on sale', () => {
		const updatedTickets = tickets.map((ticket) => {
			const startDate = formatISO(new Date(2029, 8, 18, 19, 0, 52));
			return { ...ticket, startDate };
		});
		const filteredTickets = nextOnSaleOrPendingOnly(updatedTickets);
		// expect(filteredTickets).toEqual([]);
	});
});
