import { useState } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import useIfMounted from '../useIfMounted';

describe('useIfMounted', () => {
	const useCounter = (updateOnlyIfMounted = true): any => {
		const [count, setCount] = useState(0);
		const ifMounted = useIfMounted();

		const updateCount = (): void => setCount((x) => x + 1);
		const increment = (): void => {
			// whether we should use ifMounted()
			if (updateOnlyIfMounted) {
				ifMounted(updateCount);
			} else {
				updateCount();
			}
		};

		return { count, increment };
	};

	it('updates state via ifMounted without unmounting', () => {
		const { result } = renderHook(() => useCounter());

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		// value will have changed
		expect(result.current.count).toBe(1);
	});

	it('updates state via ifMounted after unmount', () => {
		const { result, unmount } = renderHook(() => useCounter());

		expect(result.current.count).toBe(0);

		unmount();

		// We won't see any console error now
		act(() => {
			result.current.increment();
		});

		// value won't have changed
		expect(result.current.count).toBe(0);
	});

	it('updates state without ifMounted and without unmount', () => {
		const { result } = renderHook(() => useCounter(false));

		expect(result.current.count).toBe(0);

		act(() => {
			result.current.increment();
		});

		// value will have changed
		expect(result.current.count).toBe(1);
	});

	it('should throw an error if state is updated without ifMounted after unmount', () => {
		const { result, unmount } = renderHook(() => useCounter(false));

		expect(result.current.count).toBe(0);

		unmount();

		// Since the it's unmounted, it will result in console error
		const consoleSpy = jest.spyOn(console, 'error').mockImplementation(result.current.increment);

		act(() => {
			result.current.increment();
		});

		expect(consoleSpy).toHaveBeenCalled();
		// value won't have changed
		expect(result.current.count).toBe(0);
	});
});
