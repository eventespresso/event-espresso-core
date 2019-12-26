/**
 * External dependencies
 */
import { useReducer, useEffect } from 'react';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../../eventEditor/data/types';
import filters from '../../../../shared/predicates/datetimes/filters';

interface DatesListFilterState {
	dates: Datetime[];
	datesSortedBy: string;
	displayDates: string;
	setDatesSortedBy: () => void;
	setDisplayDates: () => void;
	setShowDates: () => void;
}

const useDatesListFilterState = (dates: Datetime[]): DatesListFilterState => {
	const initialState = {
		dates,
		datesSortedBy: 'chronologically',
		displayDates: 'start',
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		console.log('useDatesListFilterState >>>', state);
	}, [state]);

	const setDatesSortedBy = (datesSortedBy) => {
		dispatch({
			type: 'SET_DATES_SORTED_BY',
			datesSortedBy,
		});
	};

	const setDisplayDates = (displayDates) => {
		dispatch({
			type: 'SET_DISPLAY_DATES',
			displayDates,
		});
	};

	const setShowDates = (showDates) => {
		dispatch({
			type: 'SET_SHOW_DATES',
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
		case 'SET_DATES_SORTED_BY':
			filteredDates = filters({ dates: state.dates, show: datesSortedBy });

			return { ...state, datesSortedBy, filteredDates };

		case 'SET_DISPLAY_DATES':
			return { ...state, displayDates };

		case 'SET_SHOW_DATES':
			return { ...state, showDates };

		default:
			throw new Error('Unexpected action');
	}
};

export default useDatesListFilterState;
