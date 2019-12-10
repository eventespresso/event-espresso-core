import { useMutation } from '@apollo/react-hooks';
import { UPDATE_PRICE } from './prices';
import useInitToaster from '../../../../infrastructure/services/toaster/useInitToaster';
import useRelations from '../../../../infrastructure/services/relations/useRelations';

const useUpdatePriceMutation = ({ id = 0 }) => {
	const { updateRelations } = useRelations();

	const {
		onCompleted,
		onError,
		initializationNotices,
	} = useInitToaster({
		loadingMessage: `updating price ${id}`,
		successMessage: `price ${id} successfully updated`
	});

	const [updatePrice, { loading, error }] = useMutation(UPDATE_PRICE, { onCompleted, onError });

	initializationNotices(loading, error);

	const updateHandler = ({ name, desc, amount, priceType, isDefault }) => {
		const variables = {
			clientMutationId: 'xyz',
			id,
			name,
			desc,
			amount,
			priceType,
			isDefault,
		};

		const update = (
			_,
			{
				data: {
					createPrice: { price },
				},
			}
		) => {
			// if it's not the optimistic response
			// and priceType has been updated.
			if (price.id && price.priceType) {
				// Make sure to update the priceType relation
				updateRelations({
					entity: 'prices',
					entityId: price.id,
					relation: 'priceTypes',
					relationIds: [price.priceType],
				});
			}
		};

		updatePrice({
			variables,
			update,
		});
	};

	return updateHandler;
};

export default useUpdatePriceMutation;
