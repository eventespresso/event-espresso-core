import { formatISO } from 'date-fns';

import nextActiveUpcomingOnly from './index';
import { nodes as datetimes } from '../../../../../../eventEditor/services/apollo/queries/datetimes/test/data';

const datetime = datetimes[1];
const theFuture = formatISO(new Date(2987, 1 /* Feb */, 11));

describe('nextActiveUpcomingOnly', () => {
	it('Should return empty array if dates are not active, nor upcoming', () => {
		const filteredDates = nextActiveUpcomingOnly([
			{ ...datetime, id: 'abc', isActive: false, isUpcoming: false },
			{ ...datetime, id: 'def', isActive: false, isUpcoming: false },
		]);

		expect(filteredDates).toEqual([]);
	});

	it('Should return an array of nextActiveUpcomingOnly date', () => {
		const filteredDates = nextActiveUpcomingOnly([
			{ ...datetime, id: 'abc', isActive: false, isUpcoming: false },
			{
				...datetime,
				id: 'def',
				isActive: false,
				isUpcoming: true,
				startDate: theFuture,
			},
			{ ...datetime, id: 'xyz', isActive: false, isUpcoming: false },
		]);

		expect(filteredDates.length).toBe(1);
		expect(filteredDates[0].id).toBe('def');
	});

	it('Should return an array of nextActiveUpcomingOnly dates', () => {
		const filteredDates = nextActiveUpcomingOnly([
			{ ...datetime, id: 'abc', isActive: false, isUpcoming: false },
			{
				...datetime,
				id: 'def',
				isActive: false,
				isUpcoming: true,
				startDate: theFuture,
			},
			{ ...datetime, id: 'xyz', isActive: false, isUpcoming: false },
		]);

		expect(filteredDates.length).toBe(1);
		expect(filteredDates[0].id).toBe('def');
	});
});
