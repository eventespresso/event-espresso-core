import { EspressoButtonProps } from '@application/ui/input';

export interface ConfirmProps {
	buttonProps: EspressoButtonProps;
	onConfirm: VoidFunction;
	title?: string;
}
