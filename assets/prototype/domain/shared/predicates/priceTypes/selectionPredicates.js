import { find, propEq } from 'ramda';

import { entityHasDbId, entityHasGuid, findEntityByDbId, findEntityByGuid } from '../shared/selectionPredicates';

// the following return `true` if price type satisfies predicate
export const priceTypeHasDbId = (dbid) => propEq('dbId', parseInt(dbid, 10));
export const priceTypeHasGuid = (guid) => propEq('id', guid);
// is a base price ?
export const isBasePrice = propEq('isBasePrice', true);
export const isNotBasePrice = propEq('isBasePrice', false);
// is a discount ?
export const isDiscount = propEq('isDiscount', true);
export const isNotDiscount = propEq('isDiscount', false);
// is a percent based modifier ?
export const isPercent = propEq('isPercent', true);
export const isNotPercent = propEq('isPercent', false);
// is a tax ?
export const isTax = propEq('isTax', true);
export const isNotTax = propEq('isTax', false);

// returns price type if found in array of price types
export const findPriceTypeByDbId = (priceTypes) => (dbid) => find(priceTypeHasDbId(dbid))(priceTypes);
export const findPriceTypeByGuid = (priceTypes) => (guid) => find(priceTypeHasGuid(guid))(priceTypes);
