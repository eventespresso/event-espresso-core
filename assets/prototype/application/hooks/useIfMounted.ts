import { useRef, useEffect, useCallback } from '@wordpress/element';

const useIfMounted = () => {
	const isMounted = useRef(true);
	useEffect(
		() => () => {
			isMounted.current = false;
		},
		[]
	);

	const ifMounted = useCallback((func) => {
		if (isMounted.current && func) {
			func();
		}
	}, []);

	return ifMounted;
};
