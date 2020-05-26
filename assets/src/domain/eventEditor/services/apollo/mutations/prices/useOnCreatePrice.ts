import { useCallback } from 'react';

import useUpdatePriceCache from './useUpdatePriceCache';
import { PriceMutationCallbackFn, PriceMutationCallbackFnArgs } from '../types';
import { useRelations } from '@appServices/apollo/relations';

const useOnCreatePrice = (): PriceMutationCallbackFn => {
	const { updateRelations } = useRelations();

	const updatePriceCache = useUpdatePriceCache();

	const onCreatePrice = useCallback(
		({ proxy, price, prices, ticketId, priceTypeId }: PriceMutationCallbackFnArgs): void => {
			const { id: priceId } = price;
			if (priceId) {
				updateRelations({
					entity: 'prices',
					entityId: priceId,
					relation: 'tickets',
					relationIds: [ticketId],
				});
				updateRelations({
					entity: 'prices',
					entityId: priceId,
					relation: 'priceTypes',
					relationIds: [priceTypeId],
				});
			}
			// Update price cache.
			updatePriceCache({ proxy, prices, price, action: 'add' });
		},
		[updatePriceCache, updateRelations]
	);

	return onCreatePrice;
};

export default useOnCreatePrice;
