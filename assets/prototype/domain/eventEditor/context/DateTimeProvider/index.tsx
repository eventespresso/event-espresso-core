import React, { createContext } from 'react';

import useDateEditorId from './useDateEditorId';
import { EntityId } from '../../data/types';
import useEditorModalState from '../../../../application/ui/components/layout/editor-modal/useEditorModalState';
import {
	ContextProps,
	Editors,
	EditorState,
} from '../../../../application/ui/components/layout/editor-modal/useEditorModalState/types';

export type DateTimeContextProps = ContextProps;
export const DateTimeContext = createContext<DateTimeContextProps>(null);

interface DatetimeProviderProps {
	children?: React.ReactNode;
	id: EntityId;
}

const DateTimeProvider: React.FunctionComponent<DatetimeProviderProps> = (props) => {
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
