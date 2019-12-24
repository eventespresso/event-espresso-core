/**
 * External dependencies
 */
import { useReducer, useEffect } from 'react';
import { drop, head } from 'ramda';

const CLOSE_ALL = 'CLOSE_ALL';
const CLOSE_EDITOR = 'CLOSE_EDITOR';
const OPEN_EDITOR = 'OPEN_EDITOR';

type ActionType = 'CLOSE_ALL' | 'CLOSE_EDITOR' | 'OPEN_EDITOR';

type State = string[];

type Action = {
	editorId?: string;
	type: ActionType;
};

const reducer = (state: State, action: Action) => {
	const { editorId } = action;

	switch (action.type) {
		case CLOSE_EDITOR:
			if (editorId === head(state)) {
				const stateWithoutFirstItem = drop(1, state);
				return stateWithoutFirstItem;
			}
			return state;
		case CLOSE_ALL:
			return [];
		case OPEN_EDITOR:
			if (editorId && !state.includes(editorId)) {
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

	useEffect(() => {
		console.log('useEditorModalState >>>', state);
	}, [state]);

	const openEditor = (editorId) => {
		dispatch({
			type: OPEN_EDITOR,
			editorId,
		});
	};

	const closeEditor = (editorId) => {
		dispatch({
			type: CLOSE_EDITOR,
			editorId,
		});
	};

	const closeAllEditors = () => {
		dispatch({
			type: CLOSE_ALL,
		});
	};

	/**
	 * Returns the ID of the editor currently at the top of the stack
	 *
	 * @param {Stack} state
	 * @return {string | undefined} editorId, if there is no editorId then it will return undefined
	 */
	const currentlyOpenEditor = (state: State): string | undefined => head(state);

	/**
	 * Returns true if the provided ID matches the editor
	 * currently at the top of the stack
	 *
	 * @param {Stack} state
	 * @param {string} editorId    unique identifier for editor
	 * @return {string} editorId
	 */
	const isEditorOpen = (state: State, editorId: string): boolean => editorId === head(state);

	return {
		closeEditor,
		closeAllEditors,
		currentlyOpenEditor,
		isEditorOpen,
		openEditor,
	};
};

export default useEditorModalState;
