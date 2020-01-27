import { renderHook } from '@testing-library/react-hooks';

import { useCurrentUser } from '../';
import { ApolloMockedProvider } from '../.../../../../../../eventEditor/context/TestContext';
import useCacheRehydration from '../../../../../eventEditor/data/initialization/useCacheRehydration';
import { currentUser } from './data';

describe('useCurrentUser', () => {
	const wrapper = ApolloMockedProvider();
	it('checks for the current user when the cache is empty', () => {
		const { result } = renderHook(() => useCurrentUser(), { wrapper });

		expect(result.current).toBe(null);
	});

	it('checks for the current user when the cache is NOT empty', () => {
		const { result } = renderHook(
			() => {
				useCacheRehydration();
				return useCurrentUser();
			},
			{ wrapper }
		);

		expect(result.current).toBeDefined();
	});

	it('checks for current user props', () => {
		const { result } = renderHook(
			() => {
				useCacheRehydration();
				return useCurrentUser();
			},
			{ wrapper }
		);

		const { current: cachedUser } = result;

		expect(cachedUser).toBeDefined();

		expect(cachedUser.id).toEqual(currentUser.id);

		expect(cachedUser.name).toEqual(currentUser.name);

		expect(cachedUser).toEqual(currentUser);
	});
});
