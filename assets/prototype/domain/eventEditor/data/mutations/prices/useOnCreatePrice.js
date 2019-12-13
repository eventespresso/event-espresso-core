import useRelations from '../../../../../application/services/apollo/relations/useRelations';

import useUpdatePriceCache from './useUpdatePriceCache';

const useOnCreatePrice = () => {
	const { updateRelations } = useRelations();

	const updatePriceCache = useUpdatePriceCache();

	const onCreatePrice = ({ proxy, price, prices, ticketId, priceTypeId }) => {
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
