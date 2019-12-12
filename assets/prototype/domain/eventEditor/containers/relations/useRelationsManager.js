import { useReducer, useEffect } from '@wordpress/element';
import useFetchRelations from '../queries/useFetchRelations';
import get from 'lodash/get';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';

const useRelationsManager = () => {
	const [state, dispatch] = useReducer(relationsReducer, {});

	const onReceiveRelations = ({ eventRelations: relations = '{}' }) => {
		dispatch({ type: 'SET_DATA', data: JSON.parse(relations) });
	};

	useEffect(() => {
		console.log('useRelationsManager >>>', state);
		window.relationsManager = state;
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
	const removeRelation = ({ entity, entityId, relation, relationId }) => {
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
	const dropRelations = ({ entity, entityId }) => {
		dispatch({
			type: 'DROP_RELATIONS',
			entity,
			entityId,
		});
	};

	useFetchRelations({ onReceiveRelations });

	return {
		getRelations,
		addRelation,
		removeRelation,
		updateRelations,
		dropRelations,
	};
};

const relationsReducer = (state, action) => {
	console.log('relationsReducer action: ', { action, state });
	const { entity, entityId, relation, relationId, relationIds } = action;
	let newState, relations;
	switch (action.type) {
		case 'SET_DATA':
			return action.data;

		case 'ADD_RELATION':
			relations = get(state, [entity, entityId, relation], []);
			// If the relation already exists
			if (relations.includes(relationId)) {
				return state;
			}
			newState = cloneDeep(state);
			set(newState, [entity, entityId, relation], [...relations, relationId]);
			console.log('ADD_RELATION newState:', newState);
			return newState;

		case 'REMOVE_RELATION':
			newState = cloneDeep(state);
			// existing relation list.
			relations = get(state, [entity, entityId, relation], []);
			console.log('REMOVE_RELATION relations:', relations);
			// if relationId is given remove it from the list.
			if (relationId) {
				set(
					newState,
					[entity, entityId, relation],
					relations.filter((id) => id !== relationId)
				);
				return newState;
			}

			if (relations.length) {
				/**
				 * If we are here, it means that we have values for `entityId` in `relation`
				 * i.e. if we are trying to remove a datetime (`entityId`) from all the tickets
				 * we luckily have `state.datetimes[entityId].tickets` list, which means we know
				 * from where to remove `entityId`.
				 */
				relations.forEach((id) => {
					set(
						newState,
						[relation, id, entity],
						get(newState, [relation, id, entity], []).filter((_id) => _id !== entityId)
					);
				});
				console.log('REMOVE_RELATION newState with relations:', newState);
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
				set(
					newState,
					[relation, id, entity],
					get(newState, [relation, id, entity], []).filter((_id) => _id !== entityId)
				);
			}
			console.log('REMOVE_RELATION newState without relations:', newState);
			return newState;

		case 'UPDATE_RELATIONS':
			newState = cloneDeep(state);
			set(newState, [entity, entityId, relation], relationIds);
			console.log('UPDATE_RELATIONS newState:', newState);
			return newState;

		case 'DROP_RELATIONS':
			newState = cloneDeep(state);
			delete newState[entity][entityId];
			console.log('DROP_RELATIONS newState:', newState);
			return newState;

		default:
			throw new Error();
	}
};

export default useRelationsManager;
