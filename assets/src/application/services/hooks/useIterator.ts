import { useCallback, useMemo, useState } from 'react';

export interface Iterator {
	current: number;
	next: VoidFunction;
	prev: VoidFunction;
}

const useIterator = (initialIndex = 0): Iterator => {
	const [currentIndex, setCurrentIndex] = useState(initialIndex);

	const next = useCallback<VoidFunction>(() => setCurrentIndex((v) => v + 1), [setCurrentIndex]);

	const prev = useCallback<VoidFunction>(() => setCurrentIndex((v) => v - 1), [setCurrentIndex]);

	return useMemo(() => ({ current: currentIndex, next, prev }), [currentIndex, next, prev]);
};

export default useIterator;
