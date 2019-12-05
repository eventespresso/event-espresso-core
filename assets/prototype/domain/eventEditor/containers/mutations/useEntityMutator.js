import useEntityMutation from './useEntityMutation';

/**
 * @param {string} type Entity type name
 * @param {string} id   Entity id
 */
const useEntityMutator = (type, id = '') => {
	const { getCreateMutation, getUpdateMutation, getDeleteMutation, mutate } = useEntityMutation(type, id);

	/**
	 * @param {object} data
	 */
	const createEntity = (data) => {
		return mutate(getCreateMutation(data));
	};

	/**
	 * @param {string} id Entity id
	 */
	const updateEntity = (data) => {
		return mutate(getUpdateMutation(data));
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
