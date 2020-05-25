import { useCallback } from 'react';
import { MutationUpdaterFn, OperationVariables } from 'apollo-client';
import { DataProxy } from 'apollo-cache';
import { FetchResult } from 'apollo-link';
import { pathOr } from 'ramda';

import { MutationType, MutationOptionsCb, MutationInput } from '@appServices/apollo/mutations';
import { OnUpdateFn, TypeName } from './types';
import { useMutationHandler, mutations } from './';

/**
 * @param {string} typeName Entity type name
 * @param {string} id       Entity id
 */
const useMutationOptions = (typeName: TypeName): MutationOptionsCb => {
	const getMutationHandler = useMutationHandler();

	const getMutation = useCallback(
		(mutationType: MutationType): any => {
			// For example "CREATE_DATETIME"
			const mutation = `${mutationType}_${typeName.toUpperCase()}`;
			return mutations[mutation];
		},
		[typeName]
	);

	const getUpdateCallback = useCallback(
		(onUpdate: OnUpdateFn, mutationType: MutationType): MutationUpdaterFn => {
			/**
			 * Since every mutation update callback is interested
			 * in the updated entity data in response, we will
			 * pass just that entity to onUpdate.
			 */
			return (proxy: DataProxy, result: FetchResult): void => {
				// e.g. "createDatetime", "updateTicket"
				const mutationName = `${mutationType.toLowerCase()}Espresso${typeName}`;
				// Example result: { data: { deletePrice: { price : {...} } } }
				const path = ['data', mutationName, `espresso${typeName}`];
				const entity = pathOr<any>({}, path, result);

				onUpdate({ proxy, entity });
			};
		},
		[typeName]
	);

	/**
	 * @param {string} mutationType Type of mutation
	 * @param {object} input     Mutation input
	 */
	const getMutationOptions = useCallback(
		(mutationType: MutationType, input: MutationInput): OperationVariables => {
			const mutationHandler = getMutationHandler(typeName);
			/**
			 * options = {
			 *     variables,
			 *     optimisticResponse,
			 * 	   onUpdate,
			 *     onCompleted,
			 * 	   onError,
			 * }
			 */
			const { onUpdate, ...mutationOptions } = mutationHandler(mutationType, input);

			let update: MutationUpdaterFn;

			if (typeof onUpdate === 'function') {
				update = getUpdateCallback(onUpdate, mutationType);
			}

			return { ...mutationOptions, update };
		},
		[getMutationHandler, getUpdateCallback, typeName]
	);

	return useCallback(
		(mutationType, input) => {
			const options = getMutationOptions(mutationType, input);
			return {
				mutation: getMutation(mutationType),
				...options,
			};
		},
		[getMutationOptions, getMutation]
	);
};

export default useMutationOptions;
