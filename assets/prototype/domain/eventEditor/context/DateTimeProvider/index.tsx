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
import useDateEditorId from './useDateEditorId';

export interface DateTimeContextProps extends ContextProps {}
export const DateTimeContext = createContext({} as DateTimeContextProps);

interface DatetimeProviderProps {
	children: React.ReactChildren;
	id: EntityId;
}

const DateTimeProvider = ({ children, id }: DatetimeProviderProps) => {
	const editorState = useEditorModalState(id);
	const editors: Editors = {
		editForm: useDateEditorId('edit-date-form', id),
		relations: useDateEditorId('date-relations', id),
	};
	const value: DateTimeContextProps = {
		editors,
		editorState,
		id,
	};

	return <DateTimeContext.Provider value={value}>{children}</DateTimeContext.Provider>;
};

export default DateTimeProvider;
