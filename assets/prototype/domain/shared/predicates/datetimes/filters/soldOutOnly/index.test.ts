/**
 * Internal dependencies
 */
import soldOutOnly from './index';

describe('soldOutOnly', () => {
	it('Should return empty array if dates are not active, nor upcoming', () => {
		const filteredDates = soldOutOnly([
			{ id: 'abc', isDeleted: true },
			{ id: 'def', isSoldOut: false },
			{ id: 'def', status: 'ACTIVE' },
		]);

		expect(filteredDates).toEqual([]);
	});

	it('Should return an array of soldOutOnly dates when isSoldOut is true and have a valid status', () => {
		const filteredDates = soldOutOnly([
			{ id: 'abc', isActive: false },
			{ id: 'def', isSoldOut: true, status: 'ACTIVE' },
			{ id: 'xyz', isSoldOut: true, status: 'WHATEVER' },
		]);

		expect(filteredDates.length).toBe(2);
		expect(filteredDates[0].id).toBe('def');
		expect(filteredDates[1].id).toBe('xyz');
	});

	it('Should return an array of soldOutOnly dates when capacity is equal to amount sold', () => {
		const filteredDates = soldOutOnly([
			{ id: 'abc', capacity: 2, sold: 2 },
			{ id: 'def', capacity: 20, sold: 10 },
			{ id: 'xyz', capacity: 100, sold: 100 },
		]);

		expect(filteredDates.length).toBe(2);
		expect(filteredDates[0].id).toBe('abc');
		expect(filteredDates[1].id).toBe('xyz');
	});
});
