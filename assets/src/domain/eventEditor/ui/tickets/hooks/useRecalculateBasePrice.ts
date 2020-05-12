import { useCallback } from 'react';

import { EntityId } from '@dataServices/types';
import { useInitialState } from '@edtrUI/tickets/ticketPriceCalculator/data';
import { calculateBasePrice } from '@edtrUI/tickets/ticketPriceCalculator/utils';
import { isBasePrice } from '@sharedEntities/priceTypes/predicates';
import { usePriceMutator } from '@edtrServices/apollo/mutations';

const useRecalculateBasePrice = (ticketId: EntityId): VoidFunction => {
	// This will give us the exact state expected by `calculateBasePrice()`
	const getDataState = useInitialState({ ticketId });
	const { updateEntity } = usePriceMutator();

	return useCallback(() => {
		// get the list of updated prices with the amount of base price updated
		const newPrices = calculateBasePrice(getDataState(null));
		// the price if present should be the basePrice
		const [basePrice] = newPrices.filter(isBasePrice);

		// if we are lucky
		if (basePrice?.id) {
			const { id, amount } = basePrice;
			// update the base price
			updateEntity({ id, amount });
		}
	}, [getDataState, updateEntity]);
};

export default useRecalculateBasePrice;
