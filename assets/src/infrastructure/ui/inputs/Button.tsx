import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/core';

import type { ButtonProps } from './types';

const Button: React.FC<ButtonProps> = React.forwardRef<typeof ChakraButton, ButtonProps>(
	({ children, buttonText, ...props }, ref) => {
		const text = children || buttonText;
		return (
			<ChakraButton {...props} ref={ref}>
				{text}
			</ChakraButton>
		);
	}
);

export default Button;
