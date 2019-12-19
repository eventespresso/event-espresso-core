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
		if (isMounted.current && typeof func === 'function') {
			func();
		}
	}, []);

	return ifMounted;
};

export default useIfMounted;
