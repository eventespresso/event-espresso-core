import { useCallback, useMemo, useState } from 'react';

export interface PrevNext {
	current: number;
	next: VoidFunction;
	prev: VoidFunction;
}

const usePrevNext = (initialIndex = 0): PrevNext => {
	const [currentIndex, setCurrentIndex] = useState(initialIndex);

	const next = useCallback<VoidFunction>(() => setCurrentIndex((v) => v + 1), [setCurrentIndex]);

	const prev = useCallback<VoidFunction>(() => setCurrentIndex((v) => v - 1), [setCurrentIndex]);

	return useMemo(() => ({ current: currentIndex, next, prev }), [currentIndex, next, prev]);
};

export default usePrevNext;
