import React from 'react';
import { FormErrorMessage as ChakraFormErrorMessage } from '@chakra-ui/core';

import { FormErrorMessageProps } from './types';

const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ children, ...props }) => {
	return <ChakraFormErrorMessage {...props}>{children}</ChakraFormErrorMessage>;
};

export default FormErrorMessage;
