import { act, renderHook } from '@testing-library/react-hooks';
import * as R from 'ramda';

import { sub } from '../../../../../../../application/services/utilities/date';
import { formatISO } from 'date-fns';
import { Datetime } from '../../../../../services/apollo/types';
import { DatesSorted, ShowDates } from '../../../../../interfaces/datetimes/types';
import { DisplayDates } from '@edtrInterfaces/types';
import { DatetimeStatus } from '../../../../../services/apollo/types';

import useDatesListFilterState from './index';

const datetimes: Datetime[] = [
	{
		id: 'WGF0ZXRpbWU6ODM=',
		dbId: 83,
		capacity: 10,
		description: '',
		endDate: '2000-01-12T17:00:00+00:00',
		isActive: true,
		isExpired: false,
		isPrimary: false,
		isSoldOut: false,
		isTrashed: true,
		isUpcoming: true,
		length: 32400,
		name: 'test',
		order: 1,
		reserved: 0,
		sold: 10,
		status: DatetimeStatus.active,
		startDate: '2000-01-12T08:00:00+00:00',
		__typename: 'EspressoDatetime',
	},
	{
		id: 'RGF0ZXRpbWU6ODM=',
		dbId: 85,
		capacity: 10,
		description: '',
		endDate: '2020-01-12T17:00:00+00:00',
		isActive: false,
		isExpired: false,
		isPrimary: false,
		isSoldOut: false,
		isTrashed: false,
		isUpcoming: true,
		length: 32400,
		name: 'test',
		order: 1,
		reserved: 0,
		sold: 10,
		status: DatetimeStatus.upcoming,
		startDate: '2020-01-12T08:00:00+00:00',
		__typename: 'EspressoDatetime',
	},
	{
		id: 'RGF0ZXRpbWU6ODU=',
		dbId: 87,
		capacity: 20,
		description: 'test desc',
		endDate: '2019-12-18T11:31:00+00:00',
		isActive: false,
		isExpired: true,
		isPrimary: false,
		isSoldOut: false,
		isTrashed: false,
		isUpcoming: false,
		length: 0,
		name: 'just another datetime',
		order: -2,
		reserved: 0,
		sold: 20,
		startDate: '2019-12-18T11:31:00+00:00',
		status: DatetimeStatus.active,
		__typename: 'EspressoDatetime',
	},
	{
		id: 'RGF0ZXRpbWU6ODU=',
		dbId: 89,
		capacity: 100,
		description: 'test desc',
		endDate: '2019-12-18T11:31:00+00:00',
		isActive: true,
		isExpired: true,
		isPrimary: false,
		isSoldOut: true,
		isTrashed: false,
		isUpcoming: false,
		length: 0,
		name: 'another title',
		order: -1,
		reserved: 0,
		sold: 76,
		startDate: '2009-12-18T11:31:00+00:00',
		status: DatetimeStatus.active,
		__typename: 'EspressoDatetime',
	},
];

describe('useDatesListFilterState', () => {
	test('useDatesListFilterState result', () => {
		const { result } = renderHook(() => useDatesListFilterState(datetimes));

		expect(Object.keys(result.current).length).toBe(8);

		expect(result.current.dates).toEqual(expect.arrayContaining(datetimes));
		expect(typeof result.current.datesSortedBy).toBe('string');
		expect(typeof result.current.displayDates).toBe('string');

		expect(typeof result.current.setDatesSortedBy).toBe('function');
		expect(typeof result.current.setDisplayDates).toBe('function');
		expect(typeof result.current.setShowDates).toBe('function');
	});

	test('should update datesSortedBy by invoking setDatesSortedBy with corresponding accepted enums', () => {
		const { result } = renderHook(() => useDatesListFilterState(datetimes));

		act(() => {
			result.current.setDatesSortedBy(DatesSorted.byName);
		});
		expect(result.current.datesSortedBy).toBe('byName');

		act(() => {
			result.current.setDatesSortedBy(DatesSorted.byId);
		});
		expect(result.current.datesSortedBy).toBe('byId');

		act(() => {
			result.current.setDatesSortedBy(DatesSorted.byOrder);
		});
		expect(result.current.datesSortedBy).toBe('byOrder');

		act(() => {
			result.current.setDatesSortedBy(DatesSorted.chronologically);
		});
		expect(result.current.datesSortedBy).toBe('chronologically');
	});

	test('should update displayDates by invoking setDisplayDates with corresponding accepted enums', () => {
		const { result } = renderHook(() => useDatesListFilterState(datetimes));

		act(() => {
			result.current.setDisplayDates(DisplayDates.start);
		});
		expect(result.current.displayDates).toBe('start');

		act(() => {
			result.current.setDisplayDates(DisplayDates.end);
		});
		expect(result.current.displayDates).toBe('end');

		act(() => {
			result.current.setDisplayDates(DisplayDates.both);
		});
		expect(result.current.displayDates).toBe('both');
	});

	test('should update showDates by invoking setShowDates with corresponding accepted enums', () => {
		const { result } = renderHook(() => useDatesListFilterState(datetimes));

		act(() => {
			result.current.setShowDates(ShowDates.all);
		});
		expect(result.current.showDates).toBe('all');

		act(() => {
			result.current.setShowDates(ShowDates.upcomingOnly);
		});
		expect(result.current.showDates).toBe('upcomingOnly');
	});

	test('should update filteredEntities to reflect changes made by invoking setDatesSortedBy', () => {
		const { result } = renderHook(() => useDatesListFilterState(datetimes));

		act(() => {
			result.current.setDatesSortedBy(DatesSorted.chronologically);
		});
		const startDates = R.map(R.view(R.lensProp('startDate')))(result.current.filteredEntities);
		const expectedstartDates = [
			'2000-01-12T08:00:00+00:00',
			'2009-12-18T11:31:00+00:00',
			'2019-12-18T11:31:00+00:00',
			'2020-01-12T08:00:00+00:00',
		];
		expect(startDates).toEqual(expectedstartDates);

		act(() => {
			result.current.setDatesSortedBy(DatesSorted.byId);
		});
		const ids = R.map(R.view(R.lensProp('id')))(result.current.filteredEntities);
		const expectedIds = ['RGF0ZXRpbWU6ODM=', 'RGF0ZXRpbWU6ODU=', 'RGF0ZXRpbWU6ODU=', 'WGF0ZXRpbWU6ODM='];
		expect(ids).toEqual(expectedIds);

		act(() => {
			result.current.setDatesSortedBy(DatesSorted.byName);
		});
		const names = R.map(R.view(R.lensProp('name')))(result.current.filteredEntities);
		const expectedNames = ['another title', 'just another datetime', 'test', 'test'];
		expect(names).toEqual(expectedNames);

		act(() => {
			result.current.setDatesSortedBy(DatesSorted.byOrder);
		});
		const datesOrder = R.map(R.view(R.lensProp('order')))(result.current.filteredEntities);
		const expectedDatesOrder = [-2, -1, 1, 1];
		expect(datesOrder).toEqual(expectedDatesOrder);
	});

	test('should update filteredEntities to reflect changes made by invoking setShowDates with upcomingOnly filter', () => {
		const { result } = renderHook(() => useDatesListFilterState(datetimes));

		act(() => {
			result.current.setShowDates(ShowDates.upcomingOnly);
		});
		const dates = result.current.filteredEntities;

		expect(dates.length).toBe(2);
		expect(dates[0].isUpcoming).toBe(true);
		expect(dates[1].isUpcoming).toBe(true);
	});

	test('should update filteredEntities to reflect changes made by invoking setShowDates with expiredOnly filter', () => {
		const { result } = renderHook(() => useDatesListFilterState(datetimes));

		act(() => {
			result.current.setShowDates(ShowDates.expiredOnly);
		});
		const dates = result.current.filteredEntities;

		expect(dates.length).toBe(4);
	});

	test('should update filteredEntities to reflect changes made by invoking setShowDates with trashedOnly filter', () => {
		const { result } = renderHook(() => useDatesListFilterState(datetimes));

		act(() => {
			result.current.setShowDates(ShowDates.trashedOnly);
		});
		const dates = result.current.filteredEntities;

		expect(dates.length).toBe(1);
		expect(dates[0].isTrashed).toBe(true);
	});

	test('should update filteredEntities to reflect changes made by invoking setShowDates with recentlyExpiredOnly filter', () => {
		const rawDates = [
			{
				...datetimes[1],
				id: 'WGF0ZXRpbWU6ODM=',
				endDate: sub('weeks', new Date(), 1),
			},
			{
				...datetimes[1],
				id: 'RGF0ZXRpbWU6ODM=',
				endDate: sub('weeks', new Date(), 3),
			},
			{
				...datetimes[1],
				id: 'RGF0ZXRpbWU6ODM=',
				endDate: sub('weeks', new Date(), 6),
			},
			{
				...datetimes[1],
				id: 'RGF0ZXRpbWU6ODM=',
				endDate: sub('weeks', new Date(), 8),
			},
		];

		const dates: Datetime[] = rawDates.map((date) => ({ ...date, endDate: formatISO(date.endDate) }));

		const { result } = renderHook(() => useDatesListFilterState(dates));

		act(() => {
			result.current.setShowDates(ShowDates.recentlyExpiredOnly);
		});
		const resultDates = result.current.filteredEntities;

		expect(resultDates.length).toBe(2);
	});
});
