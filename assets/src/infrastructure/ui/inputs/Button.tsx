import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/core';

import type { ButtonProps } from './types';

type ButtonType = React.ComponentType<ButtonProps>;

const Button = React.forwardRef<ButtonType, ButtonProps>(({ children, buttonText, icon, ...props }, ref) => {
	const text = children || buttonText;
	return (
		<ChakraButton {...props} ref={ref} leftIcon={icon}>
			{text}
		</ChakraButton>
	);
});

export default Button;
