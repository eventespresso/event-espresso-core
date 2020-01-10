import { filter, pathOr, propOr, propSatisfies, reduce } from 'ramda';

import basePriceCalculator from './basePriceCalculator';
import { TpcFormData } from '../types';
import { Price, Ticket } from '../../../data/types';
import { isNotBasePrice } from '../../../../shared/predicates/prices/selectionPredicates';
import { sortByPriceOrderIdDesc } from '../../../../shared/predicates/prices/sortingPredicates';
import { updateBasePriceAmount } from '../../../../shared/predicates/prices/updatePredicates';

const notNewPrice = propSatisfies((prop) => prop !== 'NEW_PRICE', 'id');
const NOT_A_TICKET = {};
const EMPTY_ARRAY = [];

const calculateBasePrice = (state: TpcFormData): TpcFormData => {
	const ticket = pathOr<Ticket | {}>(NOT_A_TICKET, ['ticket'], state);
	if (ticket === NOT_A_TICKET) {
		return state;
	}
	const allPrices = pathOr<Price[]>(EMPTY_ARRAY, ['prices'], state);
	if (allPrices === EMPTY_ARRAY) {
		return state;
	}
	// we're calculating the base price so we don't want to include it in the calculations
	const withoutBasePrice = filter<Price>(isNotBasePrice, allPrices);
	// and the last element should be the "NEW_PRICE" row and we don't want it either
	const justModifiers: Price[] = filter<Price>(notNewPrice, withoutBasePrice);
	const sortedModifiers: Price[] = sortByPriceOrderIdDesc(justModifiers);
	// now extract the value for "total" or set to 0
	const ticketTotal: number = propOr(0, 'price', ticket);
	const newBasePrice = reduce<Price, number>(basePriceCalculator, ticketTotal, sortedModifiers);
	const newPrices = updateBasePriceAmount({
		prices: state.prices,
		amount: newBasePrice,
	});
	return { ticket, prices: newPrices };
};

export default calculateBasePrice;
