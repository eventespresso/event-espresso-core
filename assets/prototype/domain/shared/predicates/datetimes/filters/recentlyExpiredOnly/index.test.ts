/**
 * Internal dependencies
 */
import { formatISO, subWeeks } from 'date-fns';

/**
 * Internal dependencies
 */
import recentlyExpiredOnly from './index';

describe('recentlyExpiredOnly', () => {
	it('Should return empty array if dates are not recently being expired', () => {
		const filteredDates = recentlyExpiredOnly([
			{ id: 'abc', endDate: '2009-12-18T11:31:00+00:00' },
			{ id: 'def', endDate: '2000-12-18T11:31:00+00:00' },
		]);

		expect(Array.isArray(filteredDates)).toBe(true);
		expect(filteredDates.length).toBe(0);
	});

	it('Should return an array of recentlyExpiredOnly dates', () => {
		const filteredDates = recentlyExpiredOnly([
			{ id: 'abc', endDate: formatISO(subWeeks(new Date(), 3)) },
			{ id: 'def', endDate: formatISO(subWeeks(new Date(), 4)) },
			{ id: 'xyz', endDate: formatISO(subWeeks(new Date(), 5)) },
		]);
		expect(Array.isArray(filteredDates)).toBe(true);
		expect(filteredDates.length).toBe(2);
		expect(filteredDates[0].id).toBe('abc');
		expect(filteredDates[1].id).toBe('def');
	});
});
