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
 *
 * Be aware that the root state is a plain object but the slices (entities,
 * relations, dirty) are immutable Maps.
 */
export default combineReducers( { entities, relations, dirty } );
