import { dropLast, last } from 'ramda';
import { useReducer } from 'react';

import { ActionType, EditorAction, EditorId, EditorStack, EditorState } from './types';

const INITIAL_STATE: EditorStack = [];

const reducer = (state: EditorStack, action: EditorAction) => {
	const { editorId, type } = action;
	switch (type) {
		case ActionType.CLOSE_EDITOR:
			if (editorId === last(state)) {
				// return stack after removing the last editor added (top of stack)
				return dropLast(1, state);
			}
			return state;
		case ActionType.CLOSE_ALL:
			return INITIAL_STATE;
		case ActionType.OPEN_EDITOR:
			if (editorId.length && !state.includes(editorId)) {
				// has editor id and editor is not already in the stack
				return [...state, editorId];
			}
			return state;
		default:
			throw new Error('Unexpected action');
	}
	return state;
};

const useEditorModalState = (): EditorState => {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

	const openEditor = (editorId: EditorId): void => {
		dispatch({
			type: ActionType.OPEN_EDITOR,
			editorId,
		});
	};

	const closeEditor = (editorId: EditorId): void => {
		dispatch({
			type: ActionType.CLOSE_EDITOR,
			editorId,
		});
	};

	const closeAllEditors = (): void => {
		dispatch({
			type: ActionType.CLOSE_ALL,
		});
	};

	/**
	 * Returns the ID of the editor currently at the top of the stack
	 *
	 * @return {EditorId | undefined} editorId, if there is no editorId then it will return undefined
	 */
	const currentlyOpenEditor = (): EditorId | undefined => last(state);

	/**
	 * Returns true if the provided ID matches the editor
	 * currently at the top of the stack
	 *
	 * @param {EditorId} editorId    unique identifier for editor
	 * @return {boolean} true if editor is the currently open editor
	 */
	const isEditorOpen = (editorId: EditorId): boolean => editorId === last(state);

	return {
		closeAllEditors,
		closeEditor,
		currentlyOpenEditor,
		isEditorOpen,
		openEditor,
	};
};

export default useEditorModalState;
