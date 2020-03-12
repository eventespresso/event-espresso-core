import { AnyObject } from '@appServices/utilities/types';

export interface DropdownMenuProps extends AnyObject {
	children(props: AnyObject): JSX.Element;
	className?: string;
	controls?: [];
	icon?: string | null;
	menuProps?: AnyObject;
	label: string;
	popoverProps?: AnyObject;
	toggleProps?: AnyObject;
}
