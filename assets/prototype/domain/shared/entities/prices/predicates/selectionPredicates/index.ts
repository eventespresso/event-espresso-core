import { filter, find, includes, prop, propEq } from 'ramda';

import { EntityId, EntityDbId, Price } from '../../../../../../domain/eventEditor/data/types';
import { PRICE_FIELDS } from '../priceFields';
import { findEntityByDbId, findEntityByGuid } from '../../../../predicates/shared/selectionPredicates';

// the following return `true` if price satisfies predicate
export const isPriceField = (_, field): boolean => includes(field, PRICE_FIELDS);

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
export const getBasePrice = (prices: Price[]): Price | undefined => find(isBasePrice)(prices);
export const getPriceByDbId = (prices: Price[], dbId: EntityDbId): Price | any => findEntityByDbId(prices)(dbId);
export const getPriceByGuid = (prices: Price[], guid: EntityId): Price | any => findEntityByGuid(prices)(guid);

// returns array of prices that satisfy predicate
export const getPriceModifiers = (prices: Price[]): Price | any => filter(isNotBasePrice, prices);
export const getTaxes = (prices) => filter(isTax, prices);

// returns GUID for price entity's related price type
export const getPriceTypeGuid = (price) => prop('priceType', price);

// returns price type for supplied price if found in array of price types
export const getPriceType = (priceTypes) => (price) => findEntityByGuid(priceTypes)(getPriceTypeGuid(price));
