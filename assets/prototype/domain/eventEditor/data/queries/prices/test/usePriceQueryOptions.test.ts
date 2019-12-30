import { renderHook } from '@testing-library/react-hooks';

import usePriceQueryOptions from '../usePriceQueryOptions';
import { ApolloMockedProvider } from '../../../../context/ContextProviders';
import { setup, cleanup } from './data';
import { nodes } from '../../tickets/test/data';
import useInitTicketTestCache from '../../tickets/test/useInitTicketTestCache';

beforeEach(setup);

afterEach(cleanup);

describe('usePriceQueryOptions()', () => {
	it('checks if the query operation variables are correct', () => {
		const wrapper = ApolloMockedProvider();
		const { result } = renderHook(
			() => {
				useInitTicketTestCache();
				return usePriceQueryOptions();
			},
			{ wrapper }
		);

		expect(result.current.variables.where.ticketIn).toEqual(nodes.map(({ id }) => id));
	});
});
