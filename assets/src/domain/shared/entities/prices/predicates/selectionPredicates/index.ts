// @ts-nocheck
import { filter, find, includes, propEq } from 'ramda';

import { EntityId, EntityDbId } from '@appServices/apollo/types';
import { Price } from '../../../../../eventEditor/services/apollo/types';
import { PRICE_FIELDS, PRICE_INPUT_FIELDS } from '../priceFields';
import { findEntityByDbId, findEntityByGuid } from '../../../../services/predicates';

// the following return `true` if price satisfies predicate
export const isPriceField = (_, field): boolean => includes(field, PRICE_FIELDS);

// the following return `true` if price satisfies predicate
export const isPriceInputField = (_, field): boolean => includes(field, PRICE_INPUT_FIELDS);

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
export const getBasePrice = (prices: Price[]): Price => find(isBasePrice)(prices);
export const getPriceByDbId = (prices: Price[], dbId: EntityDbId): Price => findEntityByDbId(prices)(dbId);
export const getPriceByGuid = (prices: Price[], guid: EntityId): Price => findEntityByGuid(prices)(guid);

// returns array of prices that satisfy predicate
export const getPriceModifiers = (prices: Price[]): Price[] => filter(isNotBasePrice, prices);
export const getTaxes = (prices: Price[]): Price[] => filter(isTax, prices);
