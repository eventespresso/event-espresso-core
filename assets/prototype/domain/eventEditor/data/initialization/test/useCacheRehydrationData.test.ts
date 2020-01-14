import { renderHook } from '@testing-library/react-hooks';

import useCacheRehydrationData from '../useCacheRehydrationData';
import { ApolloMockedProvider } from '../../../context';

describe('useCacheRehydrationData', () => {
	it('checks for event data', async () => {
		const {
			result: { current: data },
		} = renderHook(() => useCacheRehydrationData(), {
			wrapper: ApolloMockedProvider(),
		});

		expect(data.event).toHaveProperty('datetimes');

		expect(data.event).toHaveProperty('tickets');

		expect(data.event.dbId).toBeGreaterThan(1);

		expect(data.event).toHaveProperty('relations');
	});

	it('checks for current user data', async () => {
		const {
			result: { current: data },
		} = renderHook(() => useCacheRehydrationData(), {
			wrapper: ApolloMockedProvider(),
		});

		expect(data.currentUser).toHaveProperty('name');

		expect(data.currentUser.id).toBeDefined();
	});

	it('checks for general settings data', async () => {
		const {
			result: { current: data },
		} = renderHook(() => useCacheRehydrationData(), {
			wrapper: ApolloMockedProvider(),
		});

		expect(data.generalSettings).toHaveProperty('dateFormat');

		expect(data.generalSettings.timezone).toBeDefined();
	});
});
