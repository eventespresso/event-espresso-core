import dates from '../tests/data';
import allDates from './index';

describe('allDates', () => {
	it('Should return an array with active-only dates', () => {
		const filteredDates = allDates(dates);

		filteredDates.forEach((date) => {
			// Since in Datetime this is set as optional, we need to check first is this is defined first
			if (date.isDeleted !== undefined) {
				expect(date.isDeleted).toBe(false);
			}
		});
	});

	it('Should return empty array if there are no active dates', () => {
		const filteredDates = allDates([
			{ id: 'abc', isDeleted: true },
			{ id: 'def', isDeleted: true },
		]);

		expect(filteredDates).toEqual([]);
	});
});
