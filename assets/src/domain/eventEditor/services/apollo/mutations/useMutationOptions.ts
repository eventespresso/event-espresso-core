import { useCallback } from 'react';
import { MutationUpdaterFn, MutationOptions, OperationVariables } from 'apollo-client';
import { DataProxy } from 'apollo-cache';
import { FetchResult } from 'apollo-link';
import { pathOr } from 'ramda';

import { Entity as BaseType } from '@appServices/apollo/types';
import { MutationType, MutationOptionsCb } from '@appServices/apollo/mutations';
import { OnUpdateFn, TypeName } from './types';
import { useMutationHandler, mutations } from './';

/**
 * @param {string} typeName Entity type name
 * @param {string} id       Entity id
 */
const useMutationOptions = <Name extends TypeName>(typeName: Name): MutationOptionsCb => {
	const getMutationHandler = useMutationHandler();

	return useCallback(<Type extends BaseType, MI>(mutationType: MutationType, input: MI): MutationOptions<Type> => {
		const getMutation = (): any => {
			// For example "CREATE_DATETIME"
			const mutation = `${mutationType}_${typeName.toUpperCase()}`;
			return mutations[mutation];
		};

		/**
		 * @param {string} mutationType Type of mutation
		 * @param {object} input     Mutation input
		 */
		const getMutationOptions = (): OperationVariables => {
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
				update = getUpdateCallback(onUpdate);
			}

			return { ...mutationOptions, update };
		};

		const getUpdateCallback = (onUpdate: OnUpdateFn): MutationUpdaterFn => {
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
		};

		const options = getMutationOptions();
		return {
			mutation: getMutation(),
			...options,
		};
	}, []);
};

export default useMutationOptions;
