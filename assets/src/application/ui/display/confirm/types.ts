import { ButtonProps } from '@application/ui/input';

export interface ConfirmProps {
	message?: string;
	noButtonText?: string;
	onConfirm?: VoidFunction;
	title?: string;
	yesButtonText?: string;
}

export interface ConfirmPropsWithButton extends ConfirmProps {
	buttonProps: ButtonProps;
}
