import { useMemo, useCallback } from 'react';

import useMutationHandler from './useEntityMutationHandler';
import { BackwardSubscription, CustomMutationOptions, MutationType } from './types';

const useEntityMutator = (getMutationOptions, typeName: string, id = '') => {
	// extract mutation getters
	const { getCreateMutation, getUpdateMutation, getDeleteMutation, mutate } = useMutationHandler(
		getMutationOptions,
		typeName,
		id
	);

	const subscribeAndMutate = useCallback(
		(options: CustomMutationOptions, subscriptions: BackwardSubscription = {}, mutationType: MutationType): any => {
			// These are backward subscriptions towards components
			// i.e. when a component wants to be notified
			const { onCompleted: bwdOnCompleted, onError: bwdOnError } = subscriptions;
			// These are forward subscriptions towards mutators
			// i.e. when an entity mutator wants to be notified
			const { onCompleted: fwdOnCompleted, onError: fwdOnError, ...mutationOptions } = options;

			const onCompleted = (data: any): void => {
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
		},
		[mutate]
	);

	const createEntity = useCallback(
		(input, subscriptions) => {
			return subscribeAndMutate(getCreateMutation(input), subscriptions, MutationType.Create);
		},
		[getCreateMutation, subscribeAndMutate]
	);

	const updateEntity = useCallback(
		(input, subscriptions) => {
			return subscribeAndMutate(getUpdateMutation(input), subscriptions, MutationType.Update);
		},
		[getUpdateMutation, subscribeAndMutate]
	);

	const deleteEntity = useCallback(
		(input, subscriptions) => {
			return subscribeAndMutate(getDeleteMutation(input), subscriptions, MutationType.Delete);
		},
		[getDeleteMutation, subscribeAndMutate]
	);

	return useMemo(
		() => ({
			createEntity,
			updateEntity,
			deleteEntity,
		}),
		[createEntity, deleteEntity, updateEntity]
	);
};

export default useEntityMutator;
