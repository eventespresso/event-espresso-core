import { IAlertDialog, ISpinnerProps, TooltipProps as ChakraTooltipProps } from '@chakra-ui/core';

export interface AlertDialogProps extends IAlertDialog {
	cancelButton: React.ReactNode;
	header: React.ReactNode;
	okButton: React.ReactNode;
	title?: string;
}

export interface SpinnerProps extends ISpinnerProps {}

export interface TooltipProps extends Omit<ChakraTooltipProps, 'aria-label'> {
	['aria-label']?: string;
	title: string;
}
