import React, { createContext } from 'react';

import useTicketEditorId from './useTicketEditorId';
import { EntityId } from '../../data/types';
import useEditorModalState from '../../../../application/ui/components/layout/editorModal/useEditorModalState';
import {
	ContextProps,
	Editors,
	EditorState,
} from '../../../../application/ui/components/layout/editorModal/useEditorModalState/types';

const DEFAULT_CONTEXT = {
	editors: null,
	editorState: null,
	id: '',
};

export type TicketContextProps = ContextProps;
export const TicketContext = createContext<TicketContextProps>(DEFAULT_CONTEXT);

interface TicketProviderProps {
	children?: React.ReactNode;
	id: EntityId;
}

const TicketProvider: React.FC<TicketProviderProps> = ({ children, id }) => {
	const editorState: EditorState = useEditorModalState();

	const editors: Editors = {
		addNewForm: useTicketEditorId('add-new-ticket', 'xyz'),
		calculator: useTicketEditorId('price-calculator', id),
		editForm: useTicketEditorId('edit-ticket-form', id),
		relations: useTicketEditorId('ticket-relations', id),
	};

	const value: TicketContextProps = { editors, editorState, id };

	return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>;
};

export default TicketProvider;
