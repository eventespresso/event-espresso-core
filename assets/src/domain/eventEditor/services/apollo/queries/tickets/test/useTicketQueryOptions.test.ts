import { renderHook } from '@testing-library/react-hooks';

import useTicketQueryOptions from '../useTicketQueryOptions';
import { ApolloMockedProvider } from '../../../../../services/context/TestContext';
import { nodes } from '../../datetimes/test/data';
import useInitDatetimeTestCache from '../../datetimes/test/useInitDatetimeTestCache';
import { getGuids } from '@appServices/predicates';

const timeout = 5000; // milliseconds
describe('useTicketQueryOptions', () => {
	it('checks if the query operation variables are correct', async () => {
		const wrapper = ApolloMockedProvider();
		const { result, waitForNextUpdate: waitForUpdate } = renderHook(
			() => {
				useInitDatetimeTestCache();
				return useTicketQueryOptions();
			},
			{ wrapper }
		);
		await waitForUpdate({ timeout });

		expect(result.current.variables.where.datetimeIn).toEqual(getGuids(nodes).sort());
	});
});
