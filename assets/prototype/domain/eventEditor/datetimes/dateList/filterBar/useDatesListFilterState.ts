/**
 * External dependencies
 */
import { useReducer, useEffect } from 'react';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../../eventEditor/data/types';
import { DatesSortedBy, DisplayDates, ShowDates } from '../../../../eventEditor/data/date/types';

import filters from '../../../../shared/predicates/datetimes/filters';
import sorters from '../../../../shared/predicates/datetimes/sorters';

interface DatesListFilterState {
	dates: Datetime[];
	datesSortedBy: DatesSortedBy;
	displayDates: DisplayDates;
	processedDates: Datetime[];
	setDatesSortedBy: (datesSortedBy: DatesSortedBy) => void;
	setDisplayDates: (displayDates: DisplayDates) => void;
	setShowDates: (showDates: ShowDates) => void;
	showDates: ShowDates;
}

enum ActionType {
	SET_DATES_SORTED_BY = 'SET_DATES_SORTED_BY',
	SET_DISPLAY_DATES = 'SET_DISPLAY_DATES',
	SET_SHOW_DATES = 'SET_SHOW_DATES',
}

const useDatesListFilterState = (dates: Datetime[]): DatesListFilterState => {
	const initialState = {
		dates,
		datesSortedBy: DatesSortedBy.chronologically,
		displayDates: DisplayDates.start,
		processedDates: [],
		showDates: ShowDates.all,
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		// console.log('useDatesListFilterState >>>', state);
	}, [state]);

	const setDatesSortedBy = (datesSortedBy: DatesSortedBy) => {
		dispatch({
			type: ActionType.SET_DATES_SORTED_BY,
			datesSortedBy,
		});
	};

	const setDisplayDates = (displayDates: DisplayDates) => {
		dispatch({
			type: ActionType.SET_DISPLAY_DATES,
			displayDates,
		});
	};

	const setShowDates = (showDates: ShowDates) => {
		dispatch({
			type: ActionType.SET_SHOW_DATES,
			showDates,
		});
	};

	return {
		...state,
		setDatesSortedBy,
		setDisplayDates,
		setShowDates,
	};
};

interface Action {
	datesSortedBy?: DatesSortedBy;
	displayDates?: DisplayDates;
	showDates?: ShowDates;
	type: ActionType;
}

const reducer = (state, action: Action) => {
	let processedDates = [];
	const { datesSortedBy, displayDates, showDates } = action;

	switch (action.type) {
		case ActionType.SET_DATES_SORTED_BY:
			processedDates = sorters({ dates: state.dates, sort: datesSortedBy });

			return { ...state, datesSortedBy, processedDates };

		/**
		 * On SET_DISPLAY_DATES dates are not processed.
		 * The logic related to what needs to be shown is applied in EventDateCalendarDate.
		 */
		case ActionType.SET_DISPLAY_DATES:
			return { ...state, displayDates };

		case ActionType.SET_SHOW_DATES:
			processedDates = filters({ dates: state.dates, show: showDates });

			return { ...state, processedDates, showDates };

		default:
			throw new Error('Unexpected action');
	}
};

export default useDatesListFilterState;
