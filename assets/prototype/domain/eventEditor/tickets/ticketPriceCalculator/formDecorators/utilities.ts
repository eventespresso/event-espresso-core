import path from 'ramda/src/path';
import { TpcFormData, UpdatedTpcFormDataPath } from '../types';
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
	prev === null || prev === undefined || Boolean(value) === Boolean(prev);

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
export const getFromFormData = (fieldPath: string, data: TpcFormData): any => {
	const fieldPathArray = pathName(fieldPath);
	return path(fieldPathArray, data);
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
	const amount = getFromFormData(fieldPath, data);
	return { [fieldPath]: parseFloat(amount || '0') };
};
