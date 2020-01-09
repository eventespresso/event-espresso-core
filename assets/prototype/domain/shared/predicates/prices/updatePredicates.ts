import { assoc, map, pickBy, when } from 'ramda';

import { parsedAmount } from '../../../../application/utilities/money';
import { Price } from '../../../eventEditor/data/types';
import { isBasePrice, isPriceField } from './selectionPredicates';
import { entityHasGuid } from '../shared/selectionPredicates';

type updatePriceArrayProps = {
	amount: number;
	guid?: string;
	prices?: Price[];
	type?: string;
};

/**
 * updates the price amount
 *
 * @param {number} amount
 */
export const copyPriceFields = (price: Price) => pickBy(isPriceField, price);

/**
 * updates the price amount
 *
 * @param {number} amount
 */
export const updatePriceAmount = (amount: number) => (price: Price) =>
	assoc('amount', parsedAmount(amount || 0), price);

/**
 * updates the price type
 *
 * @param {string} type
 */
export const updatePriceType = (type: string) => (price: Price) => assoc('priceType', type, price);

/**
 * given an array of prices, finds and updates the base price amount
 *
 * @param {Price[]} prices
 * @param {number} amount
 * @return {Price[]}
 */
export const updateBasePriceAmount = ({ prices, amount }: updatePriceArrayProps): Price[] =>
	map(when(isBasePrice, updatePriceAmount(amount)), prices);

/**
 * given an array of prices, finds and updates price type for price matching the supplied GUID
 *
 * @param {price[]} prices
 * @param {string} guid
 * @param {string} type
 */
export const updatePriceTypeForPrice = ({ prices, guid, type }: updatePriceArrayProps): Price[] =>
	map(when(entityHasGuid(guid), updatePriceType(type)), prices);

/**
 * given an array of prices, finds and updates price amount for price matching the supplied GUID
 *
 * @param {price[]} prices
 * @param {string} guid
 * @param {string} amount
 */
export const updatePriceAmountForPrice = ({ prices, guid, amount }: updatePriceArrayProps): Price[] =>
	map(when(entityHasGuid(guid), updatePriceAmount(amount)), prices);
