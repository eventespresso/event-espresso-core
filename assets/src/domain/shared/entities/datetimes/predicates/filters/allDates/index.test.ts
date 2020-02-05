import dates from '../tests/data';
import allDates from './index';
import { nodes as datetimes } from '../../../../../../eventEditor/services/apollo/queries/datetimes/test/data';

const datetime = datetimes[0];

describe('allDates', () => {
	it('Should return an array with active-only dates', () => {
		const filteredDates = allDates(dates);

		filteredDates.forEach((date) => {
			expect(date.isTrashed).toBe(false);
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
