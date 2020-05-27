import { useCallback } from 'react';
import { OperationVariables } from 'apollo-client';

import useOnCreatePrice from './useOnCreatePrice';
import useOnDeletePrice from './useOnDeletePrice';
import useOnUpdatePrice from './useOnUpdatePrice';
import { DEFAULT_PRICE_LIST_DATA as DEFAULT_LIST_DATA } from '@edtrServices/apollo/queries';
import { MutationHandler, MutationUpdater } from '../types';
import { MutationType, MutationInput } from '@appServices/apollo/mutations';
import { PricesList, Price } from '@edtrServices/apollo/types';
import { usePriceQueryOptions } from '@edtrServices/apollo/queries/prices';
import { PriceCommonInput } from './types';

type MH = MutationHandler<Price, PriceCommonInput>;

const useMutationHandler = (): MH => {
	const options = usePriceQueryOptions();

	const onCreatePrice = useOnCreatePrice();
	const onUpdatePrice = useOnUpdatePrice();
	const onDeletePrice = useOnDeletePrice();

	const createVariables = useCallback((mutationType: MutationType, input: MutationInput): OperationVariables => {
		const mutationInput: MutationInput = {
			clientMutationId: `${mutationType}_PRICE`,
			...input,
		};

		return {
			input: mutationInput,
		};
	}, []);

	const onUpdate = useCallback<MutationUpdater<Price, PriceCommonInput>>(
		({ proxy, entity: price, input, mutationType }) => {
			const priceTypeId = input?.priceType;
			// Read the existing data from cache.
			let data: PricesList;
			try {
				data = proxy.readQuery(options);
			} catch (error) {
				data = null;
			}
			const prices = data?.espressoPrices || DEFAULT_LIST_DATA;

			switch (mutationType) {
				case MutationType.Create:
					onCreatePrice({ proxy, prices, price, priceTypeId });
					break;
				case MutationType.Update:
					onUpdatePrice({ price, priceTypeId });
					break;
				case MutationType.Delete:
					onDeletePrice({ proxy, prices, price, deletePermanently: input?.deletePermanently });
					break;
			}
		},
		[onCreatePrice, onDeletePrice, onUpdatePrice, options]
	);

	const mutator = useCallback<MH>(
		(mutationType, input) => {
			const variables = createVariables(mutationType, input);

			return { variables, onUpdate };
		},
		[createVariables, onUpdate]
	);

	return mutator;
};

export default useMutationHandler;
