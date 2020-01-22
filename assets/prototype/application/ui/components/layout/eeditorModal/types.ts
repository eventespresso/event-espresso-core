/**
 * Internal dependencies
 */
import { EntityId } from '../../../../../domain/eventEditor/data/types';
import { EditorModals } from '../../../../../domain/shared/editorModal/types';

export { EntityId };

export type EditorId = keyof EditorModals;

export interface EditorState {
	isOpen: boolean;
	editorId: EditorId;
	entityId: EntityId;
}

export interface OpenEditorOptions {
	editorId?: EditorId;
	entityId?: EntityId;
}

export type EditorStateReducer = (state: EditorState, action: EditorAction) => EditorState;

export interface EditorStateManager extends EditorState {
	openEditor: (options: OpenEditorOptions) => void;
	setEditorId: (editorId: EditorId) => void;
	setEntityId: (entityId: EntityId) => void;
	closeEditor: () => void;
}

export enum ActionType {
	CLOSE_EDITOR = 'CLOSE_EDITOR',
	OPEN_EDITOR = 'OPEN_EDITOR',
	SET_EDITOR_ID = 'SET_EDITOR_ID',
	SET_ENTITY_ID = 'SET_ENTITY_ID',
}

export interface EditorAction {
	type: ActionType;
	isOpen?: boolean;
	editorId?: EditorId;
	entityId?: EntityId;
}

export type EditorModalData = {
	formComponent: any;
	onSubmit: (values?: any) => void;
	onClose?: () => void;
	[key: string]: any;
};

export type EditorModal = (entityId?: EntityId) => EditorModalData;
