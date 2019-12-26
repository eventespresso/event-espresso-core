import { act, renderHook } from '@testing-library/react-hooks';
import * as R from 'ramda';
import { Datetime } from '../../../data/types';
import { DatesSortedBy, DisplayDates, ShowDates } from '../../../data/date/types';

import useDatesListFilterState from './useDatesListFilterState';

const datetimes: Datetime[] = [
	{
		id: 'RGF0ZXRpbWU6ODM=',
		dbId: 83,
		capacity: -1,
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
		sold: 0,
		startDate: '2020-01-12T08:00:00+00:00',
		__typename: 'EspressoDatetime',
	},
	{
		id: 'RGF0ZXRpbWU6ODU=',
		dbId: 85,
		capacity: -1,
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
		sold: 0,
		startDate: '2019-12-18T11:31:00+00:00',
		__typename: 'EspressoDatetime',
	},
	{
		id: 'RGF0ZXRpbWU6ODU=',
		dbId: 85,
		capacity: -1,
		description: 'test desc',
		endDate: '2019-12-18T11:31:00+00:00',
		isActive: false,
		isExpired: true,
		isPrimary: false,
		isSoldOut: false,
		isUpcoming: false,
		length: 0,
		name: 'another title',
		order: -1,
		reserved: 0,
		sold: 0,
		startDate: '2009-12-18T11:31:00+00:00',
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
	const expectedstartDates = ['2009-12-18T11:31:00+00:00', '2019-12-18T11:31:00+00:00', '2020-01-12T08:00:00+00:00'];
	expect(startDates).toEqual(expectedstartDates);

	act(() => {
		result.current.setDatesSortedBy(DatesSortedBy['by-id']);
	});
	const ids = R.map(R.view(R.lensProp('id')))(result.current.processedDates);
	const expectedIds = ['RGF0ZXRpbWU6ODM=', 'RGF0ZXRpbWU6ODU=', 'RGF0ZXRpbWU6ODU='];
	expect(ids).toEqual(expectedIds);

	act(() => {
		result.current.setDatesSortedBy(DatesSortedBy['by-name']);
	});
	const names = R.map(R.view(R.lensProp('name')))(result.current.processedDates);
	const expectedNames = ['another title', 'just another datetime', 'test'];
	expect(names).toEqual(expectedNames);

	act(() => {
		result.current.setDatesSortedBy(DatesSortedBy['by-order']);
	});
	const datesOrder = R.map(R.view(R.lensProp('order')))(result.current.processedDates);
	const expectedDatesOrder = [-2, -1, 1];
	expect(datesOrder).toEqual(expectedDatesOrder);
});
