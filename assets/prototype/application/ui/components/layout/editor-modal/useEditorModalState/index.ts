/**
 * External dependencies
 */
import { useReducer } from 'react';
import { dropLast, last } from 'ramda';

/**
 * Internal imports
 */
import { ActionType, EditorAction, EditorId, EditorStack, EditorState } from './types';
import { EntityId } from '../../../../../../domain/eventEditor/data/types';

const reducer = (state: EditorStack, action: EditorAction): EditorStack => {
	const { editorId, type } = action;
	switch (type) {
		case ActionType.CLOSE_EDITOR:
			if (editorId === last(state)) {
				// return stack after removing the last editor added (top of stack)
				return dropLast(1, state);
			}
			return state;
		case ActionType.CLOSE_ALL:
			return [];
		case ActionType.OPEN_EDITOR:
			if (editorId.length && !state.includes(editorId)) {
				return [...state, editorId];
			}
			return state;
		default:
			throw new Error('Unexpected action');
	}
	return state;
};

const useEditorModalState = (id: EntityId): EditorState => {
	const initialState = [];
	const [state, dispatch] = useReducer(reducer, initialState);

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
	 * @param {Stack} state
	 * @param {EditorId} editorId    unique identifier for editor
	 * @return {string} editorId
	 */
	const isEditorOpen = (editorId: EditorId): boolean => editorId === last(state);

	const getIsOpen = (editorId: EditorId) => isEditorOpen(editorId);
	const onClose = (editorId: EditorId) => () => closeEditor(editorId);
	const setIsOpen = (editorId: EditorId) => () => openEditor(editorId);

	return {
		closeAllEditors,
		currentlyOpenEditor,
		getIsOpen,
		onClose,
		setIsOpen,
	};
};

export default useEditorModalState;
