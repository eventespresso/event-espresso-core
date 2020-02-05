import { filter, find, includes, prop, propEq } from 'ramda';

import { Entity, EntityDbId, EntityId } from '../../../../../domain/eventEditor/services/apollo/types';

// the following return specified entity prop
export const entityDbId = <T extends Entity>(entity: T): EntityDbId => prop('dbId', entity);
export const entityGuId = <T extends Entity>(entity: T): EntityId => prop('id', entity);

// the following return a function that:
// recieves an entity and returns`true` if entity matches property supplied to predicate
export const entityHasDbId = <T extends Entity>(dbId: EntityDbId): ((entity: T) => boolean) => {
	return propEq<EntityDbId>('dbId', dbId);
};
export const entityHasGuid = <T extends Entity>(guid: EntityId): ((entity: T) => boolean) => {
	return propEq<EntityId>('id', guid);
};

// the following return a function that:
// returns the entity with specified property if found in array of entities supplied to predicate
export const findEntityByDbId = <T extends Entity>(entities: T[]) => (dbid: EntityDbId): T => {
	return find(entityHasDbId(dbid), entities);
};
export const findEntityByGuid = <T extends Entity>(entities: T[]) => (guid: EntityId): T => {
	return find(entityHasGuid(guid), entities);
};
// the following return a function that:
// returns an array of entities with specified property found in array of property values supplied to predicate
export const entitiesWithDbIdInArray = <T extends Entity>(entities: T[], dbidArray: EntityDbId[]): T[] => {
	return filter((entity: T) => includes(entityDbId(entity), dbidArray), entities);
};
export const entitiesWithGuIdInArray = <T extends Entity>(entities: T[], guidArray: EntityId[]): T[] => {
	return filter((entity: T) => includes(entityGuId(entity), guidArray), entities);
};
