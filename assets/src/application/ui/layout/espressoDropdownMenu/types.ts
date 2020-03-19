import { AnyObject } from '@appServices/utilities/types';

export interface EspressoDropdownMenuProps extends AnyObject {
	children: React.ReactNode;
	className?: string;
	icon?: string;
	label: string;
	menuProps?: AnyObject;
	popoverProps?: AnyObject;
	toggleProps?: AnyObject;
}

export interface EspressoDropdownMenuItemProps extends AnyObject {
	icon?: string;
	onClick?: () => void;
	title?: string;
}
