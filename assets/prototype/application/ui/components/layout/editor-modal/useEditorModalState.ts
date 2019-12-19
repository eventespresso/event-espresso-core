import { useReducer, useEffect } from 'react';

const CLOSE_ALL = 'CLOSE_ALL';
const CLOSE_EDITOR = 'CLOSE_EDITOR';
const OPEN_EDITOR = 'OPEN_EDITOR';

type ActionType = 'CLOSE_ALL' | 'CLOSE_EDITOR' | 'OPEN_EDITOR';

type Action = {
	editorId: string;
	type: ActionType;
};

const reducer = (state, action: Action) => {
	const { editorId } = action;

	switch (action.type) {
		case CLOSE_EDITOR:
		// return { ...state, ... };
		case CLOSE_ALL:
		// return { ...state, ... };
		case OPEN_EDITOR:
		// return { ...state, ... };

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

	// /**
	//  * Returns the ID of the editor currently at the top of the stack
	//  *
	//  * @param {Stack} state
	//  * @return {string} editorId
	//  */
	// const currentlyOpenEditor = (state) => {
	// 	return state.first() || '';
	// };

	// /**
	//  * Returns true if the provided ID matches the editor
	//  * currently at the top of the stack
	//  *
	//  * @param {Stack} state
	//  * @param {string} editorId    unique identifier for editor
	//  * @return {string} editorId
	//  */
	// const isEditorOpen = (state, editorId) => {
	// 	return editorId === state.first();
	// };

	return {
		closeEditor,
		closeAllEditors,
		openEditor,
	};
};

export default useEditorModalState;
