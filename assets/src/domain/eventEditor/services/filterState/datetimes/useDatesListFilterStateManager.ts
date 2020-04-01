import { useReducer, useCallback } from 'react';

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

	const setDisplayStartOrEndDate: FSM['setDisplayStartOrEndDate'] = useCallback(
		(displayStartOrEndDate) => {
			dispatch({
				type: 'SET_DISPLAY_START_OR_END_DATE',
				displayStartOrEndDate,
			});
		},
		[dispatch]
	);

	const setSales: FSM['setSales'] = useCallback(
		(sales) => {
			resetPageNumber(sales);
			dispatch({
				type: 'SET_SALES',
				sales,
			});
		},
		[dispatch]
	);

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

	return {
		...state,
		...entityFilterState,
		setDisplayStartOrEndDate,
		setSales,
		setStatus,
	};
};

export default useDatesListFilterStateManager;
