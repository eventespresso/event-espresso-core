import { renderHook } from '@testing-library/react-hooks';

import { useGeneralSettings } from '../';
import { ApolloMockedProvider } from '../../../../../eventEditor/context';
import useCacheRehydration from '../../../../../eventEditor/data/initialization/useCacheRehydration';
import { generalSettings } from './data';

describe('useGeneralSettings', () => {
	const wrapper = ApolloMockedProvider();
	it('checks for the current user when the cache is empty', () => {
		const { result } = renderHook(() => useGeneralSettings(), { wrapper });

		expect(result.current).toBe(null);
	});

	it('checks for the current user when the cache is NOT empty', () => {
		const { result } = renderHook(
			() => {
				useCacheRehydration();
				return useGeneralSettings();
			},
			{ wrapper }
		);

		expect(result.current).toBeDefined();
	});

	it('checks for current user props', () => {
		const { result } = renderHook(
			() => {
				useCacheRehydration();
				return useGeneralSettings();
			},
			{ wrapper }
		);

		const { current: cachedSettings } = result;

		expect(cachedSettings).toBeDefined();

		expect(cachedSettings.dateFormat).toEqual(generalSettings.dateFormat);

		expect(cachedSettings.timeFormat).toEqual(generalSettings.timeFormat);

		expect(cachedSettings).toEqual(generalSettings);
	});
});
