import { AnyObject } from '@appServices/utilities/types';

export interface MenuItemProps extends AnyObject {
	onClick?: () => void;
	title?: string;
}
