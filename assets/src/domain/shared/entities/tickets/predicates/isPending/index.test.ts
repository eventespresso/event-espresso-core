import { formatISO } from 'date-fns';
import { add, sub } from '../../../../../../application/services/utilities/date';

import isPending from './index';
import { nodes as tickets } from '../../../../../eventEditor/services/apollo/queries/tickets/test/data';

describe('isPending', () => {
	it('should return false if ticket start date is in the past', () => {
		tickets.forEach((ticket) => {
			const startDate = formatISO(sub('weeks', new Date(), 1));
			const newTicket = { ...ticket, startDate };
			expect(isPending(newTicket)).toEqual(false);
		});
	});

	it('should return true if ticket start date is in the future', () => {
		tickets.forEach((ticket) => {
			const startDate = formatISO(add('weeks', new Date(), 1));
			const newTicket = { ...ticket, startDate };
			expect(isPending(newTicket)).toEqual(true);
		});
	});
});
