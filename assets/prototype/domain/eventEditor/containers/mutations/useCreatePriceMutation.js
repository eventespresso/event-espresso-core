import { useMutation } from '@apollo/react-hooks';
import { CREATE_PRICE } from './prices';
import { GET_PRICES } from '../queries/prices';

import useToaster from '../../../../infrastructure/services/toaster/useToaster';
import useRelations from '../../../../infrastructure/services/relations/useRelations';

/**
 * @todo replace `tickets` with `useTicketsIn()`
 */
const useCreatePriceMutation = ({ tickets, ticketId }) => {
	const toaster = useToaster();
	const { updateRelations } = useRelations();
	const id = 0;
	const toasterMessage = 'creating new price';
	const [createPrice, { loading, error }] = useMutation(CREATE_PRICE, {
		onCompleted: () => {
			toaster.dismiss(toasterMessage);
			toaster.success('price successfully created');
		},
		onError: (error) => {
			toaster.dismiss(toasterMessage);
			toaster.error(error);
		},
	});
	toaster.loading(loading, toasterMessage);
	toaster.error(error);

	const onCreateHandler = ({ name, desc, amount, priceType, isDefault }) => {
		const variables = {
			input: {
				clientMutationId: 'xyz',
				name,
				desc,
				amount,
				priceType,
				isDefault,
			},
		};
		const optimisticResponse = {
			createPrice: {
				__typename: 'CreatePricePayload',
				price: {
					__typename: 'Price',
					priceId: id,
					name,
					desc,
					amount,
					priceType,
					isDefault,
				},
			},
		};

		const update = (
			proxy,
			{
				data: {
					createPrice: { price },
				},
			}
		) => {
			const ticketIn = tickets ? tickets.map(({ id }) => id) : [];
			const options = {
				query: GET_PRICES,
				variables: {
					where: {
						ticketIn,
					},
				},
			};
			// Read the data from our cache for this query.
			/**
			 * @todo use try...catch
			 * */
			const { prices = {} } = proxy.readQuery(options);

			// write the data to cache without
			// mutating the cache directly
			proxy.writeQuery({
				...options,
				data: {
					prices: {
						...prices,
						nodes: [...prices.nodes, price],
					},
				},
			});
			// if it's not the optimistic response
			if (price.id) {
				updateRelations({
					entity: 'prices',
					entityId: price.id,
					relation: 'tickets',
					relationIds: [ticketId],
				});
				updateRelations({
					entity: 'prices',
					entityId: price.id,
					relation: 'priceTypes',
					relationIds: [priceType],
				});
			}
		};

		createPrice({
			variables,
			optimisticResponse,
			update,
		});
	};

	return onCreateHandler;
};

export default useCreatePriceMutation;
