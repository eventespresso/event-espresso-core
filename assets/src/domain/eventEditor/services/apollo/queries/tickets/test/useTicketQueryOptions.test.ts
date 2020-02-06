import { renderHook } from '@testing-library/react-hooks';

import useTicketQueryOptions from '../useTicketQueryOptions';
import { ApolloMockedProvider } from '../../../../../services/context/TestContext';
import { nodes } from '../../datetimes/test/data';
import useInitDatetimeTestCache from '../../datetimes/test/useInitDatetimeTestCache';

const timeout = 5000; // milliseconds
describe('useTicketQueryOptions', () => {
	it('checks if the query operation variables are correct', async () => {
		const wrapper = ApolloMockedProvider();
		const { result, waitForValueToChange } = renderHook(
			() => {
				useInitDatetimeTestCache();
				return useTicketQueryOptions();
			},
			{ wrapper }
		);
		await waitForValueToChange(() => result.current, { timeout });

		expect(result.current.variables.where.datetimeIn).toEqual(nodes.map(({ id }) => id));
	});
});
