import { useContext } from 'react';
import { EditorModalContext } from '../../../services/context/EditorModalProvider';
import { EditorStateManager } from './types';

const useEditorModal = (): EditorStateManager => {
	return useContext<EditorStateManager>(EditorModalContext);
};

export default useEditorModal;
