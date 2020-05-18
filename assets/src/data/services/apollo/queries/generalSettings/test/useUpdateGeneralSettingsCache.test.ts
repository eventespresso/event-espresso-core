import { useApolloClient } from '@apollo/react-hooks';
import { renderHook, act } from '@testing-library/react-hooks';

import useCacheRehydration from '@edtrServices/apollo/initialization/useCacheRehydration';
import { ApolloMockedProvider } from '@edtrServices/context/TestContext';
import useUpdateGeneralSettingsCache from '../useUpdateGeneralSettingsCache';
import { useGeneralSettings } from '..';
import { request } from './data';

const timeout = 5000; // milliseconds
describe('useUpdateGeneralSettingsCache', () => {
	it('checks for generalSettings cache update', async () => {
		const wrapper = ApolloMockedProvider();
		const { result, waitForNextUpdate } = renderHook(
			() => {
				useCacheRehydration();
				return {
					generalSettings: useGeneralSettings(),
					cacheUpdater: useUpdateGeneralSettingsCache(),
					client: useApolloClient(),
				};
			},
			{
				wrapper,
			}
		);

		const generalSettings = result.current.generalSettings;

		const updatedSettings = {
			...generalSettings,
			dateFormat: generalSettings.dateFormat + '-i',
			timeFormat: generalSettings.timeFormat + '-s',
		};

		act(() => {
			result.current.cacheUpdater({
				...request,
				data: {
					generalSettings: updatedSettings,
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
				return useGeneralSettings();
			},
			{
				wrapper,
			}
		);

		const cachedGeneralSettings = cacheResult.current;

		expect(cachedGeneralSettings.timeFormat).toBe(updatedSettings.timeFormat);

		expect(cachedGeneralSettings.dateFormat).toBe(updatedSettings.dateFormat);
	});
});
