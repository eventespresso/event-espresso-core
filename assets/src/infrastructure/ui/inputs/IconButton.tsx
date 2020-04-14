import React from 'react';
import { IconButton as ChakraIconButton } from '@chakra-ui/core';

import { IconButtonProps } from './types';

type ButtonType = React.ComponentType<IconButtonProps>;

const IconButton = React.forwardRef<ButtonType, IconButtonProps>((props, ref) => {
	return <ChakraIconButton {...props} ref={ref} />;
});

export default IconButton;
