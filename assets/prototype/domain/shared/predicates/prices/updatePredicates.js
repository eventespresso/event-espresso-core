import { assoc, map, pickBy, when } from 'ramda';

import { isBasePrice, isPriceField } from './selectionPredicates';
import { entityHasGuid } from '../shared/selectionPredicates';

export const copyPriceFields = (price) => pickBy(isPriceField, price);

/**
 * updates the price amount
 *
 * @param {number} amount
 */
export const updatePriceAmount = (amount) => (price) => assoc('amount', parseFloat(amount || 0), price);

/**
 * updates the price type
 *
 * @param {string} type
 */
export const updatePriceType = (type) => (price) => assoc('priceType', type, price);

/**
 * given an array of prices, finds and updates the base price amount
 *
 * @param {price[]} prices
 * @param {number} amount
 */
export const updateBasePriceAmount = ({ prices, amount }) => map(when(isBasePrice, updatePriceAmount(amount)), prices);

/**
 * given an array of prices, finds and updates price type for price matching the supplied GUID
 *
 * @param {price[]} prices
 * @param {string} guid
 * @param {string} type
 */
export const updatePriceTypeForPrice = ({ prices, guid, type }) =>
	map(when(entityHasGuid(guid), updatePriceType(type)), prices);

/**
 * given an array of prices, finds and updates price amount for price matching the supplied GUID
 *
 * @param {price[]} prices
 * @param {string} guid
 * @param {string} amount
 */
export const updatePriceAmountForPrice = ({ prices, guid, amount }) =>
	map(when(entityHasGuid(guid), updatePriceAmount(amount)), prices);
