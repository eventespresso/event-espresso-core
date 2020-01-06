/**
 * External dependencies
 */
import { useReducer } from 'react';
import { dropLast, last } from 'ramda';

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
				const stackWithoutLastItem = dropLast(1, state);
				return stackWithoutLastItem;
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

const useEditorModalState = () => {
	const initialState = [];
	const [state, dispatch] = useReducer(reducer, initialState);

	const openEditor = (editorId: string) => {
		dispatch({
			type: ActionType.OPEN_EDITOR,
			editorId,
		});
	};

	const closeEditor = (editorId: string) => {
		dispatch({
			type: ActionType.CLOSE_EDITOR,
			editorId,
		});
	};

	const closeAllEditors = () => {
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

	return {
		closeEditor,
		closeAllEditors,
		currentlyOpenEditor,
		isEditorOpen,
		openEditor,
	};
};

export default useEditorModalState;
