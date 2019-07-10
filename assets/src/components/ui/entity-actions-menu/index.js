/**
 * External imports
 */
import { isFunction } from 'lodash';
import { sprintf } from '@eventespresso/i18n';
import { normalizeEntityId } from '@eventespresso/helpers';
import { isModelEntity } from '@eventespresso/validators';

const menuItemCallbacks = {};
const reallyBigNumber = 999999999999;

/**
 * returns the modelName property if entity is indeed an entity
 * or just returns entity if it is already a string (like 'ticket')
 *
 * @function
 * @param {Object} entity
 * @return {string} model name
 */
const getEntityModelName = ( entity ) => {
	if ( typeof entity === 'string' ) {
		return entity;
	}
	if ( isModelEntity( entity ) ) {
		return entity.modelName;
	}
	throw new TypeError(
		sprintf(
			'Can not retrieve the model name because an invalid entity was supplied: %s',
			JSON.stringify( entity )
		)
	);
};

/**
 * adds getMenuItem() to the multidimensional menuItemCallbacks object
 * using the supplied entity and key.
 * example:
 *  	{
 * 			'datetime': {
 *     			'10': {
 * 	    	  		'main-menu': DateEntityMainMenuItem,
 * 		      		'edit-details': EditDateDetailsMenuItem,
 *       			'assign-tickets': AssignTicketsMenuItem,
 *     			}
 *     			'999999999999': {
 *      	 		'rem': RecurringEventsManagerApp,
 *				}
 *   		}
 * 		}
 * callbacks registered using 999999999999 (reallyBigNumber)
 * will be returned as menu items for ALL entities of the same model
 * with the assumption that the provided callback receives the entity as a prop
 *
 * @function
 * @param {Object} entity
 * @param {string} key
 * @param {Function} getMenuItem
 * @return {Array} array of entity actions menu items
 */
export const registerEntityActionsMenuItem = ( entity, key, getMenuItem ) => {
	const modelName = getEntityModelName( entity );
	const entityId = entity !== modelName ? entity.id : reallyBigNumber;
	if ( ! menuItemCallbacks.hasOwnProperty( modelName ) ) {
		menuItemCallbacks[ modelName ] = {};
	}
	if ( ! menuItemCallbacks[ modelName ].hasOwnProperty( entityId ) ) {
		menuItemCallbacks[ modelName ][ entityId ] = {};
	}
	if ( isFunction( getMenuItem ) ) {
		menuItemCallbacks[ modelName ][ entityId ][ key ] = getMenuItem;
	}
};

/**
 * returns an array of menu items for the provided entity
 *
 * @function
 * @param {Object} entity
 * @return {Array} array of entity actions menu items
 */
export const getActionsMenuForEntity = ( entity ) => {
	const menuItems = [];
	const modelName = getEntityModelName( entity );
	let index = 0;
	if ( menuItemCallbacks.hasOwnProperty( modelName ) ) {
		for ( let entityId in menuItemCallbacks[ modelName ] ) {
			entityId = normalizeEntityId( entityId );
			if ( entityId === reallyBigNumber || entityId === entity.id ) {
				for ( const key in menuItemCallbacks[ modelName ][ entityId ] ) {
					const getMenuItem = menuItemCallbacks[ modelName ][ entityId ][ key ];
					if ( isFunction( getMenuItem ) ) {
						menuItems.push( getMenuItem( entity, index ) );
						index++;
					}
				}
			}
		}
	}
	return menuItems;
};

/**
 * EntityActionMenuItem
 * just a wrapper for an IconButton and additional component
 * (most likely a modal component) so that it can be added to a menu
 */
export const EntityActionMenuItem = ( { children } ) => children;
