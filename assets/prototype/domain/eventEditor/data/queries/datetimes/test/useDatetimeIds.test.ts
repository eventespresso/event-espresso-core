import { useEffect } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { renderHook } from '@testing-library/react-hooks';

import useDatetimeIds from '../useDatetimeIds';
import contextWrapper from './contextWrapper';
import { successMocks, setup, cleanup, nodes, request, edge } from './data';
import { useStatus, TypeName } from '../../../../../../application/services/apollo/status';

beforeEach(setup);

afterEach(cleanup);

describe('useDatetimeIds()', () => {
	it('checks for the empty datetime IDs', () => {
		const wrapper = contextWrapper(successMocks);
		const { result } = renderHook(
			() => {
				const { setIsLoaded } = useStatus();
				useEffect(() => {
					setIsLoaded(TypeName.datetimes, true);
				}, []);
				return useDatetimeIds();
			},
			{ wrapper }
		);

		expect(result.current.length).toBe(0);
	});

	it('checks for datetime IDs after the cache is updated', () => {
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
				return useDatetimeIds();
			},
			{ wrapper }
		);

		const { current: cachedDatetimeIds } = result;
		const passedDatetimeIds = nodes.map(({ id }) => id);

		expect(cachedDatetimeIds.length).toEqual(passedDatetimeIds.length);

		expect(cachedDatetimeIds).toEqual(passedDatetimeIds);

		expect(cachedDatetimeIds).toEqual(expect.arrayContaining(passedDatetimeIds));
	});
});
