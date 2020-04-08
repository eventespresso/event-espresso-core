import React from 'react';
import { FormControl as ChakraFormControl } from '@chakra-ui/core';

import { FormControlProps } from './types';

const FormControl: React.FC<FormControlProps> = ({ children, ...props }) => {
	return <ChakraFormControl {...props}>{children}</ChakraFormControl>;
};

export default FormControl;
