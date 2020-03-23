import { useReducer } from 'react';

import reducer from './reducer';
import { TicketsFilterState, TicketsFilterStateManager, TicketsSales, TicketsStatus } from './types';
import { DisplayStartOrEndDate, SortBy } from '@sharedServices/filterState';
import { useEntityListFilterStateManager } from '@appLayout/entityList/filterBar';

type FSM = TicketsFilterStateManager;

const resetPageNumber = (
	state: TicketsFilterState,
	filter: TicketsSales | TicketsStatus,
	setPageNumber: (number) => void
): void => {
	if (filter !== state[filter]) {
		setPageNumber(1);
	}
};

const useTicketsListFilterStateManager = (): FSM => {
	const initialState: TicketsFilterState = {
		displayStartOrEndDate: DisplayStartOrEndDate.start,
		isChained: false,
		sales: TicketsSales.all,
		status: TicketsStatus.onSaleAndPending,
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	const entityFilterState = useEntityListFilterStateManager<SortBy>('date');

	const setDisplayStartOrEndDate: FSM['setDisplayStartOrEndDate'] = (displayStartOrEndDate) => {
		dispatch({
			type: 'SET_DISPLAY_START_OR_END_DATE',
			displayStartOrEndDate,
		});
	};

	const setSales: FSM['setSales'] = (sales) => {
		resetPageNumber(state, sales, entityFilterState.setPageNumber);
		dispatch({
			type: 'SET_SALES',
			sales,
		});
	};

	const setStatus: FSM['setStatus'] = (status) => {
		resetPageNumber(state, status, entityFilterState.setPageNumber);
		dispatch({
			type: 'SET_STATUS',
			status,
		});
	};

	const toggleIsChained: FSM['toggleIsChained'] = () => {
		dispatch({
			type: 'TOGGLE_IS_CHAINED',
		});
	};

	return {
		...state,
		...entityFilterState,
		setSales,
		setDisplayStartOrEndDate,
		setStatus,
		toggleIsChained,
	};
};

export default useTicketsListFilterStateManager;
