/**
 * External imports
 */
import { isModelEntity } from '@eventespresso/validators';
import { InvalidModelEntity } from '@eventespresso/eejs';
import {
	pluralModelName,
	singularModelName,
} from '@eventespresso/model';
import { get } from 'lodash';

/**
 * Internal imports
 */
import { getEntitiesByIds } from './entities';

const DEFAULT_EMPTY_ARRAY = [];

/**
 * Retrieves the relation ids for the given entity and relation name from the
 * state and considers how the relation might be saved in the state (either as
 * relation mapped to model (index) or model mapped to relation (entityMap)
 *
 * @param {Object} state
 * @param {BaseEntity} entity
 * @param {string} relationName
 * @return {Array} An empty array if there are no ids for the given relation.
 */
const getRelationIdsForEntityRelation = ( state, entity, relationName ) => {
	if ( state.relations.entityMap[ entity.modelName ] ) {
		return get(
			state.relations.entityMap,
			[ entity.modelName, entity.id, relationName ],
			DEFAULT_EMPTY_ARRAY,
		);
	}
	if ( state.relations.index[ pluralModelName( entity.modelName ) ] ) {
		return get(
			state.relations.index,
			[ pluralModelName, entity.id, relationName ],
			DEFAULT_EMPTY_ARRAY
		);
	}
	return DEFAULT_EMPTY_ARRAY;
};

/**
 * Returns all the relation entities for the relation on model entity.
 *
 * @param {Object} state
 * @param {BaseEntity} entity
 * @param {string} relationModelName
 * @return {Array<BaseEntity>} An array of entities for the relation.
 */
function getRelatedEntities( state, entity, relationModelName ) {
	if ( ! isModelEntity( entity ) ) {
		throw new InvalidModelEntity( '', entity );
	}
	return getEntitiesByIds(
		state,
		singularModelName( relationModelName ),
		getRelationIdsForEntityRelation( state, entity, relationModelName )
	);
}

/**
 * Retrieves all the queued relation additions for the given model
 *
 * @param {Object} state
 * @param {string} modelName
 * @return {Object} Returns an object keyed by entity ids for the given model.
 * The values on for each entity id is an object keyed by relation names and
 * with values being an array of ids for relation. Example:
 * {
 *   10: {
 *     datetimes: [ 22, 23 ],
 *     message_template_groups: [ 2, 4 ],
 *   },
 *   20: {
 *     datetimes: [ 24, 25 ],
 *   },
 * }
 *
 */
function getRelationAdditionsQueuedForModel( state, modelName ) {
	return get(
		state.dirty.relations.add,
		modelName,
		{}
	);
}

/**
 * Retrieves all the queued relation deletions for the given model
 * Similar to `getRelationAdditionsQueuedForModel` except this is relations
 * queued for deletion.
 *
 * @param {Object} state
 * @param {string} modelName
 * @return {Object} Returns an object keyed by entity ids for the given model.
 * The values on for each entity id is an object keyed by relation names and
 * with values being an array of ids for relation.
 */
function getRelationDeletionsQueuedForModel( state, modelName ) {
	return get(
		state.dirty.relations.delete,
		modelName,
		{}
	);
}

/**
 * Returns a count of all the relation models (not count of entities) that exist
 * in the state being related to the given model and entityId.
 *
 * Note: This only queries the state, not any relations that might exist in the
 * db.
 *
 * @param {Object} state
 * @param {string} modelName
 * @param {number} entityId
 * @return {number} The count of relations.
 */
function countRelationModelsIndexedForEntity(
	state,
	modelName,
	entityId
) {
	// first from the entity map
	let countRelations = Object.keys( get(
		state.relations.entityMap,
		[ modelName, entityId ],
		[]
	) ).length;
	// consider maybe in the index (exists as a relation for another model)
	countRelations += Object.keys(
		get(
			state.relations.index,
			[ pluralModelName( modelName ), entityId ],
			[]
		)
	).length;
	return countRelations;
}

export {
	getRelatedEntities,
	getRelationAdditionsQueuedForModel,
	getRelationDeletionsQueuedForModel,
	countRelationModelsIndexedForEntity,
};
