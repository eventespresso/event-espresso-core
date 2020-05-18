import { renderHook } from '@testing-library/react-hooks';

import { useCurrentUser } from '..';
import { ApolloMockedProvider } from '@edtrServices/context/TestContext';
import useCacheRehydration from '@edtrServices/apollo/initialization/useCacheRehydration';
import { currentUser } from './data';

const timeout = 5000; // milliseconds
describe('useCurrentUser', () => {
	const wrapper = ApolloMockedProvider();
	it('checks for the current user when the cache is empty', async () => {
		const { result } = renderHook(() => useCurrentUser(), { wrapper });

		expect(result.current).toBe(undefined);
	});

	it('checks for the current user when the cache is NOT empty', async () => {
		const { result, waitForNextUpdate } = renderHook(
			() => {
				useCacheRehydration();
				return useCurrentUser();
			},
			{ wrapper }
		);
		await waitForNextUpdate({ timeout });

		expect(result.current).toBeDefined();
	});

	it('checks for current user props', async () => {
		const { result, waitForNextUpdate } = renderHook(
			() => {
				useCacheRehydration();
				return useCurrentUser();
			},
			{ wrapper }
		);
		await waitForNextUpdate({ timeout });

		const { current: cachedUser } = result;

		expect(cachedUser).toBeDefined();

		expect(cachedUser.id).toEqual(currentUser.id);

		expect(cachedUser.name).toEqual(currentUser.name);

		expect(cachedUser).toEqual(currentUser);
	});
});
