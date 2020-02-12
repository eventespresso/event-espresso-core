import isValidOrTrashed from './index';
import { nodes as tickets } from '../../../../../eventEditor/services/apollo/queries/tickets/test/data';

describe('isValidOrTrashed', () => {
	it('should return false if ticket is trashed', () => {
		tickets.forEach((ticket) => {
			const newTicket = { ...ticket, isTrashed: true };
			expect(isValidOrTrashed({ ticket: newTicket })).toEqual(false);
		});
	});

	it('should return false if ticket is trashed and includeTrashed is false', () => {
		tickets.forEach((ticket) => {
			const newTicket = { ...ticket, isTrashed: true };
			expect(isValidOrTrashed({ ticket: newTicket, includeTrashed: false })).toEqual(false);
		});
	});

	it('should return true if ticket is trashed and includeTrashed is true', () => {
		tickets.forEach((ticket) => {
			const newTicket = { ...ticket, isTrashed: true };
			expect(isValidOrTrashed({ ticket: newTicket, includeTrashed: true })).toEqual(true);
		});
	});

	it('should return true if ticket is not trashed', () => {
		tickets.forEach((ticket) => {
			const newTicket = { ...ticket, isTrashed: false };
			expect(isValidOrTrashed({ ticket: newTicket })).toEqual(true);
		});
	});

	it('should return true if ticket is not trashed and includeTrashed is false', () => {
		tickets.forEach((ticket) => {
			const newTicket = { ...ticket, isTrashed: false };
			expect(isValidOrTrashed({ ticket: newTicket, includeTrashed: false })).toEqual(true);
		});
	});

	it('should return true if ticket is not trashed and includeTrashed is true', () => {
		tickets.forEach((ticket) => {
			const newTicket = { ...ticket, isTrashed: false };
			expect(isValidOrTrashed({ ticket: newTicket, includeTrashed: true })).toEqual(true);
		});
	});
});
