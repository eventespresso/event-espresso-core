import { useRelations, RelationsManager } from '../../../../../../application/services/apollo/relations';
import { PriceMutationCallbackFn, PriceMutationCallbackFnArgs } from '../types';

const useOnUpdatePrice = (): PriceMutationCallbackFn => {
	const { updateRelations } = useRelations() as RelationsManager;

	const onUpdatePrice = ({ price, priceTypeId }: PriceMutationCallbackFnArgs): void => {
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
