/**
 * External imports
 */
import { values } from 'lodash';

/**
 * Returns whether the entity in the state for the given id is dirty.
 * If there is no entity in the state for the provided id then the value
 * returned will be false.
 * @param { Object } state
 * @param { string } modelName
 * @param { number } entityId
 * @return {boolean} True means the entity is dirty, false it is not.
 */
export function isEntityDirty( state, modelName, entityId ) {
	return state.dirty.hasOwnProperty( modelName ) &&
		state.dirty[ modelName ].indexOf( String( entityId ) ) > -1;
}

/**
 * Return all entity records currently found in the state for the given model.
 *
 * @param { Object } state
 * @param { string } modelName
 * @return {null|{}} If there are no records then null is returned.  Otherwise
 * a collection object indexed by primary key values for the entity records is
 * returned.
 */
export function getEntityRecordsForModel( state, modelName ) {
	return state.entities[ modelName ] ?
		state.entities[ modelName ] :
		null;
}

/**
 * Returns all entities for the given model in state.
 *
 * This differs from getEntityRecordsForModel in that this returns the entity
 * objects in an array as opposed to a collection indexed by entity primary key.
 *
 * @param { Object } state
 * @param { string } modelName
 * @return {null|{}} This differs from getEntityRecordsForModel in that it
 *   will return an array of entities only. If there are no entities available
 *   in the state then null is returned.
 */
export function getEntitiesForModel( state, modelName ) {
	return state.entities[ modelName ] ?
		values( state.entities[ modelName ] ) :
		null;
}

/**
 * Returns just the entity (if it exists in the state) for the given entityId.
 * @param { Object } state
 * @param { string } modelName
 * @param { number } entityId
 * @return {null|{}} Returns the entity object.
 */
export function getEntityById( state, modelName, entityId ) {
	return state.entities[ modelName ] && state.entities[ modelName ][ entityId ] ?
		state.entities[ modelName ][ entityId ] :
		null;
}
