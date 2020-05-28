import { isNil } from 'ramda';

export type isInfiniteOptions = {
	negative?: boolean;
	emptyString?: boolean;
	nill?: boolean;
};

const defaultOptions: isInfiniteOptions = {
	negative: true,
	emptyString: true,
	nill: true,
};

/**
 * returns true for any possible value that could represent infinity
 * can be configured via an isInfiniteOptions object
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const isInfinite = (value: any, options: isInfiniteOptions = {}): boolean => {
	const config = { ...defaultOptions, ...options };
	return (
		value === 'INF' ||
		value === Infinity ||
		(config.negative && value < 0) ||
		(config.emptyString && value === '') ||
		(config.nill && isNil(value))
	);
};

export default isInfinite;
