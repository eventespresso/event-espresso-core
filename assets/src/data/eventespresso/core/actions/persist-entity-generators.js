/**
 * External imports.
 */
import {
	isModelEntityOfModel,
	isModelEntityFactoryOfModel,
} from '@eventespresso/validators';
import {
	applyQueryString,
	keyEntitiesByPrimaryKeyValue,
} from '@eventespresso/model';
import { isEmpty, isArray } from 'lodash';
import warning from 'warning';

/**
 * Internal imports.
 */
import {
	fetch,
	select,
	dispatch,
	resolveSelect,
	resolveDispatch
} from '../../base-controls';
import {
	removeEntityById,
	removeDeleteEntityId,
	removeTrashEntityId,
} from './remove-entities';
import { receiveAndReplaceEntityRecords } from './receive-entities';
import { receiveUpdatedEntityIdForRelations } from './receive-relations';
import { REDUCER_KEY as CORE_REDUCER_KEY } from '../constants';
import { REDUCER_KEY as SCHEMA_REDUCER_KEY } from '../../schema/constants';

/**
 * Action generator for persisting an entity record (insert/update)
 * to the server.
 *
 * @param {string} modelName
 * @param {BaseEntity} entity
 * @return {null|BaseEntity} If successfully persisted the persisted entity is
 * returned.  Otherwise null.
 */
function* persistEntityRecord( modelName, entity ) {
	// check if is an instance of BaseEntity
	if ( ! isModelEntityOfModel( entity, modelName ) ) {
		warning(
			false,
			'The provided entity is not a BaseEntity child for the ' +
			'provided model.'
		);
		return null;
	}
	// check if there are any changes in the entity
	if ( entity.isClean ) {
		warning(
			false,
			'The entity provided has no changes to persist.'
		);
		return null;
	}
	const factory = yield resolveSelect(
		SCHEMA_REDUCER_KEY,
		'getFactoryForModel',
		modelName
	);
	if ( ! isModelEntityFactoryOfModel( factory, modelName ) ) {
		return null;
	}
	const path = applyQueryString( modelName );
	const updatedEntity = yield fetch( {
		path: entity.isNew ? path : path + '/' + entity.id,
		method: entity.isNew ? 'POST' : 'PUT',
		data: entity.forPersist,
	} );
	if ( isEmpty( updatedEntity ) ) {
		return null;
	}
	const updatedEntityRecord = factory.fromExisting( updatedEntity );
	const newId = updatedEntityRecord.id;
	if ( entity.isNew ) {
		yield removeEntityById( modelName, entity.id );
		yield dispatch(
			'core/data',
			'finishResolution',
			CORE_REDUCER_KEY,
			'getEntityById',
			[ modelName, newId ]
		);
		yield receiveUpdatedEntityIdForRelations( modelName, entity.id, newId );
	}
	yield receiveAndReplaceEntityRecords(
		modelName,
		[ updatedEntityRecord ]
	);
	return updatedEntityRecord;
}

/**
 * Action generator for persisting entities with the given id to the server.
 *
 * @param {string} modelName
 * @param {number} entityId
 * @return {BaseEntity|null} If the entity is successfully persisted it is
 * returned (may have a new id!), otherwise null is returned.
 */
function* persistForEntityId( modelName, entityId ) {
	const entity = yield resolveSelect(
		CORE_REDUCER_KEY,
		'getEntityById',
		modelName,
		entityId,
	);
	if ( isModelEntityOfModel( entity, modelName ) ) {
		const persistedEntity = yield dispatch(
			CORE_REDUCER_KEY,
			'persistEntityRecord',
			modelName,
			entity
		);
		return isModelEntityOfModel( persistedEntity, modelName ) ?
			persistedEntity :
			null;
	}
	return null;
}

/**
 * Action generator for persisting entities with the given ids to the server.
 *
 * @param {string} modelName
 * @param {Array} entityIds
 * @return {Object} Entities persisted indexed by ID.
 */
function* persistForEntityIds( modelName, entityIds = [] ) {
	const entities = yield select(
		CORE_REDUCER_KEY,
		'getEntitiesByIds',
		modelName,
		entityIds,
	);
	const retrievedEntities = isArray( entities ) ?
		keyEntitiesByPrimaryKeyValue( 'event', entities ) :
		new Map();
	const retrievedIds = Array.from( retrievedEntities.keys() );
	const persistedEntities = {};
	while ( retrievedIds.length > 0 ) {
		const persistedEntity = yield dispatch(
			CORE_REDUCER_KEY,
			'persistEntityRecord',
			modelName,
			retrievedEntities.get( retrievedIds.pop() )
		);
		if ( isModelEntityOfModel( persistedEntity, modelName ) ) {
			persistedEntities[ persistedEntity.id ] = persistedEntity;
		}
	}
	return persistedEntities;
}

/**
 * Action generator for persisting any queued deletes for the given model.
 *
 * @param {string} modelName
 * @return {Array} An array of entity ids for entities successfully deleted.
 */
function* persistDeletesForModel( modelName ) {
	const entityIds = yield select(
		CORE_REDUCER_KEY,
		'getEntityIdsQueuedForDelete',
		modelName
	);
	const deletedIds = [];
	while ( entityIds.length > 0 ) {
		const entityId = entityIds.pop();
		const response = yield fetch( {
			path: applyQueryString( modelName ) + '/' + entityId,
			data: { force: true },
			method: 'DELETE',
		} );
		if ( response.deleted ) {
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
function* persistTrashesForModel( modelName ) {
	const entityIds = yield select(
		CORE_REDUCER_KEY,
		'getEntityIdsQueuedForTrash',
		modelName
	);
	const trashedIds = [];
	while ( entityIds.length > 0 ) {
		const entityId = entityIds.pop();
		const success = yield fetch( {
			path: applyQueryString( modelName ) + '/' + entityId,
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
function* persistAllDeletes() {
	const modelsForDelete = yield select(
		CORE_REDUCER_KEY,
		'getModelsQueuedForDelete'
	);
	const deletedIds = {},
		trashedIds = {};
	while ( modelsForDelete.length > 0 ) {
		const modelForDelete = modelsForDelete.pop();
		const idsDeleted = yield resolveDispatch(
			CORE_REDUCER_KEY,
			'persistDeletesForModel',
			modelForDelete
		);
		if ( ! isEmpty( idsDeleted ) ) {
			deletedIds[ modelForDelete ] = idsDeleted;
		}
	}
	const modelsForTrash = yield select(
		CORE_REDUCER_KEY,
		'getModelsQueuedForTrash'
	);
	while ( modelsForTrash.length > 0 ) {
		const modelForTrash = modelsForTrash.pop();
		const idsTrashed = yield resolveDispatch(
			CORE_REDUCER_KEY,
			'persistTrashesForModel',
			modelForTrash
		);
		if ( ! isEmpty( idsTrashed ) ) {
			trashedIds[ modelForTrash ] = idsTrashed;
		}
	}
	return { deleted: deletedIds, trashed: trashedIds };
}

export {
	persistEntityRecord,
	persistForEntityId,
	persistForEntityIds,
	persistDeletesForModel,
	persistTrashesForModel,
	persistAllDeletes,
};
