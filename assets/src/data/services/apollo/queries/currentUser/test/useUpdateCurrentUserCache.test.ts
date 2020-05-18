import { useApolloClient } from '@apollo/react-hooks';
import { renderHook, act } from '@testing-library/react-hooks';

import useCacheRehydration from '@edtrServices/apollo/initialization/useCacheRehydration';
import { ApolloMockedProvider } from '@edtrServices/context/TestContext';
import useUpdateCurrentUserCache from '../useUpdateCurrentUserCache';
import { useCurrentUser } from '..';
import { request } from './data';

const timeout = 5000; // milliseconds
describe('useUpdateCurrentUserCache', () => {
	it('checks for currentUser cache update', async () => {
		const wrapper = ApolloMockedProvider();
		const { result, waitForNextUpdate } = renderHook(
			() => {
				useCacheRehydration();
				return {
					currentUser: useCurrentUser(),
					cacheUpdater: useUpdateCurrentUserCache(),
					client: useApolloClient(),
				};
			},
			{
				wrapper,
			}
		);

		const currentUser = result.current.currentUser;
		const updatedUser = {
			...currentUser,
			id: currentUser.id + '-alpha',
			name: currentUser.name + '-alpha',
		};

		act(() => {
			result.current.cacheUpdater({
				...request,
				data: {
					viewer: updatedUser,
				},
			});
		});
		await waitForNextUpdate({ timeout });

		const cache = result.current.client.extract();
		const { result: cacheResult } = renderHook(
			() => {
				const client = useApolloClient();
				// restore the cache from previous render
				client.restore(cache);
				return useCurrentUser();
			},
			{
				wrapper,
			}
		);

		const cachedCurrentUser = cacheResult.current;

		expect(cachedCurrentUser.id).toBe(updatedUser.id);

		expect(cachedCurrentUser.name).toBe(updatedUser.name);
	});
});
