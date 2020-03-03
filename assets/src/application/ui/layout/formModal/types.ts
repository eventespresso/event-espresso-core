/**
 * Internal dependencies
 */
import { EntityId } from '@appServices/apollo/types';
import { FormModals } from '../../../../domain/shared/ui/formModal/types';
import { EspressoFormProps } from '@application/ui/forms/espressoForm';
import { AnyObject } from '@appServices/utilities/types';

export type EditorId = keyof FormModals;

export interface EditorState extends AnyObject {
	editorId: EditorId;
	isOpen: boolean;
	entityId?: EntityId;
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

export interface FormModalProps {
	formComponent?: React.NamedExoticComponent;
	onSubmit?: ModalSubmit;
	onClose?: ModalClose;
	formConfig?: EspressoFormProps;
	initialValues?: any;
}

export type FormModal = (entityId?: EntityId) => FormModalProps;
