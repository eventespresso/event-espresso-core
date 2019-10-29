/**
 * External imports
 */
import { isModelEntity, isModelEntityOfModel } from '@eventespresso/validators';
import { InvalidModelEntity } from '@eventespresso/eejs';
import { singularModelName } from '@eventespresso/model';
import createSelector from 'rememo';
import { normalizeEntityId } from '@eventespresso/helpers';
import { Map, Set } from 'immutable';

/**
 * Internal imports
 */
import {
	getEntitiesByIds,
	getEntityById,
} from './entities';
import BaseEntity from '../../../model/entity-factory/base-entity';

const DEFAULT_EMPTY_SET = Set();

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
const getIdsForRelatedEntities = createSelector(
	( state, entity, relationName ) => {
		if ( ! isModelEntity( entity ) ) {
			throw new InvalidModelEntity( '', entity );
		}
		const modelName = singularModelName( entity.modelName );
		relationName = singularModelName( relationName );
		if ( state.relations.hasIn( [ modelName, entity.id, relationName ] ) ) {
			return ( state.relations.getIn(
				[
					modelName,
					entity.id,
					relationName,
				],
			) || Set() ).toArray();
		}
		return [];
	},
	( state, entity, relationName ) => {
		if ( ! isModelEntity( entity ) ) {
			return [ DEFAULT_EMPTY_SET ];
		}
		const modelName = singularModelName( entity.modelName ),
			id = entity.id;
		relationName = singularModelName( relationName );
		return [
			state.relations.getIn( [
				modelName,
				id,
				relationName,
			] ),
		];
	}
);

/**
 * Returns all the relation entities for the relation on model entity.
 *
 * @param {Object} state
 * @param {BaseEntity} entity
 * @param {string} relationModelName
 * @param {Array} calculatedFields
 * @return {Array<BaseEntity>} An array of entities for the relation.
 */
const getRelatedEntities = createSelector(
	(
		state,
		entity,
		relationModelName,
		calculatedFields = []
	) => {
		if ( ! isModelEntity( entity ) ) {
			throw new InvalidModelEntity( '', entity );
		}
		relationModelName = singularModelName( relationModelName );
		const relationIds = getIdsForRelatedEntities(
			state,
			entity,
			relationModelName
		);
		return getEntitiesByIds( state, relationModelName, relationIds );
	},
	(
		state,
		entity,
		relationModelName,
		calculatedFields = []
	) => {
		let relationIdDependants = getIdsForRelatedEntities.getDependants(
			state,
			entity,
			singularModelName( relationModelName )
		);
		relationIdDependants = relationIdDependants[ 0 ];
		relationIdDependants = relationIdDependants ?
			relationIdDependants.toJS() :
			null;
		return relationIdDependants ? [
			...getEntitiesByIds.getDependants(
				state,
				singularModelName( relationModelName ),
				relationIdDependants
			),
			relationIdDependants,
		] : [];
	}
);

/**
 * Efficient selector for getting all the related entities for the given model,
 * it's entity ids, and the relation name.
 *
 * Instead of using the `getRelations` selector which gets the relations for a
 * single entity.  This allows you to get all the relations for a given set of
 * entity ids (i.e. Get all datetimes related to the event ids: 10, 20, and 30).
 *
 * This selector is wired up to a resolver that does an efficient request to
 * retrieve all those entities and then dispatch the appropriate actions so
 * the relation state is correctly recorded for each relation.
 *
 * @param {Object} state
 * @param {string} modelName
 * @param {Array<number>} entityIds
 * @param {string} relationName
 * @return {Array<BaseEntity>} An array of BaseEntity instances for the
 * relations.
 */
const getRelatedEntitiesForIds = (
	state,
	modelName,
	entityIds,
	relationName
) => {
	let relationEntities = Set();
	modelName = singularModelName( modelName );
	relationName = singularModelName( relationName );
	entityIds.forEach( ( entityId ) => {
		const entity = getEntityById(
			state,
			modelName,
			entityId
		);
		if ( isModelEntityOfModel( entity, modelName ) ) {
			const relatedEntities = getRelatedEntities(
				state,
				entity,
				relationName,
				modelName
			);
			relationEntities = relationEntities.merge( relatedEntities );
		}
	} );
	return relationEntities.toJS();
};

/**
 * Looks up the relations queued for a given model first from the actual
 * relation type in the state, and then a reverse lookup in the index if not
 * there.
 *
 * @param {Object} state
 * @param {string} modelName
 * @param {string} type 'add' or 'delete'
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
 */
const lookupRelationsQueuedForModel = ( state, modelName, type = 'add' ) => {
	modelName = singularModelName( modelName );
	let relationsQueued = Map();
	if ( state.dirty.relations.hasIn( [ type, modelName ] ) ) {
		relationsQueued = relationsQueued.mergeDeep(
			state.dirty.relations.getIn( [ type, modelName ] )
		);
	}
	if ( state.dirty.relations.hasIn( [ 'index', modelName ] ) ) {
		let relations = Map();
		state.dirty.relations.getIn( [ 'index', modelName ] ).forEach(
			( relationMap, entityId ) => {
				relationMap.forEach( ( relationRecord, model ) => {
					if ( relationRecord.has( type ) ) {
						relations = relations.setIn(
							[ entityId, singularModelName( model ) ],
							relationRecord.get( type )
						);
					}
				} );
			}
		);
		relationsQueued = relationsQueued.mergeDeep( relations );
	}
	return relationsQueued.toJS();
};

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
 */
const getRelationAdditionsQueuedForModel = createSelector(
	( state, modelName ) => {
		return lookupRelationsQueuedForModel( state, modelName );
	},
	( state, modelName ) => [
		state.dirty.relations.getIn( [ 'add', singularModelName( modelName ) ] ),
		state.dirty.relations.getIn( [ 'index', singularModelName( modelName ) ] ),
	]
);

/**
 * This returns the names of all the models queued for relation additions
 * as an array.
 *
 * @param {Object} state
 *
 * @return {Array}  An array of model names that have relation additions
 *                     queued.
 */
const getRelationModelsQueuedForAddition = createSelector(
	( state ) => {
		return Array.from( state.dirty.relations.get( 'add', {} ).keys() );
	},
	( state ) => [
		state.dirty.relations.get( 'add' ),
		state.dirty.relations.get( 'index' ),
	]
);

/**
 * This returns the names of all the models queued for relation deletions
 * as an array.
 *
 * @param {Object} state
 *
 * @return {Array} An array of model names that have relation deletions
 *                    queued
 */
const getRelationModelsQueuedForDeletion = createSelector(
	( state ) => {
		return Array.from( state.dirty.relations.get( 'delete', {} ).keys() );
	},
	( state ) => [
		state.dirty.relations.get( 'delete' ),
		state.dirty.relations.get( 'index' ),
	]
);

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
const getRelationDeletionsQueuedForModel = createSelector(
	( state, modelName ) => {
		return lookupRelationsQueuedForModel( state, modelName, 'delete' );
	},
	( state, modelName ) => [
		state.dirty.relations.getIn(
			[ 'delete', singularModelName( modelName ) ]
		),
		state.dirty.relations.getIn( [ 'index', singularModelName( modelName ) ] ),
	]
);

/**
 * Returns a count of all the relation models (not count of entities) that exist
 * in the state being related to the given model and entityId.
 *
 * Note: This only queries the state, not any relations that might exist in the
 * db.
 *
 * @param {Object} state
 * @param {string} modelName
 * @param {number|string} entityId
 * @return {number} The count of relations.
 */
const countRelationModelsIndexedForEntity = createSelector(
	(
		state,
		modelName,
		entityId
	) => {
		modelName = singularModelName( modelName );
		entityId = normalizeEntityId( entityId );
		// we can just get this from the context of the model
		return (
			state.relations.getIn( [ modelName, entityId ] ) || Map()
		).count();
	},
	( state, modelName, entityId ) => {
		modelName = singularModelName( modelName );
		entityId = normalizeEntityId( entityId );
		return [
			state.relations.getIn( [ modelName, entityId ] ),
		];
	}
);

/**
 * Return the contents of the state.relations map.
 *
 * @param {Object} state
 *
 * @return {Map} The state.relations map.
 */
const getAllRelationsInState = ( state ) => state.relations;

export {
	getRelatedEntities,
	getRelatedEntitiesForIds,
	getIdsForRelatedEntities,
	getRelationAdditionsQueuedForModel,
	getRelationDeletionsQueuedForModel,
	countRelationModelsIndexedForEntity,
	getRelationModelsQueuedForAddition,
	getRelationModelsQueuedForDeletion,
	getAllRelationsInState,
};
