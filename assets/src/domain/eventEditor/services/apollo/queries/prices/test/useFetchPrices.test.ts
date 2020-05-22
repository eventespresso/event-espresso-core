import { renderHook } from '@testing-library/react-hooks';

import useFetchPrices from '../useFetchPrices';
import usePriceQueryOptions from '../usePriceQueryOptions';
import { ApolloMockedProvider } from '../../../../../services/context/TestContext';
import { successMocks, errorMocks, nodes } from './data';
import useInitTicketTestCache from '../../tickets/test/useInitTicketTestCache';

const timeout = 5000; // milliseconds
describe('useFetchPrices', () => {
	it('checks for the error state', async () => {
		/* Set query options and the wrapper */
		const { result: queryResult, waitForNextUpdate: waitForUpdate } = renderHook(
			() => {
				useInitTicketTestCache();
				return usePriceQueryOptions();
			},
			{
				wrapper: ApolloMockedProvider(),
			}
		);
		await waitForUpdate({ timeout });
		const wrapper = ApolloMockedProvider(errorMocks.map((mock) => ({ ...mock, request: queryResult.current })));
		/* Set query options and the wrapper */

		const { result, waitForNextUpdate } = renderHook(
			() => {
				return useFetchPrices(false);
			},
			{
				wrapper,
			}
		);

		expect(result.current.error).toBeUndefined();
		expect(result.current.data).toBeUndefined();

		await waitForNextUpdate({ timeout }); // wait for response

		expect(result.current.error).toBeDefined();
		expect(result.current.data).toBeUndefined();
	});

	it('checks for the loading state', async () => {
		/* Set query options and the wrapper */
		const { result: queryResult, waitForNextUpdate: waitForUpdate } = renderHook(
			() => {
				useInitTicketTestCache();
				return usePriceQueryOptions();
			},
			{
				wrapper: ApolloMockedProvider(),
			}
		);
		await waitForUpdate({ timeout });
		const wrapper = ApolloMockedProvider(successMocks.map((mock) => ({ ...mock, request: queryResult.current })));
		/* Set query options and the wrapper */

		const { result, waitForNextUpdate } = renderHook(
			() => {
				useInitTicketTestCache();
				return useFetchPrices(false);
			},
			{
				wrapper,
			}
		);

		expect(result.current.loading).toBe(true);

		await waitForNextUpdate({ timeout }); // wait for response
		expect(result.current.loading).toBe(false);
	});

	it('checks for the response data', async () => {
		/* Set query options and the wrapper */
		const { result: queryResult, waitForNextUpdate: waitforUpdate } = renderHook(
			() => {
				useInitTicketTestCache();
				return usePriceQueryOptions();
			},
			{
				wrapper: ApolloMockedProvider(),
			}
		);
		await waitforUpdate({ timeout });
		const wrapper = ApolloMockedProvider(successMocks.map((mock) => ({ ...mock, request: queryResult.current })));
		/* Set query options and the wrapper */

		const { result, waitForNextUpdate } = renderHook(
			() => {
				useInitTicketTestCache();
				return useFetchPrices(false);
			},
			{
				wrapper,
			}
		);

		expect(result.current.data).toBeUndefined();
		expect(result.current.error).toBeUndefined();

		await waitForNextUpdate({ timeout }); // wait for response

		expect(result.current.data).toBeDefined();
		expect(result.current.error).toBeUndefined();
	});

	it('checks for the entries in response data', async () => {
		/* Set query options and the wrapper */
		const { result: queryResult, waitForNextUpdate: waitForUpdate } = renderHook(
			() => {
				useInitTicketTestCache();
				return usePriceQueryOptions();
			},
			{
				wrapper: ApolloMockedProvider(),
			}
		);
		await waitForUpdate({ timeout });
		const wrapper = ApolloMockedProvider(successMocks.map((mock) => ({ ...mock, request: queryResult.current })));
		/* Set query options and the wrapper */

		const { result, waitForNextUpdate } = renderHook(
			() => {
				useInitTicketTestCache();
				return useFetchPrices(false);
			},
			{
				wrapper,
			}
		);

		await waitForNextUpdate({ timeout }); // wait for response

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
