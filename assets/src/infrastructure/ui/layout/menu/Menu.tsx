import React from 'react';

import { Menu as ChakraMenu } from '@chakra-ui/core';

import { MenuProps } from './types';

const Menu: React.FC<MenuProps> = ({ children, ...props }) => {
	return <ChakraMenu {...props}>{children}</ChakraMenu>;
};

export default Menu;
