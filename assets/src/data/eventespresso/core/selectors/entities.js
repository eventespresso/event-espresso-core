/**
 * External imports
 */
import createSelector from 'rememo';
import { normalizeEntityId } from '@eventespresso/helpers';

/**
 * Returns all entity records for the given modelName in the current state.
 * An entity record is the Map of entities (entityId => entity).
 * @param {Immutable.Map} state
 * @param {string} modelName
 * @return {Object<number|string, BaseEntity>}|null} A collection of entity
 * records for the given model indexed by primary key value or null if none
 * have been set in the state.
 */
const getEntityRecordsForModel = createSelector(
	( state, modelName ) => {
		return state.hasIn( [ 'entities', modelName ] ) ?
			state.getIn( [ 'entities', modelName ] ).toJS() :
			null;
	},
	( state, modelName ) => [ state.getIn( [ 'entities', modelName ] ) ]
);

/**
 * Returns all entities for the given model.
 * This differs from entityRecords, in that the entities are NOT indexed by
 * primary key value and an Array of entities is returned instead of an object.
 *
 * @param {Immutable.Map} state
 * @param {string} modelName
 * @return {Array<BaseEntity>|null} An array of entities for the given model or
 * null if none have been set in the state.
 */
const getEntitiesForModel = createSelector(
	( state, modelName ) => {
		return state.hasIn( [ 'entities', modelName ] ) ?
			state.getIn( [ 'entities', modelName ] ).valueSeq().toArray() :
			[];
	},
	( state, modelName ) => [ state.getIn( [ 'entities', modelName ] ) ],
);

/**
 * Returns the model entity for the given model and id.
 *
 * @param {Immutable.Map} state
 * @param {string} modelName
 * @param {number|string} entityId
 * @return {BaseEntity|null} Returns the model entity or null.
 */
function getEntityById( state, modelName, entityId ) {
	return state.getIn( [
		'entities',
		modelName,
		normalizeEntityId( entityId ),
	] ) || null;
}

/**
 * Retrieves an array of model entities for the provided array of ids and model.
 *
 * @param {Immutable.Map} state
 * @param {string} modelName
 * @param {Array<string|number>} entityIds
 * @return {Array<BaseEntity>|null} Returns an array of model entities for the
 * provided ids or null if never been set.
 */
const getEntitiesByIds = createSelector(
	( state, modelName, entityIds ) => {
		const entities = [];
		// ensure entityIds are strings for our key pick
		if ( state.hasIn( [ 'entities', modelName ] ) ) {
			entityIds.forEach( ( entityId ) => {
				const entity = getEntityById( state, modelName, entityId );
				if ( entity !== null ) {
					entities.push( entity );
				}
			} );
		}
		return entities;
	},
	( state, modelName ) => [ state.getIn( [ 'entities', modelName ] ) ]
);

/**
 * Retrieves an array of entity ids queued for trash for the given model.
 *
 * @param {Immutable.Map} state
 * @param {string} modelName
 * @return {Array<number>} An array of entity ids.
 */
const getEntityIdsQueuedForTrash = createSelector(
	( state, modelName ) => {
		return state.hasIn( [ 'dirty', 'trash', modelName ] ) ?
			state.getIn( [ 'dirty', 'trash', modelName ] ).toArray() :
			[];
	},
	( state, modelName ) => [ state.getIn( [ 'dirty', 'trash', modelName ] ) ]
);

/**
 * Retrieves an array of entity ids queued for delete for the given model.
 *
 * @param {Immutable.Map} state
 * @param {string} modelName
 * @return {Array<number|string>} An array of entity ids.
 */
const getEntityIdsQueuedForDelete = createSelector(
	( state, modelName ) => {
		return state.hasIn( [ 'dirty', 'delete', modelName ] ) ?
			state.getIn( [ 'dirty', 'delete', modelName ] ).toArray() :
			[];
	},
	( state, modelName ) => [ state.getIn( [ 'dirty', 'delete', modelName ] ) ]
);

/**
 * Retrieves all the models currently having ids queued for trash
 *
 * @param {Immutable.Map} state
 * @return {Array<string>} An array of model names.
 */
const getModelsQueuedForTrash = createSelector(
	( state ) => {
		return state.getIn( [ 'dirty', 'trash' ] ).keySeq().toArray();
	},
	( state ) => [ state.getIn( [ 'dirty', 'trash' ] ) ]
);

/**
 * Retrieves all the models currently having ids queued for delete.
 *
 * @param {Immutable.Map} state
 * @return {Array<string>} An array of model names.
 */
const getModelsQueuedForDelete = createSelector(
	( state ) => {
		return state.getIn( [ 'dirty', 'delete' ] ).keySeq().toArray();
	},
	( state ) => [ state.getIn( [ 'dirty', 'delete' ] ) ]
);

export {
	getEntityRecordsForModel,
	getEntitiesForModel,
	getEntityById,
	getEntitiesByIds,
	getEntityIdsQueuedForTrash,
	getEntityIdsQueuedForDelete,
	getModelsQueuedForDelete,
	getModelsQueuedForTrash,
};
