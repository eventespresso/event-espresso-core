import { useCallback } from 'react';

import { EntityId } from '@dataServices/types';
import { useInitialState } from '@edtrUI/tickets/ticketPriceCalculator/data';
import { calculateBasePrice } from '@edtrUI/tickets/ticketPriceCalculator/utils';
import { getBasePrice } from '@sharedEntities/prices/predicates/selectionPredicates';
import { useTicketMutator } from '@edtrServices/apollo/mutations';
import { useDefaultBasePrice, useMutatePrices } from '../ticketPriceCalculator/hooks';

type Callback = (ticketPrice: number) => void;

const useRecalculateBasePrice = (ticketId: EntityId): Callback => {
	// This will give us the exact state expected by `calculateBasePrice()`
	const getDataState = useInitialState({ ticketId });
	// This default price will be added if there is none
	const defaultBasePrice = useDefaultBasePrice();
	const mutatePrices = useMutatePrices();
	const { updateEntity: updateTicket } = useTicketMutator(ticketId);

	return useCallback<Callback>(
		(ticketPrice) => {
			let tpcData = getDataState(null);
			const exitingBasePrice = getBasePrice(tpcData?.prices);
			// if the ticket does not have a base price,
			// that means it was free and now a price has been added ¯\_(ツ)_/¯
			if (!exitingBasePrice) {
				const newPrices = [
					// add the default price
					{ ...defaultBasePrice, order: 1, isNew: true },
					// add the existing ones, just in case we are dealing with aliens,
					// don't get me wrong, because only they can have other prices without a base price,
					// may be their taxation systen works differently, who knows ¯\_(ツ)_/¯
					...tpcData?.prices,
				];
				tpcData = { ...tpcData, prices: newPrices };
			}
			// get the list of updated prices with the amount of base price updated
			const newPrices = calculateBasePrice(tpcData);

			mutatePrices(newPrices).then((relatedPriceIds) => {
				updateTicket({
					// this is the ticket prices amount
					price: ticketPrice,
					// since ticket price has been changed, we need to go in reverse gear ◀️
					reverseCalculate: true,
					// Make sure related prices are updated
					prices: relatedPriceIds,
				});
			});
		},
		[getDataState, mutatePrices, updateTicket]
	);
};

export default useRecalculateBasePrice;
