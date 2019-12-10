import { filter, find, propEq } from 'ramda';

import { entityHasDbId, entityHasGuid, findEntityByDbId, findEntityByGuid } from '../shared/selectionPredicates';

// the following return `true` if price satisfies predicate
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

// returns price if found in array of prices
export const findBasePrice = (prices) => find(isBasePrice)(prices);
export const findPriceByDbId = (prices) => findEntityByDbId(prices);
export const findPriceByGuid = (prices) => findEntityByGuid(prices);

// returns array of prices that satisfy predicate
export const getPriceModifiers = (prices) => filter(isNotBasePrice, prices);
export const getTaxes = (prices) => filter(isTax, prices);
