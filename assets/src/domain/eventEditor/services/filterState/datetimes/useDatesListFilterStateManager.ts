import { useReducer } from 'react';

import reducer from './reducer';
import { DatetimesFilterState, DatetimesFilterStateManager, DatetimeSales, DatetimeStatus } from './types';
import { DisplayStartOrEndDate, SortBy } from '@sharedServices/filterState';
import { useEntityListFilterStateManager } from '@appLayout/entityList/filterBar';

type FSM = DatetimesFilterStateManager;

const useDatesListFilterStateManager = (): FSM => {
	const initialState: DatetimesFilterState = {
		displayStartOrEndDate: DisplayStartOrEndDate.start,
		sales: DatetimeSales.all,
		status: DatetimeStatus.activeUpcoming,
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	const entityFilterState = useEntityListFilterStateManager<SortBy>('date');

	const resetPageNumber = (filter: DatetimeSales | DatetimeStatus): void => {
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

	return {
		...state,
		...entityFilterState,
		setDisplayStartOrEndDate,
		setSales,
		setStatus,
	};
};

export default useDatesListFilterStateManager;
