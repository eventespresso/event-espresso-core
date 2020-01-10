import { filter, pathOr, propSatisfies, reduce } from 'ramda';

import ticketTotalCalculator from './ticketTotalCalculator';
import { TpcFormData } from '../types';
import { Price, Ticket } from '../../../data/types';
import { sortByPriceOrderIdAsc } from '../../../../shared/predicates/prices/sortingPredicates';
import { updateTicketPriceForTicket } from '../../../../shared/predicates/tickets/selectionPredicates';

const notNewPrice = propSatisfies((id) => id !== 'NEW_PRICE', 'id');
const NOT_A_TICKET = { id: '' };
const EMPTY_ARRAY = [];

const calculateTicketTotal = (state: TpcFormData): TpcFormData => {
	const ticket = pathOr<Ticket | { id: '' }>(NOT_A_TICKET, ['ticket'], state);
	if (ticket === NOT_A_TICKET) {
		return state;
	}
	const allPrices: Price[] = pathOr<Price[]>(EMPTY_ARRAY, ['prices'], state);
	if (allPrices === EMPTY_ARRAY) {
		return state;
	}
	// we're calculating the ticket total but the last element
	// should be the "NEW_PRICE" row and we don't want it
	const modifiers: Price[] = filter<Price>(notNewPrice, allPrices);
	const sortedModifiers: Price[] = sortByPriceOrderIdAsc(modifiers);
	const newTicketTotal: number = reduce(ticketTotalCalculator, 0, sortedModifiers);
	const tickets: Ticket[] = updateTicketPriceForTicket({
		tickets: [ticket],
		guid: ticket.id,
		amount: newTicketTotal,
	});
	const newTicket = tickets.pop();
	return { ...state, ticket: newTicket };
};

export default calculateTicketTotal;
