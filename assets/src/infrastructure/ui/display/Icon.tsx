import React from 'react';
import { Icon as ChakraIcon, IconProps as ChakraIconProps } from '@chakra-ui/core';

export interface IconProps extends ChakraIconProps {}

export const Icon: React.FC<IconProps> = (props) => <ChakraIcon {...props} />;
