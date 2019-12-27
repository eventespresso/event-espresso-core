import { renderHook } from '@testing-library/react-hooks';

import useTicketQueryOptions from '../useTicketQueryOptions';
import { ApolloMockedProvider } from '../../../../context/ContextProviders';
import { setup, cleanup } from './data';
import { nodes } from '../../datetimes/test/data';
import useInitDatetimeTestCache from '../../datetimes/test/useInitDatetimeTestCache';

beforeEach(setup);

afterEach(cleanup);

describe('useTicketQueryOptions()', () => {
	it('checks if the eventId for query is correct', () => {
		const wrapper = ApolloMockedProvider();
		const { result } = renderHook(
			() => {
				useInitDatetimeTestCache();
				return useTicketQueryOptions();
			},
			{ wrapper }
		);

		expect(result.current.variables.where.datetimeIn).toEqual(nodes.map(({ id }) => id));
	});
});
