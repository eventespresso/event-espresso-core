import { renderHook } from '@testing-library/react-hooks';

import { useGeneralSettings } from '..';
import { ApolloMockedProvider } from '@edtrServices/context/TestContext';
import useCacheRehydration from '@edtrServices/apollo/initialization/useCacheRehydration';
import { generalSettings } from './data';

const timeout = 5000; // milliseconds
describe('useGeneralSettings', () => {
	const wrapper = ApolloMockedProvider();
	it('checks for the current user when the cache is empty', () => {
		const { result } = renderHook(() => useGeneralSettings(), { wrapper });

		expect(result.current).toBe(undefined);
	});

	it('checks for the current user when the cache is NOT empty', async () => {
		const { result, waitForNextUpdate } = renderHook(
			() => {
				useCacheRehydration();
				return useGeneralSettings();
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
				return useGeneralSettings();
			},
			{ wrapper }
		);
		await waitForNextUpdate({ timeout });

		const { current: cachedSettings } = result;

		expect(cachedSettings).toBeDefined();

		expect(cachedSettings.dateFormat).toEqual(generalSettings.dateFormat);

		expect(cachedSettings.timeFormat).toEqual(generalSettings.timeFormat);

		expect(cachedSettings).toEqual(generalSettings);
	});
});
