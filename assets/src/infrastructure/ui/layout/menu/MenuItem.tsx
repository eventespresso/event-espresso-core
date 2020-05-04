import React from 'react';
import { MenuItem as ChakraMenuItem } from '@chakra-ui/core';

import { MenuItemProps } from './types';

const MenuItem: React.FC<MenuItemProps> = ({ children, ...props }) => {
	return <ChakraMenuItem {...props}>{children}</ChakraMenuItem>;
};

export default MenuItem;
