/**
 * External imports
 */
import { isFunction } from 'lodash';
import { useCallback, useState } from '@wordpress/element';
import { normalizeEntityId } from '@eventespresso/helpers';

/**
 * Internal dependencies
 */
import getEntityModelName from './get-entity-model-name';

const reallyBigNumber = 999999999999;

/**
 * @function
 * @return {Object} menu item state and setter
 */
const useEntityActionMenuItems = () => {
	const [ menuItemCallbacks, setMenuItemCallbacks ] = useState( {} );
	/**
	 * returns an array of menu items for the provided entity
	 *
	 * @function
	 * @param {Object} entity
	 * @return {Array} array of entity actions menu items
	 */
	const getActionsMenuForEntity = useCallback( ( entity ) => {
		const menuItems = [];
		const modelName = getEntityModelName( entity );
		if ( modelName === '' ) {
			return [];
		}
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
	}, [ menuItemCallbacks ] );

	/**
	 * adds getMenuItem() to the multidimensional menuItemCallbacks object
	 * using the supplied entity and key.
	 * example:
	 *    {
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
	 * with the assumption that the provided callback receives the entity as a
	 * prop
	 *
	 * @function
	 * @param {Object} entity
	 * @param {string} key
	 * @param {Function} getMenuItem
	 */
	const registerEntityActionsMenuItem = useCallback( (
		entity,
		key,
		getMenuItem
	) => {
		const modelName = getEntityModelName( entity );
		if ( modelName === '' || ! isFunction( getMenuItem ) ) {
			return;
		}
		if ( ! menuItemCallbacks.hasOwnProperty( modelName ) ) {
			menuItemCallbacks[ modelName ] = {};
		}
		const entityId = entity !== modelName ? entity.id : reallyBigNumber;
		if ( ! menuItemCallbacks[ modelName ].hasOwnProperty( entityId ) ) {
			menuItemCallbacks[ modelName ][ entityId ] = {};
		}
		menuItemCallbacks[ modelName ][ entityId ][ key ] = getMenuItem;
		setMenuItemCallbacks( menuItemCallbacks );
	}, [ menuItemCallbacks ] );
	return {
		getActionsMenuForEntity,
		registerEntityActionsMenuItem,
	};
};

export default useEntityActionMenuItems;