/**
 * External dependencies
 */
import { useReducer, useEffect } from 'react';

/**
 * Internal dependencies
 */
import filters from '../../../../../shared/predicates/tickets/filters';
import { DisplayDates, ShowTickets, TicketsSortedBy } from '../../../../data/ticket/types';
import { Ticket } from '../../../../data/types';

enum ActionType {
	SET_DISPLAY_TICKET_DATE = 'SET_DISPLAY_TICKET_DATE',
	SET_SHOW_TICKETS = 'SET_SHOW_TICKETS',
	SET_TICKETS_SORTED_BY = 'SET_TICKETS_SORTED_BY',
	TOGGLE_IS_CHAINED = 'TOGGLE_IS_CHAINED',
}

interface TicketListFilterState {
	displayTicketDate: DisplayDates;
	isChained: boolean;
	processedTickets: Ticket[];
	showTickets: ShowTickets;
	tickets: Ticket[];
	ticketsSortedBy: TicketsSortedBy;
}

const useTicketListFilterState = (tickets: Ticket[]): TicketListFilterState => {
	const initialState = {
		displayTicketDate: DisplayDates.start,
		isChained: false,
		processedTickets: [],
		showTickets: ShowTickets.all,
		tickets,
		ticketsSortedBy: TicketsSortedBy.chronologically,
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	const setDisplayTicketDate = (displayTicketDate) => {
		dispatch({
			type: ActionType.SET_DISPLAY_TICKET_DATE,
			displayTicketDate,
		});
	};

	const setShowTickets = (showTickets) => {
		dispatch({
			type: ActionType.SET_SHOW_TICKETS,
			showTickets,
		});
	};

	const setTicketsSortedBy = (ticketsSortedBy) => {
		dispatch({
			ticketsSortedBy,
			type: ActionType.SET_TICKETS_SORTED_BY,
		});
	};

	const toggleIsChained = () => {
		dispatch({
			type: ActionType.TOGGLE_IS_CHAINED,
		});
	};

	return {
		...state,
		setDisplayTicketDate,
		setShowTickets,
		setTicketsSortedBy,
		toggleIsChained,
	};
};

interface Action {
	type: ActionType;
}

const reducer = (state, action) => {
	const { displayTicketDate, showTickets, ticketsSortedBy } = action;
	let processedDates = [];

	switch (action.type) {
		case ActionType.SET_DISPLAY_TICKET_DATE:
			return { ...state, displayTicketDate };
		case ActionType.SET_SHOW_TICKETS:
			processedDates = filters({ tickets: state.tickets, show: showTickets });

			return { ...state, processedDates, showTickets };
		case ActionType.SET_TICKETS_SORTED_BY:
			return { ...state, ticketsSortedBy };
		case ActionType.TOGGLE_IS_CHAINED:
			return { ...state, isChained: !state.isChained };

		default:
			throw new Error('Unexpected action');
	}
};

export default useTicketListFilterState;
