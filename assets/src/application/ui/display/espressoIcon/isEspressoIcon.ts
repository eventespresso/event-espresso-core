import { Icon } from './types';

/**
 * returns true if icon is an EspressoIcon
 */
const isEspressoIcon = (icon: any): boolean => {
	return typeof icon === 'string' && Object.values(Icon).includes(icon as Icon);
};

export default isEspressoIcon;
