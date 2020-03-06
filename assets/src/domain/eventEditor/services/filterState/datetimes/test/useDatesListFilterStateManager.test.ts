import { act, renderHook } from '@testing-library/react-hooks';

import { DateToDisplay } from '@sharedServices/filterState';
import { useDatesListFilterStateManager } from '../';
import { DatetimesToShow } from '../types';

describe('useDatesListFilterStateManager', () => {
	test('useDatesListFilterStateManager result', () => {
		const { result } = renderHook(() => useDatesListFilterStateManager());

		expect(typeof result.current.sortBy).toBe('string');
		expect(typeof result.current.dateToDisplay).toBe('string');

		expect(typeof result.current.setSortBy).toBe('function');
		expect(typeof result.current.setDateToDisplay).toBe('function');
		expect(typeof result.current.setDatetimesToShow).toBe('function');
	});

	test('should update sortBy by invoking setSortBy with corresponding accepted enums', () => {
		const { result } = renderHook(() => useDatesListFilterStateManager());

		act(() => {
			result.current.setSortBy('name');
		});
		expect(result.current.sortBy).toBe('name');

		act(() => {
			result.current.setSortBy('id');
		});
		expect(result.current.sortBy).toBe('id');

		act(() => {
			result.current.setSortBy('order');
		});
		expect(result.current.sortBy).toBe('order');

		act(() => {
			result.current.setSortBy('date');
		});
		expect(result.current.sortBy).toBe('date');
	});

	test('should update dateToDisplay by invoking setDateToDisplay with corresponding accepted enums', () => {
		const { result } = renderHook(() => useDatesListFilterStateManager());

		act(() => {
			result.current.setDateToDisplay(DateToDisplay.start);
		});
		expect(result.current.dateToDisplay).toBe('start');

		act(() => {
			result.current.setDateToDisplay(DateToDisplay.end);
		});
		expect(result.current.dateToDisplay).toBe('end');

		act(() => {
			result.current.setDateToDisplay(DateToDisplay.both);
		});
		expect(result.current.dateToDisplay).toBe('both');
	});

	test('should update datetimesToShow by invoking setDatetimesToShow with corresponding accepted enums', () => {
		const { result } = renderHook(() => useDatesListFilterStateManager());

		act(() => {
			result.current.setDatetimesToShow(DatetimesToShow.all);
		});
		expect(result.current.datetimesToShow).toBe('all');

		act(() => {
			result.current.setDatetimesToShow(DatetimesToShow.upcomingOnly);
		});
		expect(result.current.datetimesToShow).toBe('upcomingOnly');
	});
});
