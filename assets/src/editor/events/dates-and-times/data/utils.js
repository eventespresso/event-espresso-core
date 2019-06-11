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
 * @param {Array} dateEntities
 * @return {Array} array of IDs for supplied date entities
 */
export const getDateEntityIds = ( dateEntities ) => {
	const dateEntityIds = [];
	if ( Array.isArray( dateEntities ) ) {
		dateEntities.forEach( ( dateEntity ) => {
			if ( isModelEntityOfModel( dateEntity, 'datetime' ) ) {
				dateEntityIds.push( dateEntity.id );
			}
		} );
	}
	return condenseArray( dateEntityIds );
};
