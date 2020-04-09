import React from 'react';
import { MenuGroup as ChakraMenuGroup } from '@chakra-ui/core';

import { MenuGroupProps } from './types';

const MenuGroup: React.FC<MenuGroupProps> = ({ children, ...props }) => {
	return <ChakraMenuGroup {...props}>{children}</ChakraMenuGroup>;
};

export default MenuGroup;
