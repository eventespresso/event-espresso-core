/**
 * External imports.
 */
import { isEmpty, keys } from 'lodash';

/**
 * Internal imports.
 */
import { fetch, select } from '../../base-controls';
import {
	removeDirtyRelationForType,
	removeDirtyRelationIndex,
} from './remove';

/**
 * Action generator for persisting any queued add relations to the server
 * specific to the given model name.
 *
 * @param {string} modelName
 * @return {Object} returns an object indexed by the originating entity id for
 * the requested model and with values that are an Object indexed by relation
 * names with values of relation Ids persisted.
 */
export function* persistAddRelationsForModel( modelName ) {
	return yield persistRelationsForModel( modelName );
}

/**
 * Action generator for persisting any queued delete relations to the server
 * specific to the given model name.
 *
 * @param {string} modelName
 * @return {Object} returns an object indexed by the originating entity id for
 * the requested model and with values that are an Object indexed by relation
 * names with values of relation Ids persisted.
 */
export function* persistDeleteRelationsForModel( modelName ) {
	return yield persistRelationsForModel(
		modelName,
		false
	);
}

/**
 * Action generator for persisting any queued relations to the server specific
 * to the given model name.
 *
 * @param {string} modelName
 * @param {boolean} addRelation  Whether this persist request is for queued
 * relations to add for the model or queued relations to delete for the model.
 * @return {Object} returns an object indexed by the originating entity id for
 * the requested model and with values that are an Object indexed by relation
 * names with values of relation Ids persisted.
 */
export function* persistRelationsForModel( modelName, addRelation = true ) {
	const relationState = yield getRelationState( modelName, addRelation );
	if ( isEmpty( relationState ) ) {
		return;
	}
	const relationsPersisted = {};
	const entityIds = keys( relationState );
	while ( entityIds.length > 0 ) {
		const entityId = entityIds.shift();
		const persistedRelations = yield persistRelationsForEntityId(
			modelName,
			entityId,
			addRelation,
			relationState
		);
		if ( ! isEmpty( persistedRelations ) ) {
			relationsPersisted[ entityId ] = persistedRelations;
		}
	}
	return relationsPersisted;
}

/**
 * Action generator for persisting any queued relations to the server specific
 * to the given entity id belonging to the given model name.
 *
 * @param {string} modelName
 * @param {number} entityId
 * @param {boolean} addRelation Whether this persist request is for queued
 * relations to add for the model or queued relations to delete for the model.
 * @param {Object} relationState Optional, if the current relation state is known
 * it can be passed in.  Typically client code won't know this so should not be
 * passed in.
 * @return {Object} An object indexed by relation names with the values an array
 * of relation ids for each relation that were persisted.
 */
export function* persistRelationsForEntityId(
	modelName,
	entityId,
	addRelation = true,
	relationState = {}
) {
	relationState = yield getRelationState(
		modelName,
		addRelation,
		relationState
	);
	if ( isEmpty( relationState ) ) {
		return {};
	}
	const relationNames = relationState[ entityId ] ?
		keys( relationState[ entityId ] ) :
		[];
	if ( isEmpty( relationNames ) ) {
		return {};
	}
	const persistedRelations = {};
	while ( relationNames.length > 0 ) {
		const relationName = relationNames.shift();
		const persistedRelationIds =
			yield persistRelationsForEntityIdAndRelation(
				modelName,
				entityId,
				relationName,
				addRelation,
				relationState
			);
		if ( persistedRelationIds.length > 0 ) {
			persistedRelations[ relationName ] = persistedRelationIds;
		}
	}
	return persistedRelations;
}

/**
 * Action generator for persisting any queued relations to the server specific
 * to the given entity id belonging to the given model name and for the given
 * relation to that model.
 *
 * @param {string} modelName
 * @param {number} entityId
 * @param {string} relationName
 * @param {boolean} addRelation Whether this persist request is for queued
 * relations to add for the model or queued relations to delete for the model.
 * @param {Object} relationState Optional, if the current relation state is known
 * it can be passed in.  Typically client code won't know this so should not be
 * passed in.
 * @return {Array} An array of relation ids persisted for that relation.
 */
export function* persistRelationsForEntityIdAndRelation(
	modelName,
	entityId,
	relationName,
	addRelation = true,
	relationState = {}
) {
	relationState = yield getRelationState(
		modelName,
		addRelation,
		relationState
	);
	if ( isEmpty( relationState ) ) {
		return [];
	}
	const relationEntityIds = relationState[ entityId ] &&
	relationState[ entityId ][ relationName ] ?
		relationState[ entityId ][ relationName ] :
		[];
	const persistedRelationIds = [];
	while ( relationEntityIds.length > 0 ) {
		const persistedRelationId =
			yield persistRelationsForEntityIdAndRelationId(
				modelName,
				entityId,
				relationName,
				relationEntityIds.shift(),
				addRelation,
				relationState
			);
		if ( persistedRelationId ) {
			persistedRelationIds.push( persistedRelationId );
		}
	}
	return persistedRelationIds;
}

/**
 * Action generator for persisting any queued relations to the server specific
 * to the given entity id belonging to the given model name, for the given
 * relation to that model and the given relation id for that relation.
 *
 * @param {string} modelName
 * @param {number} entityId
 * @param {string} relationName
 * @param {number} relationId
 * @param {boolean} addRelation Whether this persist request is for queued
 * relations to add for the model or queued relations to delete for the model.
 * @param {Object} relationState Optional, if the current relation state is known
 * it can be passed in.  Typically client code won't know this so should not be
 * passed in.
 * @return {number} If 0 is returned then the entity was not persisted,
 * otherwise the value returned will be the id persisted.
 */
export function* persistRelationsForEntityIdAndRelationId(
	modelName,
	entityId,
	relationName,
	relationId,
	addRelation = true,
	relationState = {}
) {
	relationState = yield getRelationState(
		modelName,
		addRelation,
		relationState
	);
	if ( isEmpty( relationState ) ) {
		return 0;
	}
	const endpoint = ''; // @todo need to generate endpoints for adding relations
	const success = yield fetch(
		{
			path: endpoint,
			method: addRelation ? 'PUT' : 'DELETE',
		}
	);
	if ( success ) {
		yield removeDirtyRelationForType(
			relationName,
			relationId,
			modelName,
			entityId,
			addRelation
		);
		yield removeDirtyRelationIndex(
			relationName,
			relationId,
			modelName,
			entityId,
			addRelation,
		);
		return relationId;
	}
	return 0;
}

/**
 * Generator for returning relation state for the given model.
 *
 * @param {string} modelName
 * @param {boolean} addRelation  Whether to return the relation state for relations
 * queued for adding (true) or deletion (false).
 * @param {Object} relationState  Optionally, callers can provide a relation
 * relation state and if provided will be used instead of selecting from the
 * store.
 *
 * @return {Object}  The relation state for the given model.
 */
function* getRelationState(
	modelName,
	addRelation = true,
	relationState = {}
) {
	const selector = addRelation ?
		'getRelationAdditionsQueuedForModel' :
		'getRelationDeletionsQueuedForModel';
	relationState = isEmpty( relationState ) ?
		yield select(
			'eventespresso/core',
			selector,
			modelName,
		) :
		relationState;
	return relationState;
}
