import React from 'react';
import { MenuButton as ChakraMenuButton } from '@chakra-ui/core';

import { MenuToggleProps } from './types';

const MenuToggle = React.forwardRef<typeof ChakraMenuButton, MenuToggleProps>(({ children, ...props }, ref) => {
	return (
		<ChakraMenuButton {...props} ref={ref}>
			{children}
		</ChakraMenuButton>
	);
});

export default MenuToggle;
