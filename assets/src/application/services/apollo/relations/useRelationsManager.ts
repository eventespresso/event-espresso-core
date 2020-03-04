import { useReducer, useState } from 'react';
import { pathOr, assocPath, dissocPath, clone } from 'ramda';
import { RelationAction, RelationFunctionProps, RelationsManager, RelationalData } from './types';

const INITIAL_STATE: RelationalData = {};

const useRelationsManager = (data: RelationalData = INITIAL_STATE): RelationsManager => {
	const [state, dispatch] = useReducer(relationsReducer, data);
	const [initialized, setInitialized] = useState(false);

	/**
	 * Sets the relational data.
	 *
	 * @param {object} data Relational data
	 */
	const initialize = (data: RelationalData): void => {
		dispatch({ type: 'SET_DATA', data });
		setInitialized(true);
	};

	/**
	 * Whether the relations manager has been initialized.
	 */
	const isInitialized = (): boolean => initialized;

	/**
	 * Retrieve the relational data.
	 */
	const getData = (): RelationalData => {
		return state;
	};

	/**
	 * For a given `entity` identified by `entityId`
	 * it returns a list of globally unique Ids for the given `relation` Type
	 *
	 * @param {String} entity       data Type for entity
	 * @param {String} entityId     GUID for entity
	 * @param {String} relation     data Type for relation
	 */
	const getRelations = ({ entity, entityId, relation }: RelationFunctionProps): string[] => {
		return pathOr([], [entity, entityId, relation], state);
	};

	/**
	 * Adds a relations between two entities.
	 *
	 * @param {String} entity       data Type for entity
	 * @param {String} entityId     GUID for entity
	 * @param {String} relation     data Type for relation
	 * @param {String} relationId   GUID for related entity
	 */
	const addRelation = ({ entity, entityId, relation, relationId }: RelationFunctionProps): void => {
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
	const updateRelations = ({ entity, entityId, relation, relationIds }: RelationFunctionProps): void => {
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
	const removeRelation = ({ entity, entityId, relation, relationId }: RelationFunctionProps): void => {
		dispatch({
			type: 'REMOVE_RELATION',
			entity,
			entityId,
			relation,
			relationId,
		});
	};

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
	const dropRelations = ({ entity, entityId }: RelationFunctionProps): void => {
		dispatch({
			type: 'DROP_RELATIONS',
			entity,
			entityId,
		});
	};

	return {
		initialize,
		isInitialized,
		getData,
		getRelations,
		addRelation,
		removeRelation,
		updateRelations,
		dropRelations,
	};
};

const relationsReducer = (state: RelationalData, action: RelationAction): RelationalData => {
	const { entity, entityId, relation, relationId, relationIds } = action;
	let newState: RelationalData, relations: string[];
	switch (action.type) {
		case 'SET_DATA':
			return action.data;

		case 'ADD_RELATION':
			relations = pathOr([], [entity, entityId, relation], state);
			// If the relation already exists
			if (relations.includes(relationId)) {
				return state;
			}
			newState = assocPath([entity, entityId, relation], [...relations, relationId], state);
			return newState;

		case 'REMOVE_RELATION':
			newState = clone(state);
			// existing relation list.
			relations = pathOr([], [entity, entityId, relation], newState);
			// if relationId is given remove it from the list.
			if (relationId) {
				return assocPath(
					[entity, entityId, relation],
					relations.filter((id) => id !== relationId),
					newState
				);
			}

			if (relations.length) {
				/**
				 * If we are here, it means that we have values for `entityId` in `relation`
				 * i.e. if we are trying to remove a datetime (`entityId`) from all the tickets
				 * we luckily have `state.datetimes[entityId].tickets` list, which means we know
				 * from where to remove `entityId`.
				 */
				relations.forEach((id) => {
					newState = assocPath(
						[relation, id, entity],
						pathOr([], [relation, id, entity], newState).filter((_id: string) => _id !== entityId),
						newState
					);
				});
				return newState;
			}
			/**
			 * If we are here it means that we don't have the values for `entityId` in `relation`
			 * which means we will have to loop through all the entries in `state[relation]`
			 * to remove `entityId` from them.
			 * For example if we are trying to remove a datetime (`entityId`) from all the tickets,
			 * We will loop through `state.tickets` to delete `entityId` from `state.tickets[ticketId].datetimes`
			 */
			for (const id in newState[relation]) {
				newState = assocPath(
					[relation, id, entity],
					pathOr([], [relation, id, entity], newState).filter((_id: string) => _id !== entityId),
					newState
				);
			}
			return newState;

		case 'UPDATE_RELATIONS':
			newState = assocPath([entity, entityId, relation], relationIds, state);
			return newState;

		case 'DROP_RELATIONS':
			newState = dissocPath([entity, entityId], state);
			return newState;

		default:
			throw new Error();
	}
};

export default useRelationsManager;
