/**
 * External imports
 */
import { combineReducers } from '@wordpress/data';

function index() {}
function deleteRelations() {}
function trashRelations() {}

export default combineReducers( {
	index,
	delete: deleteRelations,
	trash: trashRelations,
} );
