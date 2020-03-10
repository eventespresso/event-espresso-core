import { isNil } from 'ramda';

interface ParseInfinity {
	(mayBeNumber: any, defaultValue?: number, asFloat?: boolean): number;
}

const parseInfinity: ParseInfinity = (mayBeNumber, defaultValue = -1, asFloat = false) => {
	// returns true for any possible value that could represent infinity
	const representsInfinity = (value: any): boolean => {
		return value < 0 || value === '' || value === 'INF' || value === Infinity || isNil(value);
	};

	let parsedValue: number = mayBeNumber;

	// If it is infinity
	if (representsInfinity(parsedValue)) {
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
