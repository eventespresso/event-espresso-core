/**
 * Internal dependencies
 */
import nextActiveUpcomingOnly from './index';

describe('nextActiveUpcomingOnly', () => {
	it('Should return empty array if dates are not active, nor upcoming', () => {
		const filteredDates = nextActiveUpcomingOnly([
			{ id: 'abc', isActive: false },
			{ id: 'def', isUpcoming: false },
		]);

		expect(filteredDates).toEqual([]);
	});

	it('Should return an array of nextActiveUpcomingOnly date', () => {
		const filteredDates = nextActiveUpcomingOnly([
			{ id: 'abc', isActive: false },
			{ id: 'def', isUpcoming: true },
			{ id: 'xyz', isUpcoming: false },
		]);

		expect(filteredDates.length).toBe(1);
		expect(filteredDates[0].id).toBe('def');
	});

	it('Should return an array of nextActiveUpcomingOnly date', () => {
		const filteredDates = nextActiveUpcomingOnly([
			{ id: 'abc', isActive: true },
			{ id: 'def', isUpcoming: true },
			{ id: 'xyz', isUpcoming: false },
		]);

		expect(filteredDates.length).toBe(1);
		expect(filteredDates[0].id).toBe('abc');
	});
});
