import { renderHook } from '@testing-library/react-hooks';

import useDatetimes from '../useDatetimes';
import { ApolloMockedProvider } from '../../../../context/ContextProviders';
import { setup, cleanup, nodes } from './data';
import useInitDatetimeStatus from './useInitDatetimeStatus';
import useInitDatetimeTestCache from './useInitDatetimeTestCache';

beforeAll(setup);

afterAll(cleanup);

describe('useDatetimes()', () => {
	const wrapper = ApolloMockedProvider();
	it('checks for the empty datetimes', () => {
		const { result } = renderHook(
			() => {
				useInitDatetimeStatus();
				return useDatetimes();
			},
			{ wrapper }
		);

		expect(result.current.length).toBe(0);
	});

	it('checks for the updated datetimes cache', () => {
		const { result } = renderHook(
			() => {
				useInitDatetimeTestCache();
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
