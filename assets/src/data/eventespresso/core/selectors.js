/**
 * External imports
 */
import { map, values } from 'lodash';

export function isEntityDirty( state, modelName, entityId ) {
	//make sure entityId is a string, because objects are indexed by strings.
	entityId = String(entityId);
	return state[ modelName ] && state[ modelName ][ entityId ] ?
		state[ modelName ][ entityId ].dirty :
		false;
}


export function getEntityRecordsForModel( state, modelName ) {
	return state[ modelName ] ?
		state[ modelName ] :
		null;
}

// returns all entities for the given model in state (just the entities)
export function getEntitiesForModel( state, modelName ) {
	return state[ modelName ] ?
		map( values( state[ modelName ] ), 'entity' ) :
		null;
}


export function getEntityRecordById( state, modelName, entityId ) {
	//make sure entityId is a string, because objects are indexed by strings.
	entityId = String(entityId);
	return state[ modelName ] && state[ modelName ][ entityId ] ?
		state[ modelName ][ entityId ] :
		null;
}

export function getEntityById( state, modelName, entityId ) {
	//make sure entityId is a string, because objects are indexed by strings.
	entityId = String(entityId);
	return state[ modelName ] && state[ modelName ][ entityId ] ?
		state[ modelName ][ entityId ].entity :
		null;
}