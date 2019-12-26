import { useApolloClient } from '@apollo/react-hooks';
import { renderHook } from '@testing-library/react-hooks';

import useDatetimeItem from '../useDatetimeItem';
import contextWrapper from './contextWrapper';
import { successMocks, setup, cleanup, nodes, request, edge } from './data';

beforeEach(setup);

afterEach(cleanup);

describe('useDatetimeItem()', () => {
	it('checks for non existent datetime when the cache is empty', () => {
		const wrapper = contextWrapper(successMocks);
		const { result } = renderHook(() => useDatetimeItem({ id: 'fake-id' }), { wrapper });

		expect(result.current).toBeUndefined();
	});

	it('checks for non existent datetime when the cache is NOT empty', () => {
		const wrapper = contextWrapper(successMocks);
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
		const wrapper = contextWrapper(successMocks);
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
