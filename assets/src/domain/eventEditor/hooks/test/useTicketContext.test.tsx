import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import useTicketContext from '../useTicketContext';
import TicketProvider from '../../context/TicketContext';

describe('useTicketContext', () => {
	it('checks for error when used outside the context', () => {
		const { result } = renderHook(() => useTicketContext());

		expect(result.error).toBeUndefined();
		expect(result.current).toBeDefined();
		expect(result.current).toHaveProperty('id');
		expect(result.current.id).toBe('');
	});

	it('checks for the returned context and is data', async () => {
		const id = 'fake-id';
		const wrapper: React.FC<any> = ({ children }): JSX.Element => (
			<TicketProvider id={id}>{children}</TicketProvider>
		);
		const { result } = renderHook(
			() => {
				return useTicketContext();
			},
			{ wrapper }
		);

		expect(result.current).toBeDefined();
		expect(result.current).toHaveProperty('id');
		expect(result.current.id).toEqual(id);
	});
});
