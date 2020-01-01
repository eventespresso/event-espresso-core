import { renderHook, act } from '@testing-library/react-hooks';

import { TypeName } from '../../types';
import useStatusManager from '../../useStatusManager';

describe('StatusManager.loaded', () => {
	it('returns false for `loaded` by default', () => {
		const { result } = renderHook(() => useStatusManager());

		for (const type in TypeName) {
			const isLoaded = result.current.isLoaded(TypeName[type]);

			expect(isLoaded).toBe(false);
		}
	});

	it('returns true for `loaded` after setting it via setIsLoaded', () => {
		const { result } = renderHook(() => useStatusManager());

		act(() => {
			result.current.setIsLoaded(TypeName.datetimes, true);
		});

		for (const type in TypeName) {
			const expectedValue = TypeName[type] === TypeName.datetimes;
			const isLoaded = result.current.isLoaded(TypeName[type]);

			expect(isLoaded).toBe(expectedValue);
		}
	});

	it('returns false for `loaded` after setting it via setIsLoaded', () => {
		const { result } = renderHook(() => useStatusManager());

		act(() => {
			result.current.setIsLoaded(TypeName.tickets, true);
		});

		for (const type in TypeName) {
			const expectedValue = TypeName[type] === TypeName.tickets;
			const isLoaded = result.current.isLoaded(TypeName[type]);

			expect(isLoaded).toBe(expectedValue);
		}

		act(() => {
			result.current.setIsLoaded(TypeName.tickets, false);
		});

		for (const type in TypeName) {
			const isLoaded = result.current.isLoaded(TypeName[type]);

			expect(isLoaded).toBe(false);
		}
	});
});
