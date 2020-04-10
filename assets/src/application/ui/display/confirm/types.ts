import { EspressoButtonProps } from '@application/ui/input';
import { AlertDialogProps } from '@infraUI/display';

export interface ConfirmProps extends AlertDialogProps {
	buttonProps: EspressoButtonProps;
	onConfirm: VoidFunction;
	type: 'delete';
}
