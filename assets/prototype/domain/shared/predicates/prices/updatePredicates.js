import { assoc, map, when } from 'ramda';
import { isBasePrice } from './selectionPredicates';

import { entityHasDbId, entityHasGuid, findEntityByDbId, findEntityByGuid } from '../shared/selectionPredicates';

/**
 * updates the price amount
 *
 * @param {Object} price
 */
export const updatePriceAmount = (price) => (amount) => assoc('amount', parseFloat(amount), price);

/**
 * updates the price type
 *
 * @param {Object} price
 */
export const updatePriceType = (price) => (type) => assoc('priceType', type, price);

/**
 * given an array of prices, finds and updates the base price amount
 *
 * @param {price[]} prices
 * @param {Number} amount
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
