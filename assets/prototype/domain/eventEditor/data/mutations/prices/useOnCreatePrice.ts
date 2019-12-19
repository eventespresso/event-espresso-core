import { useRelations, RelationsManager } from '../../../../../application/services/apollo/relations';
import { PriceMutationCallbackFn, PriceMutationCallbackFnArgs, CacheUpdaterFn } from '../types';
import useUpdatePriceCache from './useUpdatePriceCache';

const useOnCreatePrice = (): PriceMutationCallbackFn => {
	const { updateRelations } = useRelations() as RelationsManager;

	const updatePriceCache: CacheUpdaterFn = useUpdatePriceCache();

	const onCreatePrice = ({ proxy, price, prices, ticketId, priceTypeId }: PriceMutationCallbackFnArgs): void => {
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
		updatePriceCache({ proxy, prices, price });
	};

	return onCreatePrice;
};

export default useOnCreatePrice;
