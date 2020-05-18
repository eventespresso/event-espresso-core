import React from 'react';
import { MenuButton as ChakraMenuButton } from '@chakra-ui/core';

import { MenuToggleProps } from './types';

const MenuToggle = React.forwardRef<typeof ChakraMenuButton, MenuToggleProps>(
	({ children, variant = 'unstyled', ...props }, ref) => {
		return (
			// @ts-ignore
			<ChakraMenuButton {...props} variant={variant} ref={ref}>
				{children}
			</ChakraMenuButton>
		);
	}
);

export default MenuToggle;
