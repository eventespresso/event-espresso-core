import { useEffect } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { renderHook } from '@testing-library/react-hooks';

import useDatetimes from '../useDatetimes';
import useDatetimeQueryOptions from '../useDatetimeQueryOptions';
import { ApolloMockedProvider } from '../../../../context/ContextProviders';
import { successMocks, setup, cleanup, nodes, edge } from './data';
import { useStatus, TypeName } from '../../../../../../application/services/apollo/status';

beforeEach(setup);

afterEach(cleanup);

describe('useDatetimes()', () => {
	it('checks for the empty datetimes', () => {
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
				const { setIsLoaded } = useStatus();
				useEffect(() => {
					setIsLoaded(TypeName.datetimes, true);
				}, []);
				return useDatetimes();
			},
			{ wrapper }
		);

		expect(result.current.length).toBe(0);
	});

	it('checks for the updated datetimes cache', () => {
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
				const { setIsLoaded } = useStatus();
				const writeQueryOptions = {
					...request,
					data: {
						espressoDatetimes: edge,
					},
				};
				// write the test data to cache
				client.writeQuery(writeQueryOptions);
				// make sure the status flags is set for useDatetimes to work
				useEffect(() => {
					setIsLoaded(TypeName.datetimes, true);
				}, []);
				return useDatetimes();
			},
			{ wrapper }
		);

		const { current: cachedDatetimes } = result;

		expect(cachedDatetimes).toEqual(nodes);

		expect(cachedDatetimes.length).toEqual(nodes.length);

		expect(cachedDatetimes[0].id).toEqual(nodes[0].id);

		expect(cachedDatetimes[0].capacity).toEqual(nodes[0].capacity);
	});
});
