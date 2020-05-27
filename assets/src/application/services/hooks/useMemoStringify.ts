import { useMemo } from 'react';
import { is, toString } from 'ramda';

const useMemoStringify = <T>(data: T, deps?: any[]): T => {
	let dataStringified: string;

	if (deps && Array.isArray(deps)) {
		dataStringified = deps.map(toString).join(':');
	}

	if (is(Object, data)) {
		dataStringified = JSON.stringify(data);
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useMemo(() => data, [dataStringified]);
};

export default useMemoStringify;
