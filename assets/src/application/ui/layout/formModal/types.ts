import { EntityId, EntityDbId } from '@appServices/apollo/types';
import { FormModals } from '../../../../domain/shared/ui/formModal/types';
import { EspressoFormProps } from '@application/ui/forms/espressoForm';
import { AnyObject } from '@appServices/utilities/types';

export type EditorId = keyof FormModals;

export type EditorStack = EditorState[];

export interface OpenEditorOptions extends FormModalProps {
	editorId: EditorId;
}

export interface FormModalProps extends AnyObject {
	entityId?: EntityId;
	entityDbId?: EntityDbId;
}

export interface EditorState extends FormModalProps, OpenEditorOptions {
	isOpen: boolean;
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

export interface EditorAction extends FormModalProps, OpenEditorOptions {
	type: ActionType;
	isOpen?: boolean;
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

export type FormModal = (props?: FormModalProps) => FormModalProps;
