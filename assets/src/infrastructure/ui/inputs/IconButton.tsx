import React, { forwardRef } from 'react';
import { IconButton as ChakraIconButton } from '@chakra-ui/core';

import { IconButtonProps } from './types';

const IconButton: React.FC<IconButtonProps> = forwardRef((props, ref) => {
	return <ChakraIconButton {...props} ref={ref} />;
});

export default IconButton;
