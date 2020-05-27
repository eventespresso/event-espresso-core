import { useApolloClient } from '@apollo/react-hooks';
import { renderHook, act } from '@testing-library/react-hooks';
import { path } from 'ramda';

import { useDatetimeMutator } from '../';
import { useRelations } from '../../../../../../../application/services/apollo/relations';
import { MutationType } from '../../../../../../../application/services/apollo/mutations/types';
import { ApolloMockedProvider } from '../../../../context/TestContext';
import { getMutationMocks, mockedDatetimes } from './data';
import { nodes as tickets } from '../../../queries/tickets/test/data';
import { MutationInput } from '../../../../../../../application/services/apollo/mutations/types';
import useDatetimeItem from '../../../queries/datetimes/useDatetimeItem';
import useDatetimeIds from '../../../queries/datetimes/useDatetimeIds';
import useInitTicketTestCache from '../../../queries/tickets/test/useInitTicketTestCache';
import useTickets from '../../../queries/tickets/useTickets';
import useTicketQueryOptions from '../../../queries/tickets/useTicketQueryOptions';
import { getGuids } from '@appServices/predicates';

const timeout = 5000; // milliseconds

describe('createDatetime', () => {
	let testInput: MutationInput = { name: 'New Test Date', description: 'New Test Desc' };
	const mockedDatetime = mockedDatetimes.CREATE;

	const ticketIds = getGuids(tickets);

	let mutationMocks = getMutationMocks(testInput, MutationType.Create);

	const { result: mockResult } = mutationMocks[0];

	it('checks for the mutation data to be same as the mock data', async () => {
		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result, waitForValueToChange } = renderHook(() => useDatetimeMutator(), {
			wrapper,
		});

		let mutationData: any;

		act(() => {
			result.current.createEntity(testInput).then(({ data }) => {
				mutationData = data;
			});
		});

		// wait for mutation promise to resolve
		await waitForValueToChange(() => mutationData, { timeout });

		expect(mutationData).toEqual(mockResult.data);
		const pathToName = ['createEspressoDatetime', 'espressoDatetime', 'name'];

		const nameFromMutationData = path<string>(pathToName, mutationData);
		const nameFromMockData = path<string>(pathToName, mockResult.data);

		expect(nameFromMutationData).toEqual(nameFromMockData);
	});

	it('checks for the mutation data to be same as that in the cache - useDatetimeItem', async () => {
		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result: mutationResult, waitForValueToChange } = renderHook(
			() => ({
				mutator: useDatetimeMutator(),
				client: useApolloClient(),
			}),
			{
				wrapper,
			}
		);

		act(() => {
			mutationResult.current.mutator.createEntity(testInput);
		});

		// wait for mutation promise to resolve
		await waitForValueToChange(() => mutationResult.current, { timeout });

		const cache = mutationResult.current.client.extract();
		const { result: cacheResult, waitForNextUpdate } = renderHook(
			() => {
				const client = useApolloClient();
				// restore the cache from previous render
				client.restore(cache);
				return useDatetimeItem({ id: mockedDatetime.id });
			},
			{
				wrapper,
			}
		);

		await waitForNextUpdate({ timeout });

		const cachedDatetime = cacheResult.current;

		expect(cachedDatetime).toEqual({ ...mockedDatetime, ...testInput });
	});

	it('checks for the mutation data to be same as that in the cache - useDatetimeIds', async () => {
		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result: mutationResult, waitForNextUpdate } = renderHook(
			() => ({
				mutator: useDatetimeMutator(),
				client: useApolloClient(),
			}),
			{
				wrapper,
			}
		);

		act(() => {
			mutationResult.current.mutator.createEntity(testInput);
		});
		// wait for actual update instead of optimistic response
		await waitForNextUpdate({ timeout });

		const cache = mutationResult.current.client.extract();

		const { result: cacheResult, waitForNextUpdate: waitForUpdate } = renderHook(
			() => {
				const client = useApolloClient();
				// restore the cache from previous render
				client.restore(cache);
				return useDatetimeIds();
			},
			{
				wrapper,
			}
		);

		await waitForUpdate({ timeout });

		const cachedDatetimes = cacheResult.current;

		expect(cachedDatetimes).toContain(mockedDatetime.id);
	});

	it('checks for relation update after mutation', async () => {
		// Add related ticket Ids to the mutation input
		testInput = { ...testInput, tickets: ticketIds };

		mutationMocks = getMutationMocks(testInput, MutationType.Create);

		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result: mutationResult, waitForNextUpdate } = renderHook(
			() => ({
				mutator: useDatetimeMutator(),
				relationsManager: useRelations(),
			}),
			{
				wrapper,
			}
		);

		act(() => {
			mutationResult.current.mutator.createEntity(testInput);
		});
		// wait for actual update instead of optimistic response
		await waitForNextUpdate({ timeout });

		// check if datetime is related to all the passed tickets
		const relatedTicketIds = mutationResult.current.relationsManager.getRelations({
			entity: 'datetimes',
			entityId: mockedDatetime.id,
			relation: 'tickets',
		});

		expect(ticketIds.length).toEqual(relatedTicketIds.length);

		expect(ticketIds).toEqual(relatedTicketIds);

		// check if all the passed tickets are related to the datetime
		ticketIds.forEach((ticketId) => {
			const relatedDatetimeIds = mutationResult.current.relationsManager.getRelations({
				entity: 'tickets',
				entityId: ticketId,
				relation: 'datetimes',
			});

			expect(relatedDatetimeIds).toContain(mockedDatetime.id);
		});
	});

	it('checks if the mutation updates tickets cache', async () => {
		// Add related ticket Ids to the mutation input
		testInput = { ...testInput, tickets: ticketIds };

		mutationMocks = getMutationMocks(testInput, MutationType.Create);

		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result: mutationResult, waitForNextUpdate, waitForValueToChange } = renderHook(
			() => {
				useInitTicketTestCache();
				return {
					mutator: useDatetimeMutator(),
					client: useApolloClient(),
				};
			},
			{
				wrapper,
			}
		);

		await waitForValueToChange(() => mutationResult.current, { timeout });

		act(() => {
			mutationResult.current.mutator.createEntity(testInput);
		});
		// wait for actual update instead of optimistic response
		await waitForNextUpdate({ timeout });

		const cache = mutationResult.current.client.extract();
		const { result: cacheResult, waitForNextUpdate: waitForUpdate } = renderHook(
			() => {
				const client = useApolloClient();
				// restore the cache from previous render
				client.restore(cache);
				return {
					queryOptions: useTicketQueryOptions(),
					tickets: useTickets(),
				};
			},
			{
				wrapper,
			}
		);

		await waitForUpdate({ timeout });

		const queryOptions = cacheResult.current.queryOptions;
		const cachedTickets = cacheResult.current.tickets;

		// check if query options are updated,
		// which means the cache is updated
		expect(queryOptions.variables.where.datetimeIn).toContain(mockedDatetime.id);
		expect(cachedTickets).toBeDefined();
	});
});
