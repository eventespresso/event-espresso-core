import { act, renderHook } from '@testing-library/react-hooks';
import * as R from 'ramda';
import { formatISO, subWeeks } from 'date-fns';
import { Datetime } from '../../../data/types';
import { DatesSortedBy, DisplayDates, ShowDates } from '../../../data/date/types';

import useDatesListFilterState from './useDatesListFilterState';

const datetimes: Datetime[] = [
	{
		id: 'WGF0ZXRpbWU6ODM=',
		dbId: 83,
		capacity: 10,
		description: '',
		endDate: '2000-01-12T17:00:00+00:00',
		isActive: true,
		isDeleted: true,
		isExpired: false,
		isPrimary: false,
		isSoldOut: false,
		isUpcoming: true,
		length: 32400,
		name: 'test',
		order: 1,
		reserved: 0,
		sold: 10,
		startDate: '2000-01-12T08:00:00+00:00',
		__typename: 'EspressoDatetime',
	},
	{
		id: 'RGF0ZXRpbWU6ODM=',
		dbId: 83,
		capacity: 10,
		description: '',
		endDate: '2020-01-12T17:00:00+00:00',
		isActive: false,
		isExpired: false,
		isPrimary: false,
		isSoldOut: false,
		isUpcoming: true,
		length: 32400,
		name: 'test',
		order: 1,
		reserved: 0,
		sold: 10,
		startDate: '2020-01-12T08:00:00+00:00',
		__typename: 'EspressoDatetime',
	},
	{
		id: 'RGF0ZXRpbWU6ODU=',
		dbId: 85,
		capacity: 20,
		description: 'test desc',
		endDate: '2019-12-18T11:31:00+00:00',
		isActive: false,
		isExpired: true,
		isPrimary: false,
		isSoldOut: false,
		isUpcoming: false,
		length: 0,
		name: 'just another datetime',
		order: -2,
		reserved: 0,
		sold: 20,
		startDate: '2019-12-18T11:31:00+00:00',
		status: 'ACTIVE',
		__typename: 'EspressoDatetime',
	},
	{
		id: 'RGF0ZXRpbWU6ODU=',
		dbId: 87,
		capacity: 100,
		description: 'test desc',
		endDate: '2019-12-18T11:31:00+00:00',
		isActive: true,
		isExpired: true,
		isPrimary: false,
		isSoldOut: true,
		isUpcoming: false,
		length: 0,
		name: 'another title',
		order: -1,
		reserved: 0,
		sold: 76,
		startDate: '2009-12-18T11:31:00+00:00',
		status: 'ACTIVE',
		__typename: 'EspressoDatetime',
	},
];

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
		result.current.setDatesSortedBy(DatesSortedBy['by-name']);
	});
	expect(result.current.datesSortedBy).toBe('by-name');

	act(() => {
		result.current.setDatesSortedBy(DatesSortedBy['by-id']);
	});
	expect(result.current.datesSortedBy).toBe('by-id');

	act(() => {
		result.current.setDatesSortedBy(DatesSortedBy['by-order']);
	});
	expect(result.current.datesSortedBy).toBe('by-order');

	act(() => {
		result.current.setDatesSortedBy(DatesSortedBy.chronologically);
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
		result.current.setShowDates(ShowDates['upcoming-only']);
	});
	expect(result.current.showDates).toBe('upcoming-only');
});

test('should update processedDates to reflect changes made by invoking setDatesSortedBy', () => {
	const { result } = renderHook(() => useDatesListFilterState(datetimes));

	act(() => {
		result.current.setDatesSortedBy(DatesSortedBy.chronologically);
	});
	const startDates = R.map(R.view(R.lensProp('startDate')))(result.current.processedDates);
	const expectedstartDates = [
		'2000-01-12T08:00:00+00:00',
		'2009-12-18T11:31:00+00:00',
		'2019-12-18T11:31:00+00:00',
		'2020-01-12T08:00:00+00:00',
	];
	expect(startDates).toEqual(expectedstartDates);

	act(() => {
		result.current.setDatesSortedBy(DatesSortedBy['by-id']);
	});
	const ids = R.map(R.view(R.lensProp('id')))(result.current.processedDates);
	const expectedIds = ['RGF0ZXRpbWU6ODM=', 'RGF0ZXRpbWU6ODU=', 'RGF0ZXRpbWU6ODU=', 'WGF0ZXRpbWU6ODM='];
	expect(ids).toEqual(expectedIds);

	act(() => {
		result.current.setDatesSortedBy(DatesSortedBy['by-name']);
	});
	const names = R.map(R.view(R.lensProp('name')))(result.current.processedDates);
	const expectedNames = ['another title', 'just another datetime', 'test', 'test'];
	expect(names).toEqual(expectedNames);

	act(() => {
		result.current.setDatesSortedBy(DatesSortedBy['by-order']);
	});
	const datesOrder = R.map(R.view(R.lensProp('order')))(result.current.processedDates);
	const expectedDatesOrder = [-2, -1, 1, 1];
	expect(datesOrder).toEqual(expectedDatesOrder);
});

test('should update processedDates to reflect changes made by invoking setShowDates with active-only filter', () => {
	const { result } = renderHook(() => useDatesListFilterState(datetimes));

	act(() => {
		result.current.setShowDates(ShowDates['active-only']);
	});
	const dates = result.current.processedDates;

	expect(dates.length).toBe(2);
	expect(dates[0].isActive).toBe(true);
	expect(dates[1].isActive).toBe(true);
});

test('should update processedDates to reflect changes made by invoking setShowDates with active-upcoming filter', () => {
	const { result } = renderHook(() => useDatesListFilterState(datetimes));

	act(() => {
		result.current.setShowDates(ShowDates['active-upcoming']);
	});
	const dates = result.current.processedDates;

	expect(dates.length).toBe(3);
	expect(dates[0].isActive).toBe(true);
	expect(dates[0].isUpcoming).toBe(true);
	expect(dates[1].isActive).toBe(true);
	expect(dates[1].isUpcoming).toBe(false);
	expect(dates[2].isActive).toBe(false);
	expect(dates[2].isUpcoming).toBe(true);
});

test('should update processedDates to reflect changes made by invoking setShowDates with upcoming-only filter', () => {
	const { result } = renderHook(() => useDatesListFilterState(datetimes));

	act(() => {
		result.current.setShowDates(ShowDates['upcoming-only']);
	});
	const dates = result.current.processedDates;

	expect(dates.length).toBe(2);
	expect(dates[0].isUpcoming).toBe(true);
	expect(dates[1].isUpcoming).toBe(true);
});

test('should update processedDates to reflect changes made by invoking setShowDates with next-active-upcoming-only filter', () => {
	const { result } = renderHook(() => useDatesListFilterState(datetimes));

	act(() => {
		result.current.setShowDates(ShowDates['next-active-upcoming-only']);
	});
	const dates = result.current.processedDates;

	expect(dates.length).toBe(1);
	expect(dates[0].isActive).toBe(true);
	expect(dates[0].isUpcoming).toBe(true);
});

test('should update processedDates to reflect changes made by invoking setShowDates with sold-out-only filter', () => {
	const { result } = renderHook(() => useDatesListFilterState(datetimes));

	act(() => {
		result.current.setShowDates(ShowDates['sold-out-only']);
	});
	const dates = result.current.processedDates;

	expect(dates.length).toBe(2);
	expect(dates[0].isSoldOut).toBe(true);
	expect(dates[1].capacity).toBe(20);
	expect(dates[1].sold).toBe(20);
});

test('should update processedDates to reflect changes made by invoking setShowDates with expired-only filter', () => {
	const { result } = renderHook(() => useDatesListFilterState(datetimes));

	act(() => {
		result.current.setShowDates(ShowDates['expired-only']);
	});
	const dates = result.current.processedDates;

	expect(dates.length).toBe(2);
	expect(dates[0].isExpired).toBe(true);
	expect(dates[1].isExpired).toBe(true);
});

test('should update processedDates to reflect changes made by invoking setShowDates with recently-expired-only filter', () => {
	const rawDates = [
		{
			id: 'WGF0ZXRpbWU6ODM=',
			endDate: subWeeks(new Date(), 1),
		},
		{
			id: 'RGF0ZXRpbWU6ODM=',
			endDate: subWeeks(new Date(), 3),
		},
		{
			id: 'RGF0ZXRpbWU6ODM=',
			endDate: subWeeks(new Date(), 6),
		},
		{
			id: 'RGF0ZXRpbWU6ODM=',
			endDate: subWeeks(new Date(), 8),
		},
	];

	const dates: Datetime[] = rawDates.map((date) => ({ ...date, endDate: formatISO(date.endDate) }));

	const { result } = renderHook(() => useDatesListFilterState(dates));

	act(() => {
		result.current.setShowDates(ShowDates['recently-expired-only']);
	});
	const resultDates = result.current.processedDates;

	expect(resultDates.length).toBe(2);
});
