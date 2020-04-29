import React from 'react';
import { ButtonGroup as ChakraButtonGroup } from '@chakra-ui/core';

import type { ButtonGroupProps } from './types';

const Checkbox: React.FC<ButtonGroupProps> = (props) => {
	return <ChakraButtonGroup {...props} />;
};

export default Checkbox;
