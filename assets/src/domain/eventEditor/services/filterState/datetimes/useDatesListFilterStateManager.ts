import { useReducer } from 'react';

import reducer from './reducer';
import { DatetimesFilterState, DatetimesFilterStateManager, DatetimeSales, DatetimeStatus } from './types';
import { DisplayStartOrEndDate, SortBy } from '@sharedServices/filterState';
import { useEntityListFilterStateManager } from '@appLayout/entityList/filterBar';

type FSM = DatetimesFilterStateManager;

const useDatesListFilterStateManager = (setLoading): FSM => {
	const initialState: DatetimesFilterState = {
		displayStartOrEndDate: DisplayStartOrEndDate.start,
		sales: DatetimeSales.all,
		status: DatetimeStatus.activeUpcoming,
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	const entityFilterState = useEntityListFilterStateManager<SortBy>('date');

	const resetPageNumber = (filter: DatetimeSales | DatetimeStatus): void => {
		if (filter !== state[filter]) {
			console.log('%c useDatesListFilterStateManager setPageNumber', 'color: Yellow;', 1);
			entityFilterState.setPageNumber(1);
		}
	};

	const setDisplayStartOrEndDate: FSM['setDisplayStartOrEndDate'] = (displayStartOrEndDate) => {
		console.log(
			'%c useDatesListFilterStateManager setDisplayStartOrEndDate',
			'color: Yellow;',
			displayStartOrEndDate
		);
		setLoading(true);
		dispatch({
			type: 'SET_DISPLAY_START_OR_END_DATE',
			displayStartOrEndDate,
		});
	};

	const setSales: FSM['setSales'] = (sales) => {
		console.log('%c useDatesListFilterStateManager setSales', 'color: Yellow;', sales);
		setLoading(true);
		resetPageNumber(sales);
		dispatch({
			type: 'SET_SALES',
			sales,
		});
	};

	const setStatus: FSM['setStatus'] = (status) => {
		console.log('%c useDatesListFilterStateManager setStatus', 'color: Yellow;', status);
		setLoading(true);
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
