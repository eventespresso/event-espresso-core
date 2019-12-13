import useRelations from '../../../../../application/services/apollo/relations/useRelations';

import useUpdatePriceCache from './useUpdatePriceCache';

const useOnDeletePrice = () => {
	const { dropRelations, removeRelation } = useRelations();

	const updatePriceCache = useUpdatePriceCache();

	const onDeletePrice = ({ proxy, prices, price }) => {
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
