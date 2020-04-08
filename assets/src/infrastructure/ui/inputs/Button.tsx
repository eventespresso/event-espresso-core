import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/core';

import type { ButtonProps } from './types';

const Button: React.FC<ButtonProps> = (props) => {
	return <ChakraButton {...props} />;
};

export default Button;
