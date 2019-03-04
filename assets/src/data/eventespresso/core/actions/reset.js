/**
 * External imports
 */
import { List, Map } from 'immutable';
import {
	singularModelName,
	pluralModelName,
} from '@eventespresso/model';

/**
 * Internal imports
 */
import { dispatch, select } from '../../base-controls';
import { ACTION_TYPES } from './action-types';
import { REDUCER_KEY } from '../constants';

const { resets: types } = ACTION_TYPES;

/**
 * Resets the entire state to its default for the store.
 */
export function* resetEntireState() {
	const allEntities = select(
		REDUCER_KEY,
		'getAllEntitiesInState',
	);
	const allRelations = select(
		REDUCER_KEY,
		'getAllRelationsInState',
	);
	// action for resetting the entire state.
	yield {
		type: types.RESET_ALL_STATE,
	};
	// prep for dispatches
	let flattenedEntitiesList = List();
	allEntities.forEach(
		( entities ) => flattenedEntitiesList = flattenedEntitiesList.merge(
			entities.valueSeq()
		)
	);
	yield dispatch(
		REDUCER_KEY,
		'resetResolutionForGetEntityByIdForEntities',
		flattenedEntitiesList.toArray()
	);

	// reset resolver for relation
	// Index: setup data for resolving
	const relationsIndex = Map();
	allRelations.index.forEach(
		( relationMap, modelName ) => {
			modelName = singularModelName( modelName );
			relationMap.forEach(
				( relations, entityId ) => {
					const entity = allEntities.getIn( [ modelName, entityId ] );
					relationsIndex.set( entity, relations.keySeq() );
				}
			);
		}
	);
	const relationsIndexEntries = Array.from( relationsIndex.entries() );
	while ( relationsIndexEntries.length > 0 ) {
		const entry = relationsIndexEntries.pop();
		const relationNames = entry[ 1 ].map(
			( relationName ) => pluralModelName( relationName )
		);
		yield resetResolutionForGetRelatedEntities( entry[ 0 ], relationNames );
	}

	// entityMap, which should pick up the reverse relation selector
	const relationsEntityMap = Map();
	allRelations.entityMap.forEach(
		( relationMap, modelName ) => {
			relationMap.forEach(
				( relations, entityId ) => {
					const entity = allEntities.getIn( [ modelName, entityId ] );
					relationsEntityMap.set( entity, relations.keySeq() );
				}
			);
		}
	);
	while ( relationsEntityMap.length > 0 ) {
		const entry = relationsEntityMap.pop();
		yield resetResolutionForGetRelatedEntities( entry[ 0 ], entry[ 1 ] );
	}
}

/**
 * Resets all state related to the given modelName
 *
 * Note: This does not reset any state in the modelSpecific tree as there is no
 * way to know what applies to the current model.
 *
 * @param {string} modelName
 * @return {Object} An action object
 */
export function resetStateForModel( modelName ) {
	return {
		type: types.RESET_STATE_FOR_MODEL,
		modelName,
	};
}

/**
 * Receives an array of BaseEntity instances and will handle
 * resetting the resolution state for the `getEntityById` selector for each
 * of those entities.
 *
 * @param {Array<BaseEntity>} entities
 */
export function* resetResolutionForGetEntityByIdForEntities( entities ) {
	// @todo loop through entities and dispatch resetting resolution state.
}

/**
 * Receives a BaseEntity instance and an array of relation names and will handle
 * resetting the resolution state for the `getRelatedEntities` selector for each
 * of those relations on that entity.
 *
 * @param {BaseEntity} entity
 * @param {Array} relationModelNames
 */
export function* resetResolutionForGetRelatedEntities(
	entity,
	relationModelNames
) {
	// @todo loop through entities and dispatch resetting resolution state.
}

/**
 * Resets all model specific state.
 *
 * @return {Object} An action object
 */
export function resetAllModelSpecific() {
	return {
		type: types.RESET_ALL_MODEL_SPECIFIC,
	};
}

/**
 * Resets all state for a given model specific selector and its arguments.
 *
 * @param {string} selectorName
 * @param {Array} args
 * @return {Object} An action object.
 */
export function resetModelSpecificForSelector( selectorName, ...args ) {
	return {
		type: types.RESET_MODEL_SPECIFIC_FOR_SELECTOR,
		selectorName,
		args,
	};
}