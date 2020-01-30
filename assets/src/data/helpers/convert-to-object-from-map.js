/**
 * External imports.
 */
import { isMap } from 'lodash';

/**
 * Internal imports.
 */
import { mapReducer } from './map-reducer';

/**
 * Given a map object, this returns its contents as a plain object
 *
 * @param {Map} mapObject
 * @return {Object} A plain object equivalent of the incoming Map
 */
export const convertToObjectFromMap = ( mapObject ) => {
	if ( ! isMap( mapObject ) ) {
		return mapObject;
	}
	return mapReducer( mapObject, ( object, item, itemId ) => {
		object[ itemId ] = item;
		return object;
	}, {} );
};
