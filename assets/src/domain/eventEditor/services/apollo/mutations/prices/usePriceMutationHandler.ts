import { OperationVariables } from 'apollo-client';
import { pathOr } from 'ramda';

import usePriceQueryOptions from '../../queries/prices/usePriceQueryOptions';
import useOnCreatePrice from './useOnCreatePrice';
import useOnUpdatePrice from './useOnUpdatePrice';
import useOnDeletePrice from './useOnDeletePrice';
import { MutationType, MutationInput } from '../../../../../../application/services/apollo/mutations/types';
import { Price, PriceEdge, PricesList } from '../../types';
import { DEFAULT_PRICE_LIST_DATA as DEFAULT_LIST_DATA } from '../../queries';
import { MutationHandler, OnUpdateFnOptions, MutatorGeneratedObject } from '../types';

/**
 *
 */
const usePriceMutationHandler = (): MutationHandler => {
	const options = usePriceQueryOptions();

	const onCreatePrice = useOnCreatePrice();
	const onUpdatePrice = useOnUpdatePrice();
	const onDeletePrice = useOnDeletePrice();

	const createVariables = (mutationType: MutationType, input: MutationInput): OperationVariables => {
		const mutationInput: MutationInput = {
			clientMutationId: `${mutationType}_PRICE`,
			...input,
		};

		return {
			input: mutationInput,
		};
	};

	const mutator = (mutationType: MutationType, input: MutationInput): MutatorGeneratedObject => {
		// `ticketId` must be passed for price creation
		// so as to properly set the relations
		const { ticketId, ...restInput } = input;
		const { priceType: priceTypeId } = input;
		const variables = createVariables(mutationType, restInput);
		/**
		 * @todo update optimisticResponse
		 */
		let optimisticResponse: any;

		const onUpdate = ({ proxy, entity: price }: OnUpdateFnOptions<Price>): void => {
			// Read the existing data from cache.
			let data: PricesList;
			try {
				data = proxy.readQuery<PricesList>(options);
			} catch (error) {
				data = null;
			}
			const prices = pathOr<PriceEdge>(DEFAULT_LIST_DATA, ['espressoPrices'], data);

			switch (mutationType) {
				case MutationType.Create:
					onCreatePrice({ proxy, prices, price, ticketId, priceTypeId });
					break;
				case MutationType.Update:
					onUpdatePrice({ price, priceTypeId });
					break;
				case MutationType.Delete:
					onDeletePrice({ proxy, prices, price });
					break;
			}
		};

		return { variables, optimisticResponse, onUpdate };
	};

	return mutator;
};

export default usePriceMutationHandler;
