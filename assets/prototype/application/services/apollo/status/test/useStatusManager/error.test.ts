import { renderHook, act } from '@testing-library/react-hooks';

import { TypeName } from '../../types';
import useStatusManager from '../../useStatusManager';

describe('StatusManager.error', () => {
	it('returns false for `error` by default', () => {
		const { result } = renderHook(() => useStatusManager());

		for (const type in TypeName) {
			const isError = result.current.isError(TypeName[type]);

			expect(isError).toBe(false);
		}
	});

	it('returns true for `error` after setting it via setIsError', () => {
		const { result } = renderHook(() => useStatusManager());

		act(() => {
			result.current.setIsError(TypeName.datetimes, true);
		});

		for (const type in TypeName) {
			const expectedValue = TypeName[type] === TypeName.datetimes;
			const isError = result.current.isError(TypeName[type]);

			expect(isError).toBe(expectedValue);
		}
	});

	it('returns false for `error` after setting it via setIsError', () => {
		const { result } = renderHook(() => useStatusManager());

		act(() => {
			result.current.setIsError(TypeName.tickets, true);
		});

		for (const type in TypeName) {
			const expectedValue = TypeName[type] === TypeName.tickets;
			const isError = result.current.isError(TypeName[type]);

			expect(isError).toBe(expectedValue);
		}

		act(() => {
			result.current.setIsError(TypeName.tickets, false);
		});

		for (const type in TypeName) {
			const isError = result.current.isError(TypeName[type]);

			expect(isError).toBe(false);
		}
	});
});
