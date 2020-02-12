import { isNil } from 'ramda';

const parseInfinity = (number: any, asInt = false): number => {
	// returns true for any possible value that could represent infinity
	const representsInfinity = (value: any): boolean =>
		value < 0 || value === '' || value === 'INF' || value === Infinity || isNil(value);

	if (number && number.type && number.type.name === 'InfinitySymbol') {
		number = number.props.value;
	}

	number = representsInfinity(number) ? Infinity : number;
	number = number !== Infinity && asInt ? parseInt(number, 10) : number;

	if (isNaN(number)) {
		number = asInt ? -1 : Infinity;
	}

	return number;
};

export default parseInfinity;
