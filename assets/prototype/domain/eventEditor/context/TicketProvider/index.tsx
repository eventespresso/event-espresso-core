import React, { createContext } from 'react';

import useTicketEditorId from './useTicketEditorId';
import { EntityId } from '../../data/types';
import useEditorModalState from '../../../../application/ui/components/layout/editor-modal/useEditorModalState';
import {
	ContextProps,
	Editors,
	EditorState,
} from '../../../../application/ui/components/layout/editor-modal/useEditorModalState/types';

const DEFAULT_CONTEXT = {
	editors: null,
	editorState: null,
	id: '',
};

export interface TicketContextProps extends ContextProps {}
export const TicketContext = createContext<TicketContextProps>(DEFAULT_CONTEXT);

interface TicketProviderProps {
	children: React.ReactChildren;
	id: EntityId;
}

const TicketProvider: React.FunctionComponent<TicketProviderProps> = ({ children, id }) => {
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
