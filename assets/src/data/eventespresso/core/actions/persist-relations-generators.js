/**
 * External imports.
 */
import { isEmpty, keys } from 'lodash';
import cuid from 'cuid';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { singularModelName } from '@eventespresso/model';

/**
 * Internal imports.
 */
import {
	fetch,
	select,
	dispatch,
	resolveDispatch,
	resolveSelect,
} from '../../base-controls';
import { removeDirtyRelationForType } from './remove-relations';
import { REDUCER_KEY as CORE_REDUCER_KEY } from '../constants';
import { REDUCER_KEY as SCHEMA_REDUCER_KEY } from '../../schema/constants';

const DEFAULT_EMPTY_OBJECT = {};
const DEFAULT_EMPTY_ARRAY = [];

/**
 * Persist all the relations queued for addition (new relations being assigned
 * between models)
 *
 * @yield {function}  select control to get the relation models queued for
 *                    addition
 * @yield {function}  dispatch control to `persistAddRelationsForModel` action
 *                    for each relation model queued for relation additions.
 */
function* persistAllAddRelations() {
	let addRelationModels = yield select(
		CORE_REDUCER_KEY,
		'getRelationModelsQueuedForAddition'
	);
	// to avoid mutating cached selector result
	addRelationModels = [ ...addRelationModels ];
	while ( addRelationModels.length > 0 ) {
		yield dispatch(
			CORE_REDUCER_KEY,
			'persistAddRelationsForModel',
			addRelationModels.pop()
		);
	}
}

/**
 * Persist all the relations queued for deletion (existing model relations to
 * unassign)
 *
 * @yield {function} select control to get the relation models queued for
 *                   deletion
 * @yield {function} dispatch control to `persistDeleteRelationsForModel` action
 *                   for each relation model queued for relation deletions.
 */
function* persistAllDeleteRelations() {
	let deleteRelationModels = yield select(
		CORE_REDUCER_KEY,
		'getRelationModelsQueuedForDeletion'
	);
	// to avoid mutating cached selector result
	deleteRelationModels = [ ...deleteRelationModels ];
	while ( deleteRelationModels.length > 0 ) {
		yield dispatch(
			CORE_REDUCER_KEY,
			'persistDeleteRelationsForModel',
			deleteRelationModels.pop()
		);
	}
}

/**
 * Action generator for persisting any queued add relations to the server
 * specific to the given model name.
 *
 * @param {string} modelName
 * @return {Object} returns an object indexed by the originating entity id for
 * the requested model and with values that are an Object indexed by relation
 * names with values of relation Ids persisted.
 */
function* persistAddRelationsForModel( modelName ) {
	modelName = singularModelName( modelName );
	return yield resolveDispatch(
		CORE_REDUCER_KEY,
		'persistRelationsForModel',
		modelName
	);
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
function* persistDeleteRelationsForModel( modelName ) {
	modelName = singularModelName( modelName );
	return yield resolveDispatch(
		CORE_REDUCER_KEY,
		'persistRelationsForModel',
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
function* persistRelationsForModel( modelName, addRelation = true ) {
	modelName = singularModelName( modelName );
	const relationState = yield resolveDispatch(
		CORE_REDUCER_KEY,
		'getRelationState',
		modelName,
		addRelation
	);
	if ( isEmpty( relationState ) ) {
		return DEFAULT_EMPTY_OBJECT;
	}
	const entityIds = keys( relationState );
	const relationsPersisted = entityIds.length > 0 ?
		{} :
		DEFAULT_EMPTY_OBJECT;
	while ( entityIds.length > 0 ) {
		const entityId = entityIds.pop();

		const persistedRelations = yield resolveDispatch(
			CORE_REDUCER_KEY,
			'persistRelationsForEntityId',
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
function* persistRelationsForEntityId(
	modelName,
	entityId,
	addRelation = true,
	relationState = DEFAULT_EMPTY_OBJECT
) {
	modelName = singularModelName( modelName );
	relationState = yield resolveDispatch(
		CORE_REDUCER_KEY,
		'getRelationState',
		modelName,
		addRelation,
		relationState
	);
	if ( isEmpty( relationState ) ) {
		return DEFAULT_EMPTY_OBJECT;
	}
	const relationNames = relationState[ entityId ] ?
		keys( relationState[ entityId ] ) :
		DEFAULT_EMPTY_ARRAY;
	if ( isEmpty( relationNames ) ) {
		return DEFAULT_EMPTY_OBJECT;
	}
	const persistedRelations = {};
	while ( relationNames.length > 0 ) {
		const relationName = relationNames.pop();
		const persistedRelationIds =
			yield resolveDispatch(
				CORE_REDUCER_KEY,
				'persistRelationsForEntityIdAndRelation',
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
function* persistRelationsForEntityIdAndRelation(
	modelName,
	entityId,
	relationName,
	addRelation = true,
	relationState = DEFAULT_EMPTY_OBJECT
) {
	modelName = singularModelName( modelName );
	relationName = singularModelName( relationName );
	relationState = yield resolveDispatch(
		CORE_REDUCER_KEY,
		'getRelationState',
		modelName,
		addRelation,
		relationState
	);
	if ( isEmpty( relationState ) ) {
		return DEFAULT_EMPTY_ARRAY;
	}
	const relationEntityIds = relationState[ entityId ] &&
	relationState[ entityId ][ relationName ] ?
		[ ...relationState[ entityId ][ relationName ] ] :
		DEFAULT_EMPTY_ARRAY;
	if ( relationEntityIds.length < 1 ) {
		return DEFAULT_EMPTY_ARRAY;
	}
	const persistedRelationIds = [];
	while ( relationEntityIds.length > 0 ) {
		const persistedRelationId =
			yield resolveDispatch(
				CORE_REDUCER_KEY,
				'persistRelationsForEntityIdAndRelationId',
				modelName,
				entityId,
				relationName,
				relationEntityIds.pop(),
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
function* persistRelationsForEntityIdAndRelationId(
	modelName,
	entityId,
	relationName,
	relationId,
	addRelation = true,
	relationState = DEFAULT_EMPTY_OBJECT
) {
	modelName = singularModelName( modelName );
	relationName = singularModelName( relationName );
	relationState = yield resolveDispatch(
		CORE_REDUCER_KEY,
		'getRelationState',
		modelName,
		addRelation,
		relationState
	);
	let entityIdChanged = false;
	if ( isEmpty( relationState ) ) {
		return 0;
	}
	// is the entityId a cuid?  If so, then let's persist.
	if ( cuid.isCuid( entityId ) ) {
		entityId = yield resolveDispatch(
			CORE_REDUCER_KEY,
			'persistNewEntityAndRemoveDirtyRelations',
			relationName,
			relationId,
			modelName,
			entityId,
			addRelation,
			[ modelName, entityId ],
		);
		// if entityId is 0 bail because it didn't get persisted so relations
		// can't be persisted either.
		if ( entityId === 0 ) {
			return entityId;
		}
		entityIdChanged = true;
	}

	// is the relationId a cuid? If so, then let's persist
	if ( cuid.isCuid( relationId ) ) {
		relationId = yield resolveDispatch(
			CORE_REDUCER_KEY,
			'persistNewEntityAndRemoveDirtyRelations',
			relationName,
			relationId,
			modelName,
			entityId,
			addRelation,
			[ relationName, relationId ],
			! entityIdChanged,
		);
		// if relationId is 0, bail because it didn't get persisted so relations
		// can't be persisted either.
		if ( relationId === 0 ) {
			return relationId;
		}
	}
	const endpoint = yield resolveSelect(
		SCHEMA_REDUCER_KEY,
		'getRelationEndpointForEntityId',
		modelName,
		entityId,
		relationName,
	);
	const success = endpoint ?
		yield fetch(
			{
				path: endpoint + '/' + relationId,
				method: addRelation ? 'PUT' : 'DELETE',
			}
		) :
		false;
	if ( success ) {
		// Even when ids have changed, this should catch any potential queued
		// relation items for those things that got updated in state in a prior
		// dispatch
		yield removeDirtyRelationForType(
			relationName,
			relationId,
			modelName,
			entityId,
			addRelation
		);
		return relationId;
	}
	return 0;
}

/**
 * Action generator for handling persisting a new entity existing in the
 * relation.
 *
 * @param {string} relationName
 * @param {number} relationId
 * @param {string} modelName
 * @param {number} entityId
 * @param {boolean} addRelation
 * @param {Array} persistingArguments
 * @param {boolean} doRelationRemoval
 * @return {number} Either the new id or 0 if the entity was not successfully
 * persisted.
 */
function* persistNewEntityAndRemoveDirtyRelations(
	relationName,
	relationId,
	modelName,
	entityId,
	addRelation,
	persistingArguments,
	doRelationRemoval = true,
) {
	relationName = singularModelName( relationName );
	modelName = singularModelName( modelName );
	const persistedEntity = yield resolveDispatch(
		CORE_REDUCER_KEY,
		'persistForEntityId',
		...persistingArguments,
	);
	// if not dispatched successfully then let's bail because relation can't
	// be persisted
	if ( ! isModelEntityOfModel( persistedEntity, persistingArguments[ 0 ] ) ) {
		return 0;
	}
	if ( doRelationRemoval ) {
		// ensure oldId is removed from items (this is a failsafe in case the
		// id swap in relation state isn't complete yet).
		yield removeDirtyRelationForType(
			relationName,
			relationId,
			modelName,
			entityId,
			addRelation
		);
	}
	return persistedEntity.id;
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
	relationState = DEFAULT_EMPTY_OBJECT
) {
	modelName = singularModelName( modelName );
	const selector = addRelation ?
		'getRelationAdditionsQueuedForModel' :
		'getRelationDeletionsQueuedForModel';
	relationState = isEmpty( relationState ) ?
		yield select(
			CORE_REDUCER_KEY,
			selector,
			modelName,
		) :
		relationState;
	return relationState;
}

export {
	persistAllAddRelations,
	persistAllDeleteRelations,
	persistAddRelationsForModel,
	persistDeleteRelationsForModel,
	persistRelationsForModel,
	persistRelationsForEntityId,
	persistRelationsForEntityIdAndRelation,
	persistRelationsForEntityIdAndRelationId,
	persistNewEntityAndRemoveDirtyRelations,
	getRelationState,
};
