import { ButtonProps } from '@application/ui/input';
import { DropdownMenuItemProps } from '@application/ui/layout/dropdownMenu/types';

export interface ConfirmProps {
	buttonProps?: ButtonProps;
	dropdownMenuProps?: DropdownMenuItemProps;
	onConfirm?: VoidFunction;
	title?: string;
}
