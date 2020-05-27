import { useCallback } from 'react';
import { assocPath, pick } from 'ramda';

import { StateInitializer } from './types';
import { BaseProps, TpcPriceModifier } from '../types';
import { sortByPriceOrderIdAsc } from '@sharedEntities/prices/predicates/sortingPredicates';
import { ticketFieldsToUse } from '../utils/constants';
import { useRelations } from '@appServices/apollo/relations';
import { useTicketItem, useTicketPrices, usePriceTypes } from '@edtrServices/apollo/queries';
import type { Ticket } from '@edtrServices/apollo/types';
import { useMemoStringify } from '@application/services/hooks';

/**
 * Initializes the data state dynamically by
 * setting the ticket details and the related prices
 */
const useInitialState = ({ ticketId }: BaseProps): StateInitializer => {
	const { getRelations } = useRelations();

	const allPriceTypes = usePriceTypes();

	// convert priceType array to {[id]: order}
	const priceTypeIdOrder = useMemoStringify(
		allPriceTypes.reduce((acc, { id, order }) => assocPath([id], order, acc), {}),
		[allPriceTypes]
	);

	// get the full ticket object
	const wholeTicket = useTicketItem({ id: ticketId });
	const ticket: Partial<Ticket> = useMemoStringify(wholeTicket ? pick(ticketFieldsToUse, wholeTicket) : {});

	// get all related prices
	const unSortedPrices = useTicketPrices(ticketId);
	//sort'em
	const sortedPrices = useMemoStringify(sortByPriceOrderIdAsc(unSortedPrices));

	// convert to TPC price objects by adding
	// "priceType" and "priceTypeOrder"
	const prices = useMemoStringify(
		sortedPrices.map<TpcPriceModifier>((price) => {
			const priceTypes = getRelations({
				entity: 'prices',
				entityId: price.id,
				relation: 'priceTypes',
			});
			// the only priceType in the array
			const [priceTypeId] = priceTypes;
			return { ...price, priceType: priceTypeId, priceTypeOrder: priceTypeIdOrder[priceTypeId] };
		})
	);

	return useCallback<StateInitializer>(
		(initialState) => {
			return { ...initialState, ticket, prices };
		},
		[ticket, prices]
	);
};

export default useInitialState;
