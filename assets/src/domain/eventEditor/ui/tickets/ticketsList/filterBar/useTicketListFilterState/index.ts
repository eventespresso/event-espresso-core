/**
 * External dependencies
 */
import { useReducer } from 'react';

/**
 * Internal dependencies
 */
import filters from '@sharedEntities/tickets/predicates/filters';
import sorters from '@sharedEntities/tickets/predicates/sorters';
import { DisplayDates, ShowTickets, SortTicketsBy } from '@edtrInterfaces/ticket/types';
import { Ticket } from '@edtrServices/apollo/types';

enum ActionType {
	SET_DISPLAY_TICKET_DATE = 'SET_DISPLAY_TICKET_DATE',
	SET_SHOW_TICKETS = 'SET_SHOW_TICKETS',
	SET_SORT_TICKETS = 'SET_SORT_TICKETS',
	TOGGLE_IS_CHAINED = 'TOGGLE_IS_CHAINED',
}

interface TicketListFilterState {
	displayTicketDate: DisplayDates;
	isChained: boolean;
	processedTickets: Ticket[];
	showTickets: ShowTickets;
	tickets: Ticket[];
	sortTicketsBy: SortTicketsBy;
}

interface TicketsListFilterStateManager extends TicketListFilterState {
	setSortTicketsBy: (sortTicketsBy: SortTicketsBy) => void;
	setDisplayTicketDate: (displayDates: DisplayDates) => void;
	setShowTickets: (showTickets: ShowTickets) => void;
	toggleIsChained: () => void;
}

const useTicketListFilterState = (tickets: Ticket[] = []): TicketsListFilterStateManager => {
	const initialState = {
		displayTicketDate: DisplayDates.start,
		isChained: false,
		processedTickets: [],
		showTickets: ShowTickets.all,
		tickets,
		sortTicketsBy: SortTicketsBy.date,
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	const setDisplayTicketDate = (displayTicketDate: DisplayDates): void => {
		dispatch({
			type: ActionType.SET_DISPLAY_TICKET_DATE,
			displayTicketDate,
		});
	};

	const setShowTickets = (showTickets: ShowTickets): void => {
		dispatch({
			type: ActionType.SET_SHOW_TICKETS,
			showTickets,
		});
	};

	const setSortTicketsBy = (sortTicketsBy: SortTicketsBy): void => {
		dispatch({
			sortTicketsBy,
			type: ActionType.SET_SORT_TICKETS,
		});
	};

	const toggleIsChained = (): void => {
		dispatch({
			type: ActionType.TOGGLE_IS_CHAINED,
		});
	};

	return {
		...state,
		setDisplayTicketDate,
		setShowTickets,
		setSortTicketsBy,
		toggleIsChained,
	};
};

interface Action {
	displayTicketDate?: DisplayDates;
	type: ActionType;
	showTickets?: ShowTickets;
	sortTicketsBy?: SortTicketsBy;
}

const reducer = (state: TicketListFilterState, action: Action): TicketListFilterState => {
	const { displayTicketDate, showTickets, sortTicketsBy } = action;
	let processedTickets = [];

	switch (action.type) {
		case ActionType.SET_DISPLAY_TICKET_DATE:
			return { ...state, displayTicketDate };
		case ActionType.SET_SHOW_TICKETS:
			processedTickets = filters({ tickets: state.tickets, show: showTickets });
			return { ...state, processedTickets, showTickets };
		case ActionType.SET_SORT_TICKETS:
			processedTickets = sorters({ tickets: state.tickets, order: sortTicketsBy });
			return { ...state, processedTickets, sortTicketsBy };
		case ActionType.TOGGLE_IS_CHAINED:
			return { ...state, isChained: !state.isChained };

		default:
			throw new Error('Unexpected action');
	}
};

export default useTicketListFilterState;
