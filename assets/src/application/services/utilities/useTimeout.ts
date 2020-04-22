import * as React from 'react';

/**
 * @link https://github.com/bmcmahen/toasted-notes/blob/master/src/Alert/useTimeout.ts
 */
const useTimeout = (callback: VoidFunction, delay: number | null): void => {
	const savedCallback = React.useRef<VoidFunction | null>();

	// Remember the latest callback.
	React.useEffect((): void => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	React.useEffect(() => {
		const tick = (): void => {
			if (savedCallback.current) {
				savedCallback.current();
			}
		};
		if (delay !== null) {
			const id = setTimeout(tick, delay);
			return (): void => clearTimeout(id);
		}
	}, [delay]);
};

export default useTimeout;
