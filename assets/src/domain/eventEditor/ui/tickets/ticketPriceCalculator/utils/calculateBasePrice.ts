import { filter, reduce } from 'ramda';

import basePriceCalculator from './basePriceCalculator';
import { TpcPriceModifier } from '../types';
import { DataState } from '../data';
import { isNotBasePrice } from '@sharedEntities/prices/predicates/selectionPredicates';
import { sortByPriceOrderIdDesc } from '@sharedEntities/prices/predicates/sortingPredicates';
import { updateBasePriceAmount } from '@sharedEntities/prices/predicates/updatePredicates';
import { FormatAmountFunction } from '@application/services/utilities/money/formatAmount';

const calculateBasePrice = (state: DataState, formatAmount: FormatAmountFunction): DataState['prices'] => {
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
	const newPrices = updateBasePriceAmount<TpcPriceModifier>({
		prices: state.prices,
		amount: parseFloat(formatAmount(newBasePrice)),
	});
	return newPrices;
};

export default calculateBasePrice;
