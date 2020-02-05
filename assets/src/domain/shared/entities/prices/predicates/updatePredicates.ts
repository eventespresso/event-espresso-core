import { assoc, map, pickBy, when } from 'ramda';

import { isBasePrice, isPriceField } from './selectionPredicates';
import { entityHasGuid } from '../../../predicates/shared/selectionPredicates';
import { Price } from '../../../../../../prototype/domain/eventEditor/data/types';
import toBoolean from '../../../../../application/utilities/converters/toBoolean';
import toInteger from '../../../../../application/utilities/converters/number/toInteger';
import parsedAmount from '../../../../../application/utilities/money/parsedAmount';

type updatePriceArrayProps<T extends Price> = {
	amount: number;
	guid?: string;
	prices?: T[];
	type?: string;
};

/**
 * returns object with properties that match those of a Price entity
 *
 * @param {Price} price
 */
export const copyPriceFields = <T extends Price>(price: T): T => pickBy<T, T>(isPriceField, price);

/**
 * updates the price amount
 *
 * @param {number} amount
 */
export const updatePriceAmount = <T extends Price>(amount: number) => (price: T): T =>
	assoc<number, T, string>('amount', parsedAmount(amount || 0), price);

/**
 * updates the price type
 *
 * @param {string} type
 */
export const updatePriceType = <T extends Price>(type: string) => (price: T): T =>
	assoc<string, T, string>('priceType', type, price);

/**
 * given an array of prices, finds and updates the base price amount
 *
 * @param {Price[]} prices
 * @param {number} amount
 * @return {Price[]}
 */
export const updateBasePriceAmount = <T extends Price>({ prices, amount }: updatePriceArrayProps<T>): T[] =>
	map(when(isBasePrice, updatePriceAmount(amount)), prices);

/**
 * given an array of prices, finds and updates price type for price matching the supplied GUID
 *
 * @param {price[]} prices
 * @param {string} guid
 * @param {string} type
 */
export const updatePriceTypeForPrice = <T extends Price>({ prices, guid, type }: updatePriceArrayProps<T>): T[] =>
	map(when(entityHasGuid(guid), updatePriceType(type)), prices);

/**
 * given an array of prices, finds and updates price amount for price matching the supplied GUID
 *
 * @param {price[]} prices
 * @param {string} guid
 * @param {string} amount
 */
export const updatePriceAmountForPrice = <T extends Price>({ prices, guid, amount }: updatePriceArrayProps<T>): T[] =>
	map(when(entityHasGuid(guid), updatePriceAmount(amount)), prices);

/**
 * shallow copies the supplied price and normalizes fields for persistence
 *
 * @param {Price} price
 * @return {Price} price
 */
export const cloneAndNormalizePrice = <T extends Price>(price: T): T => {
	const { ...priceFields } = copyPriceFields(price);
	return {
		...priceFields,
		id: null,
		amount: parsedAmount(price.amount || '0'),
		isDefault: toBoolean(price.isDefault),
		order: toInteger(price.order),
	};
};
