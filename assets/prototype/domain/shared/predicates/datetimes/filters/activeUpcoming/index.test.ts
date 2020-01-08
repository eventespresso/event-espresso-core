import dates from '../tests/data';
import activeUpcoming from '.';

describe('activeUpcoming', () => {
	it('Should return an array of dates which are active OR upcoming', () => {
		const filteredDates = activeUpcoming(dates);

		filteredDates.forEach((date) => {
			expect(date.isActive || date.isUpcoming).toBe(true);
		});
	});

	it('Should return empty array if there are no active dates', () => {});
});
