/**
 * External imports
 */
import { filter, pathOr, propOr, propSatisfies, reduce } from 'ramda';

/**
 * Internal imports
 */
import basePriceCalculator from './basePriceCalculator';
import { isNotBasePrice } from '../../../../shared/predicates/prices/selectionPredicates';
import { sortByPriceOrderIdDesc } from '../../../../shared/predicates/prices/sortingPredicates';
import { updateBasePriceAmount } from '../../../../shared/predicates/prices/updatePredicates';

const notNewPrice = propSatisfies((prop) => prop !== 'NEW_PRICE', 'id');
const NOT_A_TICKET = {};
const EMPTY_ARRAY = [];

const useCalculateBasePrice = (state) => {
	const ticket = pathOr(NOT_A_TICKET, ['ticket'], state);
	if (ticket === NOT_A_TICKET) {
		return state;
	}
	const allPrices = pathOr(EMPTY_ARRAY, ['prices'], state);
	if (allPrices === EMPTY_ARRAY) {
		return state;
	}
	// we're calculating the base price so we don't want to include it in the calculations
	const withoutBasePrice = filter(isNotBasePrice, allPrices);
	// and the last element should be the "NEW_PRICE" row and we don't want it either
	const justModifiers = filter(notNewPrice, withoutBasePrice);
	const sortedModifiers = sortByPriceOrderIdDesc(justModifiers);
	// now extract the value for "total" or set to 0
	const ticketTotal = propOr(0, 'price', ticket);
	const newBasePrice = reduce(basePriceCalculator, ticketTotal, sortedModifiers);
	const newPrices = updateBasePriceAmount({
		prices: state.prices,
		amount: newBasePrice,
	});
	return { ticket, prices: newPrices };
};

export default useCalculateBasePrice;
