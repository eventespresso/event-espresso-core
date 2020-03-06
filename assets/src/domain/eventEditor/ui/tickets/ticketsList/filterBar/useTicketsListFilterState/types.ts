import { DisplayDates } from '@edtrInterfaces/types';
import { ShowTickets, SortTicketsBy } from '@edtrInterfaces/ticket/types';
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

export interface SetDisplayTicketDateInterface {
	(displayDates: DisplayDates): void;
}

export interface SetShowTicketsInterface {
	(showTickets: ShowTickets): void;
}

export interface SetSortTicketsByInterface {
	(sortTicketsBy: SortTicketsBy): void;
}

export interface FilterStateManager extends FilterState {
	setDisplayTicketDate: SetDisplayTicketDateInterface;
	setShowTickets: SetShowTicketsInterface;
	setSortTicketsBy: SetSortTicketsByInterface;
	toggleIsChained: () => void;
}
