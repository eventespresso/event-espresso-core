import { useCallback } from 'react';

import { PriceMutationCallbackFn, PriceMutationCallbackFnArgs } from '../types';
import { useRelations } from '@appServices/apollo/relations';

const useOnUpdatePrice = (): PriceMutationCallbackFn => {
	const { updateRelations } = useRelations();

	const onUpdatePrice = useCallback(
		({ price, priceTypeId }: PriceMutationCallbackFnArgs): void => {
			const { id: priceId } = price;
			// if it's not the optimistic response
			// and priceType has been updated.
			if (priceId && priceTypeId) {
				// Make sure to update the priceType relation
				updateRelations({
					entity: 'prices',
					entityId: priceId,
					relation: 'priceTypes',
					relationIds: [priceTypeId],
				});
			}
		},
		[updateRelations]
	);

	return onUpdatePrice;
};

export default useOnUpdatePrice;
