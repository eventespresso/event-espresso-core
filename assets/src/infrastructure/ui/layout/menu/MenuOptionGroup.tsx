import React from 'react';
import { MenuOptionGroup as ChakraMenuOptionGroup } from '@chakra-ui/core';

import { MenuOptionGroupProps } from './types';

const MenuOptionGroup: React.FC<MenuOptionGroupProps> = ({ children, ...props }) => {
	return <ChakraMenuOptionGroup {...props}>{children}</ChakraMenuOptionGroup>;
};

export default MenuOptionGroup;
