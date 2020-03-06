import { Action, ActionType, FilterState } from './types';
import { DisplayDates } from '@edtrInterfaces/types';
import { ShowTickets, SortTicketsBy } from '../../../../../interfaces/ticket/types';
import { Ticket } from '../../../../../services/apollo/types';
import filters from '../../../../../../shared/entities/tickets/predicates/filters';
import sorters from '../../../../../../shared/entities/tickets/predicates/sorters';

const reducer = (state: FilterState, action: Action): FilterState => {
	let newState = state;
	let filteredEntities = [];

	switch (action.type) {
		case ActionType.SET_TICKETS:
			const tickets: Ticket[] = action.payload;
			newState = { ...state, tickets, filteredEntities: tickets };
			break;

		case ActionType.SET_DISPLAY_TICKET_DATE:
			const displayTicketDate: DisplayDates = action.payload;
			newState = { ...state, displayTicketDate };
			break;

		case ActionType.SET_SHOW_TICKETS:
			const showTickets: ShowTickets = action.payload;
			filteredEntities = filters({ tickets: state.tickets, show: showTickets });
			newState = { ...state, filteredEntities, showTickets };
			break;

		case ActionType.SET_SORT_TICKETS:
			const sortTicketsBy: SortTicketsBy = action.payload;
			filteredEntities = sorters({ tickets: state.tickets, order: sortTicketsBy });
			newState = { ...state, filteredEntities, sortTicketsBy };
			break;

		case ActionType.TOGGLE_IS_CHAINED:
			newState = { ...state, isChained: !state.isChained };
			break;
	}
	//console.log('%c newState', 'color: DarkOrange;', newState);
	return newState;
};

export default reducer;
