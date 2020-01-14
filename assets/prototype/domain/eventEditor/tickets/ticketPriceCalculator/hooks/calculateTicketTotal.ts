import { filter, pathOr, propSatisfies, reduce } from 'ramda';

import ticketTotalCalculator from './ticketTotalCalculator';
import { TpcFormData } from '../types';
import { Price, Ticket } from '../../../data/types';
import { sortByPriceOrderIdAsc } from '../../../../shared/predicates/prices/sortingPredicates';
import { updateTicketPriceForTicket } from '../../../../shared/predicates/tickets/selectionPredicates';

const notNewPrice = propSatisfies((id) => id !== 'NEW_PRICE', 'id');

const calculateTicketTotal = (state: TpcFormData): TpcFormData => {
	const ticket = pathOr<Ticket>(null, ['ticket'], state);
	if (!ticket) {
		return state;
	}
	const allPrices: Price[] = pathOr<Price[]>(null, ['prices'], state);
	if (!allPrices) {
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
