const toBoolean = (value: boolean | number | string) => {
	value = typeof value === 'string' ? value.toLowerCase().trim() : value;
	switch (value) {
		case 'true':
		case 'yes':
		case '1':
			return true;
		case 'false':
		case 'no':
		case '0':
			return false;
		default:
			return Boolean(value);
	}
};

export default toBoolean;
