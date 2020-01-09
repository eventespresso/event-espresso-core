/**
 * External dependencies
 */
import React, { createContext } from 'react';

/**
 * Internal dependencies
 */
import { EntityId } from '../../data/types';
import {
	ContextProps,
	Editors,
} from '../../../../application/ui/components/layout/editor-modal/useEditorModalState/types';
import useEditorModalState from '../../../../application/ui/components/layout/editor-modal/useEditorModalState';
import useTicketEditorId from './useTicketEditorId';

export interface TicketContextProps extends ContextProps {}
export const TicketContext = createContext({} as TicketContextProps);

interface TicketProviderProps {
	children: React.ReactChildren;
	id: EntityId;
}

const TicketProvider = ({ children, id }: TicketProviderProps) => {
	const editorState = useEditorModalState(id);
	const editors: Editors = {
		calculator: useTicketEditorId('price-calculator', id),
		editForm: useTicketEditorId('edit-ticket-form', id),
		relations: useTicketEditorId('ticket-relations', id),
	};
	const value: TicketContextProps = {
		editors,
		editorState,
		id,
	};

	return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>;
};

export default TicketProvider;
