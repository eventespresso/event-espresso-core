import dates from '../tests/data';
import activeOnly from './index';

describe('activeOnly', () => {
	it('Should return an array with active-only dates', () => {
		const filteredDates = activeOnly(dates);

		filteredDates.forEach((date) => {
			expect(date.isActive).toBe(true);
		});
	});

	it('Should return empty array if there are no active dates', () => {
		const filteredDates = activeOnly([
			{ id: 'abc', isActive: false },
			{ id: 'def', isActive: false },
		]);

		expect(filteredDates).toEqual([]);
	});
});
