import usePriceQueryOptions from '../../queries/prices/usePriceQueryOptions';
import useOnCreatePrice from './useOnCreatePrice';
import useOnUpdatePrice from './useOnUpdatePrice';
import useOnDeletePrice from './useOnDeletePrice';

/**
 *
 */
const usePriceMutator = () => {
	const options = usePriceQueryOptions();

	const onCreatePrice = useOnCreatePrice();
	const onUpdatePrice = useOnUpdatePrice();
	const onDeletePrice = useOnDeletePrice();

	const createVariables = (mutationType, input) => {
		const mutationInput = {
			clientMutationId: `${mutationType}_PRICE`,
			...input,
		};

		return {
			input: mutationInput,
		};
	};

	const mutator = (mutationType, input) => {
		// `ticketId` must be passed for price creation
		// so as to properly set the relations
		const { ticketId, ...restInput } = input;
		const { priceType: priceTypeId } = input;
		const variables = createVariables(mutationType, restInput);
		/**
		 * @todo update optimisticResponse
		 */
		let optimisticResponse;

		const onUpdate = ({ proxy, entity: price }) => {
			// Read the existing data from cache.
			const { espressoPrices: prices = {} } = proxy.readQuery(options);

			switch (mutationType) {
				case 'CREATE':
					onCreatePrice({ proxy, prices, price, ticketId, priceTypeId });
					break;
				case 'UPDATE':
					onUpdatePrice({ price, priceTypeId });
					break;
				case 'DELETE':
					onDeletePrice({ proxy, prices, price });
					break;
			}
		};

		return { variables, optimisticResponse, onUpdate };
	};

	return mutator;
};

export default usePriceMutator;
