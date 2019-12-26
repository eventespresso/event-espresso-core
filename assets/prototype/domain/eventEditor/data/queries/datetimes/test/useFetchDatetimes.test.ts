import { renderHook } from '@testing-library/react-hooks';

import useFetchDatetimes from '../useFetchDatetimes';
import contextWrapper from './contextWrapper';
import { successMocks, errorMocks, setup, cleanup, nodes } from './data';

beforeEach(setup);

afterEach(cleanup);

describe('useFetchDatetimes()', () => {
	it('checks for the error state', async () => {
		const { result, waitForNextUpdate } = renderHook(() => useFetchDatetimes(), {
			wrapper: contextWrapper(errorMocks),
		});

		await waitForNextUpdate(); // wait for response

		// await waitForNextUpdate(); // wait for response
		expect(result.current.error).toBeDefined();
	});

	it('checks for the loading state', async () => {
		const { result, waitForNextUpdate } = renderHook(() => useFetchDatetimes(), {
			wrapper: contextWrapper(successMocks),
		});

		expect(result.current.loading).toBe(true);

		await waitForNextUpdate(); // wait for response
		expect(result.current.loading).toBe(false);
	});

	it('checks for the response data', async () => {
		const { result } = renderHook(() => useFetchDatetimes(), {
			wrapper: contextWrapper(successMocks),
		});

		// Data is already written above
		expect(result.current.data).toBeDefined();
		expect(result.current.error).toBeUndefined();
	});

	it('checks for the entries in response data', async () => {
		const { result } = renderHook(() => useFetchDatetimes(), {
			wrapper: contextWrapper(successMocks),
		});

		expect(result.current.data).toHaveProperty('espressoDatetimes');

		// has nodes
		expect(result.current.data.espressoDatetimes).toHaveProperty('nodes');

		// nodes is an array with `length` property
		expect(result.current.data.espressoDatetimes.nodes).toHaveProperty('length');

		// `nodes` length is positive
		expect(result.current.data.espressoDatetimes.nodes.length).toEqual(nodes.length);

		// nodes from cache are same as written to cache
		expect(result.current.data.espressoDatetimes.nodes).toEqual(nodes);

		// the id of first entity is same
		expect(result.current.data.espressoDatetimes.nodes[0].id).toEqual(nodes[0].id);
	});
});
