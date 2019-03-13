/**
 * External imports
 */
import createSelector from 'rememo';
import { normalizeEntityId } from '@eventespresso/helpers';
import { singularModelName } from '@eventespresso/model';

/**
 * Returns all entity records for the given modelName in the current state.
 * An entity record is the Map of entities (entityId => entity).
 * @param {Object} state
 * @param {string} modelName
 * @return {Object<number|string, BaseEntity>}|null} A collection of entity
 * records for the given model indexed by primary key value or null if none
 * have been set in the state.
 */
const getEntityRecordsForModel = createSelector(
	( state, modelName ) => {
		modelName = singularModelName( modelName );
		return state.entities.has( modelName ) ?
			state.entities.get( modelName ).toJS() :
			null;
	},
	( state, modelName ) => [ state.entities.get( modelName ) ]
);

/**
 * Returns all entities for the given model.
 * This differs from entityRecords, in that the entities are NOT indexed by
 * primary key value and an Array of entities is returned instead of an object.
 *
 * @param {Object} state
 * @param {string} modelName
 * @return {Array<BaseEntity>|null} An array of entities for the given model or
 * null if none have been set in the state.
 */
const getEntitiesForModel = createSelector(
	( state, modelName ) => {
		modelName = singularModelName( modelName );
		return state.entities.has( modelName ) ?
			state.entities.get( modelName ).valueSeq().toArray() :
			[];
	},
	( state, modelName ) => [ state.entities.get( modelName ) ],
);

/**
 * Returns the model entity for the given model and id.
 *
 * @param {Object} state
 * @param {string} modelName
 * @param {number|string} entityId
 * @return {BaseEntity|null} Returns the model entity or null.
 */
function getEntityById( state, modelName, entityId ) {
	modelName = singularModelName( modelName );
	return state.entities.getIn( [
		modelName,
		normalizeEntityId( entityId ),
	] ) || null;
}

/**
 * Retrieves an array of model entities for the provided array of ids and model.
 *
 * @param {Object} state
 * @param {string} modelName
 * @param {Array<string|number>} entityIds
 * @return {Array<BaseEntity>|null} Returns an array of model entities for the
 * provided ids or null if never been set.
 */
const getEntitiesByIds = ( state, modelName, entityIds ) => {
	return retrieveEntitiesByIds( state, modelName, entityIds.join() );
};

getEntitiesByIds.clear = () => retrieveEntitiesByIds.clear();
getEntitiesByIds.getDependants = ( state, modelName ) => retrieveEntitiesByIds
	.getDependants( state, modelName );

/**
 * Retrieves an array of model entities for the provided array of ids and model.
 *
 * @param {Object} state
 * @param {string} modelName
 * @param {string} entityIds  A comma delimited string of ids.  This is so
 * we are passing a primitive arg to rememo for better cache validation.
 * @return {Array<BaseEntity>|null} Returns an array of model entities for the
 * provided ids or null if never been set.
 */
const retrieveEntitiesByIds = createSelector(
	( state, modelName, entityIds ) => {
		modelName = singularModelName( modelName );
		entityIds = entityIds.split( ',' );
		const entities = [];
		if ( state.entities.has( modelName ) ) {
			entityIds.forEach( ( entityId ) => {
				const entity = getEntityById( state, modelName, entityId );
				if ( entity !== null ) {
					entities.push( entity );
				}
			} );
		}
		return entities;
	},
	( state, modelName ) => [ state.entities.get( modelName ) ]
);

/**
 * Retrieves an array of entity ids queued for trash for the given model.
 *
 * @param {Object} state
 * @param {string} modelName
 * @return {Array<number>} An array of entity ids.
 */
const getEntityIdsQueuedForTrash = createSelector(
	( state, modelName ) => {
		modelName = singularModelName( modelName );
		return state.dirty.trash.has( modelName ) ?
			state.dirty.trash.get( modelName ).toArray() :
			[];
	},
	( state, modelName ) => [ state.dirty.trash.get( modelName ) ]
);

/**
 * Retrieves an array of entity ids queued for delete for the given model.
 *
 * @param {Object} state
 * @param {string} modelName
 * @return {Array<number|string>} An array of entity ids.
 */
const getEntityIdsQueuedForDelete = createSelector(
	( state, modelName ) => {
		modelName = singularModelName( modelName );
		return state.dirty.delete.has( modelName ) ?
			state.dirty.delete.get( modelName ).toArray() :
			[];
	},
	( state, modelName ) => [ state.dirty.delete.get( modelName ) ]
);

/**
 * Retrieves all the models currently having ids queued for trash
 *
 * @param {Object} state
 * @return {Array<string>} An array of model names.
 */
const getModelsQueuedForTrash = createSelector(
	( state ) => {
		return state.dirty.trash.keySeq().toArray();
	},
	( state ) => [ state.dirty.trash ]
);

/**
 * Retrieves all the models currently having ids queued for delete.
 *
 * @param {Object} state
 * @return {Array<string>} An array of model names.
 */
const getModelsQueuedForDelete = createSelector(
	( state ) => {
		return state.dirty.delete.keySeq().toArray();
	},
	( state ) => [ state.dirty.delete ]
);

/**
 * Returns the state.entities value.
 *
 * @param {Object} state
 *
 * @return {Map} The entities state immutable map.
 */
const getAllEntitiesInState = ( state ) => state.entities;

export {
	getEntityRecordsForModel,
	getEntitiesForModel,
	getEntityById,
	getEntitiesByIds,
	getEntityIdsQueuedForTrash,
	getEntityIdsQueuedForDelete,
	getModelsQueuedForDelete,
	getModelsQueuedForTrash,
	getAllEntitiesInState,
};
