import { renderHook } from '@testing-library/react-hooks';

import usePriceTypes from '../usePriceTypes';
import { ApolloMockedProvider } from '../../../../context/TestContext';
import { nodes } from './data';
import useInitPriceTypeTestCache from './useInitPriceTypeTestCache';

describe('usePriceTypes()', () => {
	const wrapper = ApolloMockedProvider();
	it('checks for the empty price types', () => {
		const { result } = renderHook(() => usePriceTypes(), { wrapper });

		expect(result.current.length).toBe(0);
	});

	it('checks for the updated price types cache', () => {
		const { result } = renderHook(
			() => {
				useInitPriceTypeTestCache();
				return usePriceTypes();
			},
			{ wrapper }
		);

		const { current: cachedPriceTypes } = result;

		expect(cachedPriceTypes).toEqual(nodes);

		expect(cachedPriceTypes.length).toEqual(nodes.length);

		expect(cachedPriceTypes[0].id).toEqual(nodes[0].id);

		expect(cachedPriceTypes[0].baseType).toEqual(nodes[0].baseType);
	});
});
