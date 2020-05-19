import { IconName } from '@application/ui/display';
import { MenuProps, MenuItemProps, MenuToggleProps, MenuListProps } from '@infraUI/layout/menu';
import { withTooltipProps } from '@application/ui/display';

export interface DropdownMenuProps extends Omit<MenuProps, 'isOpen'> {
	className?: string;
	menuListProps?: MenuListProps;
	toggleProps?: DropdownToggleProps;
}

export interface DropdownMenuItemProps extends MenuItemProps {
	icon?: React.ComponentType<any>;
	title?: string;
}

export interface DropdownToggleProps extends MenuToggleProps, withTooltipProps {
	borderless?: boolean;
	icon?: IconName;
	isOpen?: boolean;
	onClose?: VoidFunction;
}
