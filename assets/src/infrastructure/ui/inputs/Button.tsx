import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/core';

import type { ButtonProps } from './types';

const Button: React.FC<ButtonProps> = ({ children, buttonText, ...props }) => {
	const text = children || buttonText;
	return <ChakraButton {...props}>{text}</ChakraButton>;
};

export default Button;
