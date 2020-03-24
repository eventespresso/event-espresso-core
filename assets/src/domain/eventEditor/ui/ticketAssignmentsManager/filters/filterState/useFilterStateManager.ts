import { useReducer } from 'react';

import { FilterState, FilterStateManager, FilterStateManagerHook } from './types';
import { now } from '@sharedServices/utils/dateAndTime';
import reducer from './reducer';

type FSM = FilterStateManager;

const initialState: FilterState = {
	datesByMonth: [now.getFullYear(), now.getMonth()],
	showExpiredTickets: false,
	showTrashedDates: false,
	showTrashedTickets: false,
};

const useFilterStateManager: FilterStateManagerHook = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const setDatesByMonth: FSM['setDatesByMonth'] = (datesByMonth) => {
		const [year, month] = datesByMonth.split(':').map(Number);

		dispatch({
			type: 'SET_DATES_BY_MONTH',
			datesByMonth: [year, month],
		});
	};

	const setShowExpiredTickets: FSM['setShowExpiredTickets'] = (showExpiredTickets) => {
		dispatch({
			type: 'SET_SHOW_EXPIRED_TICKETS',
			showExpiredTickets,
		});
	};

	const setShowTrashedDates: FSM['setShowTrashedDates'] = (showTrashedDates) => {
		dispatch({
			type: 'SET_SHOW_TRASHED_DATES',
			showTrashedDates,
		});
	};

	const setShowTrashedTickets: FSM['setShowTrashedTickets'] = (showTrashedTickets) => {
		dispatch({
			type: 'SET_SHOW_TRASHED_TICKETS',
			showTrashedTickets,
		});
	};

	return {
		...state,
		setDatesByMonth,
		setShowExpiredTickets,
		setShowTrashedDates,
		setShowTrashedTickets,
	};
};

export default useFilterStateManager;
