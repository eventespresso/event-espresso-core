import { useCallback } from 'react';
import { assocPath, pick } from 'ramda';

import defaultPrice from '../defaultPriceModifier';
import { isBasePrice } from '@sharedEntities/priceTypes/predicates/selectionPredicates';
import { StateInitializer } from './types';
import { BaseProps, TpcPriceModifier } from '../types';
import { sortByPriceOrderIdAsc } from '@sharedEntities/prices/predicates/sortingPredicates';
import { ticketFieldsToUse } from '../utils/constants';
import { updatePriceModifier } from '../utils';
import { usePriceModifier } from '../hooks';
import { useRelations } from '@appServices/apollo/relations';
import { useTicketItem, useTicketPrices, usePriceTypes } from '@edtrServices/apollo';

/**
 * Initializes the data state dynamically by
 * setting the ticket details and the related prices
 */
const useInitialState = ({ ticketId }: BaseProps): StateInitializer => {
	const { getRelations } = useRelations();

	const allPriceTypes = usePriceTypes();
	const [basePriceType] = allPriceTypes.filter(isBasePrice);

	const defaultPriceModifier = usePriceModifier(defaultPrice);
	const basePrice = updatePriceModifier(defaultPriceModifier, basePriceType);

	// convert priceType array to {[id]: order}
	const priceTypeIdOrder = allPriceTypes.reduce((acc, { id, order }) => assocPath([id], order, acc), {});

	// get the full ticket object
	const wholeTicket = useTicketItem({ id: ticketId });
	const ticket = pick(ticketFieldsToUse, wholeTicket);

	// get all related prices
	const unSortedPrices = useTicketPrices(ticketId);
	//sort'em
	const sortedPrices = sortByPriceOrderIdAsc(unSortedPrices);

	// convert to TPC price objects by adding
	// "priceType" and "priceTypeOrder"
	let prices = sortedPrices.map<TpcPriceModifier>((price) => {
		const priceTypes = getRelations({
			entity: 'prices',
			entityId: price.id,
			relation: 'priceTypes',
		});
		// the only priceType in the array
		const priceTypeId = priceTypes[0];
		return { ...price, priceType: priceTypeId, priceTypeOrder: priceTypeIdOrder[priceTypeId] };
	});

	const hasBasePrice = prices.filter(isBasePrice).length;
	// if there is no basePrice
	if (!hasBasePrice) {
		// add the base price with `isNew` flag to make sure it's created on submit
		// `order` as 1 to make sure it remains at the top
		prices = [{ ...basePrice, order: 1, isNew: true }, ...prices];
	}

	return useCallback<StateInitializer>(
		(initialState) => {
			return { ...initialState, ticket, prices };
		},
		[ticket, prices]
	);
};

export default useInitialState;
