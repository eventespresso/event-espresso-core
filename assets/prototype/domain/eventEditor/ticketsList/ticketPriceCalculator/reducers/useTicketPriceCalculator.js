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

const useTicketPriceCalculator = useCallback((state, action) => {
	console.log('%c calculatorReducer: ', 'color: Khaki ; font-size:18px;');
	console.log('%c > state: ', 'color: Khaki ;', state);
	console.log('%c > action: ', 'color: Khaki ;', action);
	let allPrices;
	let ticket;
	let ticketTotal;
	let sortedModifiers;
	switch (action.type) {

		case 'CALCULATE_BASE_PRICE':
			console.log('%c CALCULATE_BASE_PRICE: ', 'color: Khaki ; font-size:14px;');
			ticket = pathOr({}, ['ticket'], state);
			allPrices = pathOr([], ['prices'], state);
			console.log('%c > allPrices: ', 'color: Khaki ;', allPrices);
			// we're calculating the base price so we don't want to include it in the calculations
			const withoutBasePrice = filter(propEq('isBasePrice', false), allPrices);
			console.log('%c > withoutBasePrice: ', 'color: Khaki ;', withoutBasePrice);
			// and the last element should be the "NEW_PRICE" row and we don't want it either
			const justModifiers = filter(notNewPrice, withoutBasePrice);
			console.log('%c > justModifiers: ', 'color: Khaki ;', justModifiers);
			sortedModifiers = sortByPriceOrderIdDesc(justModifiers)
			console.log('%c > sortedModifiers: ', 'color: Khaki ;', sortedModifiers);
			// now extract the value for "total" or set to 0
			ticketTotal = propOr(0, 'price')(ticket);
			console.log('%c > ticketTotal: ', 'color: Khaki ;', ticketTotal);
			const newBasePrice = reduce(basePriceCalculator, ticketTotal, sortedModifiers);
			console.log('%c > newBasePrice: ', 'color: Khaki ;', newBasePrice);
			const newPrices = updateBasePriceAmount({
				prices: state.prices,
				amount: newBasePrice,
			});
			console.log('%c > newTicketPrices: ', 'color: Khaki ;', newPrices);
			return { ticket, prices: newPrices };

		case 'CALCULATE_TOTAL':
			console.log('%c CALCULATE_TOTAL: ', 'color: Khaki ; font-size:14px;');
			ticket = pathOr({}, ['ticket'], state);
			allPrices = pathOr([], ['prices'], state);
			console.log('%c > allPrices: ', 'color: Khaki ;', allPrices);
			// we're calculating the ticket total but the last element
			// should be the "NEW_PRICE" row and we don't want it
			const modifiers = filter(notNewPrice, allPrices);
			console.log('%c > modifiers: ', 'color: Khaki ;', modifiers);
			sortedModifiers = sortByPriceOrderIdAsc(modifiers)
			console.log('%c > sortedModifiers: ', 'color: Khaki ;', sortedModifiers);
			const newTicketTotal = reduce(ticketTotalCalculator, 0, sortedModifiers);
			console.log('%c > newTicketTotal: ', 'color: Khaki ;', newTicketTotal);
			console.log('%c > ticket: ', 'color: Khaki ;', ticket);
			const tickets = updateTicketPriceForTicket({
				tickets: [ticket],
				guid: ticket.id,
				amount: newTicketTotal,
			});
			const newTicket = tickets.pop();
			console.log('%c > newTicket: ', 'color: Khaki ;', newTicket);
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
