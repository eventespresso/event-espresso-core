/**
 * External dependencies
 */
import React, { createContext } from 'react';

/**
 * Internal dependencies
 */
import { EntityId } from '../../data/types';
import useEditorModalState from '../../../../application/ui/components/layout/editor-modal/useEditorModalState';
import useTicketEditorId from './useTicketEditorId';

interface EditorIds {
	calculator: string;
	editForm: string;
	relations: string;
}

interface EditorState {
	closeAllEditors: () => void;
	currentlyOpenEditor: string | undefined;
	getIsOpen: (arg: string) => boolean;
	onClose: (arg: string) => void;
	setIsOpen: (arg: string) => void;
}

interface ContextProps {
	editorIds: EditorIds;
	editorState: EditorState;
	id: EntityId;
}

export const TicketContext = createContext({} as ContextProps);

interface TicketProviderProps {
	children: React.ReactChildren;
	id: EntityId;
}

const TicketProvider = ({ children, id }: TicketProviderProps) => {
	const { closeEditor, closeAllEditors, currentlyOpenEditor, isEditorOpen, openEditor } = useEditorModalState();
	const getIsOpen = (modalId = '') => isEditorOpen(id + modalId);
	const onClose = (modalId = '') => closeEditor(id + modalId);
	const setIsOpen = (modalId = '') => openEditor(id + modalId);

	const editorIds: EditorIds = {
		calculator: useTicketEditorId('price-calculator', id),
		editForm: useTicketEditorId('ticket-editor', id),
		relations: useTicketEditorId('ticket-relations', id),
	};

	const editorState = {
		closeAllEditors,
		currentlyOpenEditor,
		getIsOpen,
		onClose,
		setIsOpen,
	};

	const value = {
		editorIds,
		editorState,
		id,
	};

	return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>;
};

export default TicketProvider;
