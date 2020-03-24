import useUpdatePriceCache from './useUpdatePriceCache';
import { PriceMutationCallbackFn, PriceMutationCallbackFnArgs, CacheUpdaterFn } from '../types';
import { useRelations } from '@appServices/apollo/relations';

const useOnDeletePrice = (): PriceMutationCallbackFn => {
	const { dropRelations, removeRelation } = useRelations();

	const updatePriceCache: CacheUpdaterFn = useUpdatePriceCache();

	const onDeletePrice = ({ proxy, prices, price }: PriceMutationCallbackFnArgs): void => {
		const { id: priceId } = price;
		if (priceId) {
			// Remove the price from all tickets relations
			removeRelation({
				entity: 'prices',
				entityId: priceId,
				relation: 'tickets',
			});
			// Drop all the relations for the price
			dropRelations({
				entity: 'prices',
				entityId: priceId,
			});
		}
		// Update price cache.
		updatePriceCache({ proxy, prices, price, action: 'remove' });
	};

	return onDeletePrice;
};

export default useOnDeletePrice;
