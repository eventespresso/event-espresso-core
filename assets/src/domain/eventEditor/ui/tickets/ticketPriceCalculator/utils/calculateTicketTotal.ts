import { pathOr, reduce } from 'ramda';

import ticketTotalCalculator from './ticketTotalCalculator';
import { DataState } from '../data';
import { TpcPriceModifier } from '../types';
import { Ticket } from '@edtrServices/apollo';
import { sortByPriceOrderIdAsc } from '@sharedEntities/prices/predicates/sortingPredicates';

const calculateTicketTotal = (state: DataState): DataState['ticket']['price'] => {
	const ticket = pathOr<Ticket>(null, ['ticket'], state);
	if (!ticket) {
		return null;
	}
	const allPrices = pathOr<TpcPriceModifier[]>(null, ['prices'], state);
	if (!allPrices.length) {
		return ticket.price;
	}

	/**
	 * @todo Make sure the base price (or non percent price) is at the beginning of the list,
	 * otherwise if a percent price ends up at the beginning, it will have
	 * no effect on total becaue of multiply by intial total which is 0.
	 * May be same applies to the sorting in `calculateBasePrice`
	 */
	const sortedModifiers = sortByPriceOrderIdAsc(allPrices);
	const newTicketTotal = reduce(ticketTotalCalculator, 0, sortedModifiers);

	return newTicketTotal;
};

export default calculateTicketTotal;
