/**
 * Internal dependencies
 */
import upcomingOnly from './index';

describe('upcomingOnly', () => {
	it('Should return empty array if dates are not upcoming', () => {
		const filteredDates = upcomingOnly([
			{ id: 'abc', isUpcoming: false },
			{ id: 'def', isUpcoming: false },
			{ id: 'xyz', isUpcoming: false },
		]);

		expect(Array.isArray(filteredDates)).toBe(true);
		expect(filteredDates.length).toBe(0);
	});

	it('Should return an array of upcomingOnly dates', () => {
		const filteredDates = upcomingOnly([
			{ id: 'abc', isUpcoming: false },
			{ id: 'def', isUpcoming: true },
			{ id: 'xyz', isUpcoming: true },
		]);

		expect(Array.isArray(filteredDates)).toBe(true);
		expect(filteredDates.length).toBe(2);
		expect(filteredDates[0].id).toBe('def');
		expect(filteredDates[1].id).toBe('xyz');
	});
});
