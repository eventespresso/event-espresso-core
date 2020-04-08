import React from 'react';
import { Checkbox as ChakraCheckbox } from '@chakra-ui/core';

import type { CheckboxProps } from './types';

const Checkbox: React.FC<CheckboxProps> = (props) => {
	return <ChakraCheckbox {...props} />;
};

export default Checkbox;
