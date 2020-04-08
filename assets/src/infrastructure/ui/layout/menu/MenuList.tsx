import React from 'react';
import { MenuList as ChakraMenuList } from '@chakra-ui/core';

import { MenuListProps } from './types';

const MenuList: React.FC<MenuListProps> = ({ children, ...props }) => {
	return <ChakraMenuList {...props}>{children}</ChakraMenuList>;
};

export default MenuList;
