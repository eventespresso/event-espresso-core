import React from 'react';
import { ModalBody as ChakraModalBody } from '@chakra-ui/core';

import { ModalBodyProps } from './types';

const ModalBody: React.FC<ModalBodyProps> = ({ children, ...props }) => {
	return <ChakraModalBody {...props}>{children}</ChakraModalBody>;
};

export default ModalBody;
