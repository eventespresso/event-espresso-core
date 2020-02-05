import { renderHook } from '@testing-library/react-hooks';

import useMoneyDisplay from '../useMoneyDisplay';
import { mockEeJsData } from '../../../../services/config/test/data';
import { ApolloMockedProvider } from '../../../../../domain/eventEditor/services/context/TestContext';

describe('useMoneyDisplay', () => {
	const wrapper = ApolloMockedProvider();

	it('checks for existence of properties', () => {
		const { result } = renderHook(() => useMoneyDisplay(), { wrapper });

		expect(result.current).toHaveProperty('beforeAmount');
		expect(result.current).toHaveProperty('afterAmount');
		expect(result.current).toHaveProperty('currency');
		expect(result.current).toHaveProperty('formatAmount');
	});

	it('checks for returned properties data', () => {
		const { result } = renderHook(() => useMoneyDisplay(), { wrapper });

		expect(result.current.formatAmount).toBeInstanceOf(Function);

		expect(result.current.currency).toEqual(mockEeJsData.currency_config);
	});
});
