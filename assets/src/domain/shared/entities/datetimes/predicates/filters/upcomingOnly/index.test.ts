/**
 * Internal dependencies
 */
import upcomingOnly from './index';
import { nodes as datetimes } from '../../../../../../eventEditor/services/apollo/queries/datetimes/test/data';

const datetime = datetimes[0];

describe('upcomingOnly', () => {
	it('Should return empty array if dates are not upcoming', () => {
		const filteredDates = upcomingOnly([
			{ ...datetime, id: 'abc', isUpcoming: false },
			{ ...datetime, id: 'def', isUpcoming: false },
			{ ...datetime, id: 'xyz', isUpcoming: false },
		]);

		expect(filteredDates).toEqual([]);
	});

	it('Should return an array of upcomingOnly dates', () => {
		const filteredDates = upcomingOnly([
			{ ...datetime, id: 'abc', isUpcoming: false },
			{ ...datetime, id: 'def', isUpcoming: true },
			{ ...datetime, id: 'xyz', isUpcoming: true },
		]);

		expect(filteredDates.length).toBe(2);
		expect(filteredDates[0].id).toBe('def');
		expect(filteredDates[1].id).toBe('xyz');
	});
});
