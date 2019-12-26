import { act, renderHook } from '@testing-library/react-hooks';
import { DatesSortedBy, DisplayDates, ShowDates } from './types';
import useDatesListFilterState from './useDatesListFilterState';

const datetimes = [
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
		order: 0,
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
		order: 0,
		reserved: 0,
		sold: 0,
		startDate: '2019-12-18T11:31:00+00:00',
		__typename: 'EspressoDatetime',
	},
];

test('useDatesListFilterState result', () => {
	const { result } = renderHook(() => useDatesListFilterState(datetimes));

	expect(Object.keys(result.current).length).toBe(7);

	expect(result.current.dates).toEqual(expect.arrayContaining(datetimes));
	expect(typeof result.current.datesSortedBy).toBe('string');
	expect(typeof result.current.displayDates).toBe('string');

	expect(typeof result.current.setDatesSortedBy).toBe('function');
	expect(typeof result.current.setDisplayDates).toBe('function');
	expect(typeof result.current.setShowDates).toBe('function');
});

test('should setDatesSortedBy', () => {
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
