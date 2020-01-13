import ICONS from './constants';

/**
 * returns true if icon is an EspressoIcon
 */
const isEspressoIcon = (icon: string): boolean => {
	switch (icon) {
		case ICONS.CALCULATOR:
		case ICONS.CALENDAR:
		case ICONS.REM:
		case ICONS.ROTATE:
		case ICONS.SAVE:
			return true;
		default:
			return false;
	}
};

export default isEspressoIcon;
