import React from 'react';
import { ModalHeader as ChakraModalHeader } from '@chakra-ui/core';

import { ModalHeaderProps } from './types';

const ModalHeader: React.FC<ModalHeaderProps> = ({ children, ...props }) => {
	return <ChakraModalHeader {...props}>{children}</ChakraModalHeader>;
};

export default ModalHeader;
