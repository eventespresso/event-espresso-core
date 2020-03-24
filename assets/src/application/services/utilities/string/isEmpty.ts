import { is, isNil } from 'ramda';

const isEmpty = (str: string): boolean => {
	// treat undefined as empty
	if (isNil(str)) {
		return true;
	}

	return is(String, str) && str.length === 0;
};

export default isEmpty;
