/**
 * External imports
 */
import { createContext } from 'react';

/**
 * External imports
 */
import useEditorModalState from '../../../application/ui/components/layout/editor-modal/useEditorModalState';

export const TicketContext = createContext({});

const TicketProvider = ({ children, id }) => {
	const { closeEditor, isEditorOpen, openEditor } = useEditorModalState();
	const getIsOpen = (modalId) => isEditorOpen(id + (modalId || ''));
	const onClose = (modalId) => closeEditor(id + (modalId || ''));
	const setIsOpen = (modalId) => openEditor(id + (modalId || ''));

	const value = {
		id,
		getIsOpen,
		onClose,
		setIsOpen,
	};

	return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>;
};

export default TicketProvider;
