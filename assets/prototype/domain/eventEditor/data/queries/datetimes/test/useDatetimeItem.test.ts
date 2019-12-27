import { useApolloClient } from '@apollo/react-hooks';
import { renderHook } from '@testing-library/react-hooks';

import useDatetimeItem from '../useDatetimeItem';
import useDatetimeQueryOptions from '../useDatetimeQueryOptions';
import { ApolloMockedProvider } from '../../../../context/ContextProviders';
import { successMocks, setup, cleanup, nodes, edge } from './data';

beforeEach(setup);

afterEach(cleanup);

describe('useDatetimeItem()', () => {
	it('checks for non existent datetime when the cache is empty', () => {
		/* Set query options and the wrapper */
		const {
			result: { current: request },
		} = renderHook(() => useDatetimeQueryOptions(), {
			wrapper: ApolloMockedProvider(),
		});
		const wrapper = ApolloMockedProvider(successMocks.map((mock) => ({ ...mock, request })));
		/* Set query options and the wrapper */

		const { result } = renderHook(() => useDatetimeItem({ id: 'fake-id' }), { wrapper });

		expect(result.current).toBeUndefined();
	});

	it('checks for non existent datetime when the cache is NOT empty', () => {
		/* Set query options and the wrapper */
		const {
			result: { current: request },
		} = renderHook(() => useDatetimeQueryOptions(), {
			wrapper: ApolloMockedProvider(),
		});
		const wrapper = ApolloMockedProvider(successMocks.map((mock) => ({ ...mock, request })));
		/* Set query options and the wrapper */

		const { result } = renderHook(
			() => {
				// init hooks
				const client = useApolloClient();
				const writeQueryOptions = {
					...request,
					data: {
						espressoDatetimes: edge,
					},
				};
				// write the test data to cache
				client.writeQuery(writeQueryOptions);
				return useDatetimeItem({ id: 'fake-id' });
			},
			{ wrapper }
		);

		expect(result.current).toBeUndefined();
	});

	it('checks for an existent datetime', () => {
		/* Set query options and the wrapper */
		const {
			result: { current: request },
		} = renderHook(() => useDatetimeQueryOptions(), {
			wrapper: ApolloMockedProvider(),
		});
		const wrapper = ApolloMockedProvider(successMocks.map((mock) => ({ ...mock, request })));
		/* Set query options and the wrapper */

		const existingDatetime = nodes[0];
		const { result } = renderHook(
			() => {
				// init hooks
				const client = useApolloClient();
				const writeQueryOptions = {
					...request,
					data: {
						espressoDatetimes: edge,
					},
				};
				// write the test data to cache
				client.writeQuery(writeQueryOptions);
				return useDatetimeItem({ id: existingDatetime.id });
			},
			{ wrapper }
		);

		const { current: datetimeItem } = result;

		expect(datetimeItem).toBeDefined();

		expect(datetimeItem.id).toEqual(existingDatetime.id);

		expect(datetimeItem.dbId).toEqual(existingDatetime.dbId);

		expect(datetimeItem).toEqual(existingDatetime);
	});
});
