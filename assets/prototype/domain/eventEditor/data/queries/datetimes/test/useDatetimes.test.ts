import { useEffect } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { renderHook } from '@testing-library/react-hooks';

import useDatetimes from '../useDatetimes';
import contextWrapper from './contextWrapper';
import { successMocks, setup, cleanup, nodes, request, edge } from './data';
import { useStatus, TypeName } from '../../../../../../application/services/apollo/status';

beforeEach(setup);

afterEach(cleanup);

describe('useDatetimes()', () => {
	it('checks for the empty datetimes', () => {
		const wrapper = contextWrapper(successMocks);
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
		const wrapper = contextWrapper(successMocks);
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
