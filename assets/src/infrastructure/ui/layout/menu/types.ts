import React from 'react';
import type {
	MenuButtonProps as ChakraMenuButtonProps,
	MenuGroupProps as ChakraMenuGroupProps,
	MenuItemOptionProps as ChakraMenuItemOptionProps,
	MenuItemProps as ChakraMenuItemProps,
	MenuListProps as ChakraMenuListProps,
	MenuOptionGroupProps as ChakraMenuOptionGroupProps,
	MenuProps as ChakraMenuProps,
	MenuDivider,
} from '@chakra-ui/core';

export interface MenuDividerProps extends React.ComponentProps<typeof MenuDivider> {}

export interface MenuGroupProps extends ChakraMenuGroupProps {}

export interface MenuItemOptionProps extends ChakraMenuItemOptionProps {}

export interface MenuItemProps extends ChakraMenuItemProps {}

export type MenuListProps = ChakraMenuListProps & {};

export interface MenuOptionGroupProps extends ChakraMenuOptionGroupProps {}

export interface MenuToggleProps extends ChakraMenuButtonProps {
	variant?: string;
}

export type MenuProps = ChakraMenuProps & {};
