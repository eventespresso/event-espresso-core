import { useCallback, useMemo, useReducer } from 'react';

import { FilterState, FilterStateManager, FilterStateManagerHook } from './types';
import reducer from './reducer';

type FSM = FilterStateManager;

const initialState: FilterState = {
	datesByMonth: [0, 0],
	showExpiredTickets: false,
	showTrashedDates: false,
	showTrashedTickets: false,
};

const useFilterStateManager: FilterStateManagerHook = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const setDatesByMonth: FSM['setDatesByMonth'] = useCallback((datesByMonth) => {
		const [year, month] = datesByMonth.split(':').map(Number);

		dispatch({
			type: 'SET_DATES_BY_MONTH',
			datesByMonth: [year, month],
		});
	}, []);

	const setShowExpiredTickets: FSM['setShowExpiredTickets'] = useCallback((showExpiredTickets) => {
		dispatch({
			type: 'SET_SHOW_EXPIRED_TICKETS',
			showExpiredTickets,
		});
	}, []);

	const setShowTrashedDates: FSM['setShowTrashedDates'] = useCallback((showTrashedDates) => {
		dispatch({
			type: 'SET_SHOW_TRASHED_DATES',
			showTrashedDates,
		});
	}, []);

	const setShowTrashedTickets: FSM['setShowTrashedTickets'] = useCallback((showTrashedTickets) => {
		dispatch({
			type: 'SET_SHOW_TRASHED_TICKETS',
			showTrashedTickets,
		});
	}, []);

	return useMemo(
		() => ({
			...state,
			setDatesByMonth,
			setShowExpiredTickets,
			setShowTrashedDates,
			setShowTrashedTickets,
		}),
		Object.values(state)
	);
};

export default useFilterStateManager;
