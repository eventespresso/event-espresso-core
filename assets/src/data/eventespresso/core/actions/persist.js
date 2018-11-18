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
} from './remove';
import { receiveAndReplaceEntityRecords } from './receive';

export function* persistEntityRecord( modelName, entityId, entity ) {
	// if this is not a model entity or its not dirty then bail.
	if ( ! isModelEntityOfModel( entity, modelName ) || entity.isClean ) {
		return entity;
	}
	const factory = yield getFactoryByModel( modelName );
	if ( ! isModelEntityFactoryOfModel( factory, modelName ) ) {
		return entity;
	}
	const updatedEntity = yield fetch( {
		path: applyQueryString( modelName ),
		method: entity.isNew ? 'POST' : 'PUT',
		data: entity.forPersist,
	} );
	if ( isEmpty( updatedEntity ) ) {
		return;
	}
	const newId = getEntityPrimaryKeyValues( modelName, updatedEntity );
	const updatedEntityRecord = createAndKeyEntitiesByPrimaryKeyValue(
		factory,
		keyEntitiesByPrimaryKeyValue( modelName, [ updatedEntity ] )
	);
	if ( entity.isNew ) {
		yield removeEntityById( modelName, entityId );
	}
	yield receiveAndReplaceEntityRecords( modelName, updatedEntityRecord );
	return updatedEntityRecord.get( newId );
}

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

export function* persistAllDeletes() {
	const modelsForDelete = yield select(
		'eventespresso/core',
		'getModelsQueuedForDelete'
	);
	while ( modelsForDelete.length > 0 ) {
		yield persistDeletesForModel( modelsForDelete.shift() );
	}
	const modelsForTrash = yield select(
		'eventespresso/core',
		'getModelsQueuedForTrash'
	);
	while ( modelsForTrash.length > 0 ) {
		yield persistTrashesForModel( modelsForTrash.shift() );
	}
}
