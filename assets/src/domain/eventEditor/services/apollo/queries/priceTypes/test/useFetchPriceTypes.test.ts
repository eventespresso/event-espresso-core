import { renderHook } from '@testing-library/react-hooks';

import useFetchPriceTypes from '../useFetchPriceTypes';
import usePriceTypeQueryOptions from '../usePriceTypeQueryOptions';
import { ApolloMockedProvider } from '../../../../../services/context/TestContext';
import { successMocks, errorMocks, nodes } from './data';

const timeout = 5000; // milliseconds
describe('useFetchPriceTypes()', () => {
	it('checks for the loading state', async () => {
		/* Set query options and the wrapper */
		const {
			result: { current: request },
		} = renderHook(() => usePriceTypeQueryOptions(), {
			wrapper: ApolloMockedProvider(),
		});
		const wrapper = ApolloMockedProvider(successMocks.map((mock) => ({ ...mock, request })));
		/* Set query options and the wrapper */

		const { result, waitForNextUpdate } = renderHook(() => useFetchPriceTypes(), {
			wrapper,
		});

		expect(result.current.loading).toBe(true);

		await waitForNextUpdate({ timeout }); // wait for response

		expect(result.current.loading).toBe(false);
	});

	it('checks for the response data', async () => {
		/* Set query options and the wrapper */
		const {
			result: { current: request },
		} = renderHook(() => usePriceTypeQueryOptions(), {
			wrapper: ApolloMockedProvider(),
		});
		const wrapper = ApolloMockedProvider(successMocks.map((mock) => ({ ...mock, request })));
		/* Set query options and the wrapper */

		const { result, waitForNextUpdate } = renderHook(() => useFetchPriceTypes(), {
			wrapper,
		});

		expect(result.current.data).toBeUndefined();
		expect(result.current.error).toBeUndefined();

		await waitForNextUpdate({ timeout }); // wait for response

		expect(result.current.data).toBeDefined();
		expect(result.current.error).toBeUndefined();
	});

	it('checks for the entries in response data', async () => {
		/* Set query options and the wrapper */
		const {
			result: { current: request },
		} = renderHook(() => usePriceTypeQueryOptions(), {
			wrapper: ApolloMockedProvider(),
		});
		const wrapper = ApolloMockedProvider(successMocks.map((mock) => ({ ...mock, request })));
		/* Set query options and the wrapper */

		const { result, waitForNextUpdate } = renderHook(() => useFetchPriceTypes(), {
			wrapper,
		});

		await waitForNextUpdate({ timeout }); // wait for response

		expect(result.current.data).toHaveProperty('espressoPriceTypes');

		// has nodes
		expect(result.current.data.espressoPriceTypes).toHaveProperty('nodes');

		// nodes is an array with `length` property
		expect(result.current.data.espressoPriceTypes.nodes).toHaveProperty('length');

		// `nodes` length is positive
		expect(result.current.data.espressoPriceTypes.nodes.length).toEqual(nodes.length);

		// nodes from cache are same as written to cache
		expect(result.current.data.espressoPriceTypes.nodes).toEqual(nodes);

		// the id of first entity is same
		expect(result.current.data.espressoPriceTypes.nodes[0].id).toEqual(nodes[0].id);
	});

	it('checks for the error state', async () => {
		/* Set query options and the wrapper */
		const {
			result: { current: request },
		} = renderHook(() => usePriceTypeQueryOptions(), {
			wrapper: ApolloMockedProvider(),
		});
		const wrapper = ApolloMockedProvider(errorMocks.map((mock) => ({ ...mock, request })));
		/* Set query options and the wrapper */

		const { result, waitForNextUpdate } = renderHook(() => useFetchPriceTypes(), {
			wrapper,
		});

		expect(result.current.data).toBeUndefined();
		expect(result.current.error).toBeUndefined();

		await waitForNextUpdate({ timeout }); // wait for response

		expect(result.current.data).toBeUndefined();
		expect(result.current.error).toBeDefined();
	});
});
