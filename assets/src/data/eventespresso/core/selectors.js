/**
 * External imports
 */
import { map, values } from 'lodash';

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
	//make sure entityId is a string, because objects are indexed by strings.
	entityId = String( entityId );
	return state[ modelName ] && state[ modelName ][ entityId ] ?
		state[ modelName ][ entityId ].dirty :
		false;
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
	return state[ modelName ] ?
		state[ modelName ] :
		null;
}

/**
 * Returns all entities for the given model in state (just the entities)
 *
 * @param { Object } state
 * @param { string } modelName
 * @return {null|{}} This differs from getEntityRecordsForModel in that it
 *   will return an array of entities only as opposed to a collection of entity
 *   records. If there are no entities available in the state then null is
 *   returned.
 */
export function getEntitiesForModel( state, modelName ) {
	return state[ modelName ] ?
		map( values( state[ modelName ] ), 'entity' ) :
		null;
}

/**
 * Return an entity record (if it exists) for the given entityId.
 *
 * @param { Object } state
 * @param { string } modelName
 * @param { number } entityId
 * @return {null|{}}  Returns an entity record (which contains the keys 'entity'
 * and 'dirty')
 */
export function getEntityRecordById( state, modelName, entityId ) {
	//make sure entityId is a string, because objects are indexed by strings.
	entityId = String( entityId );
	return state[ modelName ] && state[ modelName ][ entityId ] ?
		state[ modelName ][ entityId ] :
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
	//make sure entityId is a string, because objects are indexed by strings.
	entityId = String( entityId );
	return state[ modelName ] && state[ modelName ][ entityId ] ?
		state[ modelName ][ entityId ].entity :
		null;
}
