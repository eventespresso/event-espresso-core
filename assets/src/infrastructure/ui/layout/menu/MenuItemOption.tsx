import React from 'react';
import { MenuItemOption as ChakraMenuItemOption } from '@chakra-ui/core';

import { MenuItemOptionProps } from './types';

const MenuItemOption: React.FC<MenuItemOptionProps> = ({ children, ...props }) => {
	return <ChakraMenuItemOption {...props}>{children}</ChakraMenuItemOption>;
};

export default MenuItemOption;
