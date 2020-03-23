import { filter, pathOr, propOr, reduce } from 'ramda';

import basePriceCalculator from './basePriceCalculator';
import { TpcPriceModifier } from '../types';
import { DataState } from '../data';
import { Ticket } from '@edtrServices/apollo';
import { isNotBasePrice } from '@sharedEntities/prices/predicates/selectionPredicates';
import { sortByPriceOrderIdDesc } from '@sharedEntities/prices/predicates/sortingPredicates';
import { updateBasePriceAmount } from '@sharedEntities/prices/predicates/updatePredicates';

const calculateBasePrice = (state: DataState): DataState['prices'] => {
	const ticket = pathOr<Ticket>(null, ['ticket'], state);
	if (!ticket) {
		return state.prices;
	}

	const allPrices = pathOr<TpcPriceModifier[]>(null, ['prices'], state);
	if (!allPrices.length) {
		return state.prices;
	}
	// we're calculating the base price so we don't want to include it in the calculations
	const withoutBasePrice = filter<TpcPriceModifier>(isNotBasePrice, allPrices);
	const sortedModifiers = sortByPriceOrderIdDesc(withoutBasePrice);
	// now extract the value for "total" or set to 0
	const ticketTotal = propOr<number, Ticket, number>(0, 'price', ticket);
	const newBasePrice = reduce<TpcPriceModifier, number>(basePriceCalculator, ticketTotal, sortedModifiers);
	const newPrices = updateBasePriceAmount<TpcPriceModifier>({
		prices: state.prices,
		amount: newBasePrice,
	});
	return newPrices;
};

export default calculateBasePrice;
