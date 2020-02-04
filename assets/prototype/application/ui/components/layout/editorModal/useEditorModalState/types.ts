/**
 * Internal dependencies
 */
import { EntityId } from '../../../../../../domain/eventEditor/data/types';

export enum ActionType {
	CLOSE_ALL = 'CLOSE_ALL',
	CLOSE_EDITOR = 'CLOSE_EDITOR',
	OPEN_EDITOR = 'OPEN_EDITOR',
}

export interface ContextProps {
	editors: Editors;
	editorState: EditorState;
	id: EntityId;
}

export type EditorAction = {
	editorId?: EditorId;
	type: ActionType;
};

export type EditorId = string;

export interface Editors {
	addNewForm?: EditorId;
	calculator?: EditorId;
	editForm?: EditorId;
	relations?: EditorId;
}

export type EditorStack = EditorId[];

export interface EditorState {
	closeAllEditors: () => void;
	currentlyOpenEditor: () => EditorId | undefined;
	isEditorOpen: (editorId: EditorId) => boolean;
	closeEditor: (editorId: EditorId) => void;
	openEditor: (editorId: EditorId) => void;
}
