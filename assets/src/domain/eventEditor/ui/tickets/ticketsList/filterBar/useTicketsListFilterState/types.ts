import { DisplayDates, ShowTickets, SortTicketsBy } from '../../../../../interfaces/ticket/types';
import { Ticket } from '../../../../../services/apollo/types';

export interface Action {
	payload: any;
	type: ActionType;
}

export enum ActionType {
	SET_DISPLAY_TICKET_DATE = 'SET_DISPLAY_TICKET_DATE',
	SET_SHOW_TICKETS = 'SET_SHOW_TICKETS',
	SET_SORT_TICKETS = 'SET_SORT_TICKETS',
	SET_TICKETS = 'SET_TICKETS',
	TOGGLE_IS_CHAINED = 'TOGGLE_IS_CHAINED',
}

export interface FilterState {
	displayTicketDate: DisplayDates;
	isChained: boolean;
	filteredEntities: Ticket[];
	showTickets: ShowTickets;
	tickets: Ticket[];
	sortTicketsBy: SortTicketsBy;
}

export interface FilterStateManager extends FilterState {
	setSortTicketsBy: (sortTicketsBy: SortTicketsBy) => void;
	setDisplayTicketDate: (displayDates: DisplayDates) => void;
	setShowTickets: (showTickets: ShowTickets) => void;
	toggleIsChained: () => void;
}
