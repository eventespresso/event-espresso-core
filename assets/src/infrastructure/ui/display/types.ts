import { ISpinnerProps } from '@chakra-ui/core';

import { EspressoButtonProps } from '@application/ui/input';
import { TooltipProps as ChakraTooltipProps } from '@chakra-ui/core';

export interface AlertDialogProps {
	buttonProps: EspressoButtonProps;
	onConfirm: VoidFunction;
	title?: string;
}

export interface SpinnerProps extends ISpinnerProps {}

export interface TooltipProps extends Omit<ChakraTooltipProps, 'aria-label'> {
	['aria-label']?: string;
	title: string;
}
