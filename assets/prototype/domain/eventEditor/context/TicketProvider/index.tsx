/**
 * External dependencies
 */
import React, { createContext } from 'react';

/**
 * Internal dependencies
 */
import useEditorModalState from '../../../../application/ui/components/layout/editor-modal/useEditorModalState';
import { EntityId } from '../../data/types';

interface IContextProps {
	closeAllEditors: () => void;
	currentlyOpenEditor: string | undefined;
	id: EntityId;
	getIsOpen: (arg: string) => boolean;
	onClose: (arg: string) => void;
	setIsOpen: (arg: string) => void;
}

export const TicketContext = createContext({} as IContextProps);

interface TicketProviderProps {
	children: React.ReactChildren;
	id: EntityId;
}

const TicketProvider = ({ children, id }: TicketProviderProps) => {
	const { closeEditor, closeAllEditors, isEditorOpen, getCurrentlyOpenEditor, openEditor } = useEditorModalState();
	const currentlyOpenEditor = getCurrentlyOpenEditor();
	const getIsOpen = (modalId = '') => isEditorOpen(id + modalId);
	const onClose = (modalId = '') => closeEditor(id + modalId);
	const setIsOpen = (modalId = '') => openEditor(id + modalId);

	const value = {
		closeAllEditors,
		currentlyOpenEditor,
		id,
		getIsOpen,
		onClose,
		setIsOpen,
	};

	return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>;
};

export default TicketProvider;
