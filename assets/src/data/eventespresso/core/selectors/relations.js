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
import { getEntitiesByIds } from './entities';

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
		let modelName = singularModelName( entity.modelName );
		relationName = pluralModelName( relationName );
		if ( state.relations.hasIn( [ 'entityMap', modelName ] ) ) {
			return ( state.relations.getIn(
				[
					'entityMap',
					modelName,
					entity.id,
					relationName,
				],
			) || Set() ).toArray();
		}
		modelName = pluralModelName( modelName );
		relationName = singularModelName( relationName );
		if ( state.relations.hasIn( [ 'index', modelName ] ) ) {
			return ( state.relations.getIn(
				[
					'index',
					modelName,
					entity.id,
					relationName,
				]
			) || Set() ).toArray();
		}
		return [];
	},
	( state, entity, relationName ) => {
		if ( ! isModelEntity( entity ) ) {
			return [ DEFAULT_EMPTY_SET ];
		}
		const singularModel = singularModelName( entity.modelName ),
			pluralModel = pluralModelName( singularModel ),
			id = entity.id,
			singularRelationName = singularModelName( relationName ),
			pluralRelationName = pluralModelName( singularRelationName );
		return [
			state.relations.getIn( [
				'entityMap',
				singularModel,
				id,
				pluralRelationName,
			] ),
			state.relations.getIn( [
				'index',
				pluralModel,
				id,
				singularRelationName,
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
	if ( state.dirty.relations.hasIn( [ type, forAddLookup ] ) ) {
		return state.dirty.relations.getIn( [ type, forAddLookup ] ).toJS();
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
		return relations.toJS();
	}
	return {};
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
		const pluralName = pluralModelName( modelName );
		entityId = normalizeEntityId( entityId );
		// first from the entityMap
		let countRelations = (
			state.relations
				.getIn( [ 'entityMap', singleName, entityId ] ) || Map()
		).count();

		// consider maybe in the index (exists as a relation for another model)
		countRelations += (
			state.relations
				.getIn( [ 'index', pluralName, entityId ] ) || Map()
		).count();
		return countRelations;
	},
	( state, modelName, entityId ) => {
		const singleName = singularModelName( modelName );
		const pluralName = pluralModelName( modelName );
		entityId = normalizeEntityId( entityId );
		return [
			state.relations.getIn( [ 'entityMap', singleName, entityId ] ),
			state.relations.getIn( [ 'index', pluralName, entityId ] ),
		];
	}
);

export {
	getRelatedEntities,
	getRelationIdsForEntityRelation,
	getRelationAdditionsQueuedForModel,
	getRelationDeletionsQueuedForModel,
	countRelationModelsIndexedForEntity,
};
