import { renderHook } from '@testing-library/react-hooks';

import useEvent from '../useEvent';
import { ApolloMockedProvider } from '../../../../../services/context/TestContext';
import { successMocks, nodes } from './data';
import useEventQueryOptions from '../useEventQueryOptions';

const mockEvent = nodes[0];

const timeout = 5000; // milliseconds
describe('useEvent', () => {
	it('returns undefined when the given eventdoes not exist', async () => {
		const wrapper = ApolloMockedProvider();
		const { result, waitForNextUpdate } = renderHook(() => useEvent(), {
			wrapper,
		});

		expect(result.current).toBeUndefined();

		await waitForNextUpdate({ timeout }); // wait for response

		expect(result.current).toBeUndefined();
	});

	it('checks for response data', async () => {
		/* Set query options and the wrapper */
		const {
			result: { current: request },
		} = renderHook(() => useEventQueryOptions(), {
			wrapper: ApolloMockedProvider(),
		});
		const wrapper = ApolloMockedProvider(successMocks.map((mock) => ({ ...mock, request })));
		/* Set query options and the wrapper */
		const { result, waitForNextUpdate } = renderHook(() => useEvent(), {
			wrapper,
		});

		expect(result.current).toBeUndefined();

		await waitForNextUpdate({ timeout }); // wait for response

		expect(result.current).toBeDefined();
		expect(result.current.id).toBe(mockEvent.id);
		expect(result.current.dbId).toBe(mockEvent.dbId);
	});
});
