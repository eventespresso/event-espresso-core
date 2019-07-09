/**
 * External imports
 */
import { isFunction } from 'lodash';

const menuItemCallbacks = {};

/**
 * @function
 * @param {string} entityName
 * @param {Function} getMenuItem
 * @return {Array} array of entity actions menu items
 */
export const registerEntityActionsMenuItem = ( entityName, getMenuItem ) => {
	if ( ! menuItemCallbacks.hasOwnProperty( entityName ) ) {
		menuItemCallbacks[ entityName ] = [];
	}
	if ( isFunction( getMenuItem ) ) {
		menuItemCallbacks[ entityName ].push( getMenuItem );
	}
};

/**
 * @function
 * @param {string} entityName
 * @param {Object} entity
 * @param {number} indexOffset 	count of how many items already exist in menu
 * 								added to index for new items
 * @return {Array} array of entity actions menu items
 */
export const entityActionsMenu = ( entityName, entity, indexOffset = 0 ) => {
	if ( menuItemCallbacks.hasOwnProperty( entityName ) ) {
		return menuItemCallbacks[ entityName ].map(
			( getMenuItem, index ) => isFunction( getMenuItem ) ?
				getMenuItem( entity, index + indexOffset ) :
				null
		);
	}
	return [];
};

/**
 * EntityActionMenuItem
 * just a wrapper for an IconButton and additional component
 * (most likely a modal component) so that it can be added to a menu
 */
export const EntityActionMenuItem = ( { children } ) => children;
