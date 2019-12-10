import { find, propEq } from 'ramda';

// the following return `true` if entity satisfies predicate
export const entityHasDbId = (dbid) => propEq('dbId', parseInt(dbid, 10));
export const entityHasGuid = (guid) => propEq('id', guid);

// returns entity if found in array of entities
export const findEntityByDbId = (entities) => (dbid) => find(entityHasDbId(dbid))(entities);
export const findEntityByGuid = (entities) => (guid) => find(entityHasGuid(guid))(entities);
