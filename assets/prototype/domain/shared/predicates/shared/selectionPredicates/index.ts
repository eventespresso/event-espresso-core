/**
 * External dependencies
 */
import { filter, find, includes, prop, propEq } from 'ramda';

/**
 * Internal dependencies
 */
import { Entity, EntityDbId, EntityId, Price, PriceType } from '../../../../../domain/eventEditor/data/types';

// the following return specified entity prop
export const entityDbId = (entity: Entity): EntityDbId => prop('dbId', entity);
export const entityGuId = (entity: Entity): EntityId => prop('id', entity);

// the following return `true` if entity satisfies predicate
export const entityHasDbId = (dbId: EntityDbId) => propEq('dbId', dbId);
export const entityHasGuid = (guid: EntityId) => propEq('id', guid);

// returns entity if found in array of entities
export const findEntityByDbId = (entities: Entity[]) => (dbid: EntityDbId): Entity => {
	return find(entityHasDbId(dbid))(entities);
};

export const findEntityByGuid = (entities: Entity[]) => (guid: EntityId): Entity => {
	return find(entityHasGuid(guid))(entities);
};

// returns array of entities if DbId found in array of entities
export const entitiesWithDbIdInArray = (entities: any[], dbidArray: EntityDbId[]): any[] => {
	return filter((entity) => includes(entityDbId(entity), dbidArray), entities);
};

export const entitiesWithGuIdInArray = (entities: any[], guidArray: EntityId[]): any[] => {
	return filter((entity) => includes(entityGuId(entity), guidArray), entities);
};
