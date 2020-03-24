import { useReducer } from 'react';

import reducer from './reducer';
import { TicketsFilterState, TicketsFilterStateManager, TicketsSales, TicketsStatus } from './types';
import { DisplayStartOrEndDate, SortBy } from '@sharedServices/filterState';
import { useEntityListFilterStateManager } from '@appLayout/entityList/filterBar';

type FSM = TicketsFilterStateManager;

const useTicketsListFilterStateManager = (): FSM => {
	const initialState: TicketsFilterState = {
		displayStartOrEndDate: DisplayStartOrEndDate.start,
		isChained: false,
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

	const setDisplayStartOrEndDate: FSM['setDisplayStartOrEndDate'] = (displayStartOrEndDate) => {
		dispatch({
			type: 'SET_DISPLAY_START_OR_END_DATE',
			displayStartOrEndDate,
		});
	};

	const setSales: FSM['setSales'] = (sales) => {
		resetPageNumber(sales);
		dispatch({
			type: 'SET_SALES',
			sales,
		});
	};

	const setStatus: FSM['setStatus'] = (status) => {
		resetPageNumber(status);
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
		setDisplayStartOrEndDate,
		setSales,
		setStatus,
		toggleIsChained,
	};
};

export default useTicketsListFilterStateManager;
