import React from 'react';
import { MenuButton as ChakraMenuButton } from '@chakra-ui/core';

import { MenuTriggerProps } from './types';

const MenuTrigger: React.FC<MenuTriggerProps> = ({ children, ...props }) => {
	return <ChakraMenuButton {...props}>{children}</ChakraMenuButton>;
};

export default MenuTrigger;
