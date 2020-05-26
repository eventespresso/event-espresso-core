import { useRef, useCallback } from 'react';

type ToString = <T>(value: T) => string;

const useLogIfChanged = <T extends any>(name: string, value: T, toString?: ToString): void => {
	const previous = useRef<T>(value);

	const getValue = useCallback<ToString>(
		(value) => {
			if (toString) {
				return toString(value);
			}
			if (typeof value === 'object') {
				return JSON.stringify(value);
			} else {
				return value.toString();
			}
		},
		[toString]
	);

	if (!Object.is(previous.current, value)) {
		console.log(`${name} changed. Old: ${getValue(previous.current)}, New: ${getValue(value)} `);
		previous.current = value;
	}
};

export default useLogIfChanged;
