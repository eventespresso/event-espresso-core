import { Icon } from './types';

/**
 * returns true if icon is an EspressoIcon
 */
const isEspressoIcon = (icon: Icon | string): boolean => {
	return Object.values(Icon).includes(icon as Icon);
};

export default isEspressoIcon;
