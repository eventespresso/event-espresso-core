import { formatISO } from 'date-fns';

import nextActiveUpcomingOnly from './index';
import { nodes as datetimes } from '../../../../../../eventEditor/services/apollo/queries/datetimes/test/data';

const datetime = datetimes[1];

describe('nextActiveUpcomingOnly', () => {
	it('Should return empty array if dates are not active, nor upcoming', () => {
		const filteredDates = nextActiveUpcomingOnly([
			{ ...datetime, id: 'abc', isActive: false },
			{ ...datetime, id: 'def', isUpcoming: false },
		]);

		expect(filteredDates).toEqual([]);
	});

	it('Should return an array of nextActiveUpcomingOnly date', () => {
		const filteredDates = nextActiveUpcomingOnly([
			{ ...datetime, id: 'abc', isActive: false },
			{ ...datetime, id: 'def', isUpcoming: true, startDate: formatISO(new Date(2987, 1 /* Feb */, 11)) },
			{ ...datetime, id: 'xyz', isUpcoming: false },
		]);

		expect(filteredDates.length).toBe(1);
		expect(filteredDates[0].id).toBe('def');
	});

	it('Should return an array of nextActiveUpcomingOnly dates', () => {
		const filteredDates = nextActiveUpcomingOnly([
			{ ...datetime, id: 'abc', isActive: true },
			{ ...datetime, id: 'def', isUpcoming: true, startDate: formatISO(new Date(2030, 1 /* Feb */, 11)) },
			{ ...datetime, id: 'xyz', isUpcoming: false },
		]);

		expect(filteredDates.length).toBe(1);
		expect(filteredDates[0].id).toBe('def');
	});
});
