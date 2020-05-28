import {
	BadgeProps as ChakraBadgeProps,
	BoxProps,
	HeadingProps as ChakraHeadingProps,
	IAlertDialog,
	ISpinnerProps,
	TooltipProps as ChakraTooltipProps,
} from '@chakra-ui/core';

export interface AlertDialogProps extends Omit<IAlertDialog, 'children'> {
	body?: React.ReactNode;
	cancelButton: React.ReactNode;
	header: React.ReactNode;
	okButton: React.ReactNode;
}

export interface BadgeProps extends ChakraBadgeProps { }

export interface DividerProps extends Omit<BoxProps, 'aria-orientation'> {
	dashed?: boolean;
	orientation?: BoxProps['aria-orientation'];
}

export interface HeadingProps extends ChakraHeadingProps { }

export interface SpinnerProps extends ISpinnerProps { }

export interface TooltipProps extends Omit<ChakraTooltipProps, 'aria-label' | 'children' | 'title'> {
	['aria-label']?: string;
	tooltip?: string;
}
