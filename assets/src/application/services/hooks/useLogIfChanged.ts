import { useRef } from 'react';

const useLogIfChanged = <T extends any>(name: string, value: T): void => {
	const previous = useRef<T>(value);

	const getValue = (value: any): any => {
		if (typeof value === 'object') {
			return JSON.stringify(value);
		} else {
			return value.toString();
		}
	};

	if (!Object.is(previous.current, value)) {
		console.log(`${name} changed. Old: ${getValue(previous.current)}, New: ${getValue(value)} `);
		previous.current = value;
	}
};

export default useLogIfChanged;
