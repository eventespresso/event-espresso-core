/**
 * External imports
 */
import React, { createContext } from 'react';

import { ProviderProps } from './types';
import { useEditorModalManager } from '../../ui/layout/editorModal';

const EditorModalContext = createContext(null);

const { Provider, Consumer: EditorModalConsumer } = EditorModalContext;

const EditorModalProvider: React.FC<ProviderProps> = (props): JSX.Element => {
	const editorModal = useEditorModalManager();

	return <Provider value={editorModal}>{props.children}</Provider>;
};

export { EditorModalContext, EditorModalProvider, EditorModalConsumer };
