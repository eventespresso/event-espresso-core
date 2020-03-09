import { useReducer } from 'react';

import reducer from './reducer';
import { TicketsFilterState, TicketsFilterStateManager, TicketsToShow } from './types';
import { DisplayStartOrEndDate, SortBy } from '@sharedServices/filterState';
import { useEntityListFilterStateManager } from '@appLayout/entityList/filterBar';

type FSM = TicketsFilterStateManager;

const useTicketsListFilterStateManager = (): FSM => {
	const initialState: TicketsFilterState = {
		displayStartOrEndDate: DisplayStartOrEndDate.start,
		isChained: false,
		ticketsToShow: TicketsToShow.all,
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	const entityFilterState = useEntityListFilterStateManager<SortBy>('date');

	const setDisplayStartOrEndDate: FSM['setDisplayStartOrEndDate'] = (displayStartOrEndDate) => {
		dispatch({
			type: 'SET_DISPLAY_START_OR_END_DATE',
			displayStartOrEndDate,
		});
	};

	const setTicketsToShow: FSM['setTicketsToShow'] = (ticketsToShow) => {
		// if tickets to show changes
		if (ticketsToShow !== state.ticketsToShow) {
			// reset page number to 1
			entityFilterState.setPageNumber(1);
		}
		dispatch({
			type: 'SET_TICKETS_TO_SHOW',
			ticketsToShow,
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
		setTicketsToShow,
		toggleIsChained,
	};
};

export default useTicketsListFilterStateManager;
