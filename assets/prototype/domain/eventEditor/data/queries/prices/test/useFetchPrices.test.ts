import { renderHook } from '@testing-library/react-hooks';

import useFetchPrices from '../useFetchPrices';
import usePriceQueryOptions from '../usePriceQueryOptions';
import { ApolloMockedProvider } from '../../../../context';
import { successMocks, errorMocks, nodes } from './data';
import useInitTicketTestCache from '../../tickets/test/useInitTicketTestCache';

describe('useFetchPrices()', () => {
	it('checks for the error state', async () => {
		/* Set query options and the wrapper */
		const {
			result: { current: request },
		} = renderHook(
			() => {
				useInitTicketTestCache();
				return usePriceQueryOptions();
			},
			{
				wrapper: ApolloMockedProvider(),
			}
		);
		const wrapper = ApolloMockedProvider(errorMocks.map((mock) => ({ ...mock, request })));
		/* Set query options and the wrapper */

		const { result, waitForNextUpdate } = renderHook(
			() => {
				useInitTicketTestCache();
				return useFetchPrices();
			},
			{
				wrapper,
			}
		);

		await waitForNextUpdate(); // wait for response

		expect(result.current.error).toBeDefined();
	});

	it('checks for the loading state', async () => {
		/* Set query options and the wrapper */
		const {
			result: { current: request },
		} = renderHook(
			() => {
				useInitTicketTestCache();
				return usePriceQueryOptions();
			},
			{
				wrapper: ApolloMockedProvider(),
			}
		);
		const wrapper = ApolloMockedProvider(successMocks.map((mock) => ({ ...mock, request })));
		/* Set query options and the wrapper */

		const { result, waitForNextUpdate } = renderHook(
			() => {
				useInitTicketTestCache();
				return useFetchPrices();
			},
			{
				wrapper,
			}
		);

		expect(result.current.loading).toBe(true);

		await waitForNextUpdate(); // wait for response
		expect(result.current.loading).toBe(false);
	});

	it('checks for the response data', async () => {
		/* Set query options and the wrapper */
		const {
			result: { current: request },
		} = renderHook(
			() => {
				useInitTicketTestCache();
				return usePriceQueryOptions();
			},
			{
				wrapper: ApolloMockedProvider(),
			}
		);
		const wrapper = ApolloMockedProvider(successMocks.map((mock) => ({ ...mock, request })));
		/* Set query options and the wrapper */

		const { result } = renderHook(
			() => {
				useInitTicketTestCache();
				return useFetchPrices();
			},
			{
				wrapper,
			}
		);

		// Data is already written above
		expect(result.current.data).toBeDefined();
		expect(result.current.error).toBeUndefined();
	});

	it('checks for the entries in response data', async () => {
		/* Set query options and the wrapper */
		const {
			result: { current: request },
		} = renderHook(
			() => {
				useInitTicketTestCache();
				return usePriceQueryOptions();
			},
			{
				wrapper: ApolloMockedProvider(),
			}
		);
		const wrapper = ApolloMockedProvider(successMocks.map((mock) => ({ ...mock, request })));
		/* Set query options and the wrapper */

		const { result } = renderHook(
			() => {
				useInitTicketTestCache();
				return useFetchPrices();
			},
			{
				wrapper,
			}
		);

		expect(result.current.data).toHaveProperty('espressoPrices');

		// has nodes
		expect(result.current.data.espressoPrices).toHaveProperty('nodes');

		// nodes is an array with `length` property
		expect(result.current.data.espressoPrices.nodes).toHaveProperty('length');

		// `nodes` length is positive
		expect(result.current.data.espressoPrices.nodes.length).toEqual(nodes.length);

		// nodes from cache are same as written to cache
		expect(result.current.data.espressoPrices.nodes).toEqual(nodes);

		// the id of first entity is same
		expect(result.current.data.espressoPrices.nodes[0].id).toEqual(nodes[0].id);
	});
});
