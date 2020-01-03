/**
 * External dependencies
 */
import { useReducer } from 'react';
import { assoc, dropLast, last } from 'ramda';

/**
 * Internal dependencies
 */
import { EntityId } from '../../../../../domain/eventEditor/data/types';

enum ActionType {
	CLOSE_ALL = 'CLOSE_ALL',
	CLOSE_EDITOR = 'CLOSE_EDITOR',
	OPEN_EDITOR = 'OPEN_EDITOR',
}

type State = {
	stack: string[];
};

type Action = {
	editorId?: string;
	type: ActionType;
};

const reducer = (state: State, action: Action) => {
	const { stack } = state;
	const { editorId } = action;

	switch (action.type) {
		case ActionType.CLOSE_EDITOR:
			if (editorId === last(stack)) {
				const stackWithoutLastItem = dropLast(1, stack);
				return { ...state, stack: stackWithoutLastItem };
			}
			return state;
		case ActionType.CLOSE_ALL:
			return assoc('stack', [], state);
		case ActionType.OPEN_EDITOR:
			if (editorId.length && !stack.includes(editorId)) {
				const newState = { ...state, stack: [...stack, editorId] };
				return newState;
			}
			return state;
		default:
			throw new Error('Unexpected action');
	}
};

const useEditorModalState = () => {
	const initialState = {
		stack: [],
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	console.log({ state });

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
	const getCurrentlyOpenEditor = (): string | undefined => last(state.stack);

	/**
	 * Returns true if the provided ID matches the editor
	 * currently at the top of the stack
	 *
	 * @param {Stack} state
	 * @param {string} editorId    unique identifier for editor
	 * @return {string} editorId
	 */
	const isEditorOpen = (editorId: string): boolean => editorId === last(state.stack);

	return {
		closeEditor,
		closeAllEditors,
		getCurrentlyOpenEditor,
		isEditorOpen,
		openEditor,
	};
};

export default useEditorModalState;
