/**
 * External dependencies
 */
import { isUndefined, uniq } from 'lodash';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * @function
 * @param {mixed} element
 * @return {boolean} true if value is undefined
 */
const removeUndefined = ( element ) => ! isUndefined( element );

/**
 * @function
 * @param {Array} a
 * @return {Array} new array with undefined and duplicate elements removed
 */
export const condenseArray = ( a ) => uniq( a.filter( removeUndefined ) );

/**
 * @function
 * @param {Array} datetimeEntities
 * @return {Array} array of IDs for supplied datetime entities
 */
export const getDatetimeEntityIds = ( datetimeEntities ) => {
	const datetimeEntityIds = [];
	if ( Array.isArray( datetimeEntities ) ) {
		datetimeEntities.forEach( ( eventDate ) => {
			if ( isModelEntityOfModel( eventDate, 'datetime' ) ) {
				datetimeEntityIds.push( eventDate.id );
			}
		} );
	}
	return condenseArray( datetimeEntityIds );
};
