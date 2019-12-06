import useEntityMutation from './useEntityMutation';

/**
 * @param {string} type Entity type name
 * @param {string} id   Entity id
 */
const useEntityMutator = (type, id = '') => {
	const { getCreateMutation, getUpdateMutation, getDeleteMutation, mutate } = useEntityMutation(type, id);

	/**
	 * @param {object} input
	 */
	const createEntity = (input) => {
		return mutate(getCreateMutation(input));
	};

	/**
	 * @param {object} input
	 */
	const updateEntity = (input) => {
		return mutate(getUpdateMutation(input));
	};

	/**
	 *
	 */
	const deleteEntity = () => {
		return mutate(getDeleteMutation());
	};

	return {
		createEntity,
		updateEntity,
		deleteEntity,
	};
};

export default useEntityMutator;
