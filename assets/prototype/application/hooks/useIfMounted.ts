import { useRef, useEffect, useCallback } from 'react';

type Fn = () => void;
type Callback = (func: any) => void;

const useIfMounted = (): Callback => {
	const isMounted = useRef(true);
	useEffect(
		() => () => {
			isMounted.current = false;
		},
		[]
	);

	const ifMounted: Callback = useCallback((func: Fn) => {
		if (isMounted.current) {
			func();
		}
	}, []);

	return ifMounted;
};

export default useIfMounted;
