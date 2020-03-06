import { useEffect, useReducer } from 'react';

import reducer from './reducer';
import { ActionType, FilterState, FilterStateManager } from './types';
import { Datetime } from '../../../../../services/apollo/types';
import { DatesSorted, ShowDates } from '../../../../../interfaces/datetimes/types';
import { DisplayDates } from '@edtrInterfaces/types';

const useDatesListFilterState = (dates: Datetime[]): FilterStateManager => {
	const initialState: FilterState = {
		dates,
		datesSortedBy: DatesSorted.chronologically,
		displayDates: DisplayDates.start,
		filteredEntities: dates,
		showDates: ShowDates.all,
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		if (Array.isArray(state.dates) && state.dates.length < 1 && Array.isArray(dates) && dates.length > 0) {
			dispatch({
				type: ActionType.SET_DATES,
				payload: dates,
			});
		}
	});

	const setDatesSortedBy = (datesSortedBy: DatesSorted): void => {
		dispatch({
			type: ActionType.SET_DATES_SORTED_BY,
			payload: datesSortedBy,
		});
	};

	const setDisplayDates = (displayDates: DisplayDates): void => {
		dispatch({
			type: ActionType.SET_DISPLAY_DATES,
			payload: displayDates,
		});
	};

	const setShowDates = (showDates: ShowDates): void => {
		dispatch({
			type: ActionType.SET_SHOW_DATES,
			payload: showDates,
		});
	};

	return {
		...state,
		setDatesSortedBy,
		setDisplayDates,
		setShowDates,
	};
};

export default useDatesListFilterState;
