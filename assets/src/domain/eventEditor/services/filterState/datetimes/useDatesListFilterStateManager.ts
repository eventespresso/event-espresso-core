import { useCallback, useMemo, useReducer } from 'react';

import reducer from './reducer';
import { DatetimesFilterState, DatetimesFilterStateManager, DatetimeSales, DatetimeStatus } from './types';
import { DisplayStartOrEndDate, SortBy } from '@sharedServices/filterState';
import useEntityListFilterStateManager from '@appLayout/entityList/filterBar/filterState/useEntityListFilterStateManager';

type FSM = DatetimesFilterStateManager;

const initialState: DatetimesFilterState = {
	displayStartOrEndDate: DisplayStartOrEndDate.start,
	sales: DatetimeSales.all,
	status: DatetimeStatus.activeUpcoming,
};

const useDatesListFilterStateManager = (): FSM => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const entityFilterState = useEntityListFilterStateManager<SortBy>('order');
	const { setPageNumber } = entityFilterState;

	const resetPageNumber = useCallback(
		(filter: DatetimeSales | DatetimeStatus): void => {
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

	return useMemo(
		() => ({
			...state,
			...entityFilterState,
			setDisplayStartOrEndDate,
			setSales,
			setStatus,
		}),
		[state, setStatus, setSales, setDisplayStartOrEndDate, entityFilterState]
	);
};

export default useDatesListFilterStateManager;
