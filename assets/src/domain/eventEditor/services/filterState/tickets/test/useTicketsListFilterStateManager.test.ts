import { act, renderHook } from '@testing-library/react-hooks';

import { DisplayStartOrEndDate } from '@sharedServices/filterState';
import { useTicketsListFilterStateManager } from '../';
import { TicketsToShow } from '../types';

describe('useTicketsListFilterStateManager', () => {
	test('useTicketsListFilterStateManager initial state and result', () => {
		const { result } = renderHook(() => useTicketsListFilterStateManager());

		expect(typeof result.current.sortBy).toBe('string');
		expect(typeof result.current.displayStartOrEndDate).toBe('string');

		expect(typeof result.current.setSortBy).toBe('function');
		expect(typeof result.current.setDisplayStartOrEndDate).toBe('function');
		expect(typeof result.current.setTicketsToShow).toBe('function');
		expect(result.current.isChained).toBe(false);
	});

	test('should update sortBy by invoking setSortBy with corresponding accepted enums', () => {
		const { result } = renderHook(() => useTicketsListFilterStateManager());

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
		const { result } = renderHook(() => useTicketsListFilterStateManager());

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

	test('should update ticketsToShow by invoking setTicketsToShow with corresponding accepted enums', () => {
		const { result } = renderHook(() => useTicketsListFilterStateManager());

		act(() => {
			result.current.setTicketsToShow(TicketsToShow.all);
		});
		expect(result.current.ticketsToShow).toBe('all');

		act(() => {
			result.current.setTicketsToShow(TicketsToShow.above50Sold);
		});
		expect(result.current.ticketsToShow).toBe('above-50-sold');
	});
});
