import { useMutation } from '@apollo/react-hooks';
import { UPDATE_PRICE } from './prices';
import useToaster from '../../../../infrastructure/services/toaster/useToaster';
import useRelations from '../../../../infrastructure/services/relations/useRelations';

const useUpdatePriceMutation = ({ id = 0 }) => {
	const toaster = useToaster();
	const { updateRelations } = useRelations();
	const toasterMessage = `updating price ${id}`;
	const [updatePrice, { loading, error }] = useMutation(UPDATE_PRICE, {
		onCompleted: () => {
			toaster.dismiss(toasterMessage);
			toaster.success(`price ${id} successfully updated`);
		},
		onError: (error) => {
			toaster.dismiss(toasterMessage);
			toaster.error(error);
		},
	});

	toaster.loading(loading, toasterMessage);
	toaster.error(error);

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
