import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';

import reducer from './reducer';
import { TicketsFilterState, TicketsFilterStateManager, TicketsSales, TicketsStatus } from './types';
import { DisplayStartOrEndDate, SortBy } from '@sharedServices/filterState';
import useEntityListFilterStateManager from '@appLayout/entityList/filterBar/filterState/useEntityListFilterStateManager';
import { useEdtrState } from '@edtrHooks/edtrState';

type FSM = TicketsFilterStateManager;

const initialState: TicketsFilterState = {
	displayStartOrEndDate: DisplayStartOrEndDate.start,
	isChained: true,
	sales: TicketsSales.all,
	status: TicketsStatus.onSaleAndPending,
};

const useTicketsListFilterStateManager = (): FSM => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [visibleDatesStr, setVisibleDatesStr] = useState('');

	const { visibleDatetimeIds } = useEdtrState();

	const entityFilterState = useEntityListFilterStateManager<SortBy>('date');
	const { setPageNumber } = entityFilterState;

	// subscribe to visible dates for isChained
	useEffect(() => {
		if (state.isChained) {
			setVisibleDatesStr(visibleDatetimeIds.join(':'));
		}
	}, [state.isChained, visibleDatetimeIds]);

	const resetPageNumber = useCallback(
		(filter: TicketsSales | TicketsStatus): void => {
			if (filter !== state[filter]) {
				setPageNumber(1);
			}
		},
		[setPageNumber, state]
	);

	const setDisplayStartOrEndDate: FSM['setDisplayStartOrEndDate'] = useCallback((displayStartOrEndDate) => {
		dispatch({
			type: 'SET_DISPLAY_START_OR_END_DATE',
			displayStartOrEndDate,
		});
	}, []);

	const setSales: FSM['setSales'] = useCallback(
		(sales) => {
			resetPageNumber(sales);

			dispatch({
				type: 'SET_SALES',
				sales,
			});
		},
		[resetPageNumber]
	);

	const setStatus: FSM['setStatus'] = useCallback(
		(status) => {
			resetPageNumber(status);
			dispatch({
				type: 'SET_STATUS',
				status,
			});
		},
		[resetPageNumber]
	);

	const toggleIsChained: FSM['toggleIsChained'] = useCallback(() => {
		dispatch({
			type: 'TOGGLE_IS_CHAINED',
		});
	}, []);

	return useMemo(
		() => ({
			...state,
			...entityFilterState,
			setDisplayStartOrEndDate,
			setSales,
			setStatus,
			toggleIsChained,
			visibleDatesStr,
		}),
		[entityFilterState, visibleDatesStr, setDisplayStartOrEndDate, setSales, toggleIsChained, state, setStatus]
	);
};

export default useTicketsListFilterStateManager;
