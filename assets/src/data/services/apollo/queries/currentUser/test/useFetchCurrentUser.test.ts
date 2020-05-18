import { renderHook } from '@testing-library/react-hooks';

import useFetchCurrentUser from '../useFetchCurrentUser';
import { ApolloMockedProvider } from '@edtrServices/context/TestContext';
import { successMocks, errorMocks, currentUser } from './data';

const timeout = 5000; // milliseconds
describe('useFetchCurrentUser', () => {
	it('checks for the error state', async () => {
		const wrapper = ApolloMockedProvider(errorMocks);

		const { result, waitForNextUpdate } = renderHook(() => useFetchCurrentUser(), {
			wrapper,
		});

		expect(result.current.error).toBeUndefined();
		expect(result.current.data).toBeUndefined();

		await waitForNextUpdate({ timeout }); // wait for response

		expect(result.current.error).toBeDefined();
		expect(result.current.data).toBeUndefined();
	});

	it('checks for the loading state', async () => {
		const wrapper = ApolloMockedProvider(successMocks);

		const { result, waitForNextUpdate } = renderHook(() => useFetchCurrentUser(), {
			wrapper,
		});

		expect(result.current.loading).toBe(true);

		await waitForNextUpdate({ timeout }); // wait for response

		expect(result.current.loading).toBe(false);
	});

	it('checks for the response data', async () => {
		const wrapper = ApolloMockedProvider(successMocks);

		const { result, waitForNextUpdate } = renderHook(() => useFetchCurrentUser(), {
			wrapper,
		});

		expect(result.current.error).toBeUndefined();
		expect(result.current.data).toBeUndefined();

		await waitForNextUpdate({ timeout }); // wait for response

		// Data is already written above
		expect(result.current.data).toBeDefined();
		expect(result.current.error).toBeUndefined();
	});

	it('checks for the entries in response data', async () => {
		const wrapper = ApolloMockedProvider(successMocks);

		const { result, waitForNextUpdate } = renderHook(() => useFetchCurrentUser(), {
			wrapper,
		});

		await waitForNextUpdate({ timeout }); // wait for response

		expect(result.current.data).toHaveProperty('viewer');

		expect(result.current.data.viewer).toHaveProperty('id');

		expect(result.current.data.viewer).toHaveProperty('name');

		expect(result.current.data.viewer.id).toBe(currentUser.id);

		expect(result.current.data.viewer.email).toBe(currentUser.email);
	});
});
