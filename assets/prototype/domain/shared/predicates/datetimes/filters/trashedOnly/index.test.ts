/**
 * Internal dependencies
 */
import trashedOnly from './index';

describe('trashedOnly', () => {
	it('Should return empty array if dates are not active, nor upcoming', () => {
		const filteredDates = trashedOnly([
			{ id: 'abc' },
			{ id: 'def', isDeleted: false },
			{ id: 'xyz', isDeleted: false },
		]);

		expect(Array.isArray(filteredDates)).toBe(true);
		expect(filteredDates.length).toBe(0);
	});

	it('Should return an array of trashedOnly dates', () => {
		const filteredDates = trashedOnly([
			{ id: 'abc', isDeleted: true },
			{ id: 'def', isDeleted: false },
			{ id: 'xyz', isDeleted: true },
		]);

		expect(Array.isArray(filteredDates)).toBe(true);
		expect(filteredDates.length).toBe(2);
		expect(filteredDates[0].id).toBe('abc');
		expect(filteredDates[1].id).toBe('xyz');
	});
});
