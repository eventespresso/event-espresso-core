import { useRef, useEffect, useCallback } from '@wordpress/element';

type Fn = () => void;

const useIfMounted = (): Fn => {
	const isMounted = useRef(true);
	useEffect(
		() => () => {
			isMounted.current = false;
		},
		[]
	);

	const ifMounted: Fn = useCallback((func: Fn) => {
		if (isMounted.current) {
			func();
		}
	}, []);

	return ifMounted;
};

export default useIfMounted;
