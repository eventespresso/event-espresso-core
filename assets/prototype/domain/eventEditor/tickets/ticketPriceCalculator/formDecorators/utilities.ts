// @ts-nocheck
import { allPass, map, path, prop, propEq, when } from 'ramda';
import { TpcFormData, TpcPriceModifier, UpdatedTpcFormDataPath } from '../types';
import { PriceType } from '../../../data/types';
import { findEntityByGuid } from '../../../../shared/predicates/shared/selectionPredicates';
import toBoolean from '../../../../../application/utilities/converters/toBoolean';
import toInteger from '../../../../../application/utilities/converters/number/toInteger';
import { amountsMatch } from '../../../../../application/utilities/money';

/**
 * returns true if the two supplied values are equal (or previous value is null or undefined)
 *
 * @param {number|string} value
 * @param {number|string} prev
 * @return {boolean}
 */
export const isEqual = (value: any, prev: any): boolean => prev === null || prev === undefined || value === prev;

/**
 * returns true if the two supplied values are equal after boolean coearcian (or previous value is null or undefined)
 *
 * @param {boolean} value
 * @param {boolean} prev
 * @return {boolean}
 */
export const boolsEqual = (value: boolean, prev: boolean): boolean =>
	prev === null || prev === undefined || toBoolean(value) === toBoolean(prev);

/**
 * returns true if the two supplied values are equal after parsing as floats (or previous value is null or undefined)
 *
 * @param {number|string} value
 * @param {number|string} prev
 * @return {boolean}
 */
export const amountsEqual = (value: number | string, prev: number | string): boolean =>
	prev === null || prev === undefined || amountsMatch(prev, value);

/**
 * normalizes object path notation then returns array of path parts
 *
 * @param {string} name
 * @return {string[]}
 */
export const pathName = (name: string): string[] =>
	name
		.replace('[', '.')
		.replace(']', '')
		.split('.');

/**
 * returns value located at provided field path (or undefined if field path not found)
 *
 * @param {string} fieldPath
 * @param {TpcFormData} data
 * @return {any}
 */
export const getFromFormData = <T>(fieldPath: string, data: TpcFormData): T => {
	const fieldPathArray = pathName(fieldPath);
	return path(fieldPathArray, data);
};

// returns GUID for price modifier's related price type
export const getPriceModifierPriceTypeGuid = (price: PriceModifier) => prop('priceType', price);

// returns price type for supplied price modifier if found in array of price types
export const getPriceType = (priceTypes: PriceType[]) => (price: PriceModifier) => {
	return findEntityByGuid(priceTypes)(getPriceModifierPriceTypeGuid(price));
};

/**
 * returns an object where the key is the provided field path
 * and the value is the amount located at provided field path
 * after being parsed as a float (or undefined if field path not found)
 *
 * @param {string} fieldPath
 * @param {TpcFormData} data
 * @return {any}
 */
export const parseAmountFromPath = (fieldPath: string, data: TpcFormData): UpdatedTpcFormDataPath => {
	const amount = getFromFormData<string>(fieldPath, data);
	return { [fieldPath]: toInteger(amount || '0') };
};

/**
 * returns a copy of price with price type properties applied
 */
export const updatePriceModifier = (price: TpcPriceModifier, priceType?: PriceType): TpcPriceModifier => {
	return {
		...price,
		isBasePrice: priceType.isBasePrice,
		isDiscount: priceType.isDiscount,
		isPercent: priceType.isPercent,
		isTax: priceType.isTax,
		priceType: priceType.id,
		// priceTypeOrder: priceType.order,
	};
};

/**
 * returns a copy of price with price type properties applied
 */
export const updatePriceInFormData = (
	updatedPrice: TpcPriceModifier,
	prices: TpcPriceModifier[]
): TpcPriceModifier[] => {
	return map(
		when(
			// Need to replace the existing price in the form data based on several criteria,
			// since id will be blank for any newly added price modifiers, and several prices
			// may all be using the same base price type (like $ surcharge).
			// May have to implement some kind of unique random key for each row
			// because it is entirely possible that a user could add multiple price modifiers
			// with the exact same details (would be silly but that doesn't mean it's not possible)
			// which would make the following checks fail, resulting in the wrong row being updated
			allPass([
				propEq('id', updatedPrice.id),
				propEq('name', updatedPrice.name),
				propEq('desc', updatedPrice.desc),
				propEq('amount', updatedPrice.amount),
				propEq('priceType', updatedPrice.priceType),
			]),
			() => updatedPrice
		),
		prices
	);
};
