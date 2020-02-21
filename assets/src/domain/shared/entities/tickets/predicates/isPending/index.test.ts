import { formatISO } from 'date-fns';
import { add, sub } from '../../../../../../application/services/utilities/date';

import isPending from './index';
import { nodes as tickets } from '../../../../../eventEditor/services/apollo/queries/tickets/test/data';
import { now } from '../filters';

describe('isPending', () => {
	it('should return false if ticket start date is in the past', () => {
		tickets.forEach((ticket) => {
			const startDate = formatISO(sub('weeks', now, 1));
			const newTicket = { ...ticket, startDate };
			expect(isPending(newTicket)).toBe(false);
		});
	});

	it('should return true if ticket start date is in the future', () => {
		tickets.forEach((ticket) => {
			const startDate = formatISO(add('weeks', now, 1));
			const newTicket = { ...ticket, startDate };
			expect(isPending(newTicket)).toBe(true);
		});
	});
});
