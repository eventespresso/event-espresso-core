import { useCallback, useMemo, useReducer } from 'react';
import { dropLast, last, path } from 'ramda';

import { EditorStack, EditorState, EditorId, EditorStateManager, EditorStateReducer, ActionType } from './types';

export const INITIAL_STATE: EditorStack = [];

type FM = EditorStateManager;

const useFormModalManager = (): FM => {
	const [state, dispatch] = useReducer<EditorStateReducer>(reducer, INITIAL_STATE);

	const openEditor: FM['openEditor'] = useCallback((options) => {
		dispatch({
			...options,
			type: ActionType.OPEN_EDITOR,
			isOpen: true,
		});
	}, []);

	const currentlyOpenEditor: FM['currentlyOpenEditor'] = useCallback(() => last(state), [state]);

	const closeEditor: FM['closeEditor'] = useCallback((editorId) => {
		dispatch({
			type: ActionType.CLOSE_EDITOR,
			editorId,
		});
	}, []);

	const closeAllEditors: FM['closeAllEditors'] = useCallback(() => {
		dispatch({
			type: ActionType.CLOSE_ALL,
			editorId: null,
		});
	}, []);

	return useMemo(
		() => ({
			editors: state,
			openEditor,
			closeEditor,
			currentlyOpenEditor,
			closeAllEditors,
		}),
		[state]
	);
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
