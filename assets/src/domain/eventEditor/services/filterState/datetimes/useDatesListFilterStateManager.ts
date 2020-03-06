import { useReducer, useEffect } from 'react';

import reducer from './reducer';
import { DatetimesFilterState, DatetimesFilterStateManager, DatetimesToShow } from './types';
import { DateToDisplay, SortBy } from '@sharedServices/filterState';
import { useEntityListFilterStateManager } from '@appLayout/entityList/filterBar';

type FSM = DatetimesFilterStateManager;

const useDatesListFilterStateManager = (): FSM => {
	const initialState: DatetimesFilterState = {
		dateToDisplay: DateToDisplay.start,
		datetimesToShow: DatetimesToShow.all,
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		console.log('Dates FS', state);
	}, [state]);

	const entityFilterState = useEntityListFilterStateManager<SortBy>('date');

	const setDateToDisplay: FSM['setDateToDisplay'] = (dateToDisplay) => {
		dispatch({
			type: 'SET_DATE_TO_DISPLAY',
			dateToDisplay,
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
		setDateToDisplay,
		setDatetimesToShow,
	};
};

export default useDatesListFilterStateManager;
