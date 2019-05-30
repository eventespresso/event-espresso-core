/**
 * External imports
 */
import { isModelEntity } from '@eventespresso/validators';
import { InvalidModelEntity } from '@eventespresso/eejs';
import {
	pluralModelName,
	singularModelName,
} from '@eventespresso/model';
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
const getRelationIdsForEntityRelation = createSelector(
	( state, entity, relationName ) => {
		if ( ! isModelEntity( entity ) ) {
			throw new InvalidModelEntity( '', entity );
		}
		const modelName = singularModelName( entity.modelName );
		relationName = pluralModelName( relationName );
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
		const singularModel = singularModelName( entity.modelName ),
			id = entity.id,
			pluralRelationName = pluralModelName( relationName );
		return [
			state.relations.getIn( [
				singularModel,
				id,
				pluralRelationName,
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
 * @return {Array<BaseEntity>} An array of entities for the relation.
 */
const getRelatedEntities = createSelector(
	( state, entity, relationModelName ) => {
		if ( ! isModelEntity( entity ) ) {
			throw new InvalidModelEntity( '', entity );
		}
		return getEntitiesByIds(
			state,
			singularModelName( relationModelName ),
			getRelationIdsForEntityRelation(
				state,
				entity,
				relationModelName
			)
		);
	},
	( state, entity, relationName ) => [
		...getEntitiesByIds.getDependants(
			state,
			singularModelName( relationName )
		),
		...getRelationIdsForEntityRelation.getDependants(
			state,
			entity,
			relationName
		),
	]
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
export const getRelatedEntitiesForIds = createSelector(
	( state, modelName, entityIds, relationName ) => {
		let relationEntities = Set();
		entityIds.forEach( ( entityId ) => {
			const entity = getEntityById(
				state,
				singularModelName( modelName ),
				entityId
			);
			const relatedEntities = getRelatedEntities(
				state,
				entity,
				pluralModelName( relationName )
			);
			relationEntities = relationEntities.merge( relatedEntities );
		} );
		return relationEntities.toJS();
	},
	( state, modelName, entityIds, relationName ) => [
		...getEntitiesByIds.getDependants(
			state,
			singularModelName( modelName ),
		),
		...getEntitiesByIds.getDependants(
			state,
			singularModelName( relationName )
		),
	]
);

/**
 * Looks up the relations queued for a given model first from the actual relation
 * type in the state, and then a reverse lookup in the index if not there.
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
	const forIndexLookup = pluralModelName( modelName );
	const forAddLookup = singularModelName( modelName );
	let relationsQueued = Map();
	if ( state.dirty.relations.hasIn( [ type, forAddLookup ] ) ) {
		relationsQueued = relationsQueued.mergeDeep(
			state.dirty.relations.getIn( [ type, forAddLookup ] )
		);
	}
	if ( state.dirty.relations.hasIn( [ 'index', forIndexLookup ] ) ) {
		let relations = Map();
		state.dirty.relations.getIn( [ 'index', forIndexLookup ] ).forEach(
			( relationMap, entityId ) => {
				relationMap.forEach( ( relationRecord, model ) => {
					if ( relationRecord.has( type ) ) {
						relations = relations.setIn(
							[ entityId, pluralModelName( model ) ],
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
 *
 */
const getRelationAdditionsQueuedForModel = createSelector(
	( state, modelName ) => {
		return lookupRelationsQueuedForModel( state, modelName );
	},
	( state, modelName ) => [
		state.dirty.relations.getIn( [ 'add', singularModelName( modelName ) ] ),
		state.dirty.relations.getIn( [ 'index', pluralModelName( modelName ) ] ),
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
		state.dirty.relations.getIn( [ 'index', pluralModelName( modelName ) ] ),
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
		const singleName = singularModelName( modelName );
		entityId = normalizeEntityId( entityId );
		// we can just get this from the context of the model
		return (
			state.relations
				.getIn( [ singleName, entityId ] ) || Map()
		).count();
	},
	( state, modelName, entityId ) => {
		const singleName = singularModelName( modelName );
		entityId = normalizeEntityId( entityId );
		return [
			state.relations.getIn( [ singleName, entityId ] ),
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
	getRelationIdsForEntityRelation,
	getRelationAdditionsQueuedForModel,
	getRelationDeletionsQueuedForModel,
	countRelationModelsIndexedForEntity,
	getAllRelationsInState,
};
