/**
 * External import
 */
import { MODEL_NAMES } from '@eventespresso/model';

/**
 * Internal imports
 */
import { getMethodName } from '../../base-model';

/**
 * Dynamic creation of actions for entities
 * @param {Object} action The action object that dynamically created functions
 * will be mapped to.
 * @return {Object} The new action object containing functions for each model.
 */
export const createActions = ( action ) => MODEL_NAMES.reduce(
	( actions, modelName ) => {
		actions[ getMethodName(
			modelName,
			'',
			'create'
		) ] = ( entity ) => action.createEntity( modelName, entity );
		actions[ getMethodName(
			modelName,
			'byId',
			'delete'
		) ] = ( entityId ) => action.deleteEntityById( modelName, entityId );
		actions[ getMethodName(
			modelName,
			'byId',
			'trash',
		) ] = ( entityId ) => action.trashEntityById( modelName, entityId );
		actions[ getMethodName(
			modelName,
			'record',
			'persist'
		) ] = ( entity ) => action.persistEntityRecord( modelName, entity );
		actions[ getMethodName(
			modelName,
			'id',
			'persistFor',
		) ] = ( entityId ) => action.persistForEntityId( modelName, entityId );
		actions[ getMethodName(
			modelName,
			'ids',
			'persistFor',
		) ] = ( entityIds ) => action.persistForEntityIds(
			modelName,
			entityIds
		);
		actions[ getMethodName(
			modelName,
			'',
			'persistDeletesFor',
		) ] = () => action.persistDeletesForModel( modelName );
		actions[ getMethodName(
			modelName,
			'',
			'persistTrashesFor',
		) ] = () => action.persistTrashesForModel( modelName );
		actions[ getMethodName(
			modelName,
			'byId',
			'remove',
		) ] = ( entityId ) => action.removeEntityById( modelName, entityId );
		actions[ getMethodName(
			modelName,
			'id',
			'removeDelete',
		) ] = ( entityId ) => action.removeDeleteEntityId(
			modelName,
			entityId
		);
		actions[ getMethodName(
			modelName,
			'id',
			'removeTrash',
		) ] = ( entityId ) => action.removeTrashEntityId( modelName, entityId );
		actions[ getMethodName(
			modelName,
			'records',
			'receive',
		) ] = ( entities ) => action.receiveEntityRecords(
			modelName,
			entities
		);
		actions[ getMethodName(
			modelName,
			'records',
			'receiveAndReplace',
		) ] = ( entities ) => action.receiveAndReplaceEntityRecords(
			modelName,
			entities
		);
		actions[ getMethodName(
			modelName,
			'id',
			'receiveTrash',
		) ] = ( entityId ) => action.receiveTrashEntityId(
			modelName,
			entityId
		);
		actions[ getMethodName(
			modelName,
			'id',
			'receiveDelete',
		) ] = ( entityId ) => action.receiveDeleteEntityId(
			modelName,
			entityId
		);
		return actions;
	},
	{}
);
