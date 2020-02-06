import { nodes as dates } from '../../../../../../eventEditor/services/apollo/queries/datetimes/test/data';
import activeOnly from './index';
import { nodes as datetimes } from '../../../../../../eventEditor/services/apollo/queries/datetimes/test/data';

const datetime = datetimes[0];

describe('activeOnly', () => {
	it('Should return an array with active-only dates', () => {
		const filteredDates = activeOnly(dates);

		filteredDates.forEach((date) => {
			expect(date.isActive).toBe(true);
		});
	});

	it('Should return empty array if there are no active dates', () => {
		const filteredDates = activeOnly([
			{ ...datetime, id: 'abc', isActive: false },
			{ ...datetime, id: 'def', isActive: false },
		]);

		expect(filteredDates).toEqual([]);
	});
});
