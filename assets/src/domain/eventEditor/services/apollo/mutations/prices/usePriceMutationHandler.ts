import { useCallback } from 'react';
import { OperationVariables } from 'apollo-client';
import { pathOr } from 'ramda';

import useOnCreatePrice from './useOnCreatePrice';
import useOnDeletePrice from './useOnDeletePrice';
import useOnUpdatePrice from './useOnUpdatePrice';
import { DEFAULT_PRICE_LIST_DATA as DEFAULT_LIST_DATA } from '@edtrServices/apollo/queries';
import { MutationHandler, OnUpdateFnOptions } from '../types';
import { MutationType, MutationInput } from '@appServices/apollo/mutations';
import { Price, PriceEdge, PricesList } from '@edtrServices/apollo/types';
import { usePriceQueryOptions } from '@edtrServices/apollo/queries/prices';

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

	const mutator = useCallback<MutationHandler>(
		(mutationType, input) => {
			// `ticketId` must be passed for price creation
			// so as to properly set the relations
			const { ticketId, ...restInput } = input;
			const { priceType: priceTypeId } = input;
			const variables = createVariables(mutationType, restInput);

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
						onDeletePrice({ proxy, prices, price, deletePermanently: input?.deletePermanently });
						break;
				}
			};

			return { variables, onUpdate };
		},
		[onCreatePrice, onDeletePrice, onUpdatePrice, options]
	);

	return mutator;
};

export default usePriceMutationHandler;
