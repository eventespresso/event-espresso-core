/**
 * External dependencies
 */
import { filter, find, includes, prop, propEq } from 'ramda';

/**
 * Internal dependencies
 */
import { Entity, EntityDbId, EntityId } from '../../../../../domain/eventEditor/data/types';

// the following return specified entity prop
export const entityDbId = (entity: Entity): EntityDbId => prop('dbId', entity);
export const entityGuId = (entity: Entity): EntityId => prop('id', entity);

// the following return `true` if entity satisfies predicate
export const entityHasDbId = (dbId: EntityDbId) => propEq('dbId', dbId);
export const entityHasGuid = (guid: EntityId) => propEq('id', guid);

// returns entity if found in array of entities
export const findEntityByDbId = <T extends Entity>(entities: T[]) => (dbid: EntityDbId): T => {
	return find(entityHasDbId(dbid))(entities);
};

export const findEntityByGuid = <T extends Entity>(entities: T[]) => (guid: EntityId): T => {
	return find(entityHasGuid(guid))(entities);
};

export const entitiesWithDbIdInArray = (entities: Entity[], dbidArray: EntityDbId[]): any[] => {
	return filter((entity: Entity) => includes(entityDbId(entity), dbidArray), entities);
};

export const entitiesWithGuIdInArray = (entities: Entity[], guidArray: EntityId[]): any[] => {
	return filter((entity: Entity) => includes(entityGuId(entity), guidArray), entities);
};
