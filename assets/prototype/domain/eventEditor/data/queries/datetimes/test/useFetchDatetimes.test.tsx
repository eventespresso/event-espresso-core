import { renderHook } from '@testing-library/react-hooks';

import useFetchDatetimes from '../useFetchDatetimes';
import contextWrapper from './contextWrapper';
import { successMocks, errorMocks, setup, cleanup, nodes } from './data';

beforeEach(setup);

afterEach(cleanup);

describe('useFetchDatetimes()', () => {
	it('checks for the loading state', async () => {
		const { result, waitForNextUpdate } = renderHook(() => useFetchDatetimes(), {
			wrapper: contextWrapper(successMocks),
		});

		expect(result.current.loading).toBe(true);

		await waitForNextUpdate(); // wait for response
		expect(result.current.loading).toBe(false);
	});

	it('checks for the response data', async () => {
		const { result, waitForNextUpdate } = renderHook(() => useFetchDatetimes(), {
			wrapper: contextWrapper(successMocks),
		});

		expect(result.current.data).toBeUndefined();
		expect(result.current.error).toBeUndefined();

		await waitForNextUpdate(); // wait for response
		expect(result.current.data).toBeDefined();
		expect(result.current.error).toBeUndefined();
	});

	it('checks for the entries in response data', async () => {
		const { result, waitForNextUpdate } = renderHook(() => useFetchDatetimes(), {
			wrapper: contextWrapper(successMocks),
		});

		await waitForNextUpdate(); // wait for response

		expect(result.current.data).toHaveProperty('espressoDatetimes');

		expect(result.current.data.espressoDatetimes).toHaveProperty('nodes');

		expect(result.current.data.espressoDatetimes.nodes).toEqual(nodes);

		expect(result.current.data.espressoDatetimes.nodes[0].id).toEqual(nodes[0].id);
	});

	it('checks for the error state', async () => {
		const { result, waitForNextUpdate } = renderHook(() => useFetchDatetimes(), {
			wrapper: contextWrapper(errorMocks),
		});

		expect(result.current.data).toBeUndefined();
		expect(result.current.error).toBeUndefined();

		await waitForNextUpdate(); // wait for response
		expect(result.current.data).toBeUndefined();
		expect(result.current.error).toBeDefined();
	});
});
