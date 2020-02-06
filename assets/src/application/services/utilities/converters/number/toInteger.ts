import { is } from 'ramda';

const toInteger = (dirtyNumber: number | string): number => {
	const number = Number(dirtyNumber);

	if (is(Number, number)) {
		return number < 0 ? Math.ceil(number) : Math.floor(number);
	}

	return NaN;
};

export default toInteger;
