/**
 * Internal dependencies
 */
import expiredOnly from './index';

describe('expiredOnly', () => {
	it('Should return empty array if dates are not expired', () => {
		const filteredDates = expiredOnly([
			{ id: 'abc', isExpired: false },
			{ id: 'def', isExpired: false },
		]);

		expect(filteredDates).toEqual([]);
	});

	it('Should return an array of dates that are expired', () => {
		const filteredDates = expiredOnly([
			{ id: 'abc', isExpired: false },
			{ id: 'def', isExpired: false },
			{ id: 'xyz', isExpired: true },
		]);

		expect(filteredDates.length).toBe(1);
		expect(filteredDates[0].id).toBe('xyz');
	});

	it('Should return an array of dates that are expired and not trashed', () => {
		const filteredDates = expiredOnly([
			{ id: 'abc', isExpired: false, isDeleted: true },
			{ id: 'def', isExpired: true, isDeleted: false },
			{ id: 'xyz', isExpired: true, isDeleted: true },
		]);

		expect(filteredDates.length).toBe(1);
		expect(filteredDates[0].id).toBe('def');
	});
});
