import { AnyObject } from '@appServices/utilities/types';

export interface EspressoDropdownMenuProps extends AnyObject {
	children(props: AnyObject): JSX.Element;
	className?: string;
	icon?: string | null;
	menuProps?: AnyObject;
	label: string;
	popoverProps?: AnyObject;
	toggleProps?: AnyObject;
}

export interface EspressoDropdownMenuItemProps extends AnyObject {
	icon?: string;
	onClick?: any;
	title?: string;
}
