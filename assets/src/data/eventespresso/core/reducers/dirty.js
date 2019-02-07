/**
 * External imports
 */
import { combineReducers } from '@wordpress/data';

/**
 * Internal imports
 */
import { deleteEntity, trashEntity } from './dirty-entities';
import { default as relations } from './dirty-relations';

/**
 * The root state ('delete', 'trash', relations') is a plain object, but the
 * slices are immutable Maps).
 */
export default combineReducers( {
	delete: deleteEntity,
	trash: trashEntity,
	relations,
} );
