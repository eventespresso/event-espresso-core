/**
 * Internal dependencies
 */
import { EntityId } from '../../../../../domain/eventEditor/services/apollo/types';
import { EditorModals } from '../../../../../domain/shared/ui/editorModal/types';

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
	closeAllEditors: () => void;
	currentlyOpenEditor: () => EditorState;
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

export type ModalSubmit = (values?: any) => void;
export type ModalClose = () => void;

export interface EditorModalProps {
	formComponent: React.FC;
	onSubmit: ModalSubmit;
	onClose: ModalClose;
	[key: string]: any;
}

export type EditorModal = (entityId?: EntityId) => EditorModalProps;
