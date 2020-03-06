import { renderHook } from '@testing-library/react-hooks';
import { is } from 'ramda';
import { DisplayDates } from '@edtrInterfaces/types';
import { ShowTickets, SortTicketsBy } from '../../../../../interfaces/ticket/types';

import useTicketListFilterState from './index';
import { tickets } from '../../../../../../shared/entities/tickets/predicates/test/data';

test('useTicketListFilterState initial state result', () => {
	const { result } = renderHook(() => useTicketListFilterState(tickets));
	const currentResult = result.current;

	expect(Object.keys(currentResult).length).toBe(10);

	expect(is(String, currentResult.displayTicketDate)).toBe(true);
	expect(currentResult.displayTicketDate).toBe(DisplayDates.start);

	expect(is(Boolean, currentResult.isChained)).toBe(true);
	expect(currentResult.isChained).toBe(false);

	expect(is(Array, currentResult.filteredEntities)).toBe(true);
	expect(currentResult.filteredEntities).toEqual([]);

	expect(is(String, currentResult.showTickets)).toBe(true);
	expect(currentResult.showTickets).toBe(ShowTickets.all);

	expect(is(Array, currentResult.tickets)).toBe(true);
	expect(currentResult.tickets).toEqual(tickets);

	expect(is(String, currentResult.sortTicketsBy)).toBe(true);
	expect(currentResult.sortTicketsBy).toBe(SortTicketsBy.date);
});
