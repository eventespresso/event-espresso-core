import { useContext } from 'react';
import { FormModalContext } from '../../../services/context/FormModalProvider';
import { EditorStateManager } from './types';

const useFormModal = (): EditorStateManager => {
	return useContext<EditorStateManager>(FormModalContext);
};

export default useFormModal;
