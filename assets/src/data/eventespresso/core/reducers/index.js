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

export default combineReducers( {
	entities,
	relations,
	dirty,
} );
