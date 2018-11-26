/**
 * External imports.
 */
import {
	isModelEntityOfModel,
	isModelEntityFactoryOfModel,
} from '@eventespresso/validators';
import {
	applyQueryString,
	createAndKeyEntitiesByPrimaryKeyValue,
	keyEntitiesByPrimaryKeyValue,
	getEntityPrimaryKeyValues,
} from '@eventespresso/model';
import { isEmpty, keys } from 'lodash';
/**
 * Internal imports.
 */
import { fetch, select, dispatch } from '../../base-controls';
import { getFactoryByModel } from '../../base-resolvers';
import {
	removeEntityById,
	removeDeleteEntityId,
	removeTrashEntityId,
} from './remove-entities';
import { receiveAndReplaceEntityRecords } from './receive-entities';
import { receiveUpdatedEntityIdForRelations } from './receive-relations';

/**
 * Action generator for persisting an entity record (insert/update)
 * to the server.
 *
 * @param {string} modelName
 * @param {BaseEntity} entity
 * @return {null|Object} If successfully persisted the persisted entity is
 * returned.  Otherwise null.
 */
export function* persistEntityRecord( modelName, entity ) {
	// if this is not a model entity or its not dirty then bail.
	if ( ! isModelEntityOfModel( entity, modelName ) || entity.isClean ) {
		return null;
	}
	const factory = yield getFactoryByModel( modelName );
	if ( ! isModelEntityFactoryOfModel( factory, modelName ) ) {
		return null;
	}
	const updatedEntity = yield fetch( {
		path: applyQueryString( modelName ),
		method: entity.isNew ? 'POST' : 'PUT',
		data: entity.forPersist,
	} );
	if ( isEmpty( updatedEntity ) ) {
		return null;
	}
	const newId = getEntityPrimaryKeyValues( modelName, updatedEntity );
	const updatedEntityRecord = createAndKeyEntitiesByPrimaryKeyValue(
		factory,
		keyEntitiesByPrimaryKeyValue( modelName, [ updatedEntity ] )
	);
	if ( entity.isNew ) {
		yield removeEntityById( modelName, entity.id );
		yield receiveUpdatedEntityIdForRelations( modelName, entity.id, newId );
	}
	yield receiveAndReplaceEntityRecords( modelName, updatedEntityRecord );
	return updatedEntityRecord.get( newId );
}

/**
 * Action generator for persisting entities with the given ids to the server.
 *
 * @param {string} modelName
 * @param {Array} entityIds
 * @return {Object} Entities persisted indexed by ID.
 * @todo I wonder if there is value indexing by FORMER id.  That way client code
 * is able to know which entities were updated and have both new and former id
 * exposed.
 */
export function* persistForEntityIds( modelName, entityIds = [] ) {
	const entities = yield select(
		'eventespresso/core',
		'getEntitiesByIds',
		modelName,
		entityIds,
	);
	const retrievedIds = keys( entities );
	let persistedEntities = {};
	while ( retrievedIds.length > 0 ) {
		const id = retrievedIds.shift();
		const persistedEntity = yield dispatch(
			'eventespresso/core',
			'persistEntityRecord',
			[ modelName, id, entities[ id ] ]
		);
		persistedEntities = {
			...persistedEntities,
			[ getEntityPrimaryKeyValues( modelName, persistedEntity ) ]:
			persistedEntity,
		};
	}
	return persistedEntities;
}

/**
 * Action generator for persisting any queued deletes for the given model.
 *
 * @param {string} modelName
 * @return {Array} An array of entity ids for entities successfully deleted.
 */
export function* persistDeletesForModel( modelName ) {
	const entityIds = yield select(
		'eventespresso/core',
		'getEntitiesQueuedForDelete',
		modelName
	);
	const deletedIds = [];
	while ( entityIds.length > 0 ) {
		const entityId = entityIds.shift();
		const success = yield fetch( {
			path: applyQueryString( modelName ) + entityId,
			data: { force: true },
			method: 'DELETE',
		} );
		if ( success ) {
			deletedIds.push( entityId );
			yield removeDeleteEntityId( modelName, entityId );
		}
	}
	return deletedIds;
}

/**
 * Action generator for persisting any queued trashes for the given model.
 *
 * @param {string} modelName
 * @return {Array} An array of entity ids for entities successfully trashed.
 */
export function* persistTrashesForModel( modelName ) {
	const entityIds = yield select(
		'eventespresso/core',
		'getEntitiesQueuedForTrash',
		modelName
	);
	const trashedIds = [];
	while ( entityIds.length > 0 ) {
		const entityId = entityIds.shift();
		const success = yield fetch( {
			path: applyQueryString( modelName ) + entityId,
			method: 'DELETE',
		} );
		if ( success ) {
			trashedIds.push( entityId );
			yield removeTrashEntityId( modelName, entityId );
		}
	}
	return trashedIds;
}

/**
 * Action generator for persisting queued delete and trash actions for all
 * models in the state.
 *
 * @return {Object} An object indexed by delete/trash containing an array of
 * entity ids that were persisted.
 */
export function* persistAllDeletes() {
	const modelsForDelete = yield select(
		'eventespresso/core',
		'getModelsQueuedForDelete'
	);
	let deletedIds = [],
		trashedIds = [];
	while ( modelsForDelete.length > 0 ) {
		deletedIds = yield persistDeletesForModel( modelsForDelete.shift() );
	}
	const modelsForTrash = yield select(
		'eventespresso/core',
		'getModelsQueuedForTrash'
	);
	while ( modelsForTrash.length > 0 ) {
		trashedIds = yield persistTrashesForModel( modelsForTrash.shift() );
	}
	return { deleted: deletedIds, trashed: trashedIds };
}
