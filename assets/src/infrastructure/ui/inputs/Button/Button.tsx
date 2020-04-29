import React from 'react';
import classNames from 'classnames';
import { Button as ChakraButton } from '@chakra-ui/core';

import type { ButtonProps } from '../types';

type ButtonType = React.ComponentType<ButtonProps>;

const Button = React.forwardRef<ButtonType, ButtonProps>(({ children, buttonText, icon, ...props }, ref) => {
	const className = classNames('ee-btn-base', props.className);
	const text = children || buttonText;

	return (
		<ChakraButton {...props} className={className} leftIcon={icon} ref={ref}>
			{text}
		</ChakraButton>
	);
});

export default Button;
