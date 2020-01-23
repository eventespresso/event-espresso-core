/**
 * Internal dependencies
 */
import { EntityId } from '../../../../../domain/eventEditor/data/types';
import { EditorModals } from '../../../../../domain/shared/editorModal/types';

export { EntityId };

export type EditorId = keyof EditorModals;

export interface EditorState {
	editorId: EditorId;
	isOpen: boolean;
	entityId?: EntityId;
	[key: string]: any;
}

export type EditorStack = EditorState[];

export interface OpenEditorOptions {
	editorId: EditorId;
	entityId?: EntityId;
}

export type EditorStateReducer = (state: EditorStack, action: EditorAction) => EditorStack;

export interface EditorStateManager {
	editors: EditorStack;
	openEditor: (options: OpenEditorOptions) => void;
	closeEditor: (editorId: EditorId) => void;
}

export enum ActionType {
	CLOSE_EDITOR = 'CLOSE_EDITOR',
	OPEN_EDITOR = 'OPEN_EDITOR',
	CLOSE_ALL = 'CLOSE_ALL',
}

export interface EditorAction {
	type: ActionType;
	editorId: EditorId;
	isOpen?: boolean;
	entityId?: EntityId;
}

export interface EditorModalData {
	formComponent: any;
	onSubmit: (values?: any) => void;
	onClose: () => void;
	[key: string]: any;
}

export type EditorModalCallback = (entityId?: EntityId) => EditorModalData;

export type EditorModal = () => EditorModalCallback;
