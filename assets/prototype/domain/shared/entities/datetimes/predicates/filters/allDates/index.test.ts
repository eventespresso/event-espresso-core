import dates from '../tests/data';
import allDates from './index';
import { nodes as datetimes } from '../../../../../../eventEditor/data/queries/datetimes/test/data';

const datetime = datetimes[0];

describe('allDates', () => {
	it('Should return an array with active-only dates', () => {
		const filteredDates = allDates(dates);

		filteredDates.forEach((date) => {
			// Since in Datetime this is set as optional, we need to check first is this is defined first
			if (date.isTrashed !== undefined) {
				expect(date.isTrashed).toBe(false);
			}
		});
	});

	it('Should return empty array if there are no active dates', () => {
		const filteredDates = allDates([
			{ ...datetime, id: 'abc', isTrashed: true },
			{ ...datetime, id: 'def', isTrashed: true },
		]);

		expect(filteredDates).toEqual([]);
	});
});
