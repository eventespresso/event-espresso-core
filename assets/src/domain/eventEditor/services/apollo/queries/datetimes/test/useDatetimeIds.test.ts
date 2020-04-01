import { renderHook } from '@testing-library/react-hooks';

import useDatetimeIds from '../useDatetimeIds';
import { ApolloMockedProvider } from '../../../../../services/context/TestContext';
import { nodes } from './data';
import useInitDatetimeTestCache from './useInitDatetimeTestCache';
import { getGuids } from '@appServices/predicates';

const timeout = 5000; // milliseconds
describe('useDatetimeIds()', () => {
	const wrapper = ApolloMockedProvider();
	it('checks for the empty datetime IDs', async () => {
		const { result, waitForValueToChange } = renderHook(() => useDatetimeIds(), { wrapper });

		await waitForValueToChange(() => result.current, { timeout });
		expect(result.current.length).toBe(0);
	});

	it('checks for datetime IDs after the cache is updated', async () => {
		const { result, waitForValueToChange } = renderHook(
			() => {
				useInitDatetimeTestCache();
				return useDatetimeIds();
			},
			{ wrapper }
		);
		await waitForValueToChange(() => result.current, { timeout });

		const { current: cachedDatetimeIds } = result;
		const passedDatetimeIds = getGuids(nodes);

		expect(cachedDatetimeIds.length).toEqual(passedDatetimeIds.length);

		expect(cachedDatetimeIds).toEqual(passedDatetimeIds);

		expect(cachedDatetimeIds).toEqual(expect.arrayContaining(passedDatetimeIds));
	});
});
