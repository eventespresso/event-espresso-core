import { Icon } from '@application/ui/display';
import { MenuProps, MenuItemProps, MenuToggleProps, MenuListProps } from '@infraUI/layout/menu';

export interface DropdownMenuProps extends Omit<MenuProps, 'isOpen'> {
	className?: string;
	menuListProps?: MenuListProps;
	toggleProps?: DropdownToggleProps;
}

export interface DropdownMenuItemProps extends MenuItemProps {
	icon?: Icon;
	title?: string;
}

export interface DropdownToggleProps extends MenuToggleProps {
	icon?: Icon;
	isOpen?: boolean;
	label?: string;
	onClose?: VoidFunction;
}
