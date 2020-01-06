/**
 * External imports
 */
import { filter, pathOr, propSatisfies, reduce } from 'ramda';

/**
 * Internal imports
 */
import ticketTotalCalculator from './ticketTotalCalculator';
import { sortByPriceOrderIdAsc } from '../../../../shared/predicates/prices/sortingPredicates';
import { updateTicketPriceForTicket } from '../../../../shared/predicates/tickets/selectionPredicates';

const notNewPrice = propSatisfies((id) => id !== 'NEW_PRICE', 'id');
const NOT_A_TICKET = {};
const EMPTY_ARRAY = [];

const calculateTicketTotal = (state) => {
	const ticket = pathOr(NOT_A_TICKET, ['ticket'], state);
	const allPrices = pathOr(EMPTY_ARRAY, ['prices'], state);
	// we're calculating the ticket total but the last element
	// should be the "NEW_PRICE" row and we don't want it
	const modifiers = filter(notNewPrice, allPrices);
	const sortedModifiers = sortByPriceOrderIdAsc(modifiers);
	const newTicketTotal = reduce(ticketTotalCalculator, 0, sortedModifiers);
	const tickets = updateTicketPriceForTicket({
		tickets: [ticket],
		guid: ticket.id,
		amount: newTicketTotal,
	});
	const newTicket = tickets.pop();
	return { ...state, ticket: newTicket };
};

export default calculateTicketTotal;
