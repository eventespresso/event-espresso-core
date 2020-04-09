import React from 'react';
import { Modal as ChakraModal } from '@chakra-ui/core';
import { ModalProps } from './types';

const Modal: React.FC<ModalProps> = ({ children, ...props }) => {
	return <ChakraModal {...props}>{children}</ChakraModal>;
};

export default Modal;
