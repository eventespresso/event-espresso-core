import { useRelations, RelationsManager } from '../../../../../application/services/apollo/relations';
import { PriceMutationCallbackFn, PriceMutationCallbackFnArgs, CacheUpdaterFn } from '../types';
import useUpdatePriceCache from './useUpdatePriceCache';

const useOnDeletePrice = (): PriceMutationCallbackFn => {
	const { dropRelations, removeRelation } = useRelations() as RelationsManager;

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
		updatePriceCache({ proxy, prices, price, remove: true });
	};

	return onDeletePrice;
};

export default useOnDeletePrice;
