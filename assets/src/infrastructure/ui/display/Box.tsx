import React from 'react';
import { Box as ChakraBox, BoxProps as ChakraBoxProps } from '@chakra-ui/core';

export interface BoxProps extends ChakraBoxProps {}

export const Box: React.FC<BoxProps> = (props) => <ChakraBox {...props} />;
