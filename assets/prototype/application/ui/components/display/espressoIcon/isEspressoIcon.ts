import { Icon } from './types';

/**
 * returns true if icon is an EspressoIcon
 */
const isEspressoIcon = (icon: Icon | string): boolean => {
	switch (icon) {
		case Icon.CALCULATOR:
		case Icon.CALENDAR:
		case Icon.REM:
		case Icon.ROTATE:
		case Icon.SAVE:
			return true;
		default:
			return false;
	}
};

export default isEspressoIcon;
