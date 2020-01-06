import dates from '../tests/data';
import activeUpcoming from '.';

describe.only('activeUpcoming', () => {
	it('Should return an array of dates which are active OR upcoming', () => {
		const filteredDates = activeUpcoming(dates);

		expect(Array.isArray(filteredDates)).toBe(true);
		filteredDates.forEach((date) => {
			expect(date.isActive || date.isUpcoming).toBe(true);
		});
	});

	it('Should return empty array if there are no active dates', () => {});
});
