import React from 'react';
import { ModalOverlay as ChakraModalOverlay } from '@chakra-ui/core';

import { ModalOverlayProps } from './types';

const ModalOverlay: React.FC<ModalOverlayProps> = ({ children, ...props }) => {
	return <ChakraModalOverlay {...props}>{children}</ChakraModalOverlay>;
};

export default ModalOverlay;
