import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import useDatetimeContext from '../useDatetimeContext';
import { DatetimeProvider } from '../../services/context/DatetimeContext';

describe('useDatetimeContext', () => {
	it('checks for empty id when used outside the context', () => {
		const { result } = renderHook(() => useDatetimeContext());

		expect(result.error).toBeUndefined();
		expect(result.current).toBeDefined();
		expect(result.current).toHaveProperty('id');
		expect(result.current.id).toBe('');
	});

	it('checks for the returned context and its data', async () => {
		const id = 'fake-id';
		const wrapper: React.FC<any> = ({ children }): JSX.Element => (
			<DatetimeProvider id={id}>{children}</DatetimeProvider>
		);
		const { result } = renderHook(
			() => {
				return useDatetimeContext();
			},
			{ wrapper }
		);

		expect(result.current).toBeDefined();
		expect(result.current).toHaveProperty('id');
		expect(result.current.id).toEqual(id);
	});
});
