import { useReducer } from 'react';
import { dropLast, last, path } from 'ramda';

import {
	EditorStack,
	EditorState,
	EditorId,
	EditorStateManager,
	EditorStateReducer,
	ActionType,
	OpenEditorOptions,
} from './types';

export const INITIAL_STATE: EditorStack = [];

const useFormModalManager = (): EditorStateManager => {
	const [state, dispatch] = useReducer<EditorStateReducer>(reducer, INITIAL_STATE);

	const openEditor = (options: OpenEditorOptions): void => {
		dispatch({
			...options,
			type: ActionType.OPEN_EDITOR,
			isOpen: true,
		});
	};

	const currentlyOpenEditor = (): EditorState => last(state);

	const closeEditor = (editorId: EditorId): void => {
		dispatch({
			type: ActionType.CLOSE_EDITOR,
			editorId,
		});
	};

	const closeAllEditors = (): void => {
		dispatch({
			type: ActionType.CLOSE_ALL,
			editorId: null,
		});
	};

	return {
		editors: state,
		openEditor,
		closeEditor,
		currentlyOpenEditor,
		closeAllEditors,
	};
};

const reducer: EditorStateReducer = (state, action) => {
	const { type, ...rest } = action;
	const { editorId } = rest;
	switch (type) {
		case ActionType.OPEN_EDITOR:
			return [...state, { isOpen: true, ...rest }];
		case ActionType.CLOSE_EDITOR:
			const lastEditorId = path<EditorId>(['editorId'], last<EditorState>(state));
			if (lastEditorId && lastEditorId === editorId) {
				return dropLast<EditorState>(1, state);
			}
			return state;
		case ActionType.CLOSE_ALL:
			return INITIAL_STATE;
		default:
			throw new Error('Unexpected action');
	}
};

export default useFormModalManager;
