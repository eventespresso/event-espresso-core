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
	const value = {
		id,
		isOpen: isEditorOpen(id),
		onClose: () => closeEditor(id),
		setIsOpen: () => openEditor(id),
	};

	return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>;
};

export default TicketProvider;
