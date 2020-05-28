import { act, renderHook } from '@testing-library/react-hooks';

import { DisplayStartOrEndDate } from '@sharedServices/filterState';
import useTicketsListFilterStateManager from '../useTicketsListFilterStateManager';
import { TicketsSales, TicketsStatus } from '../types';
import { ApolloMockedProvider } from '@edtrServices/context/TestContext';

describe('useTicketsListFilterStateManager', () => {
	const wrapper = ApolloMockedProvider();
	test('useTicketsListFilterStateManager initial state and result', () => {
		const { result } = renderHook(() => useTicketsListFilterStateManager(), { wrapper });

		expect(typeof result.current.sortBy).toBe('string');
		expect(typeof result.current.displayStartOrEndDate).toBe('string');

		expect(typeof result.current.setSortBy).toBe('function');
		expect(typeof result.current.setDisplayStartOrEndDate).toBe('function');
		expect(typeof result.current.setSales).toBe('function');
		expect(typeof result.current.setStatus).toBe('function');
		expect(result.current.isChained).toBe(true);
	});

	test('should update sortBy by invoking setSortBy with corresponding accepted enums', () => {
		const { result } = renderHook(() => useTicketsListFilterStateManager(), { wrapper });

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
		const { result } = renderHook(() => useTicketsListFilterStateManager(), { wrapper });

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
		const { result } = renderHook(() => useTicketsListFilterStateManager(), { wrapper });

		act(() => {
			result.current.setSales(TicketsSales.above50Sold);
		});
		expect(result.current.sales).toBe('above-50-sold');
	});

	test('should update status by invoking setStatus with corresponding accepted enums', () => {
		const { result } = renderHook(() => useTicketsListFilterStateManager(), { wrapper });

		act(() => {
			result.current.setStatus(TicketsStatus.all);
		});
		expect(result.current.status).toBe('all');
	});
});
