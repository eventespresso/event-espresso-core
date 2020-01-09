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
	EditorIds,
} from '../../../../application/ui/components/layout/editor-modal/useEditorModalState/types';
import useEditorModalState from '../../../../application/ui/components/layout/editor-modal/useEditorModalState';
import useDateEditorId from './useDateEditorId';

export const DateTimeContext = createContext({} as ContextProps);

interface DatetimeProviderProps {
	children: React.ReactChildren;
	id: EntityId;
}

const DateTimeProvider = ({ children, id }: DatetimeProviderProps) => {
	const { closeAllEditors, currentlyOpenEditor, getIsOpen, onClose, setIsOpen } = useEditorModalState(id);
	const editorIds: EditorIds = {
		calculator: useDateEditorId('price-calculator', id),
		editForm: useDateEditorId('date-editor', id),
		relations: useDateEditorId('date-relations', id),
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

	return <DateTimeContext.Provider value={value}>{children}</DateTimeContext.Provider>;
};

export default DateTimeProvider;
