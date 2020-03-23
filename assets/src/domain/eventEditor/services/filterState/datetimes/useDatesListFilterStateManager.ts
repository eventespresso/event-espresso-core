import { useReducer } from 'react';

import reducer from './reducer';
import { DatetimesFilterState, DatetimesFilterStateManager, Sales, Status } from './types';
import { DisplayStartOrEndDate, SortBy } from '@sharedServices/filterState';
import { useEntityListFilterStateManager } from '@appLayout/entityList/filterBar';

type FSM = DatetimesFilterStateManager;

const resetPageNumber = (
	state: DatetimesFilterState,
	filter: Sales | Status,
	setPageNumber: (number) => void
): void => {
	if (filter !== state[filter]) {
		setPageNumber(1);
	}
};

const useDatesListFilterStateManager = (): FSM => {
	const initialState: DatetimesFilterState = {
		displayStartOrEndDate: DisplayStartOrEndDate.start,
		sales: Sales.all,
		status: Status.activeUpcoming,
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

	return {
		...state,
		...entityFilterState,
		setDisplayStartOrEndDate,
		setSales,
		setStatus,
	};
};

export default useDatesListFilterStateManager;
