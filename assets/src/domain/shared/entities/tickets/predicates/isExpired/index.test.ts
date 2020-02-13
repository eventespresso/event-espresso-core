import { formatISO } from 'date-fns';
import { add, sub } from '../../../../../../application/services/utilities/date';

import isExpired from './index';
import { nodes as tickets } from '../../../../../eventEditor/services/apollo/queries/tickets/test/data';

describe('isExpired', () => {
	it('should return false if null or undefined is passed', () => {
		[null, undefined].forEach((value) => {
			expect(isExpired({ ticket: value })).toBe(false);
		});
	});
	it('should return false if ticket is trashed', () => {
		tickets.forEach((ticket) => {
			const newTicket = { ...ticket, isTrashed: true };
			expect(isExpired({ ticket: newTicket })).toBe(false);
		});
	});

	it('should return true if ticket is not trashed and end date is in the past', () => {
		tickets.forEach((ticket) => {
			const endDate = formatISO(sub('weeks', new Date(), 1));
			const newTicket = { ...ticket, endDate, isTrashed: false };
			expect(isExpired({ ticket: newTicket })).toBe(true);
		});
	});

	it('should return false if ticket is not trashed and end date is in the future', () => {
		tickets.forEach((ticket) => {
			const endDate = formatISO(add('weeks', new Date(), 1));
			const newTicket = { ...ticket, endDate, isTrashed: false };
			expect(isExpired({ ticket: newTicket })).toBe(false);
		});
	});

	it('should return true if ticket is trashed, includeTrashed prop is set to true and end date is in the past', () => {
		tickets.forEach((ticket) => {
			const endDate = formatISO(sub('weeks', new Date(), 1));
			const newTicket = { ...ticket, endDate, isTrashed: true };
			expect(isExpired({ ticket: newTicket, includeTrashed: true })).toBe(true);
		});
	});

	it('should return false if ticket is trashed, includeTrashed prop is set to true and end date is in the future', () => {
		tickets.forEach((ticket) => {
			const endDate = formatISO(add('weeks', new Date(), 1));
			const newTicket = { ...ticket, endDate, isTrashed: true };
			expect(isExpired({ ticket: newTicket, includeTrashed: true })).toBe(false);
		});
	});
});
