/**
 * External imports
 */
import { combineReducers } from '@wordpress/data';

/**
 * Internal imports
 */
import entities from './entities';
import relations from './relations';
import dirty from './dirty';

/**
 * Reducers for entities, relations and dirty state.
 */
export default combineReducers( {
	entities,
	relations,
	dirty,
} );
