import { useContext } from 'react';
import { ModalContext, ModalInstance } from '../../../services/context/ModalProvider';

const useModal = (): ModalInstance => {
	return useContext<ModalInstance>(ModalContext);
};

export default useModal;
