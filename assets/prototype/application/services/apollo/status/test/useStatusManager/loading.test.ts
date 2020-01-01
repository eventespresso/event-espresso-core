import { renderHook, act } from '@testing-library/react-hooks';

import { TypeName } from '../../types';
import useStatusManager from '../../useStatusManager';

describe('StatusManager.loading', () => {
	it('returns false for `loading` by default', () => {
		const { result } = renderHook(() => useStatusManager());

		for (const type in TypeName) {
			const isLoading = result.current.isLoading(TypeName[type]);

			expect(isLoading).toBe(false);
		}
	});

	it('returns true for `loading` after setting it via setIsLoading', () => {
		const { result } = renderHook(() => useStatusManager());

		act(() => {
			result.current.setIsLoading(TypeName.datetimes, true);
		});

		for (const type in TypeName) {
			const expectedValue = TypeName[type] === TypeName.datetimes;
			const isLoading = result.current.isLoading(TypeName[type]);

			expect(isLoading).toBe(expectedValue);
		}
	});

	it('returns false for `loading` after setting it via setIsLoading', () => {
		const { result } = renderHook(() => useStatusManager());

		act(() => {
			result.current.setIsLoading(TypeName.tickets, true);
		});

		for (const type in TypeName) {
			const expectedValue = TypeName[type] === TypeName.tickets;
			const isLoading = result.current.isLoading(TypeName[type]);

			expect(isLoading).toBe(expectedValue);
		}

		act(() => {
			result.current.setIsLoading(TypeName.tickets, false);
		});

		for (const type in TypeName) {
			const isLoading = result.current.isLoading(TypeName[type]);

			expect(isLoading).toBe(false);
		}
	});
});
