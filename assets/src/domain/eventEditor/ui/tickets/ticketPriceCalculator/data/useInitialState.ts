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
import { useTicketItem, useTicketPrices, usePriceTypes, usePrices } from '@edtrServices/apollo/queries';
import type { Ticket } from '@edtrServices/apollo/types';
import { isDefault } from '@sharedEntities/prices/predicates/selectionPredicates';

/**
 * Initializes the data state dynamically by
 * setting the ticket details and the related prices
 */
const useInitialState = ({ ticketId }: BaseProps): StateInitializer => {
	const { getRelations } = useRelations();

	const allPriceTypes = usePriceTypes();
	const allPrices = usePrices();
	const defaultPrices = allPrices.filter(isDefault);
	const [basePriceType] = allPriceTypes.filter(isBasePrice);

	const defaultPriceModifier = usePriceModifier(defaultPrice);
	const basePrice = updatePriceModifier(defaultPriceModifier, basePriceType);

	// convert priceType array to {[id]: order}
	const priceTypeIdOrder = allPriceTypes.reduce((acc, { id, order }) => assocPath([id], order, acc), {});

	// get the full ticket object
	const wholeTicket = useTicketItem({ id: ticketId });
	const ticket: Partial<Ticket> = wholeTicket ? pick(ticketFieldsToUse, wholeTicket) : {};

	// get all related prices
	const unSortedPrices = useTicketPrices(ticketId);

	// convert to TPC price objects by adding
	// "priceType" and "priceTypeOrder"
	let prices = unSortedPrices.map<TpcPriceModifier>((price) => {
		const priceTypes = getRelations({
			entity: 'prices',
			entityId: price.id,
			relation: 'priceTypes',
		});
		// the only priceType in the array
		const [priceTypeId] = priceTypes;
		return { ...price, priceType: priceTypeId, priceTypeOrder: priceTypeIdOrder[priceTypeId] };
	});

	// if it's a new ticket
	if (!ticket.id) {
		defaultPrices.forEach((price) => {
			const priceTypes = getRelations({
				entity: 'prices',
				entityId: price.id,
				relation: 'priceTypes',
			});
			const [priceTypeId] = priceTypes;
			// convert price to TPC price modifier
			const priceModifier: TpcPriceModifier = {
				...price,
				priceType: priceTypeId,
				priceTypeOrder: priceTypeIdOrder[priceTypeId],
			};
			// if it's a tax
			if (price.isTax) {
				// set ticket as taxable
				ticket.isTaxable = true;
				// add the price as it is (without cloning)
				prices = [...prices, priceModifier];
			} else {
				prices = [
					...prices,
					{
						...priceModifier,
						// clone it
						id: '',
						dbId: 0,
						isNew: true,
						// avoid default price getting duplicated
						isDefault: false,
					},
				];
			}
		});
	}
	//sort'em
	let sortedPrices = sortByPriceOrderIdAsc(prices);

	const hasBasePrice = sortedPrices.filter(isBasePrice).length;
	// if there is no basePrice
	if (!hasBasePrice) {
		// add the base price with `isNew` flag to make sure it's created on submit
		// `order` as 1 to make sure it remains at the top
		sortedPrices = [{ ...basePrice, order: 1, isNew: true }, ...sortedPrices];
	}

	return useCallback<StateInitializer>(
		(initialState) => {
			return { ...initialState, ticket, prices: sortedPrices };
		},
		[ticket, prices]
	);
};

export default useInitialState;
