import React from 'react';
import { ModalCloseButton as ChakraModalCloseButton } from '@chakra-ui/core';

import { ModalCloseButtonProps } from './types';

const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({ children, ...props }) => {
	return <ChakraModalCloseButton {...props}>{children}</ChakraModalCloseButton>;
};

export default ModalCloseButton;
