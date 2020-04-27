import useUpdatePriceCache from './useUpdatePriceCache';
import { PriceMutationCallbackFn, PriceMutationCallbackFnArgs } from '../types';
import { useRelations } from '@appServices/apollo/relations';

const useOnDeletePrice = (): PriceMutationCallbackFn => {
	const { dropRelations, removeRelation } = useRelations();

	const updatePriceCache = useUpdatePriceCache();

	const onDeletePrice = ({ proxy, prices, price, deletePermanently }: PriceMutationCallbackFnArgs): void => {
		const { id: priceId } = price;
		const action = deletePermanently ? 'remove' : 'update';
		if (priceId && deletePermanently) {
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
		updatePriceCache({ proxy, prices, price: { ...price, isTrashed: true }, action });
	};

	return onDeletePrice;
};

export default useOnDeletePrice;
