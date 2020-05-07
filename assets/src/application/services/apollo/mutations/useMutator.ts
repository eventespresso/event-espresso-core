import { useCallback } from 'react';

import useMutationHandler from './useMutationHandler';
import { Entity as BaseType } from '@dataServices/types';
import {
	Mutator,
	BackwardSubscription,
	CustomMutationOptions,
	MutationInput,
	MutationResult,
	MutationType,
	MutatorCallback,
} from './types';

/**
 * @param {string} type Entity type name
 * @param {string} id   Entity id
 */
const useMutator: Mutator = (getMutationOptions) => {
	const handleMutation = useMutationHandler(getMutationOptions);

	return useCallback<MutatorCallback>(
		<Name extends string, Type extends BaseType>(typeName: Name, id = '') => {
			// extract mutation getters
			const { getCreateMutation, getUpdateMutation, getDeleteMutation, mutate } = handleMutation<Name>(
				typeName,
				id
			);
			/**
			 * @param {object} input the entity properties for the mutation input
			 * @param {object} subscriptions
			 */
			const createEntity = <MI = MutationInput, DShape = any>(
				input: MI,
				subscriptions?: BackwardSubscription<DShape>
			): MutationResult<DShape> => {
				return subscribeAndMutate(getCreateMutation<Type, MI>(input), subscriptions, MutationType.Create);
			};

			/**
			 * @param {object} input the entity properties for the mutation input
			 * @param {object} subscriptions
			 */
			const updateEntity = <MI = MutationInput, DShape = any>(
				input: MI,
				subscriptions?: BackwardSubscription<DShape>
			): MutationResult<DShape> => {
				return subscribeAndMutate(getUpdateMutation<Type, MI>(input), subscriptions, MutationType.Update);
			};

			/**
			 * @param {object} input the entity properties for the mutation input
			 * @param {object} subscriptions
			 */
			const deleteEntity = <MI = MutationInput, DShape = any>(
				input: MI,
				subscriptions?: BackwardSubscription<DShape>
			): MutationResult<DShape> => {
				return subscribeAndMutate<DShape>(
					getDeleteMutation<Type, MI>(input),
					subscriptions,
					MutationType.Delete
				);
			};

			/**
			 * @param {object} options
			 * @param {object} subscriptions Component subscriptions
			 */
			const subscribeAndMutate = <DShape = any>(
				options: CustomMutationOptions,
				subscriptions: BackwardSubscription<DShape> = {},
				mutationType: MutationType
			): MutationResult<DShape> => {
				// These are backward subscriptions towards components
				// i.e. when a component wants to be notified
				const { onCompleted: bwdOnCompleted, onError: bwdOnError } = subscriptions;
				// These are forward subscriptions towards mutators
				// i.e. when an entity mutator wants to be notified
				const { onCompleted: fwdOnCompleted, onError: fwdOnError, ...mutationOptions } = options;

				const onCompleted = (data: DShape): void => {
					if (typeof bwdOnCompleted === 'function') {
						bwdOnCompleted(data);
					}
					if (typeof fwdOnCompleted === 'function') {
						fwdOnCompleted(data);
					}
				};

				const onError = (error: Error): void => {
					if (typeof bwdOnError === 'function') {
						bwdOnError(error);
					}
					if (typeof fwdOnError === 'function') {
						fwdOnError(error);
					}
				};
				return mutate({ ...mutationOptions, onCompleted, onError }, mutationType);
			};

			return {
				createEntity,
				updateEntity,
				deleteEntity,
			};
		},
		[getMutationOptions]
	);
};

export default useMutator;
