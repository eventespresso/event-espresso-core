import React from 'react';
import { CheckboxGroup as ChakraCheckboxGroup } from '@chakra-ui/core';

import type { CheckboxGroupProps } from './types';

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ children, ...props }) => {
	return <ChakraCheckboxGroup {...props}>{children}</ChakraCheckboxGroup>;
};

export default CheckboxGroup;
