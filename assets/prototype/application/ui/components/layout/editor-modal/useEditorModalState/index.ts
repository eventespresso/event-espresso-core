/**
 * External dependencies
 */
import { useReducer } from 'react';
import { dropLast, last } from 'ramda';

/**
 * Internal imports
 */
import { EntityId } from '../../../../../../domain/eventEditor/data/types';

enum ActionType {
	CLOSE_ALL = 'CLOSE_ALL',
	CLOSE_EDITOR = 'CLOSE_EDITOR',
	OPEN_EDITOR = 'OPEN_EDITOR',
}

type State = string[];

type Action = {
	editorId?: string;
	type: ActionType;
};

const reducer = (state: State, action: Action) => {
	const { editorId } = action;

	switch (action.type) {
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
};

const useEditorModalState = (id: EntityId) => {
	const initialState = [];
	const [state, dispatch] = useReducer(reducer, initialState);

	const openEditor = (editorId: string): void => {
		dispatch({
			type: ActionType.OPEN_EDITOR,
			editorId,
		});
	};

	const closeEditor = (editorId: string): void => {
		console.log({ editorId });
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
	 * @param {Stack} state
	 * @return {string | undefined} editorId, if there is no editorId then it will return undefined
	 */
	const currentlyOpenEditor = (): string | undefined => last(state);

	/**
	 * Returns true if the provided ID matches the editor
	 * currently at the top of the stack
	 *
	 * @param {Stack} state
	 * @param {string} editorId    unique identifier for editor
	 * @return {string} editorId
	 */
	const isEditorOpen = (editorId: string): boolean => editorId === last(state);

	const getIsOpen = (modalId: string = '') => isEditorOpen(id + modalId);
	const onClose = (modalId: string = '') => closeEditor(id + modalId);
	const setIsOpen = (modalId: string = '') => openEditor(id + modalId);

	return {
		onClose,
		closeAllEditors,
		currentlyOpenEditor,
		getIsOpen,
		openEditor,
		setIsOpen,
	};
};

export default useEditorModalState;
