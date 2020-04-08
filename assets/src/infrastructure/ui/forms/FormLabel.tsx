import React from 'react';
import { FormLabel as ChakraFormLabel } from '@chakra-ui/core';

import { FormLabelProps } from './types';

const FormLabel: React.FC<FormLabelProps> = ({ children, ...props }) => {
	return <ChakraFormLabel {...props}>{children}</ChakraFormLabel>;
};

export default FormLabel;
