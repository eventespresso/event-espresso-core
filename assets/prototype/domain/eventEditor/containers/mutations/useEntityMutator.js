import useEntityMutation from './useEntityMutation';

/**
 * @param {string} type Entity type name
 * @param {string} id   Entity id
 */
const useEntityMutator = (type, id = '') => {
	const { getCreateMutation, getUpdateMutation, getDeleteMutation, mutate } = useEntityMutation(type, id);

	/**
	 * @param {object} input
	 * @param {object} subscriptions
	 */
	const createEntity = (input, subscriptions = {}) => {
		return subscribeAndMutate(getCreateMutation(input), subscriptions);
	};

	/**
	 * @param {object} input
	 * @param {object} subscriptions
	 */
	const updateEntity = (input, subscriptions = {}) => {
		return subscribeAndMutate(getUpdateMutation(input), subscriptions);
	};

	/**
	 * @param {object} input
	 * @param {object} subscriptions
	 */
	const deleteEntity = (input = {}, subscriptions = {}) => {
		return subscribeAndMutate(getDeleteMutation(input), subscriptions);
	};

	/**
	 * @param {object} options
	 * @param {object} subscriptions Component subscriptions = {onComplete, onError}
	 */
	const subscribeAndMutate = (options, subscriptions = {}) => {
		// These are backward subscriptions towards components
		// i.e. when a component wants to be notified
		const { onCompleted: bwdOnCompleted, onError: bwdOnError } = subscriptions;
		// These are forward subscriptions towards mutators
		// i.e. when an entity mutator wants to be notified
		const { onCompleted: fwdOnCompleted, onError: fwdOnError, ...mutationOptions } = options;

		const onCompleted = (data) => {
			if (typeof bwdOnCompleted === 'function') {
				bwdOnCompleted(data);
			}
			if (typeof fwdOnCompleted === 'function') {
				fwdOnCompleted(data);
			}
		};

		const onError = (error) => {
			if (typeof bwdOnError === 'function') {
				bwdOnError(error);
			}
			if (typeof fwdOnError === 'function') {
				fwdOnError(error);
			}
		};
		return mutate({ ...mutationOptions, onCompleted, onError });
	};

	return {
		createEntity,
		updateEntity,
		deleteEntity,
	};
};

export default useEntityMutator;
