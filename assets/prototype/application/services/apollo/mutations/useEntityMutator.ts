import useEntityMutation from './useEntityMutation';
import {
	BackwardSubscription,
	CustomMutationOptions,
	EntityMutator,
	EntityType,
	MutationInput,
	MutationResult,
	MutationType,
} from './types';

/**
 * @param {string} type Entity type name
 * @param {string} id   Entity id
 */
const useEntityMutator = (type: EntityType, id = ''): EntityMutator => {
	const { getCreateMutation, getUpdateMutation, getDeleteMutation, mutate } = useEntityMutation(type, id);

	/**
	 * @param {object} input the entity properties for the mutation input
	 * @param {object} subscriptions
	 */
	const createEntity = (input: MutationInput, subscriptions: BackwardSubscription = {}): MutationResult => {
		return subscribeAndMutate(getCreateMutation(input), subscriptions, MutationType.Create);
	};

	/**
	 * @param {object} input the entity properties for the mutation input
	 * @param {object} subscriptions
	 */
	const updateEntity = (input: MutationInput, subscriptions: BackwardSubscription = {}): MutationResult => {
		return subscribeAndMutate(getUpdateMutation(input), subscriptions, MutationType.Update);
	};

	/**
	 * @param {object} input the entity properties for the mutation input
	 * @param {object} subscriptions
	 */
	const deleteEntity = (input: MutationInput = {}, subscriptions: BackwardSubscription = {}): MutationResult => {
		return subscribeAndMutate(getDeleteMutation(input), subscriptions, MutationType.Delete);
	};

	/**
	 * @param {object} options
	 * @param {object} subscriptions Component subscriptions
	 */
	const subscribeAndMutate = (
		options: CustomMutationOptions,
		subscriptions: BackwardSubscription,
		mutationType: MutationType
	): MutationResult => {
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
	};

	return {
		createEntity,
		updateEntity,
		deleteEntity,
	};
};

export default useEntityMutator;
