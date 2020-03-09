import { useReducer } from 'react';

import reducer from './reducer';
import { DatetimesFilterState, DatetimesFilterStateManager, DatetimesToShow } from './types';
import { DisplayStartOrEndDate, SortBy } from '@sharedServices/filterState';
import { useEntityListFilterStateManager } from '@appLayout/entityList/filterBar';

type FSM = DatetimesFilterStateManager;

const useDatesListFilterStateManager = (): FSM => {
	const initialState: DatetimesFilterState = {
		displayStartOrEndDate: DisplayStartOrEndDate.start,
		datetimesToShow: DatetimesToShow.all,
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	const entityFilterState = useEntityListFilterStateManager<SortBy>('date');

	const setDisplayStartOrEndDate: FSM['setDisplayStartOrEndDate'] = (displayStartOrEndDate) => {
		dispatch({
			type: 'SET_DISPLAY_START_OR_END_DATE',
			displayStartOrEndDate,
		});
	};

	const setDatetimesToShow: FSM['setDatetimesToShow'] = (datetimesToShow) => {
		// if datetimes to show changes
		if (datetimesToShow !== state.datetimesToShow) {
			// reset page number to 1
			entityFilterState.setPageNumber(1);
		}
		dispatch({
			type: 'SET_DATETIMES_TO_SHOW',
			datetimesToShow,
		});
	};

	return {
		...state,
		...entityFilterState,
		setDisplayStartOrEndDate,
		setDatetimesToShow,
	};
};

export default useDatesListFilterStateManager;
