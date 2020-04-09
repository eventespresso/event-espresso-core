import React from 'react';
import { ModalContent as ChakraModalContent } from '@chakra-ui/core';

import { ModalContentProps } from './types';

const ModalContent: React.FC<ModalContentProps> = ({ children, ...props }) => {
	return <ChakraModalContent {...props}>{children}</ChakraModalContent>;
};

export default ModalContent;
