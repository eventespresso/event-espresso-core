import React from 'react';
import { IconButton as ChakraIconButton } from '@chakra-ui/core';

import { IconButtonProps } from './types';

type ButtonType = React.ComponentType<IconButtonProps>;

const IconButton = React.forwardRef<ButtonType, IconButtonProps>(({ variant = 'unstyled', ...props }, ref) => {
	return <ChakraIconButton {...props} ref={ref} variant={variant} />;
});

export default IconButton;
