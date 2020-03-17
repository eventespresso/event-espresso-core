import isInfinite from './isInfinite';

type FormatInfinity = (value: number, defaultValue?: string) => string;

const formatInfinity: FormatInfinity = (value, defaultValue = '') => {
	// If it is infinity
	if (isInfinite(value)) {
		return defaultValue;
	}
	return value.toString();
};

export default formatInfinity;
