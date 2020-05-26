import { act, renderHook } from '@testing-library/react-hooks';

import { DisplayStartOrEndDate } from '@sharedServices/filterState';
import useDatesListFilterStateManager from '../useDatesListFilterStateManager';
import { DatetimeSales, DatetimeStatus } from '../types';

describe('useDatesListFilterStateManager', () => {
	test('useDatesListFilterStateManager result', () => {
		const { result } = renderHook(() => useDatesListFilterStateManager());

		expect(typeof result.current.sortBy).toBe('string');
		expect(typeof result.current.displayStartOrEndDate).toBe('string');

		expect(typeof result.current.setSortBy).toBe('function');
		expect(typeof result.current.setDisplayStartOrEndDate).toBe('function');
		expect(typeof result.current.setStatus).toBe('function');
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

	test('should update displayStartOrEndDate by invoking setDisplayStartOrEndDate with corresponding accepted enums', () => {
		const { result } = renderHook(() => useDatesListFilterStateManager());

		act(() => {
			result.current.setDisplayStartOrEndDate(DisplayStartOrEndDate.start);
		});
		expect(result.current.displayStartOrEndDate).toBe('start');

		act(() => {
			result.current.setDisplayStartOrEndDate(DisplayStartOrEndDate.end);
		});
		expect(result.current.displayStartOrEndDate).toBe('end');

		act(() => {
			result.current.setDisplayStartOrEndDate(DisplayStartOrEndDate.both);
		});
		expect(result.current.displayStartOrEndDate).toBe('both');
	});

	test('should update sales by invoking setSales with corresponding accepted enums', () => {
		const { result } = renderHook(() => useDatesListFilterStateManager());

		act(() => {
			result.current.setSales(DatetimeSales.all);
		});
		expect(result.current.sales).toBe('all');

		act(() => {
			result.current.setSales(DatetimeSales.above90Capacity);
		});
		expect(result.current.sales).toBe('above90Capacity');
	});

	test('should update Status by invoking setStatus with corresponding accepted enums', () => {
		const { result } = renderHook(() => useDatesListFilterStateManager());

		act(() => {
			result.current.setStatus(DatetimeStatus.all);
		});
		expect(result.current.status).toBe('all');

		act(() => {
			result.current.setStatus(DatetimeStatus.upcomingOnly);
		});
		expect(result.current.status).toBe('upcomingOnly');
	});
});
