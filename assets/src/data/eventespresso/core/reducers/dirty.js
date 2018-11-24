/**
 * External imports
 */
import { combineReducers } from '@wordpress/data';
import { deleteEntity, trashEntity } from './dirty-entities';
import { default as relations } from './dirty-relations';

export default combineReducers( {
	delete: deleteEntity,
	trash: trashEntity,
	relations,
} );
