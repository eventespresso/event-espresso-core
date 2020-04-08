import React from 'react';
import { FormHelperText as ChakraFormHelperText } from '@chakra-ui/core';

import { FormControlProps } from './types';

const FormHelperText: React.FC<FormControlProps> = ({ children, ...props }) => {
	return <ChakraFormHelperText {...props}>{children}</ChakraFormHelperText>;
};

export default FormHelperText;
