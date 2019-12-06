/**
 * External imports
 */
import {filter, pathOr, propEq, propOr, propSatisfies, reduce} from 'ramda';
import {useCallback} from '@wordpress/element';

/**
 * Internal imports
 */
import basePriceCalculator from './basePriceCalculator';
import ticketTotalCalculator from './ticketTotalCalculator';
import {updateBasePriceAmount} from '../../../../shared/entities/prices/selectionPredicates';
import {updateTicketPriceForTicket} from '../../../../shared/entities/tickets/selectionPredicates';
import {sortByPriceOrderIdAsc, sortByPriceOrderIdDesc} from '../../../../shared/entities/prices/sortingPredicates';

const notNewPrice = propSatisfies(prop => prop !== 'NEW_PRICE', 'id');

const useTicketPriceCalculator = () => useCallback((state, action) => {
	let allPrices;
	let ticket;
	let ticketTotal;
	let sortedModifiers;
	switch (action.type) {

		case 'CALCULATE_BASE_PRICE':
			ticket = pathOr({}, ['ticket'], state);
			allPrices = pathOr([], ['prices'], state);
			// we're calculating the base price so we don't want to include it in the calculations
			const withoutBasePrice = filter(propEq('isBasePrice', false), allPrices);
			// and the last element should be the "NEW_PRICE" row and we don't want it either
			const justModifiers = filter(notNewPrice, withoutBasePrice);
			sortedModifiers = sortByPriceOrderIdDesc(justModifiers)
			// now extract the value for "total" or set to 0
			ticketTotal = propOr(0, 'price')(ticket);
			const newBasePrice = reduce(basePriceCalculator, ticketTotal, sortedModifiers);
			const newPrices = updateBasePriceAmount({
				prices: state.prices,
				amount: newBasePrice,
			});
			return { ticket, prices: newPrices };

		case 'CALCULATE_TOTAL':
			ticket = pathOr({}, ['ticket'], state);
			allPrices = pathOr([], ['prices'], state);
			// we're calculating the ticket total but the last element
			// should be the "NEW_PRICE" row and we don't want it
			const modifiers = filter(notNewPrice, allPrices);
			sortedModifiers = sortByPriceOrderIdAsc(modifiers)
			const newTicketTotal = reduce(ticketTotalCalculator, 0, sortedModifiers);
			const tickets = updateTicketPriceForTicket({
				tickets: [ticket],
				guid: ticket.id,
				amount: newTicketTotal,
			});
			const newTicket = tickets.pop();
			return { ...state, ticket: newTicket };

		default:
			return state;
	}
}, [
	basePriceCalculator,
	sortByPriceOrderIdAsc,
	sortByPriceOrderIdDesc,
	ticketTotalCalculator,
	updateBasePriceAmount,
	updateTicketPriceForTicket,
] );

export default useTicketPriceCalculator;
