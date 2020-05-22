import { useCallback, useMemo, useState } from 'react';

export interface PrevNext {
	current: number;
	goto: (index: number) => void;
	next: VoidFunction;
	prev: VoidFunction;
}

const usePrevNext = (initialIndex = 0): PrevNext => {
	const [currentIndex, setCurrentIndex] = useState(initialIndex);

	const goto = useCallback((index: number) => setCurrentIndex(index), [setCurrentIndex]);

	const next = useCallback<VoidFunction>(() => setCurrentIndex((v) => v + 1), [setCurrentIndex]);

	const prev = useCallback<VoidFunction>(() => setCurrentIndex((v) => v - 1), [setCurrentIndex]);

	return useMemo(() => ({ current: currentIndex, goto, next, prev }), [currentIndex, goto, next, prev]);
};

export default usePrevNext;
