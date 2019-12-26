/**
 * External dependencies
 */
import { useReducer, useEffect } from 'react';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../../eventEditor/data/types';
import { DatesSortedBy, DisplayDates, ShowDates } from './types';
import filters from '../../../../shared/predicates/datetimes/filters';

interface DatesListFilterState {
	dates: Datetime[];
	datesSortedBy: DatesSortedBy;
	displayDates: DisplayDates;
	setDatesSortedBy: (DatesSortedBy) => void;
	setDisplayDates: () => void;
	setShowDates: () => void;
	showDates: ShowDates;
}

enum ActionType {
	'SET_DATES_SORTED_BY' = 'SET_DATES_SORTED_BY',
	'SET_DISPLAY_DATES' = 'SET_DISPLAY_DATES',
	'SET_SHOW_DATES' = 'SET_SHOW_DATES',
}

const useDatesListFilterState = (dates: Datetime[]): DatesListFilterState => {
	const initialState = {
		dates,
		datesSortedBy: DatesSortedBy.chronologically,
		displayDates: DisplayDates.start,
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

const reducer = (state, action) => {
	let filteredDates = [];
	const { datesSortedBy, displayDates, showDates } = action;

	switch (action.type) {
		case ActionType.SET_DATES_SORTED_BY:
			filteredDates = filters({ dates: state.dates, show: datesSortedBy });

			return { ...state, datesSortedBy, filteredDates };

		case ActionType.SET_DISPLAY_DATES:
			return { ...state, displayDates };

		case ActionType.SET_SHOW_DATES:
			return { ...state, showDates };

		default:
			throw new Error('Unexpected action');
	}
};

export default useDatesListFilterState;
