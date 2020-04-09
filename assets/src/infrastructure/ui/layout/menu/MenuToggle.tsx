import React from 'react';
import { MenuButton as ChakraMenuButton } from '@chakra-ui/core';

import { MenuToggleProps } from './types';

const MenuToggle: React.FC<MenuToggleProps> = ({ children, ...props }) => {
	return <ChakraMenuButton {...props}>{children}</ChakraMenuButton>;
};

export default MenuToggle;
