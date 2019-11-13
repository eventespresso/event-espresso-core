/**
 * External dependencies
 */
import { Stack } from 'immutable';
import { registerStore } from '@wordpress/data';

const DEFAULT_STACK = Stack();
const OPEN_EDITOR = 'OPEN_EDITOR';
const CLOSE_EDITOR = 'CLOSE_EDITOR';
const CLOSE_ALL = 'CLOSE_ALL';
const INVALID_EDITOR_ID = 'INVALID_EDITOR_ID';

/**
 * Resolves actions and returns a new state object
 *
 * @param {Stack} state
 * @param {Object} action
 * @param {string} action.type      OPEN_EDITOR, CLOSE_EDITOR, or CLOSE_ALL
 * @param {string} action.editorId   which editor to open or close
 * @return {Object} new state
 */
const openEditorStateReducer = ( state = DEFAULT_STACK, action ) => {
	const { type, editorId } = action;
	let newState;
	switch ( type ) {
		case OPEN_EDITOR:
			if ( editorId && ! state.includes( editorId ) ) {
				newState = state.push( editorId );
			}
			break;
		case CLOSE_EDITOR:
			if ( editorId === state.first() ) {
				newState = state.pop();
			}
			break;
		case CLOSE_ALL:
			newState = state.clear();
			break;
		case INVALID_EDITOR_ID:
			break;
	}
	return newState ? newState : state;
};

/**
 * Returns an action for opening an editor window
 *
 * @param {string} editorId 	unique identifier for editor
 * @return {Object} action object
 */
const openEditor = ( editorId ) => {
	return editorId ? {
		type: OPEN_EDITOR,
		editorId,
	} : {
		type: INVALID_EDITOR_ID,
	};
};

/**
 * Returns an action for closing an editor window
 *
 * @param {string} editorId 	unique identifier for editor
 * @return {Object} action object
 */
const closeEditor = ( editorId ) => {
	return editorId ? {
		type: CLOSE_EDITOR,
		editorId,
	} : {
		type: INVALID_EDITOR_ID,
	};
};

/**
 * Returns an action for closing all editor windows
 *
 * @return {Object} action object
 */
const closeAllEditors = () => {
	return { type: CLOSE_ALL };
};

/**
 * Returns the ID of the editor currently at the top of the stack
 *
 * @param {Stack} state
 * @return {string} editorId
 */
const currentlyOpenEditor = ( state ) => {
	return state.first() || '';
};

/**
 * Returns true if the provided ID matches the editor
 * currently at the top of the stack
 *
 * @param {Stack} state
 * @param {string} editorId    unique identifier for editor
 * @return {string} editorId
 */
const isEditorOpen = ( state, editorId ) => {
	return editorId === state.first();
};

export default registerStore(
	'eventespresso/open-editor-state',
	{
		reducer: openEditorStateReducer,
		actions: { openEditor, closeEditor, closeAllEditors },
		selectors: { currentlyOpenEditor, isEditorOpen },
	}
);
