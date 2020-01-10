/**
 * Internal dependencies
 */
import { EntityId } from '../../../../../../domain/eventEditor/data/types';

enum ActionType {
	CLOSE_ALL = 'CLOSE_ALL',
	CLOSE_EDITOR = 'CLOSE_EDITOR',
	OPEN_EDITOR = 'OPEN_EDITOR',
}

interface ContextProps {
	editors: Editors;
	editorState: EditorState;
	id: EntityId;
}

type EditorAction = {
	editorId?: EditorId;
	type: ActionType;
};

type EditorId = string;

interface Editors {
	addNewForm?: EditorId;
	calculator?: EditorId;
	editForm?: EditorId;
	relations?: EditorId;
}

type EditorStack = EditorId[];

interface EditorState {
	closeAllEditors: () => void;
	currentlyOpenEditor: () => EditorId | undefined;
	isEditorOpen: (editorId: EditorId) => boolean;
	closeEditor: (editorId: EditorId) => void;
	openEditor: (editorId: EditorId) => void;
}

export { ActionType, ContextProps, EditorAction, EditorId, Editors, EditorStack, EditorState };
