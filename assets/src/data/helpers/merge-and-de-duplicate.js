/**
 * External imports
 */
import { isArray } from 'lodash';
/**
 * This utility function will merge and de-duplicate arrays so that there is
 * only one of each value in the returned (new) array.
 *
 * @param { Array } arrays (accepts multiple arrays)
 * @return { Array } A new array consisting of all the incoming arrays combined
 * 					 and with no duplicate values.
 */
export const mergeAndDeDuplicateArrays = ( ...arrays ) => [
	...new Set( [].concat(
		...arrays.filter( item => isArray( item ) )
	) ),
];

/**
 * This utility function will merge and de-duplicate arrays of objects into one
 * array with no duplicates values for objects with the provided property.
 *
 * @param { string } property
 * @param { Array } arrays  (accepts multiple arrays of objects)
 * @return { Array }  A merged array of all the provided objects with only one
 * 					  object for the given property value.
 */
export const mergeAndDeDuplicateObjects = ( property, ...arrays ) => {
	return [].concat( ...arrays ).reduce(
		( a, b ) => {
			return ! a.filter( c => b[ property ] === c[ property ] ).length ?
				[ ...a, b ] :
				a;
		},
		[],
	);
};
