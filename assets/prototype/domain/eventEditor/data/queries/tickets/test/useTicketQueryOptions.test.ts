import { renderHook } from '@testing-library/react-hooks';

import useTicketQueryOptions from '../useTicketQueryOptions';
import { ApolloMockedProvider } from '../../../../context';
import { nodes } from '../../datetimes/test/data';
import useInitDatetimeTestCache from '../../datetimes/test/useInitDatetimeTestCache';

describe('useTicketQueryOptions()', () => {
	it('checks if the query operation variables are correct', () => {
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
