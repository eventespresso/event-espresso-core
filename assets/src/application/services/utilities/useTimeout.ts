import { useEffect, useRef } from 'react';

/**
 * @link https://github.com/bmcmahen/toasted-notes/blob/master/src/Alert/useTimeout.ts
 */
const useTimeout = (callback: VoidFunction, delay: number | null): void => {
	const savedCallback = useRef<VoidFunction | null>();

	// Remember the latest callback.
	useEffect((): void => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
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
