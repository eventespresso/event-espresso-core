import { renderHook } from '@testing-library/react-hooks';

import useFetchGeneralSettings from '../useFetchGeneralSettings';
import { ApolloMockedProvider } from '../../../../../eventEditor/context/TestContext';
import { successMocks, errorMocks, generalSettings } from './data';

describe('useFetchGeneralSettings', () => {
	it('checks for the error state', async () => {
		const wrapper = ApolloMockedProvider(errorMocks);

		const { result, waitForNextUpdate } = renderHook(() => useFetchGeneralSettings(), {
			wrapper,
		});

		expect(result.current.error).toBeUndefined();
		expect(result.current.data).toBeUndefined();

		await waitForNextUpdate(); // wait for response

		expect(result.current.error).toBeDefined();
		expect(result.current.data).toBeUndefined();
	});

	it('checks for the loading state', async () => {
		const wrapper = ApolloMockedProvider(successMocks);

		const { result, waitForNextUpdate } = renderHook(() => useFetchGeneralSettings(), {
			wrapper,
		});

		expect(result.current.loading).toBe(true);

		await waitForNextUpdate(); // wait for response

		expect(result.current.loading).toBe(false);
	});

	it('checks for the response data', async () => {
		const wrapper = ApolloMockedProvider(successMocks);

		const { result, waitForNextUpdate } = renderHook(() => useFetchGeneralSettings(), {
			wrapper,
		});

		expect(result.current.error).toBeUndefined();
		expect(result.current.data).toBeUndefined();

		await waitForNextUpdate(); // wait for response

		// Data is already written above
		expect(result.current.data).toBeDefined();
		expect(result.current.error).toBeUndefined();
	});

	it('checks for the entries in response data', async () => {
		const wrapper = ApolloMockedProvider(successMocks);

		const { result, waitForNextUpdate } = renderHook(() => useFetchGeneralSettings(), {
			wrapper,
		});

		await waitForNextUpdate(); // wait for response

		expect(result.current.data).toHaveProperty('generalSettings');

		expect(result.current.data.generalSettings).toHaveProperty('dateFormat');

		expect(result.current.data.generalSettings).toHaveProperty('timezone');

		expect(result.current.data.generalSettings.timezone).toBe(generalSettings.timezone);
	});
});
