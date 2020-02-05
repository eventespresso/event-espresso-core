import { filter, pathOr, propOr, propSatisfies, reduce } from 'ramda';

import basePriceCalculator from './basePriceCalculator';
import { TpcPriceModifier, TpcFormData } from '../types';
import { Ticket } from '../../../data/types';
import { isNotBasePrice } from '../../../../shared/entities/prices/predicates/selectionPredicates';
import { sortByPriceOrderIdDesc } from '../../../../shared/entities/prices/predicates/sortingPredicates';
import { updateBasePriceAmount } from '../../../../shared/entities/prices/predicates/updatePredicates';

const notNewPrice = propSatisfies((prop) => prop !== 'NEW_PRICE', 'id');

const calculateBasePrice = (state: TpcFormData): TpcFormData => {
	const ticket = pathOr<Ticket>(null, ['ticket'], state);
	if (!ticket) {
		return state;
	}
	const allPrices = pathOr<TpcPriceModifier[]>(null, ['prices'], state);
	if (!allPrices) {
		return state;
	}
	// we're calculating the base price so we don't want to include it in the calculations
	const withoutBasePrice = filter<TpcPriceModifier>(isNotBasePrice, allPrices);
	// and the last element should be the "NEW_PRICE" row and we don't want it either
	const justModifiers: TpcPriceModifier[] = filter<TpcPriceModifier>(notNewPrice, withoutBasePrice);
	const sortedModifiers: TpcPriceModifier[] = sortByPriceOrderIdDesc(justModifiers);
	// now extract the value for "total" or set to 0
	const ticketTotal: number = propOr(0, 'price', ticket);
	const newBasePrice = reduce<TpcPriceModifier, number>(basePriceCalculator, ticketTotal, sortedModifiers);
	const newPrices = updateBasePriceAmount<TpcPriceModifier>({
		prices: state.prices,
		amount: newBasePrice,
	});
	return { ticket, prices: newPrices };
};

export default calculateBasePrice;
