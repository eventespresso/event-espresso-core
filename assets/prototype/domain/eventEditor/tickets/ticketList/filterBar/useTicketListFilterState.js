import { useReducer, useEffect } from '@wordpress/element';

const useTicketListFilterState = () => {
	const initialState = {
		displayTicketDate: 'start',
		isChained: false,
		showTickets: 'all',
		ticketsSortedBy: 'chronologically',
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		console.log('useTicketListFilterState >>>', state);
	}, [state]);

	const setDisplayTicketDate = (displayTicketDate) => {
		dispatch({
			type: 'SET_DISPLAY_TICKET_DATE',
			displayTicketDate,
		});
	};

	const setShowTickets = (showTickets) => {
		dispatch({
			type: 'SET_SHOW_TICKETS',
			showTickets,
		});
	};

	const setTicketsSortedBy = (ticketsSortedBy) => {
		dispatch({
			ticketsSortedBy,
			type: 'SET_TICKETS_SORTEDBY',
		});
	};

	const toggleIsChained = () => {
		dispatch({
			type: 'TOGGLE_IS_CHAINED',
		});
	};

	return {
		displayTicketDate: state.displayTicketDate,
		isChained: state.isChained,
		setDisplayTicketDate,
		setShowTickets,
		setTicketsSortedBy,
		showTickets: state.showTickets,
		ticketsSortedBy: state.ticketsSortedBy,
		toggleIsChained,
	};
};

const reducer = (state, action) => {
	const { displayTicketDate, showTickets, ticketsSortedBy } = action;

	switch (action.type) {
		case 'SET_DISPLAY_TICKET_DATE':
			return { ...state, displayTicketDate };
		case 'SET_SHOW_TICKETS':
			return { ...state, showTickets };
		case 'SET_TICKETS_SORTEDBY':
			return { ...state, ticketsSortedBy };
		case 'TOGGLE_IS_CHAINED':
			return { ...state, isChained: !state.isChained };

		default:
			throw new Error('Unexpected action');
	}
};

export default useTicketListFilterState;
