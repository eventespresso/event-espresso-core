import { filter, pathOr, propSatisfies, reduce } from 'ramda';

import ticketTotalCalculator from './ticketTotalCalculator';
import { TpcPriceModifier, TpcFormData } from '../types';
import { Ticket } from '../../../../services/apollo/types';
import { sortByPriceOrderIdAsc } from '../../../../../shared/entities/prices/predicates/sortingPredicates';
import { updateTicketPriceForTicket } from '../../../../../shared/entities/tickets/predicates/selectionPredicates';

const notNewPrice = propSatisfies((id) => id !== 'NEW_PRICE', 'id');

const calculateTicketTotal = (state: TpcFormData): TpcFormData => {
	const ticket = pathOr<Ticket>(null, ['ticket'], state);
	if (!ticket) {
		return state;
	}
	const allPrices: TpcPriceModifier[] = pathOr<TpcPriceModifier[]>(null, ['prices'], state);
	if (!allPrices) {
		return state;
	}
	// we're calculating the ticket total but the last element
	// should be the "NEW_PRICE" row and we don't want it
	const modifiers: TpcPriceModifier[] = filter<TpcPriceModifier>(notNewPrice, allPrices);
	const sortedModifiers: TpcPriceModifier[] = sortByPriceOrderIdAsc(modifiers);
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
