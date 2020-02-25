/**
 * External dependencies
 */
import { useReducer } from 'react';

/**
 * Internal dependencies
 */
import { Datetime } from '@edtrServices/apollo/types';
import { DatesSorted, DisplayDates, ShowDates } from '@edtrInterfaces/datetimes/types';
import filters from '@sharedEntities/datetimes/predicates/filters';
import sorters from '@sharedEntities/datetimes/predicates/sorters';

enum ActionType {
	SET_DATES_SORTED_BY = 'SET_DATES_SORTED_BY',
	SET_DISPLAY_DATES = 'SET_DISPLAY_DATES',
	SET_SHOW_DATES = 'SET_SHOW_DATES',
}

interface DatesListFilterState {
	dates: Datetime[];
	datesSortedBy: DatesSorted;
	displayDates: DisplayDates;
	processedDates: Datetime[];
	showDates: ShowDates;
}

interface DatesListFilterStateManager extends DatesListFilterState {
	setDatesSortedBy: (datesSortedBy: DatesSorted) => void;
	setDisplayDates: (displayDates: DisplayDates) => void;
	setShowDates: (showDates: ShowDates) => void;
}

const useDatesListFilterState = (dates: Datetime[]): DatesListFilterStateManager => {
	const initialState: DatesListFilterState = {
		dates,
		datesSortedBy: DatesSorted.chronologically,
		displayDates: DisplayDates.start,
		processedDates: [],
		showDates: ShowDates.all,
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	const setDatesSortedBy = (datesSortedBy: DatesSorted): void => {
		dispatch({
			type: ActionType.SET_DATES_SORTED_BY,
			datesSortedBy,
		});
	};

	const setDisplayDates = (displayDates: DisplayDates): void => {
		dispatch({
			type: ActionType.SET_DISPLAY_DATES,
			displayDates,
		});
	};

	const setShowDates = (showDates: ShowDates): void => {
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
	datesSortedBy?: DatesSorted;
	displayDates?: DisplayDates;
	showDates?: ShowDates;
	type: ActionType;
}

const reducer = (state: DatesListFilterState, action: Action): DatesListFilterState => {
	const { datesSortedBy, displayDates, showDates } = action;
	let processedDates = [];

	switch (action.type) {
		case ActionType.SET_DATES_SORTED_BY:
			processedDates = sorters({ dates: state.dates, order: datesSortedBy });

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
