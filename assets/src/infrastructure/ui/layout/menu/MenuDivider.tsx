import React from 'react';
import { MenuDivider as ChakraMenuDivider } from '@chakra-ui/core';

import { MenuDividerProps } from './types';

const MenuDivider: React.FC<MenuDividerProps> = ({ children, ...props }) => {
	return <ChakraMenuDivider {...props}>{children}</ChakraMenuDivider>;
};

export default MenuDivider;
