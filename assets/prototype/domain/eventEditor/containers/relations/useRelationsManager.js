import { useReducer, useEffect } from '@wordpress/element';
import useFetchRelations from '../queries/useFetchRelations';
import get from 'lodash/get';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';

const useRelationsManager = ({ eventId }) => {
	const [state, dispatch] = useReducer(relationsReducer, {});

	const onReceiveRelations = ({ relations = '{}' }) => {
		dispatch({ type: 'SET_DATA', data: JSON.parse(relations) });
	};

	useEffect(() => {
		console.log('useRelationsManager >>>', state);
	}, [state]);

	/**
	 * For a given `entity` identified by `entityId`
	 * it returns a list of globally unique Ids for the given `relation` Type
	 *
	 * @param {String} entity       data Type for entity
	 * @param {String} entityId     GUID for entity
	 * @param {String} relation     data Type for relation
	 */
	const getRelations = ({ entity, entityId, relation }) => {
		return get(state, [entity, entityId, relation], []);
	};

	/**
	 * Adds a relations between two entities.
	 *
	 * @param {String} entity       data Type for entity
	 * @param {String} entityId     GUID for entity
	 * @param {String} relation     data Type for relation
	 * @param {String} relationId   GUID for related entity
	 */
	const addRelation = ({ entity, entityId, relation, relationId }) => {
		dispatch({
			type: 'ADD_RELATION',
			entity,
			entityId,
			relation,
			relationId,
		});
	};

	/**
	 * Updates the relation between an entity and related type entities
	 * Overrides old relations.
	 *
	 * @param {String} entity           data Type for entity
	 * @param {String} entityId         GUID for entity
	 * @param {String} relation         data Type for relation
	 * @param {String[]} relationIds    array of GUIDs for related entities
	 */
	const updateRelations = ({ entity, entityId, relation, relationIds }) => {
		console.log({ entity, entityId, relation, relationIds });
		dispatch({
			type: 'UPDATE_RELATIONS',
			entity,
			entityId,
			relation,
			relationIds,
		});
	};

	/**
	 * Removes the relation between two entities.
	 *
	 * @param {String} entity       data Type for entity
	 * @param {String} entityId     GUID for entity
	 * @param {String} relation     data Type for relation
	 * @param {String} relationId   GUID for related entity
	 */
	const removeRelation = ({ entity, entityId, relation, relationId }) => {
		dispatch({
			type: 'REMOVE_RELATION',
			entity,
			entityId,
			relation,
			relationId,
		});
	};

	useFetchRelations({ eventId, onReceiveRelations });

	return {
		getRelations,
		addRelation,
		removeRelation,
		updateRelations,
	};
};

const relationsReducer = (state, action) => {
	const { entity, entityId, relation, relationIds } = action;
	const newState = cloneDeep(state);

	switch (action.type) {
		case 'SET_DATA':
			return action.data;
		case 'UPDATE_RELATIONS':
			set(newState, [entity, entityId, relation], relationIds);
			console.log({ newState });
			return newState;
		default:
			throw new Error();
	}
};

export default useRelationsManager;
