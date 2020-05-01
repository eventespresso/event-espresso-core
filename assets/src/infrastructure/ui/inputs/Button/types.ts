import React from 'react';
import type {
	ButtonProps as ChakraButtonProps,
	ButtonGroupProps as ChakraButtonGroupProps,
	IconButtonProps as ChakraIconButtonProps,
} from '@chakra-ui/core';

export interface ButtonProps extends Partial<ChakraButtonProps> {
	buttonText?: React.ReactNode;
	icon?: React.ComponentType<any>;
}

export interface ButtonGroupProps extends ChakraButtonGroupProps {}

export interface IconButtonProps extends ChakraIconButtonProps {
	icon?: React.ComponentType<any>;
}
