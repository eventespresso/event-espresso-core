import { ButtonProps } from '@application/ui/input';

export interface ConfirmProps {
	buttonProps: ButtonProps;
	onConfirm?: VoidFunction;
	title?: string;
}
