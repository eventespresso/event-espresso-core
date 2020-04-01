import { useReducer, useCallback } from 'react';

import reducer from './reducer';
import { TicketsFilterState, TicketsFilterStateManager, TicketsSales, TicketsStatus } from './types';
import { DisplayStartOrEndDate, SortBy } from '@sharedServices/filterState';
import { useEntityListFilterStateManager } from '@appLayout/entityList/filterBar';

type FSM = TicketsFilterStateManager;

const useTicketsListFilterStateManager = (): FSM => {
	const initialState: TicketsFilterState = {
		displayStartOrEndDate: DisplayStartOrEndDate.start,
		isChained: true,
		sales: TicketsSales.all,
		status: TicketsStatus.onSaleAndPending,
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	const entityFilterState = useEntityListFilterStateManager<SortBy>('date');

	const resetPageNumber = (filter: TicketsSales | TicketsStatus): void => {
		if (filter !== state[filter]) {
			entityFilterState.setPageNumber(1);
		}
	};

	const setDisplayStartOrEndDate: FSM['setDisplayStartOrEndDate'] = useCallback(
		(displayStartOrEndDate) => {
			dispatch({
				type: 'SET_DISPLAY_START_OR_END_DATE',
				displayStartOrEndDate,
			});
		},
		[dispatch]
	);

	const setSales: FSM['setSales'] = (sales) => {
		resetPageNumber(sales);
		dispatch({
			type: 'SET_SALES',
			sales,
		});
	};

	const setStatus: FSM['setStatus'] = useCallback(
		(status) => {
			resetPageNumber(status);
			dispatch({
				type: 'SET_STATUS',
				status,
			});
		},
		[dispatch]
	);

	const toggleIsChained: FSM['toggleIsChained'] = useCallback(() => {
		dispatch({
			type: 'TOGGLE_IS_CHAINED',
		});
	}, [dispatch]);

	return {
		...state,
		...entityFilterState,
		setDisplayStartOrEndDate,
		setSales,
		setStatus,
		toggleIsChained,
	};
};

export default useTicketsListFilterStateManager;
