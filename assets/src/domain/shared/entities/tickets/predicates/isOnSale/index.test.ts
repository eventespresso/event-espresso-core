import { formatISO } from 'date-fns';
import { add, sub } from '../../../../../../application/services/utilities/date';

import isOnSale from './index';
import { nodes as tickets } from '../../../../../eventEditor/services/apollo/queries/tickets/test/data';

describe('isOnSale', () => {
	it('should return false if ticket start date is in the future', () => {
		tickets.forEach((ticket) => {
			const startDate = formatISO(add('weeks', new Date(), 1));
			const newTicket = { ...ticket, startDate };
			expect(isOnSale(newTicket)).toEqual(false);
		});
	});

	it('should return false if ticket start date is in the past and end date is also in the past', () => {
		tickets.forEach((ticket) => {
			const startDate = formatISO(sub('weeks', new Date(), 1));
			const endDate = formatISO(sub('weeks', new Date(), 1));
			const newTicket = { ...ticket, startDate, endDate };
			expect(isOnSale(newTicket)).toEqual(false);
		});
	});

	it('should return true if ticket start date is in the past and end date is in the future', () => {
		tickets.forEach((ticket) => {
			const startDate = formatISO(sub('weeks', new Date(), 1));
			const endDate = formatISO(add('weeks', new Date(), 1));
			const newTicket = { ...ticket, startDate, endDate };
			expect(isOnSale(newTicket)).toEqual(true);
		});
	});
});
