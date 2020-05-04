import React, { forwardRef } from 'react';
import { MenuItem as ChakraMenuItem } from '@chakra-ui/core';

import { MenuItemProps } from './types';

const MenuItem: React.FC<MenuItemProps> = forwardRef(({ children, ...props }, ref) => {
	return (
		<ChakraMenuItem {...props} ref={ref}>
			{children}
		</ChakraMenuItem>
	);
});

export default MenuItem;
