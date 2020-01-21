import React, { createContext } from 'react';

import useDateEditorId from './useDateEditorId';
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

export type DateTimeContextProps = ContextProps;
export const DateTimeContext = createContext<DateTimeContextProps>(DEFAULT_CONTEXT);

interface DatetimeProviderProps {
	children?: React.ReactNode;
	id: EntityId;
}

const DateTimeProvider: React.FC<DatetimeProviderProps> = (props) => {
	const { children, id } = props;
	const editorState: EditorState = useEditorModalState();

	const editors: Editors = {
		addNewForm: useDateEditorId('add-new-date', 'xyz'),
		calculator: useDateEditorId('price-calculator', id),
		editForm: useDateEditorId('date-editor', id),
		relations: useDateEditorId('date-relations', id),
	};

	const value: DateTimeContextProps = { editors, editorState, id };

	return <DateTimeContext.Provider value={value}>{children}</DateTimeContext.Provider>;
};

export default DateTimeProvider;
