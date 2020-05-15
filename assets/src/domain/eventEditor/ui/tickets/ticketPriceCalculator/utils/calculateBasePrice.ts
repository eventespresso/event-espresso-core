import { filter, reduce } from 'ramda';

import basePriceCalculator from './basePriceCalculator';
import { TpcPriceModifier } from '../types';
import { DataState } from '../data';
import { isNotBasePrice } from '@sharedEntities/prices/predicates/selectionPredicates';
import { sortByPriceOrderIdDesc } from '@sharedEntities/prices/predicates/sortingPredicates';
import { updateBasePriceAmount } from '@sharedEntities/prices/predicates/updatePredicates';
import { parsedAmount } from '@application/services/utilities/money';

const calculateBasePrice = (state: DataState): DataState['prices'] => {
	const ticket = state?.ticket;
	if (!ticket) {
		return state.prices;
	}

	const allPrices = state?.prices;
	if (!allPrices?.length) {
		return state.prices;
	}
	// we're calculating the base price so we don't want to include it in the calculations
	const withoutBasePrice = filter<TpcPriceModifier>(isNotBasePrice, allPrices);
	const sortedModifiers = sortByPriceOrderIdDesc(withoutBasePrice);
	// now extract the value for "total" or set to 0
	const ticketTotal = ticket?.price || 0;
	const newBasePrice = reduce<TpcPriceModifier, number>(basePriceCalculator, ticketTotal, sortedModifiers);
	// Save the price upto 6 decimals places
	const amount = parsedAmount(newBasePrice).toFixed(6);
	const newPrices = updateBasePriceAmount<TpcPriceModifier>({
		prices: state.prices,
		amount: parsedAmount(amount),
	});
	return newPrices;
};

export default calculateBasePrice;
