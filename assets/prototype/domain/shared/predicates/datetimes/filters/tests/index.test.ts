import dates from '../tests/data';
import activeOnly from '../activeOnly';
import activeUpcoming from '../activeUpcoming';

describe('activeOnly', () => {
	it('Should return an array with active-only dates', () => {
		const filteredDates = activeOnly(dates);

		expect(Array.isArray(filteredDates)).toBe(true);
		filteredDates.forEach((date) => {
			expect(date.isActive).toBe(true);
		});
	});

	it('Should return empty array if there are no active dates', () => {
		const filteredDates = activeOnly([
			{ id: 'abc', isActive: false },
			{ id: 'def', isActive: false },
		]);

		expect(Array.isArray(filteredDates)).toBe(true);
		expect(filteredDates.length).toBe(0);
	});
});

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
