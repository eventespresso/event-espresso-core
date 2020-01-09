/**
 * Internal dependencies
 */
import { EntityId } from '../../../../../../domain/eventEditor/data/types';

export interface ContextProps {
	editorIds: EditorIds;
	editorState: EditorState;
	id: EntityId;
}

export interface EditorIds {
	calculator: string;
	editForm: string;
	relations: string;
}

export interface EditorState {
	closeAllEditors: () => void;
	currentlyOpenEditor: () => string | undefined;
	getIsOpen: (arg: string) => boolean;
	onClose: (arg: string) => void;
	setIsOpen: (arg: string) => void;
}
