import get from 'lodash/get';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_PRICE } from './prices';
import { GET_PRICES } from '../queries/prices';
import useInitToaster from '../../../../infrastructure/services/toaster/useInitToaster';
import useRelations from '../../../../infrastructure/services/relations/useRelations';

const useDeletePriceMutation = ({ ticketIn, id }) => {
	const { removeRelation, dropRelations } = useRelations();

	const {
		onCompleted,
		onError,
		initializationNotices,
	} = useInitToaster({
		loadingMessage: `deleting price ${id}`,
		successMessage: `price ${id} successfully deleted`
	});

	const [deletePrice, { loading, error }] = useMutation(DELETE_PRICE, { onCompleted, onError });

	initializationNotices(loading, error);

	const variables = { input: { clientMutationId: 'xyz', id } };

	const update = (proxy, { data }) => {
		const price = get(data, ['deletePrice', 'price']);

		const options = {
			query: GET_PRICES,
			variables: {
				where: {
					ticketIn,
				},
			},
		};

		if (price.id) {
			const { prices = {} } = proxy.readQuery(options);

			const nodes = prices.nodes.filter(({ id }) => id !== price.id);

			proxy.writeQuery({
				...options,
				data: {
					prices: {
						...prices,
						nodes,
					},
				},
			});
			// Remove the price from all ticket relations
			removeRelation({
				entity: 'prices',
				entityId: price.id,
				relation: 'tickets',
			});
			// Drop all the relations for the price
			dropRelations({
				entity: 'prices',
				entityId: price.id,
			});
		}
	};

	return () => deletePrice({ variables, update });
};

export default useDeletePriceMutation;
