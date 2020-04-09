import React from 'react';
import { ModalFooter as ChakraModalFooter } from '@chakra-ui/core';

import { ModalFooterProps } from './types';

const ModalFooter: React.FC<ModalFooterProps> = ({ children, ...props }) => {
	return <ChakraModalFooter {...props}>{children}</ChakraModalFooter>;
};

export default ModalFooter;
