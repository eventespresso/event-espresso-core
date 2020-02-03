import { renderHook } from '@testing-library/react-hooks';

import usePriceQueryOptions from '../usePriceQueryOptions';
import { ApolloMockedProvider } from '../../../../context/TestContext';
import { nodes } from '../../tickets/test/data';
import useInitTicketTestCache from '../../tickets/test/useInitTicketTestCache';

const timeout = 5000; // milliseconds
describe('usePriceQueryOptions()', () => {
	it('checks if the query operation variables are correct', async () => {
		const wrapper = ApolloMockedProvider();
		const { result, waitForValueToChange } = renderHook(
			() => {
				useInitTicketTestCache();
				return usePriceQueryOptions();
			},
			{ wrapper }
		);
		await waitForValueToChange(() => result.current, { timeout });

		expect(result.current.variables.where.ticketIn).toEqual(nodes.map(({ id }) => id));
	});
});
