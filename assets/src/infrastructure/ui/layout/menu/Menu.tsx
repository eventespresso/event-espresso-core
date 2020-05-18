import React from 'react';

import { Menu as ChakraMenu } from '@chakra-ui/core';

import { MenuProps } from './types';

const Menu: React.FC<MenuProps> = ({ closeOnBlur = true, children, ...props }) => {
	return (
		<ChakraMenu {...props} closeOnBlur={closeOnBlur}>
			{children}
		</ChakraMenu>
	);
};

export default Menu;
