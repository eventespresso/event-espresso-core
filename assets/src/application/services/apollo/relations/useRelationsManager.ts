import { useCallback, useMemo, useReducer, useState } from 'react';
import { pathOr } from 'ramda';
import { RelationsManager as RM, RelationalData } from './types';
import reducer from './reducer';

const INITIAL_STATE: RelationalData = {};

const useRelationsManager = (data: RelationalData = INITIAL_STATE): RM => {
	const [state, dispatch] = useReducer(reducer, data);
	const [initialized, setInitialized] = useState(false);

	/**
	 * Sets the relational data.
	 *
	 * @param {object} data Relational data
	 */
	const initialize: RM['initialize'] = useCallback((data) => {
		dispatch({ type: 'INITIALIZE', data });
		setInitialized(true);
	}, []);

	/**
	 * Whether the relations manager has been initialized.
	 */
	const isInitialized: RM['isInitialized'] = useCallback(() => initialized, [initialized]);

	/**
	 * Retrieve the relational data.
	 */
	const getData: RM['getData'] = useCallback(() => state, [state]);

	/**
	 * For a given `entity` identified by `entityId`
	 * it returns a list of globally unique Ids for the given `relation` Type
	 *
	 * @param {String} entity       data Type for entity
	 * @param {String} entityId     GUID for entity
	 * @param {String} relation     data Type for relation
	 */
	const getRelations: RM['getRelations'] = useCallback(
		({ entity, entityId, relation }) => {
			return pathOr([], [entity, entityId, relation], state);
		},
		[state]
	);

	/**
	 * Adds a relations between two entities.
	 *
	 * @param {String} entity       data Type for entity
	 * @param {String} entityId     GUID for entity
	 * @param {String} relation     data Type for relation
	 * @param {String} relationId   GUID for related entity
	 */
	const addRelation: RM['addRelation'] = useCallback(({ entity, entityId, relation, relationId }) => {
		dispatch({
			type: 'ADD_RELATION',
			entity,
			entityId,
			relation,
			relationId,
		});
	}, []);

	/**
	 * Updates the relation between an entity and related type entities
	 * Overrides old relations.
	 *
	 * @param {String} entity           data Type for entity
	 * @param {String} entityId         GUID for entity
	 * @param {String} relation         data Type for relation
	 * @param {String[]} relationIds    array of GUIDs for related entities
	 */
	const updateRelations: RM['updateRelations'] = useCallback(({ entity, entityId, relation, relationIds }) => {
		dispatch({
			type: 'UPDATE_RELATIONS',
			entity,
			entityId,
			relation,
			relationIds,
		});
	}, []);

	/**
	 * Removes the relation between two entities.
	 *
	 * If `relationId` is provided, then `relationId` will be removed from
	 * `state[entity][entityId][relation]` list.
	 *
	 * If `relationId` is NOT provided, the `entity` will be removed
	 * from all the `relation`s i.e. from `state[relation][...][entity]`
	 *
	 * @param {String} entity       data Type for entity
	 * @param {String} entityId     GUID for entity
	 * @param {String} relation     data Type for relation
	 * @param {String} relationId   GUID for related entity
	 */
	const removeRelation: RM['removeRelation'] = useCallback(({ entity, entityId, relation, relationId }) => {
		dispatch({
			type: 'REMOVE_RELATION',
			entity,
			entityId,
			relation,
			relationId,
		});
	}, []);

	/**
	 * Removes all the relations originating "FROM" the given entity.
	 * It does not remove the relations "FROM" other entities "TO" the given entity.
	 *
	 * This should ideally be used after removing the entity from all the relations
	 * pointing towards it, so as to remove all traces from relationship map.
	 *
	 * For example, before dropping relations for a ticket,
	 * You should remove it from all the datetimes related to it and vice versa
	 * i.e. before `dropRelations({ entity: 'tickets', entityId: ticketId });`
	 * You should `removeRelation({ entity: 'tickets', entityId: ticketId, relation: 'datetimes' });`
	 *
	 * @param {String} entity       data Type for entity
	 * @param {String} entityId     GUID for entity
	 */
	const dropRelations: RM['dropRelations'] = useCallback(({ entity, entityId }) => {
		dispatch({
			type: 'DROP_RELATIONS',
			entity,
			entityId,
		});
	}, []);

	return useMemo(
		() => ({
			initialize,
			isInitialized,
			getData,
			getRelations,
			addRelation,
			removeRelation,
			updateRelations,
			dropRelations,
		}),
		[addRelation, dropRelations, getData, getRelations, initialize, isInitialized, removeRelation, updateRelations]
	);
};

export default useRelationsManager;
