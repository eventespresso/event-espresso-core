import { useApolloClient } from '@apollo/react-hooks';
import { renderHook, act } from '@testing-library/react-hooks';

import { useCacheRehydration } from '@edtrServices/apollo/initialization';
import useUpdateTicketList from '../useUpdateTicketList';
import { useTicketQueryOptions, useTickets, useTicketIds } from '@edtrServices/apollo/queries';
import { ApolloMockedProvider } from '@edtrServices/context/TestContext';

const timeout = 5000; // milliseconds
describe('useUpdateTicketList', () => {
	it('checks for tickets cache update', async () => {
		const wrapper = ApolloMockedProvider();
		const { result, waitForValueToChange } = renderHook(
			() => {
				useCacheRehydration();
				return {
					queryOptions: useTicketQueryOptions(),
					ticketlist: useTickets(),
					cacheUpdater: useUpdateTicketList(),
					client: useApolloClient(),
				};
			},
			{
				wrapper,
			}
		);
		await waitForValueToChange(() => result.current, { timeout });

		const ticketlist = result.current.ticketlist;

		const ticket = { ...ticketlist[0], id: ticketlist[0].id + '-alpha' };

		// add ticket to the list.
		const nodes = [...ticketlist, ticket];

		act(() => {
			result.current.cacheUpdater({
				...result.current.queryOptions,
				data: {
					espressoTickets: {
						__typename: 'EspressoRootQueryTicketsConnection',
						nodes,
					},
				},
			});
		});

		const cache = result.current.client.extract();
		const { result: cacheResult, waitForNextUpdate: waitForUpdate } = renderHook(
			() => {
				const client = useApolloClient();
				// restore the cache from previous render
				client.restore(cache);
				return useTicketIds();
			},
			{
				wrapper,
			}
		);
		await waitForUpdate({ timeout });

		const cachedTicketIds = cacheResult.current;

		expect(cachedTicketIds.length).toBe(ticketlist.length + 1);

		expect(cachedTicketIds).toContain(ticket.id);
	});
});
