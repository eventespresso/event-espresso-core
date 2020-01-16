/**
 * Internal dependencies
 */
import { formatISO, subWeeks } from 'date-fns';
import { nodes as datetimes } from '../../../../../eventEditor/data/queries/datetimes/test/data';

const datetime = datetimes[0];

/**
 * Internal dependencies
 */
import recentlyExpiredOnly from './index';

describe('recentlyExpiredOnly', () => {
	it('Should return empty array if dates are not recently being expired', () => {
		const filteredDates = recentlyExpiredOnly([
			{ ...datetime, id: 'abc', endDate: '2009-12-18T11:31:00+00:00' },
			{ ...datetime, id: 'def', endDate: '2000-12-18T11:31:00+00:00' },
		]);

		expect(filteredDates).toEqual([]);
	});

	it('Should return an array of recentlyExpiredOnly dates', () => {
		const filteredDates = recentlyExpiredOnly([
			{ ...datetime, id: 'abc', endDate: formatISO(subWeeks(new Date(), 3)) },
			{ ...datetime, id: 'def', endDate: formatISO(subWeeks(new Date(), 4)) },
			{ ...datetime, id: 'xyz', endDate: formatISO(subWeeks(new Date(), 5)) },
		]);

		expect(filteredDates.length).toBe(2);
		expect(filteredDates[0].id).toBe('abc');
		expect(filteredDates[1].id).toBe('def');
	});
});
