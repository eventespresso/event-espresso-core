import { useRef, useCallback } from 'react';

/**
 * This custom hook can be used to memoize a value lazily
 * i.e. its returned callback can be used at the places where a hook cannot be used
 * e.g. inside callbacks, loops etc.
 *
 * The value should be JSON.stringifiable
 */
const useMemoLazy = <T>(value: T): ((v: T) => T) => {
	const prevValue = useRef(value);
	/**
	 * The callback will return new value only if its string value has changed
	 */
	return useCallback((newValue: T): T => {
		const prevStr = JSON.stringify(prevValue.current);
		const newStr = JSON.stringify(newValue);
		// if the string value of new and old value is same,
		if (prevStr === newStr) {
			// return the existing value
			return prevValue.current;
		}
		// otherwise update the existing value
		prevValue.current = newValue;
		// and return it
		return newValue;
	}, []);
};

export default useMemoLazy;
