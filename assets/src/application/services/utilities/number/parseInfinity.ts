import isInfinite from './isInfinite';

interface ParseInfinity {
	(mayBeNumber: any, defaultValue?: number, asFloat?: boolean): number;
}

const parseInfinity: ParseInfinity = (mayBeNumber, defaultValue = -1, asFloat = false) => {
	let parsedValue: number = mayBeNumber;

	// If it is infinity
	if (isInfinite(parsedValue)) {
		// `parsedValue` is now expected to be a "number"
		parsedValue = defaultValue;
	}

	// If it is not a number (including Infinity)
	if (typeof parsedValue !== 'number') {
		// Try to parse it as number
		parsedValue = asFloat ? parseFloat(parsedValue) : parseInt(parsedValue, 10);
	}

	// if still no luck
	if (isNaN(parsedValue)) {
		parsedValue = defaultValue;
	}

	return parsedValue;
};

export default parseInfinity;
