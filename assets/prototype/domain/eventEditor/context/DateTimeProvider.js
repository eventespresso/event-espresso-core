/**
 * External imports
 */
import { createContext } from 'react';

/**
 * External imports
 */
import useEditorModalState from '../../../application/ui/components/layout/editor-modal/useEditorModalState';

export const DateTimeContext = createContext({});

const DateTimeProvider = ({ children, id }) => {
	const { closeEditor, isEditorOpen, openEditor } = useEditorModalState();
	const value = {
		id,
		isOpen: isEditorOpen(id),
		onClose: () => closeEditor(id),
		setIsOpen: () => openEditor(id),
	};

	return <DateTimeContext.Provider value={value}>{children}</DateTimeContext.Provider>;
};

export default DateTimeProvider;
