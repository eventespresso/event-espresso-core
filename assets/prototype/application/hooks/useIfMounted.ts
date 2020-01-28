import { useRef, useEffect, useCallback } from 'react';

type Fn = () => void;
type Callback = (func: Fn) => void;

const useIfMounted = (): Callback => {
	const isMounted = useRef(true);
	useEffect(() => {
		return (): void => {
			isMounted.current = false;
		};
	}, []);

	const ifMounted = useCallback<Callback>((func) => {
		if (isMounted.current) {
			func();
		}
	}, []);

	return ifMounted;
};

export default useIfMounted;
