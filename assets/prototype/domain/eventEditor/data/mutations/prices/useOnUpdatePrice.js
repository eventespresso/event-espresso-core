import useRelations from '../../../../../application/services/apollo/relations/useRelations';

const useOnUpdatePrice = () => {
	const { updateRelations } = useRelations();

	const onUpdatePrice = ({ price, priceTypeId }) => {
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
	};

	return onUpdatePrice;
};

export default useOnUpdatePrice;
