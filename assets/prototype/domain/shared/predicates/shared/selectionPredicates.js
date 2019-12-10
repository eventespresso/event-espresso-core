import { filter, find, includes, prop, propEq } from 'ramda';

// the following return specified entity prop
export const entityDbId = (entity) => prop('dbId', entity);
export const entityGuId = (entity) => prop('id', entity);

// the following return `true` if entity satisfies predicate
export const entityHasDbId = (dbid) => propEq('dbId', parseInt(dbid, 10));
export const entityHasGuid = (guid) => propEq('id', guid);

// returns entity if found in array of entities
export const findEntityByDbId = (entities) => (dbid) => find(entityHasDbId(dbid))(entities);
export const findEntityByGuid = (entities) => (guid) => find(entityHasGuid(guid))(entities);

// returns array of entities if DbId found in array of entities
export const entitiesWithDbIdInArray = (entities, dbidArray) => filter(
	(entity) => includes(entityDbId(entity), dbidArray),
	entities
);
export const entitiesWithGuIdInArray = (entities, guidArray) => filter(
	(entity) => includes(entityGuId(entity), guidArray),
	entities
);
