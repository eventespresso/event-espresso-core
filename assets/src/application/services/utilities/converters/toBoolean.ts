/**
 * returns value if already a boolean.
 * returns true if passed value is "true", "yes", "1", or any positive number.
 * otherwise returns false
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toBoolean = (value: any): boolean => {
	// if already a boolean, then just return it
	if (typeof value === 'boolean') {
		return value;
	}
	// return true if a string with value "true", "yes", or "1"
	if (typeof value === 'string') {
		value = value.toLowerCase().trim();
		switch (value) {
			case 'true':
			case 'yes':
			case '1':
				return true;
			default:
				return false;
		}
	}
	// if a number, then parse as a boolean
	if (typeof value === 'number') {
		return Boolean(value);
	}
	// evenrything else is false
	return false;
};

export default toBoolean;
