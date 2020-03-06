import { useEffect, useReducer } from 'react';

import reducer from './reducer';
import { ActionType, FilterState, FilterStateManager } from './types';
import { DisplayDates } from '@edtrInterfaces/types';
import { ShowTickets, SortTicketsBy } from '../../../../../interfaces/ticket/types';
import { Ticket } from '../../../../../services/apollo/types';

const useTicketsListFilterState = (tickets: Ticket[] = []): FilterStateManager => {
	const initialState: FilterState = {
		displayTicketDate: DisplayDates.start,
		filteredEntities: [],
		isChained: false,
		showTickets: ShowTickets.all,
		sortTicketsBy: SortTicketsBy.date,
		tickets,
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		if (Array.isArray(state.tickets) && state.tickets.length < 1 && Array.isArray(tickets) && tickets.length > 0) {
			dispatch({
				type: ActionType.SET_TICKETS,
				payload: tickets,
			});
		}
	});

	const setDisplayTicketDate = (displayTicketDate: DisplayDates): void => {
		dispatch({
			type: ActionType.SET_DISPLAY_TICKET_DATE,
			payload: displayTicketDate,
		});
	};

	const setShowTickets = (showTickets: ShowTickets): void => {
		dispatch({
			type: ActionType.SET_SHOW_TICKETS,
			payload: showTickets,
		});
	};

	const setSortTicketsBy = (sortTicketsBy: SortTicketsBy): void => {
		dispatch({
			payload: sortTicketsBy,
			type: ActionType.SET_SORT_TICKETS,
		});
	};

	const toggleIsChained = (): void => {
		dispatch({
			type: ActionType.TOGGLE_IS_CHAINED,
			payload: null,
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

export default useTicketsListFilterState;
