import { useReducer, useEffect } from 'react';

import {
	EditorState,
	EditorId,
	EditorStateManager,
	EditorStateReducer,
	ActionType,
	OpenEditorOptions,
	EntityId,
} from './types';

export const INITIAL_STATE: EditorState = {
	isOpen: false,
	editorId: null,
	entityId: '',
};

const useEditorModalManager = (): EditorStateManager => {
	const [state, dispatch] = useReducer<EditorStateReducer>(reducer, INITIAL_STATE);

	useEffect(() => {
		console.log('<<<EditorModalManager>>>', state);
	}, [state]);

	const openEditor = (options: OpenEditorOptions): void => {
		dispatch({
			...options,
			type: ActionType.OPEN_EDITOR,
			isOpen: true,
		});
	};

	const setEditorId = (editorId: EditorId): void => {
		dispatch({
			type: ActionType.SET_EDITOR_ID,
			editorId,
		});
	};

	const setEntityId = (entityId: EntityId): void => {
		dispatch({
			type: ActionType.SET_ENTITY_ID,
			entityId,
		});
	};

	const closeEditor = (): void => {
		dispatch({
			type: ActionType.CLOSE_EDITOR,
		});
	};

	return {
		...state,
		setEditorId,
		setEntityId,
		closeEditor,
		openEditor,
	};
};

const reducer: EditorStateReducer = (state, action) => {
	const { type, ...rest } = action;
	const { editorId, entityId } = rest;
	switch (type) {
		case ActionType.OPEN_EDITOR:
			return { ...state, ...rest };
		case ActionType.SET_EDITOR_ID:
			return { ...state, editorId };
		case ActionType.SET_ENTITY_ID:
			return { ...state, entityId };
		case ActionType.CLOSE_EDITOR:
			return INITIAL_STATE;
		default:
			throw new Error('Unexpected action');
	}
};

export default useEditorModalManager;
