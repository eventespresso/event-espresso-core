import { useMemo } from 'react';
import { is } from 'ramda';

const useMemoStringify = (data: any, deps?: any[]): any => {
	let dataStringified: string;

	if (deps && Array.isArray(deps)) {
		dataStringified = deps.join(':');
	}

	if (is(Object, data)) {
		dataStringified = JSON.stringify(data);
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useMemo(() => data, [dataStringified]);
};

export default useMemoStringify;
