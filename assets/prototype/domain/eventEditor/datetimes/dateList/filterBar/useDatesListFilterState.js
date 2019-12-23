import { useReducer, useEffect } from '@wordpress/element';

const useDatesListFilterState = (dates) => {
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
		datesSortedBy: state.datesSortedBy,
		displayDates: state.displayDates,
		filteredDates: state.filteredDates,
		setDatesSortedBy,
		setDisplayDates,
		setShowDates,
		showDates: state.showDates,
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
